import axios from 'axios'
import { hcp, init_mockData } from '@/models/hcp_model.ts'

const env = import.meta.env['VITE_USER_NODE_ENV']
const data_cache: Array<hcp> = []

/**
 * @description get all
 * @returns
 */
const getAll = async (): Promise<hcp[]> => {
  if (data_cache && data_cache.length) {
    return data_cache
  }

  try {
    if (env === 'development') {
      const { data } = await axios.get('/api/hcp')

      return data.data
    }

    return init_mockData()
  } catch (error) {
    console.error(
      'an error has been occured while getting data from hcp api, the details is %s',
      error,
    )

    throw error
  }
}

/**
 * @description get by condition name
 * @param name
 * @returns
 */
const getByName = async (name: string, originalData: hcp[]): Promise<hcp[]> => {
  try {
    const hcps = originalData.length ? originalData : await getAll()
    const data = hcps.filter(
      (p) => p.name.toLowerCase().indexOf(name.toLowerCase()) > -1,
    )

    return data
  } catch (error) {
    console.error(
      'an error has been occured while getting data from hcp api by name, the details is %s',
      error,
    )
    throw error
  }
}

/**
 * @description get by condition medical
 * @param medical
 * @returns
 */
const getByProduct = async (
  medical: string,
  originalData: hcp[],
): Promise<hcp[]> => {
  try {
    const hcps = originalData.length ? originalData : await getAll()
    if (medical === '0') {
      return Promise.resolve(hcps)
    }
    const data = hcps.filter((p) => p.medical === medical)

    return data
  } catch (error) {
    console.error(
      'an error has been occured while getting data from hcp api by medical, the details is %s',
      error,
    )
    throw error
  }
}

/**
 * @description get by condition medical
 * @param medical
 * @returns
 */
const getByRole = async (role: string, originalData: hcp[]): Promise<hcp[]> => {
  try {
    const hcps = originalData.length ? originalData : await getAll()

    const data: hcp[] = []
    hcps.forEach((hcp) => {
      let item: any = {}
      item.id = hcp.id
      item.hospitalName = hcp.hospitalName
      item.medical = hcp.medical
      item.name = hcp.name
      item.priority = hcp.priority
      item.scheduleList = []
      if (role === '0') {
        for (let i = 0; i < hcp.scheduleList.length; i++) {
          if (hcp.scheduleList[i].owner == '0') {
            item.scheduleList.push(hcp.scheduleList[i])
          }
        }
      } else {
        item.scheduleList = [...hcp.scheduleList]
      }
      data.push(JSON.parse(JSON.stringify(item)))
    })

    return data
  } catch (error) {
    console.error(
      'an error has been occured while getting data from hcp api by medical, the details is %s',
      error,
    )
    throw error
  }
}

/**
 * @description get by date
 * @param medical
 * @returns
 */
const getByDate = async (
  periodStart: number,
  periodEnd: number,
  originalData?: hcp[],
): Promise<hcp[]> => {
  try {
    const hcps = originalData && originalData.length ? originalData : await getAll()

    const data: hcp[] = []
    hcps.forEach((hcp) => {
      hcp.scheduleList = hcp.scheduleList.filter((p) => {
        const scheduleTimeStamp = new Date(p.scheduleTime).getTime()
        const confirmedTimeStamp = new Date(p.confirmedTime).getTime()
        return (
          (periodStart < scheduleTimeStamp && scheduleTimeStamp < periodEnd) ||
          (periodStart < confirmedTimeStamp && confirmedTimeStamp < periodEnd)
        )
      })
      data.push(JSON.parse(JSON.stringify(hcp)))
    })

    return data
  } catch (error) {
    console.error(
      'an error has been occured while getting data from hcp api by medical, the details is %s',
      error,
    )
    throw error
  }
}

/**
 * @description get by customize condition
 * @param medical
 * @returns
 */
const getByPredicate = async (
  callback: (hcp: any) => boolean,
): Promise<hcp[]> => {
  try {
    const hcps = await getAll()
    const data = hcps.filter(callback)

    return data
  } catch (error) {
    console.error(
      'an error has been occured while getting data from hcp api by name, the details is %s',
      error,
    )
    throw error
  }
}

/**
 *
 * @param condition
 */
const filter = async (
  condition: any,
  periodStart: number,
  periodEnd: number,
): Promise<hcp[]> => {
  let originalData: hcp[] = []
  for (const key of Object.keys(condition)) {
    switch (key) {
      case 'selectedDateType': {
        originalData = await getByDate(periodStart, periodEnd, originalData)
        break
      }
      case 'selectedProduct': {
        originalData = await getByProduct(condition[key], originalData)
        break
      }
      case 'selectedRoleType': {
        originalData = await getByRole(condition[key], originalData)
        break
      }
      case 'selectedHCP': {
        if (condition[key]) {
          originalData = await getByName(condition[key], originalData)
        }
        break
      }
      default:
        break
    }
  }

  return originalData
}

export default {
  getAll,
  getByName,
  getByProduct,
  getByPredicate,
  getByRole,
  getByDate,
  filter,
}
