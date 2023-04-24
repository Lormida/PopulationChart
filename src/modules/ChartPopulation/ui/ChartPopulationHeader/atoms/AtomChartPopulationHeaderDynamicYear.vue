<script setup lang="ts">
const props = defineProps<{
  currentYear: number
}>()
</script>

<template>
  <h1>{{ props.currentYear }}</h1>
</template>

<style lang="scss" scoped></style>
