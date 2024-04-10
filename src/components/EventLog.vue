<template>
  <h2>Event Log</h2>
  <div class="logger-component">
    <textarea v-model="logMessages" rows="10" readonly></textarea>
  </div>
</template>

<script setup lang="ts">
import { addLogEntry, logEntries } from '@/services/logService'
import { computed, onMounted } from 'vue'

const logMessages = computed(() => logEntries.value.join('\n'))

onMounted(() => {
  addLogEntry('App started')
})
</script>

<style scoped>
.logger-component textarea {
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
}
</style>
