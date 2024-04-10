<template>
  <div>
    <ul>
      <li v-for="(gameResult, index) in gameResults" :key="index">
        Game ID: {{ gameResult.id }}, Result: {{ gameResult.result }}
      </li>
    </ul>
    <div v-if="countdown > 0">Next game starts in: {{ countdown }} seconds</div>
    <div v-else>Waiting for the next game...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { rouletteService } from '@/services/rouletteService'
import { useApiStore } from '@/stores/apiStore'
import type { GameResult } from '@/types/models'

const countdown = ref(0)
const gameResults = ref<GameResult[]>([])

const apiStore = useApiStore()

async function startGameCycle() {
  try {
    const nextGame = await rouletteService.fetchNextGame(apiStore.apiUrl)
    countdown.value = nextGame.fakeStartDelta
    const gameId = nextGame.id

    const countdownInterval = setInterval(async () => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownInterval)

        const result = await rouletteService.fetchGameResult(apiStore.apiUrl, gameId)
        console.log('Game result:', result)

        if (result && result.outcome) {
          gameResults.value.push({ id: gameId, result: result.outcome })
        }

        startGameCycle()
      }
    }, 1000)
  } catch (err) {
    console.error(err)
  }
}

// Initial start
onMounted(() => {
  startGameCycle()
})
</script>