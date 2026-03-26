export interface DataInterface {
  id?: number | string
  name?: string
  type?: string
  expire_date?: string
  extension?: string
  progress?: number | string
  status?: string
  type_label?: string
  extension_label?: string
  status_label?: string
  fullname?: string
  file?: {
    id?: number | string
    url?: string
    size?: number | string
  }
}

export interface BodyInterface {
  id: number
  name: string
  type: string
  expire_date: string
  extension: string
  progress: number
  status: string
  type_label: string
  extension_label: string
  status_label: string
  fullname: string
  file: {
    id: number
    url: string
    size: number
  }

  expire_date_txt: string
  size_txt: string
  progress_jsx: JSX.Element | string | null
}
