import type { ResultStatList, Spin, WheelConfiguration } from '@/types/models'

const fetchSpin = async (apiUrl: string, wheelId: string, uuid: string): Promise<Spin> => {
  const response = await fetch(`${apiUrl}/${wheelId}/game/${uuid}`)

  if (!response.ok) {
    throw new Error('Failed to fetch spin')
  }

  return response.json()
}

const fetchWheelConfiguration = async (
  apiUrl: string,
  wheelId: string
): Promise<WheelConfiguration> => {
  const response = await fetch(`${apiUrl}/${wheelId}/configuration`)
  if (!response.ok) {
    throw new Error('Failed to fetch wheel configuration')
  }
  return response.json()
}

const fetchStatistics = async (
  apiUrl: string,
  wheelId: string,
  limit?: number
): Promise<ResultStatList[]> => {
  const response = await fetch(`${apiUrl}/${wheelId}/stats?limit=${limit}`)
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
