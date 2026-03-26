export type SubItem = {
  name: string
  target: string
}

export type Item = {
  id: number
  name: string
  icon: string
  target: string
  children: SubItem[]
}

export type Contractor = {
  id: number
  account_id: number | null
  nickname: string
  company_name: string
  document: string | null
  avatar: {
    name: string
    url: string
  } | null
  type: string
  type_label: string
}

export type User = {
  id: number
  name: string
  username: string
  role: {
    id: number
    name: string
  } | null
  avatar: string
}

export type HeaderItemComponent = React.FC<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & { disabled: boolean }
>
