import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'
import { ModalProps } from '../types'

export const getAllProducts = async (
  search: string,
  sort: SortState | null,
  page: number,
  extract: boolean = false,
  filter: ModalProps['filter'],
  id: number,
): Promise<any> => {
  const params = {
    [filter]: id,
    modal: '',

    page,

    ...(search ? { q: search } : {}),
    ...(sort ? sort : {}),
  }

  const { data } = await axios.get(`/v1/tr/products${extract ? '.xlsx' : ''}`, {
    params,
  })
  if (!data.success) throw new Error('Invalid Request')

  return data
}
