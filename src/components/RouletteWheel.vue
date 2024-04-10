<template>
  <div class="roulette-wheel" v-if="wheelConfiguration">
    <div
      v-for="positionId in wheelConfiguration.positionToId"
      :key="positionId"
      class="slot"
      :style="{ backgroundColor: getColor(positionId) }"
    >
      {{ getResult(positionId) }}
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type { WheelConfiguration } from '../types/models'

import { useApiStore } from '@/stores/apiStore'
import { rouletteService } from '../services/rouletteService'

export default defineComponent({
  name: 'RouletteWheel',
  setup() {
    const wheelConfiguration = ref<WheelConfiguration | null>(null)
    const loading = ref(true)
    const error = ref<string | null>(null)
    const ApiStore = useApiStore()

    onMounted(async () => {
      try {
        wheelConfiguration.value = await rouletteService.fetchWheelConfiguration(
          ApiStore.apiUrl
        )
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      } finally {
        loading.value = false
      }
    })

    const getColor = (positionId: number) => {
      return wheelConfiguration.value?.colors[positionId]
    }

    const getResult = (positionId: number) => {
      return wheelConfiguration.value?.results[positionId]
    }

    return { wheelConfiguration, loading, error, getColor, getResult }
  }
})
</script>

<style scoped>
.roulette-wheel {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 10px;
  max-width: 900px;
  margin: auto;
}

.slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.red {
  background-color: red;
}
.black {
  background-color: black;
}
.green {
  background-color: green;
}
</style>
