import { isArray, isObject } from 'lodash'
import moment from 'moment'

import { getToken } from '../../../../utils'
import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { BodyInterface, DataInterface, Recipient } from './interfaces'

const getRecipients = (
  recipient_peoples: DataInterface['message_recipient_peoples'],
  recipient_stores: DataInterface['message_recipient_stores'],
): BodyInterface['recipients'] => {
  const parseRecipient = (
    parsed: BodyInterface['recipients'],
    data: Omit<DataInterface['message_recipient_peoples'][number], 'people'>,
    idName: {
      id: number
      name: string
    },
  ) => {
    const isCopy = booleanOrDefault(data.is_copy, false)

    const recipient: Recipient = {
      ...idName,
      type: 'people' as const,
      visualized_at: dateOrDefault(
        data.visualized_at,
        null,
        'YYYY-MM-DD HH:mm:ss',
      ),
      visualized_at_formatted: '-',
    }

    if (recipient.visualized_at) {
      const date = moment(recipient.visualized_at)
      recipient.visualized_at_formatted = date.format(
        `${
          date.isSame(now, 'day')
            ? '[Hoje]'
            : date.isSame(now, 'year')
            ? 'ddd DD [de] MMM'
            : 'ddd DD/MM/YYYY'
        } [às] HH:mm:ss`,
      )
    }

    isCopy ? parsed.copy.push(recipient) : parsed.main.push(recipient)

    const total = parsed.main.length + parsed.copy.length
    const visualized = parsed.visualized + (recipient.visualized_at ? 1 : 0)
    const visualized_percent = Math.floor((visualized * 100) / total)

    return {
      ...parsed,
      names: [...parsed.names, idName.name],
      total,
      visualized,
      visualized_percent,
    }
  }

  let recipients = recipient_peoples.reduce<BodyInterface['recipients']>(
    (parsed, data) => {
      if (!isObject(data) || !isObject(data.people)) return parsed

      const id = numberOrDefault(data.people.id)
      const name = notEmptyStringOrDefault(data.people.name)
      if (!id || !name) return parsed
      return parseRecipient(parsed, data, { id, name })
    },
    {
      main: [],
      copy: [],
      names: [],
      total: 0,
      visualized: 0,
      visualized_percent: 0,
    },
  )

  recipients = recipient_stores.reduce<BodyInterface['recipients']>(
    (parsed, data) => {
      if (!isObject(data) || !isObject(data.store)) return parsed

      const id = numberOrDefault(data.store.id)
      const name = notEmptyStringOrDefault(data.store.name)
      if (!id || !name) return parsed

      return parseRecipient(parsed, data, { id, name })
    },
    recipients,
  )

  return recipients
}

const profilePicUrl = '/assets/images/profile.png'

const now = new Date()

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface): BodyInterface => {
  const logged_user = getToken(true)

  const parsed: BodyInterface = {
    id: numberOrDefault(data.id),
    important:
      isObject(data._info) && booleanOrDefault(data._info.is_important),
    type: notEmptyStringOrDefault(data.type) === 'M' ? 'Msg' : 'Post',
    subject: notEmptyStringOrDefault(data.subject),
    date: notEmptyStringOrDefault(data.created_at),
    highlight_start: dateOrDefault(
      data.highlight_start,
      null,
      'YYYY-MM-DD',
      'YYYY-MM-DD',
    ),
    highlight_end: dateOrDefault(
      data.highlight_end,
      null,
      'YYYY-MM-DD',
      'YYYY-MM-DD',
    ),
    highlight_formatted: '-',
    highlight_in_progress: false,
    paused: booleanOrDefault(data.paused, false),
    sender: {
      id: null,
      name: null,
      avatar: profilePicUrl,
      is_logged_user: false,
    },
    recipients: {
      main: [],
      copy: [],
      names: [],
      total: 0,
      visualized: 0,
      visualized_percent: 0,
    },
    body: notEmptyStringOrDefault(data.body, '-'),
    posts: isArray(data.posts)
      ? data.posts.map((e) => ({
          url: e.url,
          subject: e.subject,
          note: e.note,
        }))
      : [],
    files: isArray(data.files)
      ? data.files.map(({ name, url }) => ({ name, url }))
      : [],
  }

  parsed.highlight_in_progress =
    parsed.highlight_start &&
    parsed.highlight_end &&
    moment(parsed.highlight_start).isBefore(now) &&
    moment(parsed.highlight_end).isAfter(now)

  if (isObject(data.sender) && isObject(data.sender.people)) {
    parsed.sender.id = numberOrDefault(data.sender.people.id)
    parsed.sender.name = notEmptyStringOrDefault(data.sender.people.name)
    parsed.sender.avatar = isObject(data.sender.people.avatar)
      ? notEmptyStringOrDefault(data.sender.people.avatar.avatar, profilePicUrl)
      : profilePicUrl
    parsed.sender.is_logged_user =
      logged_user.payload.people === parsed.sender.id
  }

  if (
    isArray(data.message_recipient_peoples) ||
    isArray(data.message_recipient_stores)
  ) {
    parsed.recipients = getRecipients(
      data.message_recipient_peoples,
      data.message_recipient_stores,
    )
  }

  if (parsed.highlight_start) {
    const highlight_start = moment(parsed.highlight_start)
    if (parsed.highlight_end) {
      const highlight_end = moment(parsed.highlight_end)
      parsed.highlight_formatted = [
        highlight_start.format(
          highlight_start.isSame(highlight_end, 'month')
            ? '[de] DD'
            : highlight_start.isSame(highlight_end, 'year')
            ? '[de] DD [de] MMMM'
            : '[de] DD [de] MMMM [de] YYYY',
        ),
        highlight_end.format('DD [de] MMMM [de] YYYY'),
      ].join(' à ')
    } else {
      parsed.highlight_formatted = highlight_start.format(
        '[desde] DD [de] MMMM [de] YYYY',
      )
    }
  } else if (parsed.highlight_end) {
    const highlight_end = moment(parsed.highlight_end)
    parsed.highlight_formatted = highlight_end.format(
      '[até] DD [de] MMMM [de] YYYY',
    )
  }

  return parsed
}

export default parser
