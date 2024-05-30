import React, { useState } from 'react';

const InputForm = ({ onGenerate }) => {
  const [numPlayers, setNumPlayers] = useState('');
  const [numRounds, setNumRounds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(parseInt(numPlayers), parseInt(numRounds));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Number of Players:
          <input
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Number of Rounds:
          <input
            type="number"
            value={numRounds}
            onChange={(e) => setNumRounds(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Generate Scores</button>
    </form>
  );
};

export default InputForm;
