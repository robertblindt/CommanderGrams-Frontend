import { useState } from 'react'

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import SearchTermType from '../types/searchterm';
import CategoryType from '../types/category';
import { addSearchTermToDB, deleteSearchTerm } from '../lib/apiWrapper';


type DeckStatsCardProps = {
    flashMessage: (message:string|null, category:CategoryType|null) => void,
    deckId:number,
    searchTerms:SearchTermType[]
}

export default function DeckStatsCard({flashMessage, deckId, searchTerms}: DeckStatsCardProps) {
    const [isAdding, setisAdding] = useState<boolean>(false)

    const [isMoreInfo, setIsMoreInfo] = useState<boolean>(false)

    const [searchTerm, setSearchTerm] = useState<Partial<SearchTermType>>({"search_term":""})

    const addTerm = ():void => { setisAdding(!isAdding) }

    const moreInfoButton = ():void => { setIsMoreInfo(!isMoreInfo) }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setSearchTerm({...searchTerm, [e.target.name]:e.target.value})
    }

    const addSearchTerm = async (e: React.FormEvent):Promise<void> =>{
        e.preventDefault();
        const response = await addSearchTermToDB(localStorage.getItem('token')!, deckId, searchTerm.search_term!)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            window.location.reload()
            // flashMessage(response.data!, 'success')
        }
        // the window reload resets to false and reruns the data search
        // setisAdding(false)
    }

    const handleDelete = async (searchTermId:number) => {
        console.log('delete!')
        const response = await deleteSearchTerm(localStorage.getItem('token')!, searchTermId)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            window.location.reload()
            // flashMessage(response.data!, 'success')
        }
    }

    const tableHeads = ["Search Term", "Count", ""] 
    

    return (
        <>
        <Card className='my-3 text-center border border-dark border-2 rounded-3 grad high-card-shadow'>
            <Card.Body>
                <Card.Title className='ws-font fs-1 fw-normal mb-3'>Deck Search Terms</Card.Title>
                {isMoreInfo ? (
                <>
                <Button variant='outline-danger' className='mb-2 w-25' onClick={moreInfoButton}> Close </Button>
                <p className='ws-font'>As of right now the cards oracle text is not lemmatized like the front pages analysis.  If you are trying to track something like 'deal 1', you might want to add some variants like 'deals 1'.</p>
                <p className='ws-font'>Tap effects and mana payments should be encompassed by curly brackets:</p>
                <p className='ws-font'> '{'{'}t{'}: add'}' - General land or Mana Rock tap</p>
                <p className='ws-font'> '{'{'}r{'}:'}' - To look for red spend ability like Firebreathing</p>
                <p className='ws-font'> Look in the "Find a Card" search's card info to see card syntax.</p>
                </>
                ) : (
                <Button variant='outline-info' className='mb-3 w-25' onClick={moreInfoButton}> More Info </Button>
                )
                }
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        { tableHeads.map(header => (<th key={header}>{header}</th>)) }</tr>
                </thead>
                <tbody>
                    { searchTerms.map(searchTerm => (
                    <tr  key={searchTerm.id}><td>{searchTerm.search_term}</td><td>{searchTerm.count}</td><td className='text-center'><Button variant='outline-danger' className='rounded-circle' onClick={()=> {handleDelete(searchTerm.id!)}}>-</Button></td></tr>
                    )) }
                </tbody>
            </Table>
                { isAdding ? (
                    <>
                    <Button variant='danger' className='w-100 mt-3 btn-shadow' onClick={addTerm}>Collapse</Button>
                    <Form onSubmit={addSearchTerm}>
                    <Form.Label className='fs-1 ws-font'>Add a search term!</Form.Label>
                    <Form.Control className="custom-form-input" name='search_term' value={searchTerm.search_term} onChange={handleInputChange}/>
                    <Button type='submit' variant='outline-dark' className='w-100 mt-3 btn-shadow'>Submit</Button>
                    </Form>
                    </>
                ) : (

                    <Button variant='outline-dark' className='w-100 mt-3 btn-shadow' onClick={addTerm}>Add Search Term</Button>
                ) }
            </Card.Body>
        </Card>
        </>        
    )
}