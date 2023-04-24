<script setup lang="ts">
// This page controls position of elements
</script>

<template>
  <div class="chart">
    <header class="chart__header">
      <slot name="chart-population-header" />
    </header>

    <main class="chart__body">
      <slot name="chart-population-body" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  // .chart__header

  &__header {
  }

  // .chart__body

  &__body {
  }
}
</style>
