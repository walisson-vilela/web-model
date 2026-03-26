import addressType, { AddressType } from '../../constants/addressType'
import BRAZILIAN_STATES, { UfAcronym, UfFull } from '../../constants/uf'
import { notEmptyString } from '../validators'

export const cepFormatter = (cep: string): string =>
  cep
    /* Remove todos os caracteres não numéricos da string */
    .replace(/\D/g, '')
    /* Filtra os 8 primeiros dígitos */
    .substring(0, 8)
    /* Aplica a formatação utilizando a expressão regular */
    .replace(/^(\d{5})(\d)/, '$1-$2')

export const addressTypeOrDefault = (
  value: unknown,
  defaultValue: AddressType | string,
): AddressType | string => {
  if (notEmptyString(value)) {
    const trimmed = value.trim()

    if (addressType.includes(trimmed as any)) {
      return trimmed as AddressType
    }
  }

  return defaultValue
}

export const ufAcronymOrDefault = (
  value: unknown,
  defaultValue: UfAcronym | string,
): UfAcronym | string => {
  if (notEmptyString(value)) {
    const trimmed = value.trim()

    if (BRAZILIAN_STATES.acronym.includes(trimmed as any)) {
      return trimmed as UfAcronym
    }
  }

  return defaultValue
}

export const ufFullOrDefault = (
  value: unknown,
  defaultValue: UfFull | '' = '',
): UfFull | '' => {
  if (notEmptyString(value)) {
    const trimmed = value.trim()

    if (BRAZILIAN_STATES.full.includes(trimmed as any)) {
      return trimmed as UfFull
    }
  }

  return defaultValue
}
