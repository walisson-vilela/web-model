import { Control } from 'react-hook-form'

type Form = {
  allocated_users: number | ''
}

export type UserAlocationProps = {
  control: Control<Form>
  isInvalid: (field: keyof Form) => boolean
  viewMode?: boolean

  type: 'contas' | 'agrupamento'
}
