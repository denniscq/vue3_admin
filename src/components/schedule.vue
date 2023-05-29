<template>
  <div class="schedule-block">
    <div
      class="schedule-unit"
      v-for=" in scheduleUnits"
      :style="{ width: scheduleUnit_width }"
    ></div>
    <svg-icon
      class="schedule_svg"
      v-for="scheduleItem in scheduleList"
      :key="scheduleItem.id"
      :name="scheduleItem.name"
      :style="{ left: scheduleItem.leftRate }"
      width="18px"
      height="18px"
      :background="scheduleItem.color"
      :toolTip="scheduleItem.toolTip"
    ></svg-icon>
    <svg-icon
      class="confirm_svg"
      v-for="(scheduleItem, index) in confirmList"
      :key="index"
      :name="scheduleItem.name"
      :style="{ left: scheduleItem.leftRate }"
      width="18px"
      height="18px"
      :background="scheduleItem.color"
      :toolTip="scheduleItem.toolTip"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { schedule } from '@/models/hcp_model'
import { Ref, ref } from 'vue'
const props = defineProps([
  'data',
  'periodStart',
  'periodEnd',
  'scheduleUnits',
  'scheduleUnit_width',
])

/**
 * @description setup object to display svg
 */
type item_type = {
  id: number
  name: string
  isDone: boolean
  leftRate: string
  color: string
  toolTip: string
}
const scheduleList: Ref<Array<item_type>> = ref([])
const confirmList: Ref<Array<item_type>> = ref([])
const initData = (list: schedule[]) => {
  const totalWide = props.periodEnd - props.periodStart
  list.forEach((item: schedule, index: number) => {
    const newScheduleObj: item_type = {
      id: index,
      name: item.category,
      isDone: false,
      leftRate: '',
      color: 'lightgreen',
      toolTip: '',
    }
    const newConfirmObj: item_type = {
      id: index,
      name: item.category,
      isDone: false,
      leftRate: '',
      color: '',
      toolTip: '',
    }
    const scheduleTimestamp = new Date(item.scheduleTime).getTime()
    const confirmTimestamp = new Date(item.confirmedTime).getTime()
    if (
      props.periodStart <= scheduleTimestamp &&
      scheduleTimestamp <= props.periodEnd
    ) {
      const rate: string = (
        (scheduleTimestamp - props.periodStart) /
        totalWide
      ).toFixed(6)
      newScheduleObj.leftRate = `${parseFloat(rate) * 100}%`
      const dataString = `${new Date(
        item.scheduleTime,
      ).toLocaleDateString()} ${new Date(
        item.scheduleTime,
      ).toLocaleTimeString()}`
      newScheduleObj.toolTip = dataString
      scheduleList.value.push(newScheduleObj)
    }
    if (
      props.periodStart <= confirmTimestamp &&
      confirmTimestamp <= props.periodEnd
    ) {
      newConfirmObj.isDone = true
      const rate: string = (
        (confirmTimestamp - props.periodStart) /
        totalWide
      ).toFixed(6)
      newConfirmObj.leftRate = `${parseFloat(rate) * 100}%`
      const dataString = `${new Date(
        item.confirmedTime,
      ).toLocaleDateString()} ${new Date(
        item.confirmedTime,
      ).toLocaleTimeString()}`
      newConfirmObj.toolTip = dataString
      newConfirmObj.color = '#9370D8'
      confirmList.value.push(newConfirmObj)
    }
  })

  scheduleList.value.map((item) => {
    if (confirmList.value.findIndex((p) => p.id === item.id) > -1) {
      item.isDone = true
      item.color = 'rgba(128, 128, 128, 0.5)'
    }
  })
}
initData(props.data as schedule[])
</script>

<style scoped lang="scss">
.schedule-block {
  line-height: 40px;
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: space-between;

  & > .schedule-unit {
    height: 100%;
    border-right: $disable-background-color solid 1px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &:last-child {
      border-right: 0px;
    }

    & > div {
      width: 100%px;
      height: 40px;
      position: relative;
    }
  }

  & > .schedule_svg {
    position: absolute;
    top: 50px;
    width: 18px;
    height: 30px;
    cursor: pointer;
  }

  & > .confirm_svg {
    position: absolute;
    top: 80px;
    width: 18px;
    height: 30px;
    cursor: pointer;
  }
}
</style>
