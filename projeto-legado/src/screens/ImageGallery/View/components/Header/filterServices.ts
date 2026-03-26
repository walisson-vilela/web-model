import axios from '../../../../../services/Axios'

export const filterCategories = async (): Promise<any> => {
  const { data } = await axios.get(`v1/tr/categories?level=0`)

  if (!data.success) throw new Error('Invalid Request')

  const options = data.data
    .filter((item) => !!item['id'])
    .map((item) => ({
      label: item.name,
      value: item.id,
    }))

  return options
}

export const filterBrands = async (): Promise<any> => {
  const { data } = await axios.get('v1/brands')

  if (!data.success) throw new Error('Invalid Request')

  const options = data.data
    .filter((item) => !!item['id'])
    .map((item) => ({
      label: item.name,
      value: item.id,
    }))

  return options
}

export const filterFavorites = async (): Promise<any> => {
  const { data } = await axios.get(`v1/tr/image-gallery/file-favorites/index`)

  if (!data.success) throw new Error('Invalid Request')

  const options = data.data
    .filter((item) => !!item['id'])
    .map((item) => ({
      label: item.name,
      value: item.id,
    }))

  return options
}
