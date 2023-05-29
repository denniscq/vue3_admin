<template>
  <div style="z-index: 2" @mouseover="overEvent" @mouseout="outEvent">
    <svg :style="{ width, height, background }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
    <span v-show="isShow && toolTip" class="toolTip">{{ toolTip }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'

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
  toolTip: {
    type: String,
    default: '',
  },
})

/**
 * @description trigger tooltip show
 */
const isShow: Ref<boolean> = ref(false)
const overEvent = () => {
  isShow.value = true
}

const outEvent = () => {
  isShow.value = false
}
</script>

<style scoped lang="scss">
.toolTip {
  position: absolute;
  top: -40px;
  left: -3px;
  width: 120px;
  line-height: 40px;
  text-align: center;
  background: grey;
  color: #ffffff;
  border-radius: 10px;
}
</style>
