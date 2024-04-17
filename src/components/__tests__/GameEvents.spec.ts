import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import GameEvents from '../GameEvents.vue';

vi.mock('@/services/rouletteService', () => ({
  fetchNextGame: vi.fn(() => Promise.resolve({ fakeStartDelta: 5, id: '123', outcome: 'win' })),
  fetchGameResult: vi.fn(() => Promise.resolve({ id: '123', result: 'win' }))
}));

vi.mock('@/services/logService', () => ({
  addLogEntry: vi.fn()
}));

vi.mock('@/stores/apiStore', () => ({
  useApiStore: vi.fn(() => ({ apiUrl: 'https://api.example.com' }))
}));

describe('GameEvents', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('render countdown message correctly', async () => {
    const wrapper = mount(GameEvents, {
      global: {
        plugins: [createPinia()]
      }
    });

    expect(wrapper.text()).toContain('Waiting for the next game...');
  });
});
