<script setup lang="ts">
const props = defineProps<{
  contentData: number
}>()
</script>

<template>
  <div class="chart-population-body-row__content" :style="{ width: `${props.contentData}%` }"></div>
</template>

<style lang="scss" scoped>
.chart-population-body-row {
  // .chart-population-body-row__content

  &__content {
    transition: width 1s ease-in-out;
    height: 30px;
    color: orange;
    padding: 10px;
    background-color: var(--zinc-900);
  }
}
</style>
