export interface ColletData {
  form: {
    id: number
    name: string
  }
  registry_id: number
  fields: Fields[]
}

interface Fields {
  field_id: number
  field_name: string
  field_type: string
  answers: AnswersObj[] | string[]
  children: Children[]
}

interface AnswersObj {
  id: number
  url: string
  status: number
}

interface Children {
  title: string
  fields: Fields[]
}

export interface AnswerProps {
  id?: number
  url?: string | null
  status?: number | string | null | any
  hash?: string | null | any
}
