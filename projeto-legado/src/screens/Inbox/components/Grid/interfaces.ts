export type Filter = '' | 'read' | 'unread' | 'only_post' | 'only_messages'
export type Mode = 'inbox' | 'sent' | 'is_important'

export interface BodyInterface {
  id: number | null
  important: boolean | null
  type: string | null
  sender: string | null
  subject: string | null
  body: string | null
  date: string | null
  date_formatted: string | null
  file_count: number | null
  readed: boolean | null
  recipients: string[]
  sender_is_logged_user: boolean
}

export type Pagination = {
  has_next_page: boolean
  count: number
  start: number
  end: number
}
