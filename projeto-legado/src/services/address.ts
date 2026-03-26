import axios from '../services/Axios'
import { cep as formatCEP, notEmptyStringOrDefault } from '../utils/Formatters'
import { isObject, isOneOf } from '../utils/Validators'

const states = [
  'AC' as const,
  'AL' as const,
  'AP' as const,
  'AM' as const,
  'BA' as const,
  'CE' as const,
  'DF' as const,
  'ES' as const,
  'GO' as const,
  'MA' as const,
  'MT' as const,
  'MS' as const,
  'MG' as const,
  'PA' as const,
  'PB' as const,
  'PR' as const,
  'PE' as const,
  'PI' as const,
  'RJ' as const,
  'RN' as const,
  'RS' as const,
  'RO' as const,
  'RR' as const,
  'SC' as const,
  'SP' as const,
  'SE' as const,
  'TO' as const,
]

const street_types = [
  'Acesso' as const,
  'Aeroporto' as const,
  'Alameda' as const,
  'Área' as const,
  'Avenida' as const,
  'Campo' as const,
  'Chácara' as const,
  'Colônia' as const,
  'Condomínio' as const,
  'Conjunto' as const,
  'Distrito' as const,
  'Esplanada' as const,
  'Estação' as const,
  'Estrada' as const,
  'Favela' as const,
  'Fazenda' as const,
  'Feira' as const,
  'Jardim' as const,
  'Ladeira' as const,
  'Lago' as const,
  'Lagoa' as const,
  'Largo' as const,
  'Loteamento' as const,
  'Morro' as const,
  'Núcleo' as const,
  'Parque' as const,
  'Passarela' as const,
  'Pátio' as const,
  'Praça' as const,
  'Praia' as const,
  'Quadra' as const,
  'Recanto' as const,
  'Residencial' as const,
  'Rodovia' as const,
  'Rua' as const,
  'Setor' as const,
  'Sítio' as const,
  'Travessa' as const,
  'Trecho' as const,
  'Trevo' as const,
  'Vale' as const,
  'Vereda' as const,
  'Via' as const,
  'Viaduto' as const,
  'Viela' as const,
  'Vila' as const,
]

interface AddressData {
  postal_code: string
  street_type: string
  street_address: string
  street_number: string
  complement: string
  sublocality: string
  city: string
  state: string
}

export const getAddressByCoordinates = async (payload: {
  lat: number
  lng: number
}): Promise<Partial<AddressData>> => {
  const { lat, lng } = payload

  const res = await axios.get(`addresses/proximity/${lat},${lng}.json`, {
    params: { provider: 'google' },
  })

  if (!isObject(res.data) || !res.data.success) {
    throw new Error('Request returned no success!')
  }

  if (!Array.isArray(res.data.data) || res.data.data.length === 0) {
    throw new Error('Request returned an invalid data!')
  }

  const data: Partial<AddressData> = {}

  const postal_code = formatCEP(
    notEmptyStringOrDefault(res.data.data[0].postal_code, ''),
  )
  if (postal_code) data.postal_code = postal_code

  const street_address = notEmptyStringOrDefault(res.data.data[0].address, '')
  if (street_address) data.street_address = street_address

  const street_number = notEmptyStringOrDefault(
    res.data.data[0].number,
    '',
  ).replace(/\D/g, '')
  if (street_number) data.street_number = street_number

  const complement = notEmptyStringOrDefault(res.data.data[0].complement, '')
  if (complement) data.complement = complement

  const sublocality = notEmptyStringOrDefault(res.data.data[0].locality, '')
  if (sublocality) data.sublocality = sublocality

  const city = notEmptyStringOrDefault(res.data.data[0].city, '')
  if (city) data.city = city

  const state = notEmptyStringOrDefault(res.data.data[0].state_short, '')
  if (isOneOf(state, states)) {
    data.state = state
  }

  const street_type = notEmptyStringOrDefault(res.data.data[0].type, '')
  if (isOneOf(street_type, street_types)) {
    data.street_type = street_type
  }

  return data
}
