import { ref } from 'vue'

export const logEntries = ref<string[]>([])

export function addLogEntry(message: string): void {
  const timestamp = new Date().toISOString()
  logEntries.value.push(`[${timestamp}] ${message}`)
}
