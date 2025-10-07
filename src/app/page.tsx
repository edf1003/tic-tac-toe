'use client';

import { useState, useEffect } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import PlayerForm from './components/PlayerForm';
import GamePopup from './components/GamePopup';
import PlayersRanking from './components/PlayersRanking';
import { Player, GameResult } from '../models/models';
import { saveGameResult, getGameHistory } from '../models/storage';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [players, setPlayers] = useState<[Player, Player] | null>(null);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setGameHistory(getGameHistory());
  }, []);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    const isDraw = !winner && newBoard.every((cell) => cell !== null);

    if ((winner || isDraw) && players) {
      const result: GameResult = {
        winner: winner ? players[winner === 'X' ? 0 : 1] : null,
        date: new Date().toLocaleString(),
        players: players,
      };
      saveGameResult(result);
      setGameHistory([result, ...gameHistory]);
      setShowPopup(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowPopup(false);
  };

  const calculateWinner = (board: (string | null)[]) => {
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

  if (!players) {
    return (
      <div className='min-h-screen flex justify-center items-center p-4'>
        <div className='absolute inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20' />
        </div>
        <PlayerForm onPlayersSubmit={setPlayers} gameHistory={gameHistory} />
      </div>
    );
  }

  return (
    <div className='min-h-screen text-white relative overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20' />
      </div>
      <div className='container mx-auto px-4 py-8 relative z-10'>
        <h1 className='text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
          Tic Tac Toe
        </h1>
        <div className='flex flex-col items-center'>
          <h2 className='text-xl mb-4'>
            {winner
              ? `Ganador: ${players[winner === 'X' ? 0 : 1].name}`
              : `Turno de: ${players[isXNext ? 0 : 1].name}`}
          </h2>

          <div className='grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto'>
            {board.map((cell, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`w-24 h-24 rounded-xl flex items-center justify-center cursor-pointer
                          board-cell ${
                            cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''
                          }`}
              >
                {cell === 'X' ? (
                  <ImCross className='text-5xl piece-animation' />
                ) : cell === 'O' ? (
                  <FaRegCircle className='text-5xl piece-animation' />
                ) : null}
              </div>
            ))}
          </div>

          {winner && (
            <button
              onClick={resetGame}
              className='px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold
                      transition-colors duration-200'
            >
              Nuevo Juego
            </button>
          )}

          {gameHistory.length > 0 && (
            <PlayersRanking gameHistory={gameHistory} />
          )}
        </div>
      </div>
      {showPopup && (
        <GamePopup
          winner={winner ? players[winner === 'X' ? 0 : 1].name : null}
          isDraw={!winner && board.every((cell) => cell !== null)}
          onNewGame={resetGame}
        />
      )}
    </div>
  );
}

