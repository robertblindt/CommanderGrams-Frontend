import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'


type NaviationProps = {
    isLoggedIn: boolean
    handleClick: ()=>void
}

export default function Navigation({ isLoggedIn, handleClick }:NaviationProps) {

    return (
        <Navbar bg='dark' data-bs-theme="dark">
            <Container>
                <Navbar.Brand  as={Link} to='/' className='w-50'>
                <img
                src="/img/CommanderGrams_big.png"
                className="w-25"
                alt="CommanderGrams Logo"
                />
                </Navbar.Brand>
                <Nav>
                    { isLoggedIn ? (
                        <>
                        <Nav.Link as={Link} to='/createdeck'>Create Deck</Nav.Link>
                        <Nav.Link as='button' onClick={handleClick}>Log Out</Nav.Link>
                        </>
                    ) : (
                        <>
                        <Nav.Link href='/register'>Register</Nav.Link>
                        <Nav.Link href='/login'>Log In</Nav.Link>
                        </>
                        // <Nav.Link as={Link} to='/'>Log In</Nav.Link>
                        // <Nav.Link as={Link} to='/'>Log In</Nav.Link>
                    ) }
                </Nav>
            </Container>
        </Navbar>
    )
}