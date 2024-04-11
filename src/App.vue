<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApiInput from './components/ApiInput.vue'
import EventLog from './components/EventLog.vue'
import GameEvents from './components/GameEvents.vue'
import RouletteWheel from './components/RouletteWheel.vue'
import SpinStatistics from './components/SpinStatistics.vue'
import { useApiStore } from './stores/apiStore'
import { rouletteService } from './services/rouletteService'
import type { WheelConfiguration } from './types/models'

const apiStore = useApiStore()
const wheelConfiguration = ref<WheelConfiguration | null>(null)

onMounted(async () => {
  try {
    wheelConfiguration.value = await rouletteService.fetchWheelConfiguration(apiStore.apiUrl)
  } catch (error) {
    console.error('Failed to fetch wheel configuration:', error)
  }
})
</script>

<template>
  <main class="container">
    <div class="api-input">
      <ApiInput />
    </div>
    <div class="wheel-and-stats">
      <RouletteWheel :wheelConfiguration="wheelConfiguration" />
      <SpinStatistics :wheelConfiguration="wheelConfiguration" />
    </div>
    <div class="logs">
      <GameEvents />
      <EventLog />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-areas:
    'apiInput'
    'wheelStats'
    'logs';
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.api-input {
  grid-area: apiInput;
}

.wheel-and-stats {
  display: grid;
  grid-template-columns: 1fr;
  grid-area: wheelStats;
  gap: 20px;
}

.logs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-area: logs;
  gap: 20px;
}
</style>
