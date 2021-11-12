import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png",  matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [turn, setTurn] = useState(0)
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurn(0)
  }

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Reset choices & increase  turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurns => prevTurns + 1)
    setDisabled(false)
  } 
  // Compare two selected cards 
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src ) {
        setDisabled(true)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
      resetTurn()
    } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }  
  }, [choiceOne, choiceTwo])

useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <SingleCard 
              card={card}
              handleChoice={handleChoice} 
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              key={card.id}
              disabled={disabled}
            />
          ))
        }
      </div>
      <p>Turn: {turn}</p>
    </div>
  );
}

export default App
