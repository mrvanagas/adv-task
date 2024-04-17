<template>
  <div>
    <ul>
      <li v-for="(gameResult, index) in gameResults" :key="index">
        Game ID: {{ gameResult.id }}, Result: {{ gameResult.result }}
      </li>
    </ul>
    <div>{{ countdownMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { rouletteService } from '@/services/rouletteService';
import { useApiStore } from '@/stores/apiStore';
import type { GameResult } from '@/types/models';
import { addLogEntry } from '@/services/logService';
import { useStatisticsStore } from '@/stores/statisticStore';

const countdown = ref(0);
const gameResults = ref<GameResult[]>([]);
const statisticsStore = useStatisticsStore(); // Use your statistics store
const apiStore = useApiStore();

const countdownMessage = computed(() => {
  if (countdown.value > 0) {
    return `Next game starts in: ${countdown.value} seconds`;
  } else {
    return 'Waiting for the next game...';
  }
});

async function startGameCycle() {
  try {
    const nextGame = await rouletteService.fetchNextGame(apiStore.apiUrl);
    countdown.value = nextGame.fakeStartDelta;
    const gameId = nextGame.id;

    const countdownInterval = setInterval(async () => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(countdownInterval);

        const result = await rouletteService.fetchGameResult(apiStore.apiUrl, gameId);

        if (result && result.outcome) {
          gameResults.value.push({ id: gameId, result: result.outcome });
          await statisticsStore.loadStatistics();
          addLogEntry(`Game ${gameId} finished, result is ${result.outcome}`);
        }

        startGameCycle();
      }
    }, 1000);
  } catch (err) {
    console.error(err);
  }
}

// Initial start
onMounted(() => {
  startGameCycle();
});
</script>
