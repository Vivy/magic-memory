import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/singlecard';

const cardImages = [
  { src: `${process.env.PUBLIC_URL}/img/helmet-1.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/img/potion-1.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/img/ring-1.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/img/scroll-1.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/img/shield-1.png`, matched: false },
  { src: `${process.env.PUBLIC_URL}/img/sword-1.png`, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
  };

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <p> ™ Vivy ®</p>
    </div>
  );
}

export default App;
