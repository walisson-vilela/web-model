import { FiltersInterfaces } from '@mw-kit/mw-manager'
import { Cookies } from 'react-cookie'

import axios from '../../../services/Axios'

export const getAllTour = async (
  ids: string | string[],
  dateInterval: string,
  pageName: string,
  page: number,
): Promise<any> => {
  const params: any = {
    page: page,
  }

  const { data } = await axios.get(
    `/v1/tr/image-gallery/files/${pageName}/${ids}/categories?${dateInterval}`,
    {
      params,
    },
  )
  if (!data.success) throw new Error('Invalid Request')
  return data
}

export const getAllAccordionImages = async (
  accordionId: number | string,
  sessionId: number | string,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  dateInterval: string,
  pageName: string,
  page: number,
): Promise<any> => {
  const params: any = {
    page: page,
  }

  if (appliedFilters.length > 0) {
    appliedFilters.map((e) => (params[e.name] = e.value))
    if (params['sublevel_id']) {
      params['category_id'] = params['category_id']
        ? `${params['category_id']},${params['sublevel_id']}`
        : params['sublevel_id']
      delete params['sublevel_id']
    }
  }

  if (search) params.q = search

  const { data } = await axios.get(
    `/v1/tr/image-gallery/files/${pageName}/${sessionId}/categories/${accordionId}?${dateInterval}`,
    {
      params,
    },
  )
  if (!data.success) throw new Error('Invalid Request')
  return data
}

export const approvationImage = async (body: any): Promise<any> => {
  const { data } = await axios.put('/v1/tr/image-gallery/files/toggle-audit', {
    ...body,
  })

  if (!data.success) throw new Error('Invalid Request')
  return data
}

export const listClassificationsImage = async (
  id: number,
  search: string,
): Promise<any> => {
  let params: any = {
    scenery_id: id,
  }

  search ? (params.q = search) : undefined

  const { data } = await axios.get('/v1/classifications', { params })

  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const favoriteImage = async (
  id: number,
  search: string,
): Promise<any> => {
  const params: any = {
    contain: 'FileFavoriteItems,FileFavoritePermissions',
    file_favorite_items__file_id: id,
  }

  if (search) params.q = search

  const { data } = await axios.get(
    `/v1/tr/image-gallery/file-favorites/index`,
    { params },
  )
  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const addListMultipleFavorite = async (arrayData: any): Promise<any> => {
  const { data } = await axios.post(
    '/v1/tr/image-gallery/file-favorites/add-list-multiple',
    {
      file_favorite_ids: arrayData,
    },
  )

  if (!data.success) throw new Error('Invalid Request')
  return data
}

export const blockImageAccess = async (
  id: number,
  hidden: number,
): Promise<any> => {
  const props = {
    hidden: hidden,
  }
  const { data } = await axios.put(
    `/v1/tr/image-gallery/files/toggle-hidden/${id}`,
    props,
  )

  if (!data.success) throw new Error('Invalid Request')
  return data
}

export const cardDetails = async (id: number): Promise<any> => {
  const { data } = await axios.get(`/v1/tr/image-gallery/files/${id}`)
  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const rotateImage = async (id: number, rotate: string): Promise<any> => {
  const props = {
    direction: rotate,
  }
  const { data } = await axios.put(
    `/v1/tr/image-gallery/files/rotate/${id}`,
    props,
  )

  if (!data.success) throw new Error('Invalid Request')
  return data
}

export const listClassifications = async (
  id: number,
  search: string,
): Promise<any> => {
  let params: any = {
    scenery_id: id,
  }

  search ? (params.q = search) : undefined

  const { data } = await axios.get('/v1/classifications', { params })

  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const getImage = async (id: number, hash: string, size?: number) => {
  const cookies = new Cookies()
  const token = cookies.get('_GIV_USER').token

  const url = `https://cache.traderesult.app/v1/files/image/${id}${
    size ? `/resize/${size}` : ''
  }/${hash}`

  const { data: blob } = await axios.get(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  })

  return URL.createObjectURL(blob)
}
