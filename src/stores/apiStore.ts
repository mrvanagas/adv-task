import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: 'https://dev-games-backend.advbet.com/v1/ab-roulette/'
  }),
  actions: {
    setApiUrl(newUrl: string) {
      this.apiUrl = newUrl;
      console.log(`API URL updated in store: ${newUrl}`);
    }
  }
});
