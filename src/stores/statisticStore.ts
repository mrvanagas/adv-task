import { defineStore } from 'pinia';
import { rouletteService } from '@/services/rouletteService';
import type { ResultStatList } from '@/types/models';
import { useApiStore } from '@/stores/apiStore';

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    statistics: [] as ResultStatList[],
    isLoading: false,
    error: null as Error | null
  }),

  actions: {
    async loadStatistics() {
      this.isLoading = true;
      this.error = null;
      try {
        const ApiStore = useApiStore();
        const stats = await rouletteService.fetchStatistics(ApiStore.apiUrl, 200);
        this.statistics = stats;
      } catch (error) {
        console.error('Error fetching statistics:', error);
        this.error = error as Error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
