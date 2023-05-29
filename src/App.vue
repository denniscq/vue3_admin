<template>
  <div>
    <div class="top-block margin-top-10">
      <select-vue
        name="selectedProduct"
        :selected="selectedInfo.selectedProduct"
        @transmit="handle"
      ></select-vue>
      <switch-vue
        name="selectedRoleType"
        :selected="selectedInfo.selectedRoleType"
        @transmit="handle"
      ></switch-vue>
      <switch-vue
        name="selectedDateType"
        :tag="['Month', 'Week']"
        backgroundColor="lightblue"
        borderColor="blue"
        :selected="selectedInfo.selectedDateType"
        @transmit="handle"
      ></switch-vue>
      <search-vue
        name="selectedHCP"
        :selected="selectedInfo.selectedHCP"
        :HCPs="hcps"
        @transmit="handle"
      ></search-vue>
    </div>
    <div class="table-block margin-top-10">
      <table v-if="isRefresh">
        <tr class="tr-title">
          <td>HCP List</td>
          <td>Confirmed schedule</td>
          <td>ACE Recommended Frequency</td>
        </tr>
        <tr class="tr-subtitle">
          <td>
            <div class="td-flex">
              <!-- <div style='width:160px;'> -->
              ACE Prioritization
              <!-- </div> -->
              <div class="up-logo" @click="sortHCP(isUp)">
                <svg-icon
                  name="down"
                  color="blue"
                  background="transparent"
                  width="20px"
                  height="20px"
                  v-if="isUp"
                ></svg-icon>
                <svg-icon
                  name="up"
                  color="blue"
                  background="transparent"
                  width="20px"
                  height="20px"
                  v-else
                ></svg-icon>
              </div>
            </div>
          </td>
          <td>
            <div class="td-flex">
              <div
                class="left-logo"
                style="left: 300px"
                @click="go(false, dateForDisplay)"
              >
                <svg-icon
                  name="left"
                  color="blue"
                  background="transparent"
                  width="20px"
                  height="20px"
                ></svg-icon>
              </div>
              {{ dateForDisplay }}
              <div
                class="right-logo"
                style="right: 300px"
                @click="go(true, dateForDisplay)"
              >
                <svg-icon
                  name="right"
                  color="blue"
                  background="transparent"
                  width="20px"
                  height="20px"
                ></svg-icon>
              </div>
            </div>
          </td>
          <td>
            <div class="td-flex">
              <div class="left-logo" @click="go(false, dateForDisplay)">
                <svg-icon
                  name="left"
                  color="blue"
                  background="transparent"
                  width="20px"
                  height="20px"
                ></svg-icon>
              </div>
              {{ dateForDisplay }}
              <div class="right-logo" @click="go(true, dateForDisplay)">
                <svg-icon
                  name="right"
                  color="blue"
                  background="transparent"
                  width="20px"
                  height="20px"
                ></svg-icon>
              </div>
            </div>
          </td>
        </tr>
        <tr class="tr-celltitle">
          <td></td>
          <td>
            <div class="schedule-block">
              <span
                v-for="unit in scheduleUnits"
                class="schedule-unit"
                :style="{ width: scheduleUnit_width }"
              >
                {{ unit }}
              </span>
            </div>
          </td>
          <td>
            <div class="logo-block">
              <span></span>
              <span><svg-icon name="people"></svg-icon></span>
              <span><svg-icon name="computer"></svg-icon></span>
              <span><svg-icon name="phone"></svg-icon></span>
              <span><svg-icon name="mail"></svg-icon></span>
              <span><svg-icon name="edit"></svg-icon></span>
              <span><svg-icon name="outlook"></svg-icon></span>
            </div>
          </td>
        </tr>
        <tr class="tr-row" v-for="item in data" :key="item.id">
          <td>
            <p class="ace">ACE {{ item.priority }}</p>
            <p class="hcp">{{ item.name }}</p>
            <p>{{ item.hospitalName }}</p>
          </td>
          <td>
            <schedule-vue
              :data="item.scheduleList"
              :periodStart="periodStart"
              :periodEnd="periodEnd"
              :scheduleUnits="scheduleUnits"
              :scheduleUnit_width="scheduleUnit_width"
            ></schedule-vue>
          </td>
          <td>
            <visual-vue
              :data="item.scheduleList"
              :periodStart="periodStart"
              :periodEnd="periodEnd"
            ></visual-vue>
          </td>
        </tr>
      </table>
      <div
        v-show="timelinePosition.isShow"
        class="timeline"
        :style="{
          width: timelinePosition.width,
          height: timelinePosition.height,
        }"
      >
        <p class="arror"></p>
      </div>
    </div>
    <div v-show="!isRefresh" class="mask-block">
      <div class="loading"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, Ref, nextTick, watch } from 'vue'
import selectVue from '@/components/select.vue'
import searchVue from '@/components/search.vue'
import switchVue from '@/components/switch.vue'
import scheduleVue from '@/components/schedule.vue'
import visualVue from '@/components/visual.vue'
import hcpService from '@/services/hcp_service'
import {
  switchWeekOrMonth,
  positiveOrder,
  negativeOrder,
} from '@/services/common_service'
import { hcp } from '@/models/hcp_model'
import { INIT_MODEL } from '@/models/init_model'

const data: Ref<hcp[]> = ref([])
const isRefresh = ref(false)

/**
 * @description filter feature logic
 */
const selectedInfo = ref(INIT_MODEL)
const periodStart = ref(0)
const periodEnd = ref(0)
const hcps: Ref<string[]> = ref([])

/**
 * @description execute filter logic.
 * @param key
 * @param value
 */
const handle = (key: keyof typeof INIT_MODEL, value: string) => {
  if (selectedInfo.value[key] == value) {
    return
  }
  console.log(`hanle method running, key is ${key}, value is ${value}`)
  selectedInfo.value[key] = value

  isRefresh.value = false
  if (key === 'selectedDateType') {
    switchWeekOrMonth(value, resetDate)
  }

  nextTick(async () => {
    data.value = await hcpService.filter(
      selectedInfo.value,
      periodStart.value,
      periodEnd.value,
    )
    isRefresh.value = true
  })
}

/**
 * @description main table logic
 */
const dateForDisplay = ref('')
const isUp = ref(true)
const scheduleUnits: Ref<string[]> = ref([])
const scheduleUnit_width = ref('')
const timelinePosition = ref({ width: '', height: '', isShow: false })

/**
 * @description order sequence
 * @param isToUp
 */
const sortHCP = (isToUp: boolean) => {
  data.value = !isToUp ? positiveOrder(data.value) : negativeOrder(data.value)
  isUp.value = !isToUp
}

/**
 * @description go to next|previous date.
 * @param isNext
 * @param value
 */
const go = (isNext: boolean, value: string) => {
  console.log('before moving the period is %s', value)
  isRefresh.value = false
  nextTick(async () => {
    // +1|-1 is to ensure start time from 00:00:00
    const nextPeriodStartTime = isNext
      ? periodEnd.value + 1
      : periodStart.value - 1
    switchWeekOrMonth(
      selectedInfo.value['selectedDateType'],
      resetDate,
      nextPeriodStartTime,
    )
    data.value = await hcpService.getByDate(periodStart.value, periodEnd.value)

    console.log('after moving the period is %s', dateForDisplay.value)
    isRefresh.value = true
  })
}

/**
 * @description reset for date model changed.
 * @param result
 */
const resetDate = (result: { [key: string]: number & number[] & string[] }) => {
  periodStart.value = result.periodStart
  periodEnd.value = result.periodEnd
  scheduleUnits.value = result.scheduleUnits
  scheduleUnit_width.value = `${Math.floor(100 / result.scheduleUnits.length)}%`
  dateForDisplay.value = result.displayValue as unknown as string
}

/**
 * @description setup reactive object before render component.
 */
onMounted(() => {
  switchWeekOrMonth(INIT_MODEL.selectedDateType, resetDate)

  isRefresh.value = true
})

/**
 * @description get all initial data from remote api and build up reactive object.
 */
onBeforeMount(async () => {
  const result = await hcpService.getAll()
  if (result) {
    data.value = positiveOrder(result)
    hcps.value = Array.from(result, ({ name }) => name)
  }
})

/**
 * @description  caculate for timline position
 */
watch(data, (newValue) => {
  const rate =
    (new Date().getTime() - periodStart.value) /
    (periodEnd.value - periodStart.value)
  const dynamicLeft = 745 * rate
  timelinePosition.value = {
    width: dynamicLeft + 'px',
    height: newValue.length * 117 + 'px',
    isShow: rate > 0 && rate < 1,
  }
})
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

  div {
    &:first-child {
      background-color: $disable-background-color;
      border-radius: 5px;
      border: 0.5px solid lightgray;
    }
  }
}

.table-block {
  background-color: #ffffff;
  width: 96%;
  margin-left: 2%;
  position: absolute;

  & > table {
    width: 100%;
    border-collapse: collapse;
    color: grey;
    font-size: 12px;

    & > tr {
      & > td {
        border-right: 2px solid $disable-background-color;
        border-bottom: 2px solid $disable-background-color;

        &:first-child {
          width: 200px;
        }

        &:last-child {
          width: 280px;
        }
      }
    }

    & > .tr-title {
      color: black;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
    }

    & > .tr-subtitle {
      color: blue;
      font-size: 14px;
      line-height: 30px;
      background-color: $normal-background-color;
      text-align: center;

      & > td {
        position: relative;
        border-bottom: 0px;

        & > .td-flex {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;

          & > .up-logo {
            right: 15px;
            top: 4px;
            position: absolute;
            cursor: pointer;
          }

          & > .left-logo {
            left: 70px;
            top: 4px;
            cursor: pointer;
            position: absolute;
          }

          & > .right-logo {
            right: 70px;
            top: 4px;
            cursor: pointer;
            position: absolute;
          }
        }
      }
    }

    & > .tr-celltitle {
      line-height: 40px;
      text-align: center;
      font-size: 12px;

      & > td {
        border-bottom: 0 !important;
        position: relative;

        & > .logo-block {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;

          & > span {
            width: 40px;
            height: 100%;
            height: 100%;
            line-height: 40px;
            padding-top: 5px;
          }
        }

        & > .schedule-block {
          display: flex;
          justify-content: space-between;

          & .schedule-unit {
            border-right: $disable-background-color solid 1px;

            &:last-child {
              border-right: 0px;
            }
          }
        }
      }
    }

    & > .tr-row {
      & > td {
        position: relative;
      }

      & > td:first-child {
        padding: 20px 10px;
        line-height: 25px;

        & .ace {
          color: #ffffff;
          background-color: rgba(128, 128, 128, 0.5);
          width: 45px;
          padding-left: 5px;
          border-radius: 3px;
        }

        & .hcp {
          font-size: 16px;
          color: blue;
        }
      }
    }
  }

  & .timeline {
    border-right: 1.5px solid blue;
    height: 10px;
    position: absolute;
    top: 110px;
    left: 200px;
    background-color: transparent;
    z-index: 1;

    & .arror {
      width: 0;
      height: 0;
      border-top: 5px solid blue;
      border-right: 5px dashed transparent;
      border-left: 5px dashed transparent;
      border-bottom: 5px dashed transparent;

      position: absolute;
      right: -5.5px;
    }
  }
}

.mask-block {
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  filter: alpha(opacity=70);
  opacity: 0.7;
  z-index: 1001;

  & .loading {
    width: 30px;
    height: 30px;
    border: 2px solid #000;
    border-top-color: transparent;
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
    position: absolute;
    top: 48%;
    left: 48%;
  }
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
