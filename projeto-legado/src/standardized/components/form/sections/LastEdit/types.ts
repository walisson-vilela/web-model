export type ContainerProps = {
  padding?: '0'
}

export type LastEditProps = {
  date?: string | null
  user?: {
    id?: number | string | null
    name?: string | null
  } | null
} & ContainerProps
