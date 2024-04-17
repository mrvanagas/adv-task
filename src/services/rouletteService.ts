import type { ResultStatList, Spin, WheelConfiguration } from '@/types/models';
import { addLogEntry } from './logService';
import { fetchWithRetry } from '@/helpers/fetchWithRetry';

const fetchWheelConfiguration = async (apiUrl: string): Promise<WheelConfiguration> => {
  addLogEntry('GET roulette configuration from API/configuration');
  const response = await fetchWithRetry(`${apiUrl}/configuration`);
  return response.json();
};

const fetchStatistics = async (apiUrl: string, limit?: number): Promise<ResultStatList[]> => {
  addLogEntry('GET roulette stats from API/stats?...');
  const url = `${apiUrl}/stats?limit=${limit}`;
  const response = await fetchWithRetry(url);
  return response.json();
};

const fetchNextGame = async (apiUrl: string): Promise<Spin> => {
  addLogEntry('GET next game from API/nextGame');
  const response = await fetchWithRetry(`${apiUrl}/nextGame`);
  return response.json();
};

async function fetchGameResult(apiUrl: string, instanceId: number): Promise<Spin> {
  addLogEntry('GET game results from API/game/...');
  let result: Spin;
  do {
    const url = `${apiUrl}/game/${instanceId}`;
    const response = await fetchWithRetry(url);
    result = await response.json();
    if (result.startDelta > 0) {
      addLogEntry(`Result not ready, retrying in ${result.startDelta} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, result.startDelta * 1000));
    }
  } while (result.startDelta > 0);
  return result;
}

export const rouletteService = {
  fetchWheelConfiguration,
  fetchStatistics,
  fetchNextGame,
  fetchGameResult
};
