
// import DeckType from '../types/deck'
// import CardType from '../types/card'
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import PostType from '../types/post';
// // import UserType from '../types/auth';
// import Button from 'react-bootstrap/Button';
// import UserType from '../types/auth';
// import CategoryType from '../types/category';
import NGramType from '../types/ngram';

type CommanderCardProps = {
    cards: NGramType[]|null
    card:NGramType
}

export default function CommanderCard({cards, card, }: CommanderCardProps) {
    


return (
    <div className="col-12">
    <Card  className="mb-3 text-center border border-dark border-2 rounded-3 custom-card-bg grad card-shadow">
        {/* <Card.Img variant='top' src={deck.imageUrl}/> */}
        <Card.Body className="p-2">
            <Card.Img variant="top" className='mb-2 mtg-card-shadow card-h-limit mw-100' src={card.card_img} alt={card.card_name}/>
                <div className='row text-center'>
                    <div className="col-12">
                        { cards?.map(card => (<li className='fs-4 ws-font' key={card.n_gram}>{card.n_gram}&nbsp;</li>)) }
                    </div>
                </div>
        </Card.Body>
    </Card>
    </div>
    )
}