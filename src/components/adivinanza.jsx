import React, { useState } from 'react';
import './adivinanza.css'; 

function Adivinanza() {
  const [targetNumber] = useState(Math.floor(Math.random() * 100 +1));
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);

  const handleGuess = () => {
    setNumberOfAttempts(numberOfAttempts + 1);
    const parsedGuess = parseInt(guess);

    if (parsedGuess === targetNumber) {
      setMessage('¡El número es correcto!');
    } else if (parsedGuess < targetNumber) {
      setMessage('Demasiado bajo');
    } else {
      setMessage('Demasiado alto');
    }
  };

  return (
    <div className="App">
      <h1 className="title">Adivina un número del 1 al 100</h1>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Tu adivinanza..."
        className="guess-input"
      />
      <button onClick={handleGuess} className="guess-button">
        Adivinar
      </button>
      <p className="message" id="message" data-testid="message">
        {message}
      </p>
      <p className="attempts" id="attempts">
        Intentos: {numberOfAttempts}
      </p>
    </div>
  );
}

export default Adivinanza;
