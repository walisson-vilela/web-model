import axios from '../../../../../../../services/Axios/instance'
import { isObject } from '../../../../../../utils/validators'
import { IFormStores } from '../../interfaces'
import { dataParser, formParser } from '../../parsers'

const getStore = async (id: number, mode: IFormStores['mode']) => {
  const params = {
    contain: [
      ...(mode === 'stores' ? ['ContactRecipients', 'Contacts'] : []),
      'MarketFlags',
      'MarketChains',
      'MarketGroups',
      'Segments',
      'Classifications',
      'Typologies',
      'GeolocationByPeople',
      'Modifiers',
    ].join(),
    ...(mode === 'stores' ? {} : { mode: 'store' }),
  }

  const { data } = await axios.get(`v1/tr/stores/${id}`, {
    params,
  })

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!isObject(data.data) || !isObject(data.data.address)) {
    throw new Error('Invalid Data!')
  }

  const responseForm = formParser(data.data, mode)
  if (!responseForm.id) throw new Error('Invalid data!')

  const { data: responseData, unified_log } = dataParser(data.data, mode)

  return {
    responseForm: responseForm,
    responseData: responseData,
    unified_log,
  }
}

export default getStore
