import { isObject } from 'lodash'
import { UseFormReturn } from 'react-hook-form'

import axios from "../../../../../../../services/Axios"
import { BodyInterface } from '../../../interfaces'

export interface Form {
  name: string
  size_type: string
  status: boolean
  sizes: { size: string; quantity: number }[]
  epi_type: string
  epi_type_id: number
  number: string
  date: string
  supplier: string
  ca_code: string
  ca_code_expiration: string
  obs: string
  epis_invetory_add: { epi_id: string | number; qtd: number }[]
}

export interface FormSubmit {
  id: number
  epi_type_id: string | number
  number: string
  date: string
  supplier: string
  ca_code: string
  ca_code_expiration: string
  obs: string
  epis_invetory_add: { epi_id: number; qtd: number }[]
}

export interface CreateProps {
  data?: BodyInterface
  reload: () => void
  close: () => void
}

interface Epi {
  id: number
  epi_type_id: number
  size: string
  status: boolean
}

interface EpiType {
  id: number
  name: string
  size_type: string
  epis: Epi[]
}

interface EpiTypesResponse {
  success: boolean
  data: EpiType[]
}

// 🔹 Service para listar EPIs
export const fetchEPITypes = async (): Promise<EpiType[]> => {
  const { data: response } = await axios.get<EpiTypesResponse>(
    "/v1/epi-types",
    { params: { contain: "Epis", limit: 999999 } }
  )

  if (!isObject(response) || !response.success) {
    throw new Error("Response failed")
  }

  return response.data
}


export type Context = Pick<CreateProps, 'data' > & {
  form: UseFormReturn<FormSubmit>
}
