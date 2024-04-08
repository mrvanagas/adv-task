<template>
  <div>
    <h2>Statistics (last 200 spins)</h2>
    <table class="statistics-table">
      <thead>
        <tr>
          <th></th>
          <th colspan="5">Cold</th>
          <th colspan="27">Neutral</th>
          <th colspan="5">Hot</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Slot</td>
          <td
            v-for="number in coldNumbers"
            :key="`cold-${number.result}`"
            :style="{ backgroundColor: getColor(number.result) }"
          >
            {{ number.result }}
          </td>
          <td
            v-for="number in neutralNumbers"
            :key="`neutral-${number.result}`"
            :style="{ backgroundColor: getColor(number.result) }"
          >
            {{ number.result }}
          </td>
          <td
            v-for="number in hotNumbers"
            :key="`hot-${number.result}`"
            :style="{ backgroundColor: getColor(number.result) }"
          >
            {{ number.result }}
          </td>
        </tr>
        <tr>
          <td>Hits</td>
          <td v-for="number in coldNumbers" :key="`cold-hits-${number.result}`">
            {{ number.count }}
          </td>
          <td v-for="number in neutralNumbers" :key="`neutral-hits-${number.result}`">
            {{ number.count }}
          </td>
          <td v-for="number in hotNumbers" :key="`hot-hits-${number.result}`">
            {{ number.count }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script script lang="ts">
import { ref, onMounted } from 'vue'
import { rouletteService } from '@/services/rouletteService'
import type { ResultStatList, WheelConfiguration } from '@/types/models'

export default {
  name: 'SpinStatistics',
  setup() {
    const wheelConfiguration = ref<WheelConfiguration | null>(null)
    const statistics = ref<ResultStatList[]>([])
    const coldNumbers = ref<ResultStatList[]>([])
    const neutralNumbers = ref<ResultStatList[]>([])
    const hotNumbers = ref<ResultStatList[]>([])

    const fetchConfiguration = async () => {
      try {
        wheelConfiguration.value = await rouletteService.fetchWheelConfiguration('1')
      } catch (error) {
        console.error('Error fetching wheel configuration:', error)
      }
    }

    const fetchStatistics = async () => {
      try {
        const stats = await rouletteService.fetchStatistics('1', 200)
        statistics.value = stats.sort((a, b) => a.count - b.count)

        const totalNumbers = statistics.value.length
        coldNumbers.value = statistics.value.slice(0, 5)
        hotNumbers.value = statistics.value.slice(-5)
        neutralNumbers.value = statistics.value.slice(5, totalNumbers - 5)
      } catch (error) {
        console.error('Error fetching statistics:', error)
      }
    }

    onMounted(async () => {
      await fetchConfiguration()
      await fetchStatistics()
    })

    const getColor = (positionId: number) => {
      return wheelConfiguration.value?.colors[positionId]
    }

    return { coldNumbers, neutralNumbers, hotNumbers, getColor }
  }
}
</script>

<style scoped>
.statistics-table {
  max-width: 900px;
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.statistics-table th,
.statistics-table td {
  padding: 8px;
  border: 1px solid #ddd;
}
.statistics-table th {
  background-color: #f2f2f2;
}
.statistics-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
.hot {
  background-color: #ff6868;
}
.neutral {
  background-color: #fff;
}
.cold {
  background-color: #68b3ff;
}
</style>
