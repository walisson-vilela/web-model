import axios from '../../../../../../services/Axios/instance'
import { isObject } from '../../../../../../utils/Validators'
import type { Events } from '../Form/types'

import { parseEvent } from './parsers'

export const saveCard = async (
  card_id: number,
  eventsList: Events[],
): Promise<void> => {
  try {
    const payload = {
      ...parseEvent(eventsList[0]),
      ...(eventsList.length > 1
        ? { children: eventsList.slice(1).map((el) => parseEvent(el)) }
        : { children: [] }),
    }
    const { data: response } = await axios.put(
      `/v1/tr/user-events/${card_id}`,
      payload,
    )
    if (!isObject(response)) {
      throw new Error('Request returned an invalid data!')
    }
    if (!response.success) {
      throw new Error('Request returned no success!')
    }
  } catch (e) {
    console.error(e)
  }
}
