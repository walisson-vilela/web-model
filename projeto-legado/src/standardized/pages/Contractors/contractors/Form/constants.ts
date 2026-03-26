import { cover_file, duo_file, single_file } from './images'
import { ContractorLicenses, PPTTemplates } from './types'

export const PPT_TEMPLATES: Readonly<PPTTemplates> = {
  cover_content: {
    file_key: 'cover_file',
    type: 'cover_content',
    color: '#000000',
    name: cover_file.split('/').slice(-1)[0],
    url: cover_file,
  },
  cover_information: {
    file_key: 'duo_file',
    type: 'cover_information',
    color: '#000000',
    name: duo_file.split('/').slice(-1)[0],
    url: duo_file,
  },
  header_place: {
    file_key: 'single_file',
    type: 'header_place',
    color: '#000000',
    name: single_file.split('/').slice(-1)[0],
    url: single_file,
  },
} as const

export const HIERARCHIES: ContractorLicenses['hierarchies'] = [
  {
    id: 1,
    name: 'Trade Marketing',
  },
  {
    id: 3,
    name: 'Comercial',
  },
  {
    id: 5,
    name: 'Marketing',
  },
]
