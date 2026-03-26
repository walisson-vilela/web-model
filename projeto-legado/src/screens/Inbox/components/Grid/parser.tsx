import { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import { getToken } from '../../../../utils'
import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject, notEmptyString } from '../../../../utils/Validators'

import { BodyInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: GenericObject[]): BodyInterface[] => {
  const logged_user = getToken(true)

  return data.map((e) => {
    const parsed: BodyInterface = {
      id: numberOrDefault(e.id),
      important:
        isObject(e.recipient) && booleanOrDefault(e.recipient.is_important),
      type: notEmptyStringOrDefault(e.type) === 'M' ? 'Msg' : 'Post',
      sender: null,
      subject: notEmptyStringOrDefault(e.subject),
      body: notEmptyStringOrDefault(e.body),
      date: dateOrDefault(e.created_at, null, 'YYYY-MM-DD HH:mm:ss'),
      date_formatted: '-',
      file_count: numberOrDefault(e.file_count),
      readed: true,
      recipients: [
        ...(Array.isArray(e.message_recipient_peoples)
          ? e.message_recipient_peoples
          : []
        ).reduce((prev, e) => {
          if (!isObject(e) || !isObject(e.people)) return prev
          const name = notEmptyStringOrDefault(e.people.name, '')
          if (!name) return prev
          return [...prev, name.split(' ')[0]]
        }, []),
        ...(Array.isArray(e.message_recipient_stores)
          ? e.message_recipient_stores
          : []
        ).reduce((prev, e) => {
          if (!isObject(e) || !isObject(e.store)) return prev
          const name = notEmptyStringOrDefault(e.store.name)
          if (!name) return prev
          return [...prev, name.split(' ')[0]]
        }, []),
      ],
      sender_is_logged_user: false,
    }

    if (isObject(e.sender) && isObject(e.sender.people)) {
      parsed.sender = notEmptyStringOrDefault(e.sender.people.name)
      parsed.sender_is_logged_user =
        numberOrDefault(e.sender.people.id) === logged_user.payload.people
    }

    parsed.readed =
      parsed.sender_is_logged_user ||
      (isObject(e.recipient) && notEmptyString(e.recipient.visualized_at))

    if (parsed.date) {
      const date = moment(parsed.date, undefined, true)
      const now = new Date()
      parsed.date_formatted = date.format(
        `${
          date.isSame(now, 'day')
            ? ''
            : date.isSame(now, 'month')
            ? 'DD [às] '
            : date.isSame(now, 'year')
            ? 'DD [de] MMM [às] '
            : 'DD [de] MMM [de] YYYY [às] '
        }HH:mm`,
      )
    }

    return parsed
  })
}

export default parser
