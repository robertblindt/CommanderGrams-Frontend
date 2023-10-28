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
        <Navbar bg='dark' data-bs-theme="dark" className='fixed-vh p-0'>
            <Container className='h-100'>
                <div className='col-8 h-100 p-0 m-0'>
                <Navbar.Brand  as={Link} to='/' className='h-100'>
                <img
                src="https://raw.githubusercontent.com/robertblindt/CommanderGrams-Frontend/main/img/CommanderGrams_big.png"
                className="h-100"
                alt="CommanderGrams Logo"
                />
                </Navbar.Brand>
                </div>
                <div className='col-4'>
                <Nav className='justify-content-end'>
                    { isLoggedIn ? (
                        <>
                        <Nav.Link as={Link} to='/createdeck'>My Decks</Nav.Link>
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
                </div>
            </Container>
        </Navbar>
    )
}