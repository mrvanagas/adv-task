import { addLogEntry } from '@/services/logService';

export async function fetchWithRetry(
  url: string,
  maxAttempts: number = 5,
  retryDelayMs: number = 10000
): Promise<Response> {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Response not OK');
      return response;
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) throw error;
      addLogEntry(`Fetch attempt ${attempt} failed, retrying in ${retryDelayMs}ms...`);
      console.error(`Fetch attempt ${attempt} failed, retrying in ${retryDelayMs}ms...`);

      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  }
  throw new Error('Fetch with retry failed');
}
