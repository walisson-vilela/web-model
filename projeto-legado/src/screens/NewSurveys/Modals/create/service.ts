import axios from '../../../../services/Axios'

export const createNewSurveys = async (payload: any): Promise<any> => {
  const { data } = await axios.post('/v1/tr/surveys/add', { ...payload })

  if (!data.success) throw new Error('Request returned no sucess!')

  return data
}

export const getDetailSurvey = async (id: number): Promise<any> => {
  const params = {
    contain:
      'Forms,Regions,Segments,Typologies,Stores,MarketGroups,MarketChains,MarketFlags,Products,Suppliers,Brands,Categories,SubCategories,ProductLines,Peoples,Roles,HierarchyElements,States,Cities,Sublocalities',
  }
  const { data } = await axios.get(`/v1/tr/surveys/view/${id}`, { params })

  return data
}
