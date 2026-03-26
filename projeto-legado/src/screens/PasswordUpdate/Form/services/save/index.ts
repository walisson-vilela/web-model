import axios from '../../../../../services/Axios/instance'
import {isObject} from '../../../../../utils/Validators'

const save = async (password: string, people_id: number): Promise<void> => {
  const {data: response} = await axios.put(`v1/peoples/${people_id}`, {
    user: {
      password,
    },
  })

  if (!isObject(response) || !response.success) {
    throw new Error('Invalid response')
  }
}

export default save
