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
        <tr class="number-color">
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

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStatisticsStore } from '@/stores/statisticStore';
import type { WheelConfiguration, ResultStatList } from '@/types/models';

const props = defineProps<{
  wheelConfiguration: WheelConfiguration | null;
}>();

const statStore = useStatisticsStore();

onMounted(() => {
  statStore.loadStatistics();
});

const sortedStatistics = computed(() => {
  return [...statStore.statistics].sort((a, b) => a.count - b.count);
});

const coldNumbers = computed<ResultStatList[]>(() => sortedStatistics.value.slice(0, 5));
const neutralNumbers = computed<ResultStatList[]>(() =>
  sortedStatistics.value.slice(5, sortedStatistics.value.length - 5)
);
const hotNumbers = computed<ResultStatList[]>(() => sortedStatistics.value.slice(-5));

const getColor = (positionId: number): string | undefined => {
  return props.wheelConfiguration?.colors[positionId];
};
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
.number-color {
  color: #ffffff;
}
</style>
