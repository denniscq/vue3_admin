<template>
  <div class="search-block">
    <svg-Icon
      name="search"
      color="blue"
      background="#ffffff"
      style="position: absolute"
    ></svg-Icon>
    <input
      placeholder="Search HCP / HCO"
      :value="selected"
      @input="handleInput"
      @focus="
        () => {
          isShow = validHPCs.length > 0
        }
      "
      ref="inputSearch"
    />
    <div v-show="isShow">
      <p
        v-for="(item, index) in validHPCs"
        :key="index"
        @click="handleClick(item)"
      >
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

const props = defineProps({
  name: String,
  selected: String,
  HCPs: Array<String>,
})
const $emit = defineEmits(['transmit'])
const inputSearch = ref({ value: '' })
const validHPCs = ref(new Array())
const isShow = ref(false)

let timer: number
const handleInput = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    nextTick(() => {
      if (props.HCPs) {
        validHPCs.value = inputSearch.value.value
          ? props.HCPs.filter((p) => p.indexOf(inputSearch.value.value) > -1)
          : []
        isShow.value = validHPCs.value.length > 0
        $emit('transmit', props.name, inputSearch.value.value)
      }
    })
  }, 800)
}

const handleClick = (value: string) => {
  validHPCs.value = []
  isShow.value = validHPCs.value.length > 0
  $emit('transmit', props.name, value)
}

onMounted(() => {
  window.addEventListener('click', (e) => {
    const el = document.querySelector('.search-block') as any
    if (!el.contains(e.target)) {
      isShow.value = false
    }
  })
})
</script>

<style scoped lang="scss">
.search-block {
  position: relative;
  color: grey;
  width: 360px;
  border-width: 0 0 1px 0;
  border-style: solid;

  & > input {
    border-width: 0;
    width: 330px;
    margin-left: 30px;
    line-height: 30px;
  }

  & > div {
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    top: 35px;
    z-index: 1;
    border-radius: 5px;

    & > p {
      width: 100%;
      line-height: 30px;
      padding-left: 10px;
      cursor: pointer;

      &:hover {
        background-color: blue;
        color: #ffffff;
      }
    }
  }
}
</style>
