<template>
  <svg :style="{ width, height, background }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '#ffffff',
  },
  width: {
    type: String,
    default: '30px',
  },
  height: {
    type: String,
    default: '30px',
  },
  background: {
    type: String,
    default: 'rgba(128, 128, 128, 0.5)',
  },
})
</script>

<style scoped lang="scss"></style>
