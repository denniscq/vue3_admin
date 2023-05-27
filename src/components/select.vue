<template>
  <div>
    <span
      :class="{
        isSelected: selected == '0',
      }"
      @click="select('0')"
    >
      ALL Products
    </span>
    <span
      :class="{
        isSelected: selected == '1',
      }"
      @click="select('1')"
    >
      Erileads
    </span>
    <span
      :class="{
        isSelected: selected == '2',
      }"
      @click="select('2')"
    >
      Zytiga
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['selected', 'name'])
const $emit = defineEmits(['transmit'])
const select = (value: string) => {
  $emit('transmit', props.name, value)
}
</script>

<style scoped>
span {
  line-height: 40px;
  width: 120px;
  display: inline-block;
  text-align: center;
  color: grey;
  cursor: pointer;
}

.isSelected {
  background-color: lightblue;
  color: blue;
  border: 1px solid blue;
  border-radius: 5px;
}
</style>
