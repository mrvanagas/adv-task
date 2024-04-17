import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import * as logService from '@/services/logService';
import EventLog from '../EventLog.vue';

vi.mock('@/services/logService', () => ({
  addLogEntry: vi.fn(() => {}),
  logEntries: { value: ['App started'] }
}));

describe('EventLog', () => {
  beforeEach(() => {
    logService.logEntries.value = ['App started'];
  });

  it('renders the component and shows the initial log', async () => {
    const wrapper = mount(EventLog);
    expect(wrapper.find('textarea').element.value).toContain('App started');
  });

  it('calls addLogEntry on component mount', () => {
    expect(logService.addLogEntry).toHaveBeenCalled();
    expect(logService.addLogEntry).toHaveBeenCalledWith('App started');
  });
});
