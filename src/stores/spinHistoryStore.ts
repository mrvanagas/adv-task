import { defineStore } from 'pinia';
import type { GameResult } from '@/types/models';

export const useSpinHistoryStore = defineStore('spinHistory', {
  state: () => ({
    gameResults: [] as GameResult[]
  }),
  actions: {
    addGameResult(gameResult: GameResult) {
      const exists = this.gameResults.some((result) => result.id === gameResult.id);
      if (!exists) {
        this.gameResults.push(gameResult);
      }
    }
  }
});
