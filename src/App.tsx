import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import AlertMessage from './components/AlertMessage';
import Navigation from "./components/Navigation"
import CategoryType from './types/category';
import UserType from './types/auth';

import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Footer from './components/Footer'

// import api wrapper
import { getMe, getMyDecks } from './lib/apiWrapper';
import DeckType from './types/deck';
import CreateDeck from './views/CreateDeck';
import EditDeckInfo from './views/EditDeckInfo';
import BuildDeck from './views/BuildDeck';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false);
  const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)
  const [message,setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);
  const [mydecks, setMyDecks] = useState<DeckType[]>([])

  // if isLoggedIn:
  useEffect(() => {
    async function fetchData(){
        const response = await getMyDecks(localStorage.getItem('token')!);
        // console.log(response);
        if (response.data){
          let decks = response.data
          setMyDecks(decks)
          } else {
            setMyDecks([])
          }
      }

      fetchData();
  }, [message])

  useEffect(() => {
    if (isLoggedIn){
      getMe(localStorage.getItem('token') as string)
        .then(response => {
          if (response.data){
            setLoggedInUser(response.data)
          }
          
        })
        .catch(err => console.error(err))
    }
  },[isLoggedIn])

  const flashMessage = (newMessage:string|null,newCategory:CategoryType|null):void => {
    setMessage('')
    setCategory(null)
    setMessage(newMessage);
    setCategory(newCategory);
  }

  const logUserIn = (user:UserType):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    flashMessage(`${user.username} has been logged in `, 'success')
  }

  const logUserOut = ():void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp')
    flashMessage('You have logged out!', 'info')
  }

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} handleClick={logUserOut}/>
      <Container>
        {message && <AlertMessage category={category!} message={message} flashMessage = {flashMessage}/>}
        <Routes>
          {/* isLoggedIn={isLoggedIn} user={loggedInUser} flashMessage={flashMessage} mydecks={mydecks} */}
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} flashMessage={flashMessage}/>}/>
          <Route path='/register' element={<Register logUserIn={logUserIn} flashMessage = {flashMessage}/>}/>
          <Route path='/createdeck' element={<CreateDeck isLoggedIn={isLoggedIn} user={loggedInUser} flashMessage={flashMessage} mydecks={mydecks}/>}/>
          <Route path='deck/:deckId' element={<BuildDeck flashMessage={flashMessage} user={loggedInUser} isLoggedIn={isLoggedIn} />}/>
          <Route path='deck/:deckId/edit' element={<EditDeckInfo flashMessage={flashMessage} currentUser={loggedInUser}/>}/>
        </Routes>
      </Container>
      <Footer/>
    </div>
  )
}

export default App
