import { defineStore } from 'pinia';
import { rouletteService } from '@/services/rouletteService';
import type { ResultStatList } from '@/types/models';

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    statistics: [] as ResultStatList[],
  }),

  actions: {
    async loadStatistics(wheelID: string) {
      try {
        const stats = await rouletteService.fetchStatistics(wheelID);
        this.statistics = stats;
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    },
  },
});