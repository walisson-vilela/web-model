import { BodyInterface } from './interfaces'

const UNKNOWN_TYPOLOGY_ID = 1

export const isUnknownTypology = (typology: BodyInterface): boolean => {
  return typology.default_id === UNKNOWN_TYPOLOGY_ID
}
