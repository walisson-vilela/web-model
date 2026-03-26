import React from 'react'

import moment from 'moment'
import { Button, Popup } from 'semantic-ui-react'

import ProgressColumn from '../../../components/ProgressColumn'
import { download } from '../../../utils/DownloadFile'
import {
  dateOrDefault,
  humanFileSize,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isNumber, isObject } from '../../../utils/Validators'
import { ChannelEvents } from '../../../utils/hooks'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  const now = moment().utc(true)
  return data.map((e): BodyInterface => {
    const parsed: BodyInterface = {
      id: numberOrDefault(e.id),
      name: notEmptyStringOrDefault(e.name),
      type: notEmptyStringOrDefault(e.type),
      expire_date: dateOrDefault(e.expire_date),
      extension: notEmptyStringOrDefault(e.extension),
      progress: numberOrDefault(e.progress),
      status: notEmptyStringOrDefault(e.status),
      type_label: notEmptyStringOrDefault(e.type_label),
      extension_label: notEmptyStringOrDefault(e.extension_label),
      status_label: notEmptyStringOrDefault(e.status_label),
      fullname: notEmptyStringOrDefault(e.fullname),
      file: isObject(e.file)
        ? {
            id: numberOrDefault(e.file.id),
            url: notEmptyStringOrDefault(e.file.url),
            size: numberOrDefault(e.file.size),
          }
        : null,

      expire_date_txt: null,
      size_txt: null,
      progress_jsx: null,
    }

    if (e.expire_date) {
      parsed.expire_date_txt = moment(e.expire_date)
        .utc(false)
        .endOf('day')
        .from(now, true)
    }

    if (parsed.status === 'F' && parsed.file && parsed.file.url) {
      const fname = parsed.name + '.' + parsed.extension
      parsed.progress_jsx = (
        <Button
          size={'tiny'}
          onClick={() => download(parsed.file.url, fname)}
          primary
        >
          Download
        </Button>
      )

      if (isNumber(parsed.file.size)) {
        if (parsed.file.size > 0) {
          parsed.size_txt = `${humanFileSize(parsed.file.size)}`
        } else {
          parsed.size_txt = `0 B`
        }
      }
    } else if (parsed.status === 'C') {
      parsed.progress_jsx = (
        <Popup
          content='Download cancelado pelo Sistema.'
          trigger={<div>Cancelado</div>}
          position='top center'
          inverted
        />
      )
    } else if (isNumber(parsed.progress)) {
      parsed.progress_jsx = (
        <ProgressColumn percent={parsed.progress} color='#66BB6A' animated />
      )
    }

    return parsed
  })
}

export const updateData = (
  data: BodyInterface[],
  setData: React.Dispatch<React.SetStateAction<DataInterface[]>>,
  addEvents: (channel_id: string, events: ChannelEvents) => void,
  CHANNEL_ID: string,
) => {
  const onProgress = async (data: any) => {
    if (!isObject(data)) return

    setData((prev: DataInterface[]) => {
      const newState = [...prev]

      const index = newState.findIndex((e) => (e.id = data.id))

      if (index === -1) return newState

      newState[index] = { ...newState[index], ...data }

      return newState
    })
  }

  data.forEach((item) => {
    addEvents(CHANNEL_ID, {
      [item.id]: onProgress,
    })
  })
}

export default parser
