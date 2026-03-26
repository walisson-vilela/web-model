export interface DataInterface {
  id?: number | null
  parent_id?: number | null
  type?: string | null
  type_text?: string | null
  subject?: string | null
  body?: string | null
  highlight_start?: string | null
  highlight_end?: string | null
  paused?: boolean | null
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
        store?: {
          id?: number | null
          name?: string | null
        } | null
        is_copy?: boolean | null
        visualized_at?: string | null
      }[]
    | null

  message_recipient_peoples:
    | {
        id?: number | null
        message_id?: number | null
        is_important?: boolean | null
        people?: {
          id?: number | null
          name?: string | null
          people_id_name?: string | null
        } | null
        is_copy?: boolean | null
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

export type Recipient = {
  id: number
  name: string
  type: 'people' | 'store'
  visualized_at: string | null
  visualized_at_formatted: string
}

export interface BodyInterface {
  id: number | null
  important: boolean | null
  type: string | null
  subject: string | null
  date: string | null
  highlight_start: string | null
  highlight_end: string | null
  highlight_formatted: string
  highlight_in_progress: boolean
  paused: boolean
  sender: {
    avatar: string | null
    name: string | null
    id: number | null
    is_logged_user: boolean
  }
  recipients: {
    main: Recipient[]
    copy: Recipient[]
    names: string[]
    total: number
    visualized: number
    visualized_percent: number
  }
  body: string | null
  posts: {
    url: string
    subject: string
    note: string
  }[]
  files: {
    name: string
    url: string
  }[]
}
