import { useState, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'


import UserType from '../types/auth'
import CategoryType from '../types/category'
import DeckType from '../types/deck';
import { addDcById, deckTransferAPI, getDeckById, getMyDeckCards, getSearchTerms } from '../lib/apiWrapper';
// import DeckCard from '../components/DeckCard';
import CommanderSearch from '../components/CommanderSearch';
import { useParams } from 'react-router-dom';
import CardType from '../types/card';
import DeckCollection from '../types/deck_collection';
import CardCard from '../components/CardCard';
import QuickDeckCol from '../components/QuickDeckCol';
import SearchForCard from '../components/SearchForCard';
import DisplayDeck from '../components/DisplayDeck';
import DeckStatsCard from '../components/DeckStatsCard';
import SearchTermType from '../types/searchterm';
import DeckDumpType from '../types/deckdump';

type BuildDeckProps = {
isLoggedIn:boolean
user:Partial<UserType>|null
flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function BuildDeck({ isLoggedIn, user, flashMessage}: BuildDeckProps) {  
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
                    <Form.Label>Enter Only the cards name on each line</Form.Label>
                    <Form.Control as="textarea" className='grad ws-font' rows={50} name='deck' value={dumpCards.deck} onChange={handleInputChange}/>
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