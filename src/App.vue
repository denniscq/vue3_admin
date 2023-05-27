<template>
  <div>
    <div class="top-block margin-top-10">
      <select-vue name="selectedProduct" :selected="selectedInfo.selectedProduct" @transmit="handle"></select-vue>
      <switch-vue name="selectedRoleType" :selected="selectedInfo.selectedRoleType" @transmit="handle"></switch-vue>
      <switch-vue name="selectedDateType" :tag="['Month', 'Week']" backgroundColor="lightblue" borderColor="blue"
        :selected="selectedInfo.selectedDateType" @transmit="handle"></switch-vue>
      <search-vue name="selectedHCP" :selected="selectedInfo.selectedHCP" :HCPs="hcps" @transmit="handle"></search-vue>
    </div>
    <div class="table-block margin-top-10">
      <table>
        <tr class='tr-title'>
          <td>HCP List</td>
          <td>Confirmed schedule</td>
          <td>ACE Recommended Frequency</td>
        </tr>
        <tr class='tr-subtitle'>
          <td>
            <div class='td-flex'>
              <!-- <div style='width:160px;'> -->
              ACE Prioritization
              <!-- </div> -->
              <div class='up-logo' @click='handleHCPOrder(isUp)'>
                <svg-icon name="down" color='blue' background='transparent' width='16px' height='16px'
                  v-if='isUp'></svg-icon>
                <svg-icon name="up" color='blue' background='transparent' width='16px' height='16px' v-else></svg-icon>
              </div>
            </div>
          </td>
          <td>
            <div class='td-flex'>
              <div class='left-logo' @click='goPrevious(monthDisplay)'>
                <svg-icon name="left" color='blue' background='transparent' width='16px' height='16px'></svg-icon>
              </div>
              {{ monthDisplay }}
              <div class='right-logo' @click='goNext(monthDisplay)'>
                <svg-icon name="right" color='blue' background='transparent' width='16px' height='16px'></svg-icon>
              </div>
            </div>
          </td>
          <td>
            <div class='td-flex'>
              <div class='left-logo' @click='goPrevious(monthDisplay)'>
                <svg-icon name="left" color='blue' background='transparent' width='16px' height='16px'></svg-icon>
              </div>
              {{ monthDisplay }}
              <div class='right-logo' @click='goNext(monthDisplay)'>
                <svg-icon name="right" color='blue' background='transparent' width='16px' height='16px'></svg-icon>
              </div>
            </div>
          </td>
        </tr>
        <tr class='tr-celltitle'>
          <td></td>
          <td>
            <div class='schedule-block'>
              <span v-if='selectedInfo.selectedDateType === "0"' v-for='unit in scheduleUnits' class='schedule-unit'
                :style="{ width: scheduleUnit_width }"> Week
                {{ unit }}</span>
              <span v-else v-for='unit in scheduleUnits' class='schedule-unit'> Day {{ unit }}</span>
            </div>
          </td>
          <td>
            <div class='logo-block'>
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
        <tr class='tr-row' v-for='(item, index) in data' :key='index'>
          <td>
            <p class='ace'>ACE {{ item.priority }}</p>
            <p class='hcp'>{{ item.name }}</p>
            <p>{{ item.hospitalName }}</p>
          </td>
          <td>
            <sechdule-vue :data='item.scheduleList' :periodStart='periodStart' :periodEnd='periodEnd' :scheduleUnits='scheduleUnits' :scheduleUnit_width='scheduleUnit_width'></sechdule-vue>
          </td>
          <td>
            <visual-vue :data='item.scheduleList' :periodStart='periodStart' :periodEnd='periodEnd'></visual-vue>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import selectVue from '@/components/select.vue'
import searchVue from '@/components/search.vue'
import switchVue from '@/components/switch.vue'
import { ref, onMounted, onBeforeMount, Ref } from 'vue'
import hcpService from '@/services/hcp_service'
import { hcp } from '@/models/hcp_model'
import sechduleVue from '@/components/schedule.vue'
import visualVue from '@/components/visual.vue'

/**
 * @description section logic
 */
const selectedInfo = ref({
  selectedProduct: '0',
  selectedRoleType: '1',
  selectedDateType: '0',
  selectedHCP: '',
})
const periodStart = ref(0);
const periodEnd = ref(0)

const handle = (
  key:
    | 'selectedProduct'
    | 'selectedRoleType'
    | 'selectedDateType'
    | 'selectedHCP',
  value: string,
) => {
  console.log(`hanle method running, key is ${key}, value is ${value}`)
  selectedInfo.value[key] = value
  if (key === 'selectedDateType' && value === '1') {
    const date = new Date().getDate()
    const today = new Date().getDay()
    if (date >= today) {
      periodStart.value = new Date(new Date().getFullYear(), new Date().getMonth() - 1, date - today).getTime()
    } else {
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).getTime()
      periodStart.value = monthStart - (today - date) * 24 * 60 * 60 * 60
    }
    periodEnd.value = periodStart.value + 7 * 24 * 60 * 60 * 60
  }
}

const hcps = ref(['test1', 'test2', 'test3', 'test4'])


/**
 * @description main table logic
 */
const data: Ref<hcp[]> = ref([])
const month_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aguest', 'September', 'October', 'November', 'December']
const monthDisplay = ref('')
const weekDisplay = ref('')
const isUp = ref(true)
const scheduleUnits: Ref<number[]> = ref([])
const scheduleUnit_width = ref('')

const handleHCPOrder = (value) => {
  isUp.value = !value

  // 重新排序逻辑
}

const goPrevious = (value) => {
  const month = value.split(' ')[0]
  const year = value.split(' ')[1]
  if (month === 'January') {
    monthDisplay.value = 'December' + (year - 1)

    const realDate = new Date(year - 1, 11, 1)
    // 获取这个一个月的数据
  }

  const index = month_EN.findIndex(p => p === month.split(''))
  const realDate = new Date(year, index - 1, 1);
}

const goNext = (value) => {
  const month = value.split(' ')[0]
  const year = value.split(' ')[1]
  if (month === 'December') {
    monthDisplay.value = 'January' + (year + 1)

    const realDate = new Date(year + 1, 0, 1)
    // 获取这个一个月的数据
  }

  const index = month_EN.findIndex(p => p === month.split(''))
  const realDate = new Date(year, index + 1, 1);
}

onMounted(() => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  monthDisplay.value = `${month_EN[month]} ${year}`

  periodStart.value = new Date(year, month, 1).getTime()
  periodEnd.value = new Date(year, month + 1, 1).getTime() - 24 * 60 * 60 * 60

  const dayCount = new Date(year, month + 1, 0).getDate()
  for (let i = 1; i <= Math.ceil(dayCount / 7); i++) {
    scheduleUnits.value.push(i)
  }

  scheduleUnit_width.value = `${Math.floor(100 / scheduleUnits.value.length)}%`
})

onBeforeMount(async () => {
  const result = await hcpService.getAll()
  if (result) {
    data.value = result
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

.table-block {
  background-color: #ffffff;
  width: 96%;
  margin-left: 2%;
  // height: 600px;

  &>table {
    width: 100%;
    border-collapse: collapse;
    color: grey;
    font-size: 12px;

    &>tr {
      &>td {
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

    &>.tr-title {
      color: black;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
    }

    &>.tr-subtitle {
      color: blue;
      font-size: 14px;
      line-height: 30px;
      background-color: $normal-background-color;
      text-align: center;

      &>td {
        position: relative;
        border-bottom: 0px;

        &>.td-flex {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;

          &>.up-logo {
            right: 15px;
            top: 3px;
            cursor: pointer;
            position: absolute;
          }

          &>.left-logo {
            left: 30%;
            top: 3px;
            cursor: pointer;
            position: absolute;
            // background-color: yellow;
          }

          &>.right-logo {
            right: 30%;
            top: 3px;
            cursor: pointer;
            position: absolute;
            // background-color: aqua;
          }
        }
      }
    }

    &>.tr-celltitle {
      line-height: 40px;
      text-align: center;
      font-size: 12px;

      &>td {
        border-bottom: 0 !important;
        position: relative;

        &>.logo-block {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;

          &>span {
            width: 40px;
            height: 100%;
            height: 100%;
            line-height: 40px;
            padding-top: 5px;
          }
        }

        &>.schedule-block {
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

    &>.tr-row {
      &>td {
        position: relative;
      }

      &>td:first-child {
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
}
</style>
