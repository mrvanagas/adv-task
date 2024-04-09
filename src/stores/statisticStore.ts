import { defineStore } from 'pinia'
import { rouletteService } from '@/services/rouletteService'
import type { ResultStatList } from '@/types/models'
import { useApiStore } from '@/stores/apiStore'

const ApiStore = useApiStore()

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    statistics: [] as ResultStatList[]
  }),

  actions: {
    async loadStatistics(wheelID: string) {
      try {
        const stats = await rouletteService.fetchStatistics(ApiStore.apiUrl, wheelID)
        this.statistics = stats
      } catch (error) {
        console.error('Error fetching statistics:', error)
      }
    }
  }
})
