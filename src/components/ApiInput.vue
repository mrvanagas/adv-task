<template>
  <div>
    <div>API Input field</div>
    <input class="input" type="text" v-model="inputValue" placeholder="Enter API URL" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useApiStore } from '@/stores/apiStore';
import debounce from 'lodash/debounce';

const store = useApiStore();

const inputValue = computed({
  get: () => store.apiUrl,
  set: debounce((newValue: string) => {
    store.setApiUrl(newValue);
  }, 1000)
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
