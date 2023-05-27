/**
 * @deprecated mock data
 */
import { init_mockData } from '../src/models/hcp_model'

export default function (config) {
  return [
    {
      url: '/api/hcp',
      method: 'get',
      response: ({ query }) => {
        const data = init_mockData();
        if (!!query && !!query.name) {
          const { name } = query
          return {
            code: 200,
            data: data.filter((item) => item.name.indexOf(name) > -1),
          }
        }
        return { code: 200, data }
      },
    },
  ]
}
