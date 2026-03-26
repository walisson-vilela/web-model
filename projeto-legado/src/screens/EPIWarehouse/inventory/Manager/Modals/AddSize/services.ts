// services.ts
import axios from "../../../../../../services/Axios"
import { isObject } from "../../../../../../utils/Validators"

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

// 🔹 Service para listar Tipos de Tamanho
interface SizeType {
  id: number
  name: string
}

interface SizeTypesResponse {
  success: boolean
  data: SizeType[]
}

export const fetchSizeTypes = async (): Promise<SizeType[]> => {
  const { data: response } = await axios.get<SizeTypesResponse>(
    "/v1/epi-size-types",
    { params: { limit: 999999 } }
  )

  if (!isObject(response) || !response.success) {
    throw new Error("Response failed")
  }

  return response.data
}

// 🔹 Submit de EPIs
export const submit = async (payload: any, id?: number): Promise<void> => {
  const { data: response } = id
    ? await axios.put(`/v1/epi-sizes/${id}`, payload)
    : await axios.post("/v1/epi-sizes", payload)

  if (!isObject(response) || !response.success) {
    throw new Error("Falha ao salvar EPI")
  }
}
