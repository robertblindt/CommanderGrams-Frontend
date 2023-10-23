import Card from 'react-bootstrap/Card'
import image1 from "./homecard.jpg";

type HomeCardProps = {
}

export default function HomeCard({}: HomeCardProps) {    

    return (
        <>
        <h4 className='ws-font pt-3 text-center fw-light'>This website is currently hosted using a few different free services, so if you request a card and don't get a response, give it 30 or 40 seconds and try again.</h4>
        <h4 className='ws-font text-center fw-light'>These free services turn off when not in use and take a bit to turn back on!</h4>
        <Card className='my-3 text-center border border-dark border-2 rounded-3 grad high-card-shadow ws-font overflow-auto'>
            <Card.Img src={image1} alt="Card image"/>
            <Card.ImgOverlay className='grad-home'>
                <Card.Title className='fs-1 fw-normal'>Where do you start when a new Commander catches your eye?</Card.Title>
                <Card.Subtitle className='mt-4 fs-2 fw-normal'>CommanderGrams is here to help!</Card.Subtitle>
                {/* <Card.Subtitle className='mt-3 fs-3 fw-normal'>Or even more daunting, what if you are building your first Commander deck?! </Card.Subtitle> */}
                <Card.Body className='fs-4 mt-3'>
                    
                    Not many people can keep track of the over 33,000 unique Magic the Gathering cards from the games over 30 years!  Right now there are more being release just about every month! The MTG community is lucky enough to have some tech-savvy players that have been gracious enough to create databases and website that track what is actively being released and built!
                    <br/>
                    <br/>
                    When you request a Commander below, we check EDHrecs recommendations for cards and let you know what we see in common with them.
                    <br/>
                    <br/>
                    We also have a deck building tool with some enhanced features!  You can set up search terms for your deck in order to track how many times an effect occurs in your deck! Never wonder how many cards 'do the thing' again!
                </Card.Body>
            </Card.ImgOverlay>
        </Card>
        </>
    )
}