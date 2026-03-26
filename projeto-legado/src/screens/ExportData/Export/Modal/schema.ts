import { object } from 'yup'

import PDVSchema from './components/PDV/schema'

const schema = object().shape({
  PESSOAS: object().shape({}).nullable(),
  PRODUTOS: object().shape({}).nullable(),
  LOJAS: PDVSchema,
  ROTEIROS: object().shape({}).nullable(),
  HIERARQUIAS: object().shape({}).nullable(),
  MIX: object().shape({}).nullable(),
  CALENDARIOS: object().shape({}).nullable(),
})

export default schema
