import { useState } from 'react';
import { Player, GameResult } from '../../models/models';
import PlayersRanking from './PlayersRanking';

interface PlayerFormProps {
  onPlayersSubmit: (players: [Player, Player]) => void;
  gameHistory: GameResult[];
}

export default function PlayerForm({
  onPlayersSubmit,
  gameHistory,
}: PlayerFormProps) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1 && player2) {
      onPlayersSubmit([
        { name: player1, symbol: 'X' },
        { name: player2, symbol: 'O' },
      ]);
    }
  };

  return (
    <div className='relative z-10 flex flex-col items-center space-y-8 max-w-4xl w-full mx-auto'>
      <div className='flex flex-col md:flex-row gap-8 w-full items-start'>
        <div className='flex-1 w-full md:w-auto'>
          <div className='relative z-10 flex flex-col items-center space-y-6 p-10 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl w-full'>
            <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
              Jugadores
            </h2>
            <form onSubmit={handleSubmit} className='space-y-6 w-full max-w-md'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/80'>
                  Jugador 1 (X)
                </label>
                <input
                  type='text'
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  placeholder='Ingresa el nombre'
                  className='w-full p-3 rounded-lg bg-white/5 text-white border border-white/10 focus:border-blue-400 outline-none
                                             transition-all duration-200 placeholder-white/30'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-white/80'>
                  Jugador 2 (O)
                </label>
                <input
                  type='text'
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  placeholder='Ingresa el nombre'
                  className='w-full p-3 rounded-lg bg-white/5 text-white border border-white/10 focus:border-purple-400 outline-none
                                             transition-all duration-200 placeholder-white/30'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold
                                         transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
                                         shadow-lg shadow-blue-500/25'
              >
                Comenzar Juego
              </button>
            </form>
          </div>
        </div>
        {gameHistory.length > 0 && (
          <div className='flex-1 w-full md:w-auto fade-in'>
            <PlayersRanking gameHistory={gameHistory} />
          </div>
        )}
      </div>
    </div>
  );
}
