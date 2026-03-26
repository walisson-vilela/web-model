import * as Yup from 'yup'

import addressType, { AddressType } from '../../../../constants/addressType'
import BRAZILIAN_STATES, { UfAcronym } from '../../../../constants/uf'

import { IAddress } from './interfaces'

export const addressSchema = Yup.object<IAddress>().shape({
  // Address
  postal_code: Yup.string()
    .matches(/^\d{5}-\d{3}$/i)
    .required(),
  street_type: Yup.mixed<AddressType>().oneOf(addressType).required(),
  street_address: Yup.string().required(),
  street_number: Yup.string().required(),
  complement: Yup.string().optional(),
  sublocality: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.mixed<UfAcronym>().oneOf(BRAZILIAN_STATES.acronym).required(),

  // Geolocation
  lat: Yup.string().required(),
  lng: Yup.string().required(),
  radius: Yup.number().required(),

  geolocation_at: Yup.string().optional().nullable(),
  geolocation_by_id: Yup.number().optional().nullable(),
  geolocation_by_name: Yup.string().optional().nullable(),
})
