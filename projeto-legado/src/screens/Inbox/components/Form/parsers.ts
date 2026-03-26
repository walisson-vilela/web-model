import { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import { getHTMLImageIds } from '../../../../components/TextEditor/functions'
import { getToken } from '../../../../utils'
import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { FormState, FormValues, Recipients, SavePayload } from './interfaces'

const parsePeopleAsRecipient = (
  recipient: unknown,
  logged_user: number,
): Recipients | null => {
  if (!isObject(recipient) || !isObject(recipient.people)) return null

  const id = numberOrDefault(recipient.people.id)
  if (!id || id === logged_user) return null

  const parsed: Recipients = {
    link_type: 'peoples',
    id,
    name: notEmptyStringOrDefault(recipient.people.name, '-'),
    formatted_address: `${recipient.people.id} | ${
      isObject(recipient.people.role)
        ? notEmptyStringOrDefault(recipient.people.role.name, '-')
        : '-'
    }`,
  }

  return parsed
}

const parseStoreAsRecipient = (recipient: unknown): Recipients | null => {
  if (!isObject(recipient) || !isObject(recipient.store)) return null

  const id = numberOrDefault(recipient.store.id)
  if (!id) return null

  const parsed: Recipients = {
    link_type: 'stores',
    id,
    name: notEmptyStringOrDefault(recipient.store.name, '-'),
    subtitle: `${recipient.store.id} | ${
      isObject(recipient.store.segment)
        ? notEmptyStringOrDefault(recipient.store.segment.name, '-')
        : '-'
    }`,
    formatted_address: notEmptyStringOrDefault(
      recipient.store.formatted_address,
      '',
    ),
  }

  return parsed
}

export const parseMessage = (
  data: GenericObject,
  tab: 'reply' | 'reply-all' | 'forward',
): Partial<FormState> => {
  const logged_user = getToken(true)

  const parsed: Partial<FormState> = {
    type: 'M',

    recipients: [],
    copyRecipients: [],
    subject: notEmptyStringOrDefault(data.subject, ''),
    body: '',
    files: [],
    posts: [],

    recipientType: 'P',
    showCopy: false,
    reply: {
      title: '',
      body: '',
    },
  }

  if (tab === 'forward') {
    parsed.subject = `Enc: ${parsed.subject}`
    parsed.body = notEmptyStringOrDefault(data.body, '')
  } else {
    parsed.subject = `Re: ${parsed.subject}`

    const sender = parsePeopleAsRecipient(
      data.sender,
      logged_user.payload.people,
    )
    if (!sender) throw new Error('Could not get message sender')
    parsed.recipients.push(sender)

    if (tab === 'reply-all') {
      if (Array.isArray(data.message_recipient_peoples)) {
        data.message_recipient_peoples.forEach((people) => {
          const recipient = parsePeopleAsRecipient(
            people,
            logged_user.payload.people,
          )
          if (!recipient) return

          const isCopy = booleanOrDefault(people.is_copy, false)

          isCopy
            ? parsed.copyRecipients.push(recipient)
            : parsed.recipients.push(recipient)
        })
      }
      if (Array.isArray(data.message_recipient_stores)) {
        data.message_recipient_stores.forEach((store) => {
          const recipient = parseStoreAsRecipient(store)
          if (!recipient) return

          const isCopy = booleanOrDefault(store.is_copy, false)

          isCopy
            ? parsed.copyRecipients.push(recipient)
            : parsed.recipients.push(recipient)
        })
      }
    }

    const created_at = dateOrDefault(
      data.created_at,
      '-',
      'ddd - DD [de] MMM [de] YYYY [às] HH:mm',
    )
    parsed.reply.title = `Em ${created_at}. ${sender.name} escreveu`
    parsed.reply.body = notEmptyStringOrDefault(data.body, '-')
  }

  parsed.showCopy = parsed.copyRecipients.length > 0

  parsed.recipientType =
    parsed.recipients.length === 0 ||
    parsed.recipients.some((r) => r.link_type === 'peoples')
      ? 'P'
      : 'S'

  return parsed
}

export const saveParser = (
  data: FormValues,
  parent_id: number | null,
): SavePayload => {
  const parsed: SavePayload = {
    ...(parent_id ? { parent_id } : {}),
    type: data.type,
    subject: data.subject,
    recipients: [
      ...data.recipients.map((e) => ({
        link_type: e.link_type,
        link_id: e.id,
        is_copy: '0' as const,
      })),
      ...data.copyRecipients.map((e) => ({
        link_type: e.link_type,
        link_id: e.id,
        is_copy: '1' as const,
      })),
    ],
  }

  if (data.highlightDate[0]) {
    parsed.highlight_start = moment(data.highlightDate[0]).format('YYYY-MM-DD')
  }

  if (data.highlightDate[1]) {
    parsed.highlight_end = moment(data.highlightDate[1]).format('YYYY-MM-DD')
  }

  if (data.type === 'M') {
    parsed.body = data.body
    parsed.body_image_ids = getHTMLImageIds(parsed.body)
    parsed.file_ids = data.files.reduce(
      (prev, file) => [...prev, ...('id' in file ? [file.id] : [])],
      [],
    )
  } else {
    parsed.posts = data.posts.reduce(
      (prev, post) => [
        ...prev,
        ...('id' in post.image
          ? [
              {
                file_id: post.image.id,
                subject: post.subject,
                note: post.note,
              },
            ]
          : []),
      ],
      [],
    )
  }

  return parsed
}
