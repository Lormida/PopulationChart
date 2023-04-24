<script setup lang="ts">
const props = defineProps<{
  populationAmount: number
}>()
</script>

<template>
  <p>{{ props.populationAmount }}</p>
</template>

<style lang="scss" scoped></style>
