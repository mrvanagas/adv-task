import type { ResultStatList, Spin, WheelConfiguration } from '@/types/models'

const BASE_URL = 'https://dev-games-backend.advbet.com/v1/ab-roulette'

const fetchSpin = async (wheelId: string, uuid: string): Promise<Spin> => {
  const response = await fetch(`${BASE_URL}/${wheelId}/game/${uuid}`)

  if (!response.ok) {
    throw new Error('Failed to fetch spin')
  }

  return response.json()
}

const fetchWheelConfiguration = async (wheelId: string): Promise<WheelConfiguration> => {
  const response = await fetch(`${BASE_URL}/${wheelId}/configuration`)
  if (!response.ok) {
    throw new Error('Failed to fetch wheel configuration')
  }
  return response.json()
}

const fetchStatistics = async (wheelId: string, limit?: number): Promise<ResultStatList[]> => {
  const response = await fetch(`${BASE_URL}/${wheelId}/stats?limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch stats')
  }
  return response.json()
}

export const rouletteService = {
  fetchSpin,
  fetchWheelConfiguration,
  fetchStatistics
}
