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

    const [searchTerm, setSearchTerm] = useState<Partial<SearchTermType>>({"search_term":""})

    const addTerm = ():void => { setisAdding(true) }

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
                    <Form onSubmit={addSearchTerm}>
                    <Form.Label className='fs-1 ws-font'>Add a search term!</Form.Label>
                    <Form.Control className="custom-form-input" name='search_term' value={searchTerm.search_term} onChange={handleInputChange}/>
                    <Button type='submit' variant='outline-dark' className='w-100 mt-3 btn-shadow'>Submit</Button>
                    </Form>
                ) : (

                    <Button variant='outline-dark' className='w-100 mt-3 btn-shadow' onClick={addTerm}>Add Search Term</Button>
                ) }
            </Card.Body>
        </Card>
        </>        
    )
}