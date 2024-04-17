import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: 'https://dev-games-backend.advbet.com/v1/ab-roulette/1'
  }),
  actions: {
    setApiUrl(newUrl: string) {
      this.apiUrl = newUrl;
    }
  }
});
