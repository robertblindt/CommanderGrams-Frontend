import { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CommanderReqType from '../types/commanderreq'
import NGramType from '../types/ngram'
import { getNGrams, searchForCommander } from '../lib/apiWrapper'
import CommanderCard from './CommanderCard'

type CommanderSearchProps = {
}

export default function CommanderSearch({}: CommanderSearchProps) {
    const [commanderRequest,setCommanderRequest] = useState<CommanderReqType>({"commanderName":""})
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const [cardNGrams, setCardNGrams] = useState<NGramType[]|null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setCommanderRequest({...commanderRequest, [e.target.name]:e.target.value})
    }

    async function searchCard(e: React.FormEvent):Promise<NGramType[]|void>{
        e.preventDefault();
        const search = await searchForCommander(commanderRequest.commanderName)
        if (search.data!){
            const nGrams = await getNGrams(commanderRequest.commanderName)
            // console.log(nGrams)
            setCardNGrams(nGrams.data!)
            setIsSearching(true)
        } else {
            console.log("No Commander found with that name.")
            let sorry_ngram = [{
                id:0,
                n_gram:"Sorry! We either don't have data on that commander yet! Please check your spelling!",
                commander_id :0,
                card_name:"Card Not Found",
                card_img:"https://picsum.photos/500/200/?blur"
            }]
            setCardNGrams(sorry_ngram)
            setIsSearching(true)
        }
    }

    

    return (
        <>
        <Card className='my-3 text-center border border-dark border-2 rounded-3 grad high-card-shadow'>
            <Card.Body>
                <Form onSubmit={searchCard}>
                    <Form.Label className='fs-1 ws-font'>Request a Commander!</Form.Label>
                    <Form.Control className="custom-form-input" name='commanderName' value={commanderRequest.commanderName} onChange={handleInputChange}/>
                    <Button type='submit' variant='outline-dark' className='w-100 mt-3 btn-shadow'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
        { isSearching ? (
            <CommanderCard cards={cardNGrams} card={cardNGrams![0]}/>
        ) : (null)}
        </>
    )
}