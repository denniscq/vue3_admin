/**
 * @description a series method to extract data.
 */
import { MONTH_TRANS } from '../models/init_model'

const ONEDAY_TIMESTAMP: number = 24 * 60 * 60 * 1000
const ONEWEEK_TIMESTAMP: number = 7 * ONEDAY_TIMESTAMP
interface periodImp {
  periodStart: number
  periodEnd: number
  scheduleUnits: number[]
  displayValue: string
}

/**
 * @description init start/end value for week model
 */
export const calculatePeriodForWeek = (inputDate?: number): periodImp => {
  const result: periodImp = {
    periodStart: 0,
    periodEnd: 0,
    scheduleUnits: [1, 2, 3, 4, 5, 6, 7],
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
      new Date(
        basicDate.getFullYear(),
        basicDate.getMonth(),
        date - dayInWeek,
      ).getTime() + ONEDAY_TIMESTAMP
  } else {
    const lastMonthEndtime = new Date(year, basicDate.getMonth(), 0).getTime()
    result.periodStart =
      lastMonthEndtime - (dayInWeek - date) * ONEDAY_TIMESTAMP
  }
  result.periodEnd = result.periodStart + ONEWEEK_TIMESTAMP
  result.displayValue = `No.${Math.ceil(date / 7)} Week ${MONTH_TRANS[month]} `

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
  result.periodEnd = new Date(year, month + 1, 1).getTime()

  const dayCount = new Date(year, month + 1, 0).getDate()
  for (let i = 1; i <= Math.ceil(dayCount / 7); i++) {
    result.scheduleUnits.push(i)
  }

  return result
}

export const switchWeekOrMonth = (modelFlag: string, callback: Function) => {
  const result =
    modelFlag === '1' ? calculatePeriodForWeek() : calculatePeriodForMonth()
  return callback(result)
}
