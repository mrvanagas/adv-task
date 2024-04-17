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

<script setup lang="ts">
import { defineProps } from 'vue';
import type { WheelConfiguration } from '../types/models';

const props = defineProps<{
  wheelConfiguration: WheelConfiguration | null;
}>();

const getColor = (positionId: number) =>
  props.wheelConfiguration?.colors[positionId] ?? 'defaultColor';
const getResult = (positionId: number) =>
  props.wheelConfiguration?.results[positionId] ?? 'defaultResult';
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
