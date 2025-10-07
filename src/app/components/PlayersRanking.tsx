import React from 'react';
import { GameResult } from '../../models/models';

interface RankingPlayer {
  name: string;
  wins: number;
  matches: number;
}

interface PlayersRankingProps {
  gameHistory: GameResult[];
}

export default function PlayersRanking({ gameHistory }: PlayersRankingProps) {
  const calculateRanking = (): RankingPlayer[] => {
    const playerStats = new Map<string, RankingPlayer>();

    gameHistory.forEach((game) => {
      game.players.forEach((player) => {
        if (!playerStats.has(player.name)) {
          playerStats.set(player.name, {
            name: player.name,
            wins: 0,
            matches: 0,
          });
        }
        const stats = playerStats.get(player.name)!;
        stats.matches++;
        if (game.winner?.name === player.name) {
          stats.wins++;
        }
      });
    });

    return Array.from(playerStats.values()).sort((a, b) => {
      // Primero ordenar por número de victorias
      const winsDiff = b.wins - a.wins;
      if (winsDiff !== 0) return winsDiff;
      
      // Si tienen las mismas victorias, ordenar por menor número de partidas
      return a.matches - b.matches;
    });
  };

  const ranking = calculateRanking();

  return (
    <div className='w-full max-w-md mx-auto mt-8'>
      <h3 className='text-2xl font-bold mb-10 text-gradient justify-self-center'>
        Ranking de Jugadores
      </h3>
      <div className='flex justify-center items-end space-x-4'>
        {ranking.slice(0, 3).map((player, index) => (
          <div
            key={player.name}
            className={`flex flex-col items-center ${index === 1 ? '' : ''}`}
            style={{
              height: index === 1 ? '115px' : index === 0 ? '130px' : '100px',
            }}
          >
            <div className='relative w-full'>
              <div
                className={`glass-effect rounded-t-lg p-4 text-center h-full
                                        ${
                                          index === 0
                                            ? 'podium-1'
                                            : index === 1
                                            ? 'podium-2'
                                            : 'podium-3'
                                        }`}
              >
                <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl'>
                  {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                </div>
                <p className='font-bold text-sm'>{player.name}</p>
                <p className='text-xs text-cyan-400'>{player.wins} victorias</p>
                <p className='text-xs text-gray-400'>
                  {player.matches} partidas
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ranking.slice(3).map((player, index) => (
        <div
          key={player.name}
          className='glass-effect p-4 mb-2 rounded-lg flex justify-between items-center'
        >
          <div className='flex items-center'>
            <span className='text-gray-400 mr-4'>#{index + 4}</span>
            <span className='font-medium'>{player.name}</span>
          </div>
          <div className='text-sm'>
            <span className='text-cyan-400 mr-2'>{player.wins} victorias</span>
            <span className='text-gray-400'>({player.matches} partidas)</span>
          </div>
        </div>
      ))}
    </div>
  );
}
