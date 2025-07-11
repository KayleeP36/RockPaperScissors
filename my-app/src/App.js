import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, ties: 0, losses: 0 });

  const choices = [
    { name: 'rock', emoji: '🪨' },
    { name: 'paper', emoji: '📄' },
    { name: 'scissors', emoji: '✂️' }
  ];

  const getRandomChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player, bot) => {
    if (player.name === bot.name) return 'tie';
    
    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };
    
    return winConditions[player.name] === bot.name ? 'win' : 'lose';
  };
const resetGame = () => {
  setPlayerChoice(null);
  setBotChoice(null);
  setResult('');
};

  const playGame = (playerChoice) => {
    const botChoice = getRandomChoice();
    const gameResult = determineWinner(playerChoice, botChoice);
    
    setPlayerChoice(playerChoice);
    setBotChoice(botChoice);
    setResult(gameResult);
    
    setScore(prev => ({
      ...prev,
      [gameResult === 'win' ? 'wins' : gameResult === 'tie' ? 'ties' : 'losses']: 
        prev[gameResult === 'win' ? 'wins' : gameResult === 'tie' ? 'ties' : 'losses'] + 1
    }));
  };

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors</h1>
      
      <div className="score-board">
        <div className="score-item wins">Wins: {score.wins}</div>
        <div className="score-item ties">Ties: {score.ties}</div>
        <div className="score-item losses">Losses: {score.losses}</div>
      </div>

      <div className="choices-container">
        <div className="choice-section">
          <h3>Your Choice</h3>
          <div className="choice-display">
            {playerChoice ? playerChoice.emoji : '❓'}
          </div>
        </div>
        
        <div className="vs">VS</div>
        
        <div className="choice-section">
          <h3>Bot's Choice</h3>
          <div className="choice-display">
            {botChoice ? botChoice.emoji : '❓'}
          </div>
        </div>
      </div>

      {result && (
        <div className={`result ${result}`}>
          {result === 'win' && '🎉 You Win!'}
          {result === 'tie' && '🤝 It\'s a Tie!'}
          {result === 'lose' && '🤖 Bot Wins!'}
        </div>
      )}

      <div className="buttons-container">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className="choice-button"
            onClick={() => playGame(choice)}
          >
            <span className="choice-emoji">{choice.emoji}</span>
            <span className="choice-name">{choice.name}</span>
          </button>
        ))}
      </div>
{(result === 'win' || result === 'lose') && (
      <div className="overlay-screen">
        <div className="overlay-content">
          {result === 'win' ? '🎉 You Win!' : '😢 You Lose!'}
          <button onClick={resetGame}>Play Again</button>
        </div>
      </div>
    )}
    </div>

    
  );

};

export default App;