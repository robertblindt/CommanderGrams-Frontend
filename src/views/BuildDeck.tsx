import { useState, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'


import UserType from '../types/auth'
import CategoryType from '../types/category'
import DeckType from '../types/deck';
import { deckTransferAPI, getDeckById, getMyDeckCards, getSearchTerms } from '../lib/apiWrapper';
// import DeckCard from '../components/DeckCard';
// import CommanderSearch from '../components/CommanderSearch';
import { useParams } from 'react-router-dom';
import CardType from '../types/card';
import DeckCollection from '../types/deck_collection';
import CardCard from '../components/CardCard';
// import QuickDeckCol from '../components/QuickDeckCol';
import SearchForCard from '../components/SearchForCard';
import DisplayDeck from '../components/DisplayDeck';
import DeckStatsCard from '../components/DeckStatsCard';
import SearchTermType from '../types/searchterm';
import DeckDumpType from '../types/deckdump';

type BuildDeckProps = {
// isLoggedIn:boolean
user:Partial<UserType>|null
flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function BuildDeck({ user, flashMessage}: BuildDeckProps) {  
    const { deckId } = useParams();
    const [myCards, setMyCards] = useState<DeckCollection[]>([])
    const [myDeck, setMyDeck] = useState<DeckType>({
        id:0,
        deck_name:'',
        description:'',
        user_id :0
    })
    const [isSearching,setIsSearching] = useState<boolean>(false)
    const [searchCards, setSearchCards] = useState<Partial<CardType[]>>([])
    const [mySearchTerms, setMySearchTerms] = useState<SearchTermType[]>([])
    const [isDumping, setIsDumping] = useState<boolean>(false)
    const [dumpCards, setDumpCards] = useState<DeckDumpType>({"deck":""})

    useEffect(() => {
        async function fetchDeckData(){
            const response = await getMyDeckCards(localStorage.getItem('token')!,deckId!);
            const response2 = await getDeckById(localStorage.getItem('token')!,Number(deckId));
            const response3 = await getSearchTerms(localStorage.getItem('token')!,Number(deckId));
            // console.log(response.data)
            // console.log(response);
            if (response.data && response2.data){
            let cards = response.data
            let deck = response2.data
            let searchterms = response3.data
            // console.log(searchterms)
            // console.log(cards)
            setMyDeck(deck)
            setMyCards(cards)
            setMySearchTerms(searchterms!)
            const card_names_dump = cards.map(i => '1x ' + i.card_name + '\n').join('')
            setDumpCards({'deck':card_names_dump})
            } else {
            setMyCards([]) 
            }
        }
        fetchDeckData();
    }, [])

    const closeSearch = ():void => {
        setIsSearching(false)
        // Use useeffect hook
        window.location.reload()
    }

    const openDump = ():void => {
        setIsDumping(true)
    }

    const closeDump = ():void => {
        setIsDumping(false)
        window.location.reload()
    }

    const deckTransfer = async (e: React.FormEvent):Promise<void> => {
        e.preventDefault();
        // console.log(dumpCards.deck)
        let someRet = await deckTransferAPI(localStorage.getItem('token')!, Number(deckId), dumpCards.deck)
        console.log(someRet)
        setIsDumping(false)
        window.location.reload()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setDumpCards({...dumpCards, [e.target.name]:e.target.value})
    }



return (
    <>
    <Button variant='outline-danger' className='w-100 mt-3' onClick={openDump}>Mass Text Deck Editor</Button>

    <SearchForCard setSearchCards={setSearchCards} setIsSearching={setIsSearching} flashMessage={flashMessage}/>
    
    <div className="row">
    <DisplayDeck cards={myCards} currentUser={user} deck={myDeck} flashMessage={flashMessage}/> 
    <DeckStatsCard flashMessage={flashMessage} deckId={Number(deckId)} searchTerms={mySearchTerms}/>
    </div>
    { isSearching ? (
    <div className="yourDiv">
        <div className='row mw-100'>
            <div className="col-9 d-flex align-items-center">
                <h2 className="px-4 ws-font">
                    Select Cards or Search for more!
                </h2>
            </div>
                <div className="col-3  d-flex align-items-center justify-content-end py-3">
                    <Button variant='outline-danger' onClick={closeSearch}>x</Button>
                </div>
                <div className="row m-0 p-0">
                { searchCards.map(p => <CardCard card={p!} currentUser={user} deck={myDeck} key={p?.card_name} flashMessage={flashMessage}/> ) }
                </div>
            </div>
        </div>
        ) : (null) }
    { isDumping ? (
    <div className="yourDiv">
        <div className='row mw-100'>
            <div className="col-9 d-flex align-items-center">
                <h2 className="px-4 ws-font">
                    Paste your deck list in to skip searching!
                </h2>
            </div>
                <div className="col-3  d-flex align-items-center justify-content-end py-3">
                    <Button variant='outline-danger' onClick={closeDump}>x</Button>
                </div>
                <div className="row m-0 p-0">
                <Form className='ws-font' onSubmit={deckTransfer}>
                    <p>If you are copying from Archidekt, you will need to remove the words 'Mainboard', 'Sideboard', etc.  You may also want to skip Basic Lands as I do not have a 'multi-card collapse' feature working right now</p>
                    <Form.Label className='fs-4'>Format your deck as "#x Card Name":</Form.Label>
                    <p>1x Craterhoof Behemoth</p>
                    <p>1x Sol Ring</p>
                    <Form.Control as="textarea" className='grad ws-font' rows={50} name='deck' value={dumpCards.deck} onChange={handleInputChange} defaultValue='something'/>
                    <p>Once you press submit, it can take up to 30 seconds to redirect if we do not have all the cards in our database already.</p>
                    <Button type='submit' variant='outline-danger' className='w-100 mt-3'>Submit</Button>
                </Form>
                {/* { searchCards.map(p => <CardCard card={p!} currentUser={user} deck={myDeck} key={p?.card_name} flashMessage={flashMessage}/> ) } */}
                </div>
            </div>
        </div>
        ) : (null) }
    </>
)
}