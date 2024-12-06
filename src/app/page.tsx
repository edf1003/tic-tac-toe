'use client';

import { useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const calculateWinner = (board: number[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '30px' }} className='mt-5'>
        Tic Tac Toe
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '30px',
        }}
      >
        <h2>
          {winner
            ? `Ganador: ${winner}`
            : `Siguiente jugador: ${isXNext ? 'X' : 'O'}`}
        </h2>
        <div className='board'>
          {board.map((cell, index) => (
            <div
              key={index}
              className='cell'
              onClick={() => handleClick(index)}
            >
              {cell === 'X' ? (
                <ImCross style={{ color: 'red', fontSize: '50px' }} />
              ) : cell === 'O' ? (
                <FaRegCircle style={{ color: 'green', fontSize: '50px' }} />
              ) : null}
            </div>
          ))}
        </div>
        {winner && (
          <button
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: 'grey',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={resetGame}
          >
            Reiniciar
          </button>
        )}
      </div>
      <style jsx>{`
        .board {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          grid-template-rows: repeat(3, 100px);
          gap: 10px;
          margin-top: 20px;
        }

        .cell {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          background-color: #f0f0f0;
          border: 2px solid #333;
          border-radius: 10px;
          cursor: pointer;
          font-size: 50px;
        }

        .cell:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
}

