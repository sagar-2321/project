import React, { useState } from 'react';
import InputForm from './InputForm';
import Confetti from 'react-confetti';

const Scorecard = () => {
  const [scores, setScores] = useState([]);
  const [numPlayers, setNumPlayers] = useState(0);
  const [numRounds, setNumRounds] = useState(0);
  const [showScorecard, setShowScorecard] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateRandomScores = (numPlayers, numRounds) => {
    const players = Array.from({ length: numPlayers }, (_, i) => `player${i + 1}`);
    const scores = Array.from({ length: numRounds }, () => {
      const roundScores = {};
      players.forEach(player => {
        roundScores[player] = Math.floor(Math.random() * 21); 
      });
      return roundScores;
    });
    return scores;
  };

  const generateScores = (numPlayers, numRounds) => {
    if (numPlayers <= 0 || numRounds <= 0) {
      setErrorMessage('Please enter valid number of players and rounds.');
      return;
    }
    setNumPlayers(numPlayers);
    setNumRounds(numRounds);
    setShowScorecard(false);
    const scores = generateRandomScores(numPlayers, numRounds);
    setScores(scores);
    setShowScorecard(true);
    setErrorMessage('');
  };

  const getRoundWinner = (score) => {
    let winner = 'Tie';
    let maxScore = -1;
    for (const [player, playerScore] of Object.entries(score)) {
      if (playerScore > maxScore) {
        maxScore = playerScore;
        winner = player;
      } else if (playerScore === maxScore) {
        winner = 'Tie';
      }
    }
    return winner;
  };

  const getOverallWinner = () => {
    const playerWins = {};
    scores.forEach(score => {
      const winner = getRoundWinner(score);
      if (winner !== 'Tie') {
        playerWins[winner] = (playerWins[winner] || 0) + 1;
      }
    });
    let maxWins = -1;
    let overallWinner = 'Tie';
    for (const [player, wins] of Object.entries(playerWins)) {
      if (wins > maxWins) {
        maxWins = wins;
        overallWinner = player;
      } else if (wins === maxWins) {
        overallWinner = 'Tie';
      }
    }
    return overallWinner;
  };

  return (
    <div>
      
      <InputForm onGenerate={generateScores} />
      <h2>Scorecard</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {showScorecard && (
        <>
          <h3>Round Winners</h3>
          <ul>
            {scores.map((score, index) => (
              <li key={index}>
                Round {index + 1} - Winner: {getRoundWinner(score)}
              </li>
            ))}
          </ul>
          <h3>Overall Winner</h3>
          <p>{getOverallWinner() }</p>
          <Confetti/>
          
        </>
      )}
    </div>
  );
};

export default Scorecard;