import { GameResult } from './models';

const STORAGE_KEY = 'tic-tac-toe-history';

export const saveGameResult = (result: GameResult) => {
  const history = getGameHistory();
  history.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getGameHistory = (): GameResult[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};
