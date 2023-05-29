/**
 * @description a series method to extract data.
 */
import { hcp } from '@/models/hcp_model'
import { MONTH_TRANS, WEEK_TRANS } from '../models/init_model'

const ONEDAY_TIMESTAMP: number = 24 * 60 * 60 * 1000
const ONEWEEK_TIMESTAMP: number = 7 * ONEDAY_TIMESTAMP
interface periodImp {
  periodStart: number
  periodEnd: number
  scheduleUnits: string[]
  displayValue: string
}

/**
 * @description init start/end value for week model
 */
export const calculatePeriodForWeek = (inputDate?: number): periodImp => {
  const result: periodImp = {
    periodStart: 0,
    periodEnd: 0,
    scheduleUnits: [],
    displayValue: '',
  }

  const basicDate = inputDate ? new Date(inputDate) : new Date()
  const date = basicDate.getDate()
  // if today is Sunday, we need to check from Monday
  const dayInWeek = basicDate.getDay() == 0 ? 7 : basicDate.getDay()
  const month = basicDate.getMonth()
  const year = basicDate.getFullYear()
  if (date >= dayInWeek) {
    result.periodStart =
      new Date(year, month, date - dayInWeek).getTime() + ONEDAY_TIMESTAMP
  } else {
    const lastMonthEndtime =
      new Date(year, basicDate.getMonth(), 0).getTime() + ONEDAY_TIMESTAMP
    result.periodStart =
      lastMonthEndtime - (dayInWeek - date) * ONEDAY_TIMESTAMP
  }
  result.periodEnd = result.periodStart + ONEWEEK_TIMESTAMP - 1

  const periodEndDateTime = new Date(result.periodEnd)
  const accurateMonth = periodEndDateTime.getMonth()
  const accurateDate = periodEndDateTime.getDate()
  result.displayValue = `No.${Math.ceil(accurateDate / 7)} Week ${
    MONTH_TRANS[accurateMonth]
  } `
  result.scheduleUnits = WEEK_TRANS

  return result
}

/**
 * @description init start/end value for month model
 */
export const calculatePeriodForMonth = (inputDate?: number): periodImp => {
  const result: periodImp = {
    periodStart: 0,
    periodEnd: 0,
    scheduleUnits: [],
    displayValue: '',
  }

  const basicDate = inputDate ? new Date(inputDate) : new Date()
  const month = basicDate.getMonth()
  const year = basicDate.getFullYear()
  result.displayValue = `${MONTH_TRANS[month]} ${year}`
  result.periodStart = new Date(year, month, 1).getTime()
  result.periodEnd =
    new Date(year, month + 1, 0).getTime() + ONEDAY_TIMESTAMP - 1

  const dayCount = new Date(year, month + 1, 0).getDate()
  for (let i = 1; i <= Math.ceil(dayCount / 7); i++) {
    result.scheduleUnits.push('Week ' + i)
  }

  return result
}

/**
 * @switch from week to month|month to week
 * @param modelFlag
 * @param callback
 * @returns
 */
export const switchWeekOrMonth = (
  modelFlag: string,
  callback: (reuslt: any) => void,
  inputDate?: number,
) => {
  const result =
    modelFlag === '1'
      ? calculatePeriodForWeek(inputDate)
      : calculatePeriodForMonth(inputDate)
  return callback(result)
}

/**
 * @description positive order direction
 * @param dataSource
 * @returns
 */
export const positiveOrder = (dataSource: hcp[]): hcp[] => {
  for (let i = 0; i < dataSource.length - 1; i++) {
    for (let j = 0; j < dataSource.length - 1 - i; j++) {
      if (dataSource[j].priority > dataSource[j + 1].priority) {
        const tempObj = dataSource[j + 1]
        dataSource[j + 1] = dataSource[j]
        dataSource[j] = tempObj
      } else if (dataSource[j].priority == dataSource[j + 1].priority) {
        let isChecking = true
        let index = 0
        while (isChecking) {
          const char1 = dataSource[j].name[index]
          const char2 = dataSource[j + 1].name[index]
          if (char1 != char2) {
            const isToUp = char1 && !char2

            if (isToUp || (char1 && char2 && char1 > char2)) {
              const tempObj = dataSource[j + 1]
              dataSource[j + 1] = dataSource[j]
              dataSource[j] = tempObj
            }

            isChecking = false
          }

          index++
        }
      }
    }
  }

  return dataSource
}

/**
 * @description negative order direction
 * @param dataSource
 * @returns
 */
export const negativeOrder = (dataSource: hcp[]): hcp[] => {
  for (let i = 0; i < dataSource.length - 1; i++) {
    for (let j = 0; j < dataSource.length - 1 - i; j++) {
      if (dataSource[j].priority < dataSource[j + 1].priority) {
        const tempObj = dataSource[j + 1]
        dataSource[j + 1] = dataSource[j]
        dataSource[j] = tempObj
      } else if (dataSource[j].priority == dataSource[j + 1].priority) {
        let isChecking = true
        let index = 0
        while (isChecking) {
          const char1 = dataSource[j].name[index]
          const char2 = dataSource[j + 1].name[index]
          if (char1 != char2) {
            const isToDown = !char1 && char2

            if (isToDown || (char1 && char2 && char1 < char2)) {
              const tempObj = dataSource[j + 1]
              dataSource[j + 1] = dataSource[j]
              dataSource[j] = tempObj
            }

            isChecking = false
          }

          index++
        }
      }
    }
  }

  return dataSource
}
