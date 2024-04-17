import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RouletteWheel from '../RouletteWheel.vue';

describe('RouletteWheel', () => {
  it('renders correctly with wheelConfiguration', async () => {
    // Mock wheelConfiguration
    const wheelConfiguration = {
      name: 'Example Wheel',
      slots: 3,
      positionToId: [0, 1, 2],
      colors: ['red', 'black', 'green'] as ('red' | 'black' | 'green')[],
      results: ['32', '15', '0']
    };

    const wrapper = mount(RouletteWheel, {
      props: { wheelConfiguration }
    });

    // Expect the component to be displayed (not the loading state)
    expect(wrapper.find('.roulette-wheel').exists()).toBe(true);

    // Check if all slots are rendered
    const slots = wrapper.findAll('.slot');
    expect(slots).toHaveLength(wheelConfiguration.positionToId.length);

    // Check if colors and results are correctly applied
    for (let i = 0; i < wheelConfiguration.positionToId.length; i++) {
      const slot = slots.at(i);
      expect(slot?.text()).toContain(wheelConfiguration.results[i]);
      expect(slot?.attributes('style')).toContain(
        `background-color: ${wheelConfiguration.colors[i]}`
      );
    }
  });

  it('shows loading state when wheelConfiguration is null', () => {
    const wrapper = mount(RouletteWheel, {
      props: { wheelConfiguration: null }
    });

    // Expect the loading state to be displayed
    expect(wrapper.text()).toContain('Loading...');
  });
});
