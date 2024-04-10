<template>
  <div>
    <div v-if="countdown > 0">Next game starts in: {{ countdown }} seconds</div>
    <div v-else-if="gameResult">Game result: {{ gameResult }}</div>
    <div v-else>Waiting for the next game...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { rouletteService } from '@/services/rouletteService'
import { useApiStore } from '@/stores/apiStore'

const countdown = ref(0)
const gameResult = ref(null)

onMounted(async () => {
  const apiStore = useApiStore()
  try {
    const nextGame = await rouletteService.fetchNextGame(apiStore.apiUrl)
    countdown.value = nextGame.fakeStartDelta

    const countdownInterval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownInterval)
      }
    }, 1000)
  } catch (err) {
    console.error(err)
  }
})
</script>
