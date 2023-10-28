import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DeckType from '../types/deck'
import CategoryType from '../types/category'
// import { login, getMe } from '../lib/apiWrapper'
import DeckCard from '../components/DeckCard'
import UserType from '../types/auth'
import { addDeck } from '../lib/apiWrapper'

type CreateDeckProps = {
    // isLoggedIn:boolean
    user:Partial<UserType>|null
    flashMessage: (message:string|null, category:CategoryType|null) => void
    mydecks: DeckType[]
}

export default function CreateDeck({user, flashMessage, mydecks}: CreateDeckProps) {
    const [newDeck,setNewDeck] = useState<Partial<DeckType>>({deck_name:'',description:''})

    const [isCreating, setIsCreating] = useState<Boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setNewDeck({...newDeck, [e.target.name]:e.target.value})
    }

    const IsCreatingTurn = ():void => { setIsCreating(true) }

    const handleFormSubmit = async (e: React.FormEvent):Promise<void> => {
        e.preventDefault();
        const response = await addDeck(localStorage.getItem('token')!, newDeck.deck_name!,newDeck.description!)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            window.location.reload()
            // flashMessage(response.data!, 'success')
        }
    }
    // INSIDE FORM onSubmit={handleFormSubmit}

return (
    <>
    { isCreating ? (
        <Card className='my-3 border border-dark border-2 rounded-3 grad high-card-shadow'>
        <Card.Body>
            <Form onSubmit={handleFormSubmit}>
                <div className='text-center fs-1 ws-font'>Create a Deck!</div>
                <Form.Label className='ws-font'>Deck Name</Form.Label>
                <Form.Control className="custom-form-input" name='deck_name' value={newDeck.deck_name} onChange={handleInputChange}/>
                <Form.Label className='ws-font'>Description</Form.Label>
                <Form.Control className="custom-form-input" name='description' value={newDeck.description} onChange={handleInputChange}/>
                <Button type='submit' variant='outline-dark' className='w-100 mt-3 btn-shadow'>Submit</Button>
            </Form>
        </Card.Body>
    </Card>
    ):(
        <Button variant='outline-danger' className='w-100 mt-3 my-3' onClick={IsCreatingTurn}>Add a Deck</Button>
    )}
    
    <div className="row">
    { mydecks.map(p => <DeckCard deck={p} currentUser={user} key={p.id}/> ) }
    </div>
    </>
    )
}