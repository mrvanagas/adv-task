import type { ResultStatList, Spin, WheelConfiguration } from '@/types/models'

const fetchSpin = async (apiUrl: string, uuid: string): Promise<Spin> => {
  const response = await fetch(`${apiUrl}/game/${uuid}`)

  if (!response.ok) {
    throw new Error('Failed to fetch spin')
  }

  return response.json()
}

const fetchWheelConfiguration = async (apiUrl: string): Promise<WheelConfiguration> => {
  const response = await fetch(`${apiUrl}/configuration`)
  if (!response.ok) {
    throw new Error('Failed to fetch wheel configuration')
  }
  return response.json()
}

const fetchStatistics = async (apiUrl: string, limit?: number): Promise<ResultStatList[]> => {
  const response = await fetch(`${apiUrl}/stats?limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch stats')
  }
  return response.json()
}

const fetchNextGame = async (apiUrl: string): Promise<Spin> => {
  const response = await fetch(`${apiUrl}/nextGame`)
  if (!response.ok) {
    throw new Error('Failed to fetch next game')
  }
  return response.json()
}

async function fetchGameResult(apiUrl: string, instanceId: number): Promise<Spin> {
  let result: Spin

  do {
    const response = await fetch(`${apiUrl}/game/${instanceId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch game result')
    }
    result = await response.json()

    // Checks if startDelta is greater than 0, will retry if number is higher than 0
    if (result.startDelta > 0) {
      console.log(`Result not ready, retrying in ${result.startDelta} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, result.startDelta * 1000))
    }
  } while (result.startDelta > 0)

  return result
}

export const rouletteService = {
  fetchSpin,
  fetchWheelConfiguration,
  fetchStatistics,
  fetchNextGame,
  fetchGameResult
}
