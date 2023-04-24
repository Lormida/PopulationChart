<script setup lang="ts">
const props = defineProps<{
  country: string
}>()
</script>

<template>
  <p class="country">{{ props.country }}</p>
</template>

<style lang="scss" scoped>
.country {
  font-size: 16px;
  font-weight: 500;
  min-width: 200px;
  width: min-content;
}
</style>
