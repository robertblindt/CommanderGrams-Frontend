
import DeckType from '../types/deck'
import CardType from '../types/card'
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import PostType from '../types/post';
// import UserType from '../types/auth';
import Button from 'react-bootstrap/Button';
import UserType from '../types/auth';
import DeckCollection from '../types/deck_collection';
import { addDcById, deleteDcById } from '../lib/apiWrapper';
import CategoryType from '../types/category';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'

type CardCardProps = {
    card: DeckCollection|CardType
    currentUser: Partial<UserType>|null
    deck:DeckType
    flashMessage: (message:string|null, category:CategoryType|null) => void

}

export default function CardCard({card, currentUser,deck, flashMessage}: CardCardProps) {

    const handleCardDelete = async (cardName:string) => {
        const token = localStorage.getItem('token')||''
        const response = await deleteDcById(token, cardName, deck.id)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            console.log(response.data)
            // flashMessage(response.data!, 'primary')
        }
    }

    const handleAddCard = async (cardName:string) => {
        const token = localStorage.getItem('token')||''
        // console.log(token, cardName, deck.id)
        const response = await addDcById(token, cardName, deck.id)
        // console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            // console.log(response.data)
            // flashMessage(response.data!, 'primary')
        }
    }

return (
    <div className="col-xxl-2 col-md-4 col-6">
    <Card  className="mb-3 text-center border border-dark border-2 rounded-3 custom-card-bg grad card-shadow">
        {/* <Card.Img variant='top' src={deck.imageUrl}/> */}
        <Card.Body className="p-2">
            <Card.Img variant="top" className='mb-2 mtg-card-shadow' src={card.card_img} alt={card.card_name}/>
            <p className='fs-5'>{card.card_name}</p>
            { currentUser?.id == deck.user_id ? (
                <div className='row'>
                    <div className="col-4 p-0">
                    <Button  className='w-75 btn-shadow  btn-border rounded-circle ms-3 button-move' variant='danger' onClick={()  => handleCardDelete(card.card_name!)}>-</Button>
                    </div>
                    <div className="col-4">
                    <OverlayTrigger
                        placement="top"
                        trigger="click"
                        overlay={(
                            <Popover className='bg-dark ws-font'>
                                <Popover.Header className='bg-dark'>
                                    {card.card_name}
                                </Popover.Header>
                                <Popover.Body className='ws-font'>
                                    {card.oracle_text}
                                </Popover.Body>
                            </Popover>
                        )}>
                        <Button className='w-75 btn-shadow rounded-circle button-move' variant='outline-primary' >&#8942;</Button>
                    </OverlayTrigger>
                    </div>
                    <div className="col-4 p-0">
                    <Button className='w-75 btn-shadow btn-border rounded-circle me-3 button-move' variant='success' onClick={() => handleAddCard(card.card_name!)}>+</Button>
                    </div>
                </div>
            ) : null }
        </Card.Body>
    </Card>
    </div>
    )
}