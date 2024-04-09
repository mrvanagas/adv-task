<template>
  <div>
    <div>API Input field</div>
    <input class="input" type="text" v-model="inputValue" placeholder="Enter API URL" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useApiStore } from '@/stores/apiStore';
import debounce from 'lodash/debounce'


const store = useApiStore();
const inputValue = ref(store.apiUrl);

console.log("Component loaded.");

const debouncedSetApiUrl = debounce((newValue: string) => {
  console.log(`Debounced URL: ${newValue}`);
  store.setApiUrl(newValue);
}, 1000);

watch(inputValue, (newValue) => {
  console.log(`Input changed: ${newValue}`);
  debouncedSetApiUrl(newValue);
});
</script>

<style scoped>
.input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>