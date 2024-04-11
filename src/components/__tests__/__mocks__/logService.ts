// tests/__mocks__/logService.ts
import { ref } from 'vue';

export const logEntries = ref<string[]>([]);

export function addLogEntry(message: string) {
  logEntries.value.push(message);
}
