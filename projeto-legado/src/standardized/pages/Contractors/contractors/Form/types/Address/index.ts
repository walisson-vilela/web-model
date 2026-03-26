export interface Coordinates {
  postal_code: string
  street_type: string
  street_address: string
  street_number: string
  complement: string
  sublocality: string
  city: string
  state: string

  lat: number
  lng: number
  radius: number
}

export interface AddressData {
  postal_code: string // cep
  street_type: string // tipo de logradouro
  street_address: string // endereco
  street_number: string // numero
  complement: string // complemento
  sublocality: string // bairro
  city: string // cidade
  state: string // UF
}
