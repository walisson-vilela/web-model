import { Type, Types } from './interfaces'

export const types: Types = ['document', 'people_id', 're']

export const labels: { [key in Type]: string } = {
  document: 'CPF',
  people_id: 'ID Giv',
  re: 'Matrícula',
}
