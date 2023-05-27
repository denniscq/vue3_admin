import axios from 'axios'
import { hcp, init_mockData } from '@/models/hcp_model.ts'

const env = import.meta.env['VITE_USER_NODE_ENV'];

export default {
    getAll: async (): Promise<hcp[] | undefined> => {
        try {
            if (env === 'development') {
                const { data } = await axios.get('/api/hcp')

                return data.data;
            }

            return init_mockData();
        } catch (error) {
            console.error('an error has been occured while getting data from hcp api, the details is %s', error)
        }

    },
    getByName: async (name: string): Promise<hcp[] | undefined> => {
        try {
            if (env === 'development') {
                const { data } = await axios.get('/api/hcp', {
                    params: {
                        name
                    }
                })

                return data.data;
            }

            const data = init_mockData().filter(p => p.name.indexOf(name) > -1)
            return data
        } catch (error) {
            console.error('an error has been occured while getting data from hcp api by name, the details is %s', error)
        }

    }
}