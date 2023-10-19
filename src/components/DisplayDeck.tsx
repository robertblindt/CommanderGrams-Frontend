
import DeckType from '../types/deck'
import Button from 'react-bootstrap/Button';
import UserType from '../types/auth';
import DeckCollection from '../types/deck_collection';
import Table from 'react-bootstrap/Table';
// import { useEffect, useState } from 'react';
import CategoryType from '../types/category';
import { deleteDcById, editDcById } from '../lib/apiWrapper';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'

type DisplayDeckProps = {
    cards: DeckCollection[]
    currentUser: Partial<UserType>|null
    deck:DeckType
    flashMessage: (message:string|null, category:CategoryType|null) => void
    
}

export default function DisplayDeck({cards,deck, flashMessage}: DisplayDeckProps) {
    const tableHeads = ["Card Name", "Type", "CMC", "\uD83C\uDCA0", "\u2655", ''] 

    // const closeFocus = ():void => {
    //     setIsLooking(false)
    // }

    const handleCardDelete = async (cardName:string) => {
        const token = localStorage.getItem('token')||''
        const response = await deleteDcById(token, cardName, deck.id)
        window.location.reload()
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            console.log(response.data)
            // flashMessage(response.data!, 'primary')
        }
    }

    const flipCommander = async (cardId:number, card:Partial<DeckCollection>) => {
        const token = localStorage.getItem('token')||''
        const new_truthiness = !card.is_commander!
        const response = await editDcById(token, cardId, deck.id, new_truthiness, card.is_maindeck!)
        window.location.reload()
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            console.log(response.data)
            // flashMessage(response.data!, 'primary')
        }
    }

    const flipMaindeck = async (cardId:number, card:Partial<DeckCollection>) => {
        const token = localStorage.getItem('token')||''
        const new_truthiness = !card.is_maindeck!
        const response = await editDcById(token, cardId, deck.id, card.is_commander!, new_truthiness)
        window.location.reload()
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            console.log(response.data)
            // flashMessage(response.data!, 'primary')
        }
    }

return (
    <Table striped bordered hover variant='dark'>
        <thead>
            <tr>
                { tableHeads.map(card => (<th key={card}>{card}</th>)) }</tr>
        </thead>
        <tbody>
            { cards.map(card => (
            <OverlayTrigger key={card.id}
            placement="top"
            trigger="click"
            overlay={(
                <Popover className='bg-dark'>
                    <Popover.Body>
                    <img className='mw-100' src={card.card_img} alt="" />
                </Popover.Body>
                </Popover>
            )}>
            <tr><td>{card.card_name}</td><td>{card.type_line}</td><td>{card.cmc}</td><td onClick={() => flipMaindeck(card.card_id!,card)}>{String(card.is_maindeck)}</td><td onClick={() => flipCommander(card.card_id!, card)}>{String(card.is_commander)}</td><td className='text-center'><Button variant='outline-danger' className='rounded-circle' onClick={()=> {handleCardDelete(card.card_name!)}}>-</Button></td></tr>
            </OverlayTrigger>
            )) }
        </tbody>
    </Table>
    )
}