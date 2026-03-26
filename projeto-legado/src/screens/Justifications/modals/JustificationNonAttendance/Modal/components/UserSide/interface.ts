export interface UserProps {
  id: number
  created_at: string | null
  start: string | null
  end: string | null
  impact_days: number | null
  audit_due_date: string | null
  file: Files | null
  justify_type: JustifyType | null
  audit: Audit | null
  people: People | null
}

interface Files extends File {
  id: number
  url: string
}

interface JustifyType {
  id: number | null
  name: string | null
  default: boolean | null
  type: number | null
}

interface Audit {
  id: string
  status: 'Aprovado' | 'Reprovado' | 'Expirado'
  obs: string
  creator: Creator
}

interface Creator {
  id: number
  name: string
}

interface People {
  id: number
  name: string
  routes: Routes[]
  supervisor: Supervisor
  role: Role
}

interface Routes {
  name: string
  region: Region | null
}

interface Region {
  id: number
  name: string
}

interface Supervisor {
  name: string
}

interface Role {
  id: number
  name: string
}

export interface FormProps {
  id: number
  name: string
  type: number
}

export interface PayloadData {
  justify_type_id: FormProps | null
  audit: {
    status: string
    obs: string
  }
  file: Files | File | null
}
