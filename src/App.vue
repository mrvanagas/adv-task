<script setup lang="ts">
import ApiInput from './components/ApiInput.vue'
import GameEvents from './components/GameEvents.vue';
import RouletteWheel from './components/RouletteWheel.vue'
import SpinStatistics from './components/SpinStatistics.vue'
</script>

<template>
  <main class="container">
    <ApiInput />
    <RouletteWheel />
    <SpinStatistics />
    <GameEvents />
  </main>
</template>

<style scoped></style>
