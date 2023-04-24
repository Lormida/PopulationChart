<script setup lang="ts">
const props = defineProps<{
  contentData: number
}>()
</script>

<template>
  <div :style="{ width: `${contentData}%` }" class="content"></div>
</template>

<style lang="scss" scoped>
.content {
  transition: width 1s ease-in-out;
  height: 30px;
  color: orange;
  padding: 10px;
  background-color: var(--zinc-900);
}
</style>
