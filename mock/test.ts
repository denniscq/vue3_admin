/**
 * @deprecated mock data
 */
const data = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' },
  { id: 4, name: 'test4' },
]

export default function (config) {
  return [
    {
      url: '/api/hcp',
      method: 'get',
      response: ({ query }) => {
        if (!!query && !!query.name) {
          const { name } = query
          return {
            code: 200,
            data: data.filter((item) => item.name.indexOf(name) > -1),
          }
        }
        return { code: 200, data: data }
      },
    },
  ]
}
