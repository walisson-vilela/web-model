import axios from '../../../services/Axios'
import { isObject } from '../../utils/validators'

import { Licenses } from './interfaces'
import parserLicenses from './parser'

const getLicenses = async (contractor_id: number): Promise<Licenses> => {
  const { data } = await axios.get(`/v1/tr/contractors/${contractor_id}`)
  if (!isObject(data) || !isObject(data.data)) {
    throw new Error('Error in request contractors')
  }
  if (!Array.isArray(data.data.licenses)) {
    throw new Error('Error in request licenses')
  }

  return parserLicenses(data.data.licenses)
}

export default getLicenses
