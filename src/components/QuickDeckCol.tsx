// import React from 'react'
import DeckCollection from '../types/deck_collection'

type QuickDeckColProps = {
    card:DeckCollection
}

export default function QuickDeckCol({card}: QuickDeckColProps) {
  return (
    <div>{card.card_id}</div>
  )
}