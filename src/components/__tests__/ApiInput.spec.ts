import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ApiInput from '../ApiInput.vue'
import { useApiStore } from '@/stores/apiStore'

vi.mock('lodash', () => ({
  debounce: (fn: Function) => fn,
  __esModule: true,
}))

describe('ApiInput', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const apiStore = useApiStore()
    apiStore.$reset()
  })

  it('updates the store apiUrl after input', async () => {
    const wrapper = mount(ApiInput, {
      global: {
        plugins: [createPinia()],
      },
    });
    
    await wrapper.find('input').setValue('https://dev-games-backend.advbet.com/v1/ab-roulette/1');
  
    // Directly accessing the store after input value change
    const apiStore = useApiStore();
    expect(apiStore.apiUrl).toBe('https://dev-games-backend.advbet.com/v1/ab-roulette/1');
  });
})
