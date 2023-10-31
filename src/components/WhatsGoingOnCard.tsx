
import Card from 'react-bootstrap/Card';


type WhatsGoingOnCardProps = {

}

export default function WhatsGoingOnCard({}: WhatsGoingOnCardProps) {
    


return (
    <div className="col-12">
    <Card  className="mb-3 text-center border border-dark border-2 rounded-3 grad2 card-shadow">
        <Card.Body className="p-2 mb-2 ws-font">
            <Card.Title className='my-3 fs-2 ws-font fw-normal'>So whats going on here?</Card.Title>
            <div>When I scrape EDHRec, I grab the names of all the cards they recommend for the given commander.  I then contact Scryfall for each of those cards and look at their oracle text.  An algorithm then looks through each of those cards and counts how many times a 2-3 'word phrase' occurs, called n-grams, throughout all those cards.  I am displaying the n-grams that occur between 20 and 40 times.  There are some funny artifacts as a result of this initial product (Returned tap abilities no longer have the curly brackets and wrapped effects from things like tap lands enter the battlefield clause and then their tap ability being reduced to 'battlefield tap t'), but I will be improving this analysis as time goes on.</div> 
            <br/>
            <div>The "bag-of-n-grams" analysis is where this sites name comes from!  To better generalize phrases a process called 'lemmatization' occurs which takes non-root words and reduces them to their root.  Words like 'deals' or 'dealt' are reduced to 'deal', and 'tapped' is reduced to 'tap'.</div>
            <br/>
            <div>Although the word 'Commander' should not be reduced in the context of a 'game format' (Proper Noun), our logo still plays with visualizing the lemmatization of the word.</div>
            <br/>
            <div>Thanks for taking a look!</div>
        </Card.Body>
    </Card>
    </div>
    )
}