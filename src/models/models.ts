export interface Player {
  name: string;
  symbol: 'X' | 'O';
}

export interface GameResult {
  winner: Player | null;
  date: string;
  players: [Player, Player];
}
