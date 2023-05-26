<template>
  <div>
    <span :style="{ color: selected !== '1' ? borderColor : 'grey' }">
      {{ tag[0] }}
    </span>
    <div class="d-switch" :class="{ isChecked: selected === '1' }">
      <input
        class="d-switch_input"
        ref="input"
        type="checkbox"
        :checked="selected === '1'"
        @change="handleInput"
      />
      <span
        class="d-switch_action"
        :style="{ backgroundColor, borderColor }"
      ></span>
    </div>
    <span :style="{ color: selected === '1' ? borderColor : 'grey' }">
      {{ tag[1] }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, nextTick, ref } from 'vue'

const props = defineProps({
  selected: {
    type: String,
  },
  name: {
    type: String,
  },
  backgroundColor: {
    type: String,
    default: 'rgba(128, 0, 128, 0.3)',
  },
  borderColor: {
    type: String,
    default: 'rgba(128, 0, 128, 0.5)',
  },
  tag: {
    type: Array,
    default: ['MY', 'ALL'],
  },
})
const $emit = defineEmits(['transmit'])
const input = ref()

const handleInput = () => {
  nextTick(() => {
    const value = input.value.checked ? '1' : '0'
    $emit('transmit', props.name, value)
  })
}
</script>

<style scoped lang="scss">
.d-switch {
  position: relative;
  height: 30px;
  width: 60px;
  background: $disable-background-color;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin: 0 10px;

  .d-switch_input {
    position: relative;
    z-index: 1;
    margin: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .d-switch_action {
    position: absolute;
    right: -100px;
    transition: 0.5s;
    z-index: 0;
    height: 28px;
    width: 28px;
    border-style: solid;
    border-width: 1px;
    border-radius: 50%;
    left: 0px;
  }
}

.isChecked {
  .d-switch_action {
    left: calc(100% - 28px);
  }
}
</style>
