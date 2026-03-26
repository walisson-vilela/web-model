import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import {
  PeopleBody,
  PeopleData,
  ProductsBody,
  ProductsData,
  StoresBody,
  StoresData,
} from '../../../../interfaces'

export const StoreParse = (data: StoresData[]): StoresBody[] => {
  return data.map((e) => {
    return {
      code: numberOrDefault(e.id),
      channel: notEmptyStringOrDefault(e.Markets.name),
      flag: notEmptyStringOrDefault(e.Segments.name),
      pdv: notEmptyStringOrDefault(e.name),
    }
  })
}

export const UserParse = (data: PeopleData[]): PeopleBody[] => {
  return data.map((e) => {
    return {
      code: numberOrDefault(e.id),
      supervisor: notEmptyStringOrDefault(e.supervisor.name),
      user: notEmptyStringOrDefault(e.name),
    }
  })
}

export const ProductParse = (data: ProductsData[]): ProductsBody[] => {
  return data.map((e) => {
    return {
      code: numberOrDefault(e.id),
      category: notEmptyStringOrDefault(e.Categories.name),
      product_line: notEmptyStringOrDefault(e.ProductLines.name),
      products: notEmptyStringOrDefault(e.name),
    }
  })
}
