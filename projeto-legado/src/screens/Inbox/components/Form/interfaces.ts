import { ModalState } from '../../../../components/MwModal'
import { FileUpload } from '../../../../utils/hooks/useFileUpload'

export type { TabComponent } from '../../types'

export interface Recipients {
  link_type: 'peoples' | 'stores'
  id: number
  name: string
  formatted_address?: string
  subtitle?: string
}

export interface Post {
  preview: string
  image: FileUpload
  subject: string
  note: string
}

export interface PromiseReturn {
  success: boolean
  data: {
    file: File
    base64: string
  } | null
}

export interface DataInterface {
  id?: number | null
  parent_id?: number | null
  type?: string | null
  type_text?: string | null
  subject?: string | null
  body?: string | null
  highlight_start?: string | null
  highlight_end?: string | null
  created_at?: string | null

  parent?: {
    id?: number | null
    name?: string | null
    people_id_name?: string | null
  } | null

  message_recipient_stores?:
    | {
        id?: number | null
        message_id?: number | null
        is_copy?: boolean | null
        store?: {
          id?: number | null
          name?: string | null
          segment?: {
            name?: string | null
          }
        } | null
        visualized_at?: string | null
      }[]
    | null

  message_recipient_peoples:
    | {
        id?: number | null
        message_id?: number | null
        is_important?: boolean | null
        is_copy?: boolean | null
        people?: {
          id?: number | null
          name?: string | null
          people_id_name?: string | null
          role?: {
            name?: string | null
          }
        } | null
        visualized_at?: string | null
      }[]
    | null

  sender?: {
    id?: string | null
    message_id?: number | null
    is_important?: boolean | null
    people: {
      id?: number | null
      name?: string | null
      avatar?: {
        avatar?: string | null
      } | null
      people_id_name?: string | null
      role?: {
        name?: string | null
      }
    }
  } | null

  posts?: {
    id?: number | null
    message_id?: number | null
    url?: string | null
    subject?: string | null
    note?: string | null
  }[]

  files?: {
    id?: number | null
    name?: string | null
    message_id?: number | null
    url?: string | null
  }[]

  _info: {
    total_recipients?: number | null
    total_recipient_read?: number | null
    total_recipient_read_percentage?: number | null
    is_important?: boolean | null
  }
}

export type FormValues = {
  type: 'M' | 'P'
  recipients: Recipients[]
  copyRecipients: Recipients[]
  subject: string
  highlightDate: [string, string]
  body: string
  files: FileUpload[]
  posts: Post[]
}

export type FormControls = {
  modal: ModalState
  showCopy: boolean
  recipientType: 'P' | 'S'
  reply: {
    title: string
    body: string
  }
  loading: boolean
  editorDisabled: boolean
}

export type FormState = FormValues & FormControls

export type SavePayload = {
  parent_id?: number
  type: 'M' | 'P'
  subject: string
  recipients: {
    link_type: 'peoples' | 'stores'
    link_id: number
    is_copy: '1' | '0'
  }[]
  highlight_start?: string
  highlight_end?: string
  body?: string
  body_image_ids?: number[]
  file_ids?: number[]
  posts?: {
    file_id: number
    subject: string
    note: string
  }[]
}

export type UseFormSetter = <T extends keyof FormState>(
  state: T,
  value: Parameters<React.Dispatch<React.SetStateAction<FormState[T]>>>[0],
) => void

type UseFormResetter = (
  values?: Partial<{
    [K in keyof FormState]: Parameters<
      React.Dispatch<React.SetStateAction<FormState[K]>>
    >[0]
  }>,
) => void

export type UseFormReturn = {
  values: FormState
  set: UseFormSetter
  reset: UseFormResetter
}
