// import React from 'react'
import DeckType from '../types/deck'
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// import PostType from '../types/post';
// import UserType from '../types/auth';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import UserType from '../types/auth';

type DeckCardProps = {
    deck: DeckType
    currentUser: Partial<UserType>|null
}

export default function DeckCard({deck, currentUser}: DeckCardProps) {

    const navigate = useNavigate()

    const toEditPage = ():void => {
        navigate(`/deck/${deck.id}/edit`)
    }

    const toDeckPage = ():void => {
        navigate(`/deck/${deck.id}`)
    }

return (
    <div className="col-md-4 col-6">
    <Card  className="mb-3 text-center border border-dark border-2 rounded-3 custom-card-bg grad card-shadow">
        {/* <Card.Img variant='top' src={deck.imageUrl}/> */}
        <Card.Body className="">
            <Card.Header className='bg-transparent'>
                <Card.Title className='ws-font'>{deck.deck_name}</Card.Title>
                <Card.Subtitle className='mt-1 fw-lighter ws-font'>Created by: {currentUser?.username}</Card.Subtitle>
            </Card.Header>
            <Card.Text className='ws-font fw-light'>
                {deck.description}
            </Card.Text>
            { currentUser?.id == deck.user_id ? (
                <div className='row'>
                    <div className="col-6">
                    <Button className='w-100 btn-shadow' variant='dark' onClick={toEditPage}>Edit Info</Button>
                    </div>
                    <div className="col-6">
                    <Button className='w-100 btn-shadow ' variant='outline-dark' onClick={toDeckPage} >Go to deck!</Button>
                    </div>
                </div>
            ) : null }
        </Card.Body>
    </Card>
    </div>
    )
}