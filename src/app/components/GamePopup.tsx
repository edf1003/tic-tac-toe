import React from 'react';

interface GamePopupProps {
  winner: string | null;
  isDraw: boolean;
  onNewGame: () => void;
}

export default function GamePopup({
  winner,
  isDraw,
  onNewGame,
}: GamePopupProps) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='glass-effect p-8 rounded-xl shadow-2xl transform scale-in fade-in max-w-md w-full mx-4'>
        <div className='text-center'>
          {isDraw ? (
            <h2 className='text-2xl font-bold mb-4 text-gradient'>¡Empate!</h2>
          ) : (
            <h2 className='text-2xl font-bold mb-4 text-gradient'>
              ¡{winner} ha ganado!
            </h2>
          )}
          <button
            onClick={onNewGame}
            className='mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg
                                hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105
                                transition-all duration-200 text-white font-semibold'
          >
            Nueva Partida
          </button>
        </div>
      </div>
    </div>
  );
}
