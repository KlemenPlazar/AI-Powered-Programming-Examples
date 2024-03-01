import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

const apiBaseUrl = 'http://localhost:3000/game';

function App() {
  const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/board`);
      setBoard(response.data.split('\n').map(row => row.split('|')));
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const makeMove = async (x, y) => {
    if (gameOver || board[x][y] === 'X' || board[x][y] === 'O') return;

    try {
      await axios.post(`${apiBaseUrl}/move`, { x, y });
      fetchBoard();
      checkWin();
      checkDraw();
      togglePlayer();
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  const checkWin = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/check-win`);
      if (response.data) {
        alert(`${currentPlayer} Wins!`);
        setGameOver(true);
      }
    } catch (error) {
      console.error('Error checking win:', error);
    }
  };

  const checkDraw = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/check-draw`);
      if (response.data) {
        alert(`It's a draw!`);
        setGameOver(true);
      }
    } catch (error) {
      console.error('Error checking draw:', error);
    }
  };

  const resetGame = async () => {
    try {
      await axios.post(`${apiBaseUrl}/reset`);
      fetchBoard();
      setCurrentPlayer('X');
      setGameOver(false);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((row, x) => (
          <div key={x} className="board-row">
            {row.map((cell, y) => (
              <button key={y} className="cell" onClick={() => makeMove(x, y)}>
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {renderBoard()}
      <button onClick={resetGame} disabled={gameOver}>Reset Game</button>
    </div>
  );
}

export default App;
