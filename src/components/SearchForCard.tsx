import { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CardSearchType from '../types/cardsearch'
import { searchForCard } from '../lib/apiWrapper'
import CardType from '../types/card'
import CategoryType from '../types/category'

type CommanderSearchProps = {
    setSearchCards: (card_name:Partial<CardType[]>) => void
    setIsSearching: (ans:boolean) => void
    flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function SearchForCard({setSearchCards, setIsSearching, flashMessage}: CommanderSearchProps) {
    const [cardRequest,setCardRequest] = useState<CardSearchType>({"cardName":""})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setCardRequest({...cardRequest, [e.target.name]:e.target.value})
    }

    const findCards = async (e: React.FormEvent):Promise<Partial<CardType[]|void>> => {
        e.preventDefault();
        const cards = await searchForCard(localStorage.getItem('token')!,cardRequest.cardName)
        // console.log(cards)
        if (cards.error){
            setSearchCards([])
            flashMessage(cards.error, 'danger')
        } else{
            setSearchCards(cards?.data!)
        }
        setIsSearching(true)
        
    }

    return (
        <>
        <Card className='my-3 text-center border border-dark border-2 rounded-3 grad high-card-shadow'>
            <Card.Body>
                <Form onSubmit={findCards}>
                    <Form.Label className='fs-1 ws-font'>Find a Card!</Form.Label>
                    <Form.Control className="custom-form-input" name='cardName' value={cardRequest.cardName} onChange={handleInputChange}/>
                    <Button type='submit' variant='outline-dark' className='w-100 mt-3 btn-shadow'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}