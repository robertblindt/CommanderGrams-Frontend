import { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import CommanderReqType from '../types/commanderreq'
// import { Typeahead } from 'react-bootstrap-typeahead' 
import NGramType from '../types/ngram'
import { getCommanderNames, getNGrams, searchForCommander } from '../lib/apiWrapper'
import CommanderCard from './CommanderCard'

type CommanderSearchProps = {
}

export default function CommanderSearch({}: CommanderSearchProps) {
    // const [commanderRequest,setCommanderRequest] = useState<CommanderReqType>({"commanderName":""})
    const [commanderRequest,setCommanderRequest] = useState<string>("")

    // const [singleSelections,setSingleSelections] = useState<Option[]>(Option[]);

    const [isSearching, setIsSearching] = useState<boolean>(false)

    const [cardNGrams, setCardNGrams] = useState<NGramType[]|null>(null)

    const [commanderNames, setCommanderNames] = useState<string[]>([])

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    //     setCommanderRequest({...commanderRequest, [e.target.name]:e.target.value})
    // }

    useEffect(() => {
        async function fetchCommanders(){
            const response = await getCommanderNames();
            // console.log(response)
            // const response = {data:null, error:['a','b']};
            if (response.data){
            let names = response.data
                setCommanderNames(names)
            } else {
                setCommanderNames([])
            }
        }
        fetchCommanders();
    }, [])

    async function searchCard(e: React.FormEvent):Promise<NGramType[]|void>{
        e.preventDefault();
        // console.log(commanderRequest)
        const search = await searchForCommander(commanderRequest)
        if (search.data!){
            const nGrams = await getNGrams(commanderRequest)
            // console.log(nGrams)
            setCardNGrams(nGrams.data!)
            setIsSearching(true)
        } else {
            console.log("No Commander found with that name.")
            let sorry_ngram = [{
                id:0,
                n_gram:"Sorry! We either don't have data on that commander yet, or you spelled something wrong! Please check your spelling!",
                commander_id :0,
                card_name:"Card Not Found",
                card_img:"https://lh3.googleusercontent.com/d/1CQbMtyQLYltrEOjWLfgxqPIFzntvxNJP=w400-h400?authuser=0"
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
                    <p className='ws-font'>I am currently still assembling this data, so if we do not have it today, try again in a week!</p>
                    {/* <Form.Control className="custom-form-input" name='commanderName' value={commanderRequest.commanderName} onChange={handleInputChange}/> */}
                    {/* <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    // onChange={setCommanderRequest}
                    options={commanderNames}
                    placeholder="Choose a state..."
                    // selected={commanderRequest}
                    /> */}
                    <Form.Select className="custom-form-input" name='commanderName'
                    onChange={e => {setCommanderRequest(e.target.value);}}>
                    {commanderNames.map(p => <option value={p} key={p}>{p}</option>)}
                    </Form.Select>
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