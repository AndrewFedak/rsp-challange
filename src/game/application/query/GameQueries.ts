import { FindGameByIdResult } from './FindGameByIdResult';

export const GAME_QUERIES_TOKEN = 'GAME_QUERIES_TOKEN';

export interface IGameQueries {
  getById: (id: string) => Promise<FindGameByIdResult | null>;
}
