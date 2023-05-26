<template>
  <div>
    <!-- <svg-icon name="people"></svg-icon>
    <svg-icon name="computer"></svg-icon>
    <svg-icon name="phone"></svg-icon>
    <svg-icon name="mail"></svg-icon>
    <svg-icon name="edit"></svg-icon>
    <svg-icon name="outlook"></svg-icon> -->
    <div class='top-block margin-top-10'>
      <select-vue name='selectedProduct' :selected='selectedInfo.selectedProduct' @transmit='handle'></select-vue>
      <switch-vue name='selectedRoleType' :selected='selectedInfo.selectedRoleType' @transmit='handle'> </switch-vue>
      <switch-vue name='selectedDateType' :tag='["Month", "Week"]' backgroundColor='lightblue' borderColor='blue'
        :selected='selectedInfo.selectedDateType' @transmit='handle'></switch-vue>
      <search-vue name='selectedHCP' :selected='selectedInfo.selectedHCP' @transmit='handle'> </search-vue>
    </div>
    <div class=' main-block margin-top-10'>
    </div>
  </div>
</template>

<script setup lang="ts">
import selectVue from '@/components/select.vue';
import searchVue from '@/components/search.vue';
import switchVue from '@/components/switch.vue';
import { ref } from 'vue';

const selectedInfo = ref({
  selectedProduct: '0',
  selectedRoleType: '1',
  selectedDateType: '0',
  selectedHCP: ''
})

const handle = (key: 'selectedProduct' | 'selectedRoleType' | 'selectedDateType' | 'selectedHCP', value: string) => {
  console.log(`hanle method running, key is ${key}, value is ${value}`)
  selectedInfo.value[key] = value
}

</script>

<style scoped lang="scss">
.top-block {
  background-color: #ffffff;
  width: 96%;
  margin-left: 2%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.top-block {
  div {
    &:first-child {
      background-color: $disable-background-color;
      border-radius: 5px;
      border: 0.5px solid lightgray;
    }
  }
}

.main-block {
  background-color: yellow;
  width: 96%;
  margin-left: 2%;
  height: 600px;
}
</style>
