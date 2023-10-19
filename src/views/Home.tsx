// import { useState, useEffect } from 'react';


// import UserType from '../types/auth'
// import CategoryType from '../types/category'
// import DeckType from '../types/deck';
// import { getMyDecks } from '../lib/apiWrapper';
// import DeckCard from '../components/DeckCard';
import CommanderSearch from '../components/CommanderSearch';
import HomeCard from '../components/HomeCard';

type HomeProps = {
  // isLoggedIn:boolean
  // user:Partial<UserType>|null
  // flashMessage: (message:string|null, category:CategoryType|null) => void
  // mydecks: DeckType[]
}

export default function Home({}: HomeProps) {  

  

  return (
    <>
    <HomeCard/>
    <CommanderSearch/>
    {/* I need to make a 'all decks' search that has only a 'take a look' button */}
    </>
  )
}