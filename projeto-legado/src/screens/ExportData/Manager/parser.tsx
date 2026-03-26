import React from 'react'

import momentjs from 'moment'
import { Button } from 'semantic-ui-react'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import { BodyInterface, DataInterface } from './interfaces'

const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((item: DataInterface) => {
    const parsed: BodyInterface = {
      id: numberOrDefault(item.id),
      link: notEmptyStringOrDefault(item.link, ''),
      created_at: momentjs(item.created_at)
        .subtract(3, 'hours')
        .format('DD/MM/YYYY  HH:mm:ss'),
      execution_start: item.execution_start
        ? momentjs(item.execution_start).format('DD/MM/YYYY  HH:mm:ss')
        : '',
      name: null,
      status: null,
      user: {
        people: {
          name: null,
        },
      },
    }
    if (isObject(item.user)) {
      ;(parsed.name = notEmptyStringOrDefault(item.user.people.name, '')),
        (parsed.user.people.name = notEmptyStringOrDefault(
          item.user.people.name,
          '',
        ))
    }

    if (item.status === 'C' && notEmptyStringOrDefault(item.link)) {
      parsed.status = (
        <Button
          href={parsed.link}
          target='_blank'
          download={parsed.link.split('/').pop()}
          primary
        >
          {' '}
          Download{' '}
        </Button>
      )
    } else if (item.status === 'P') {
      parsed.status = 'Pendente'
    } else if (item.status === 'E') {
      parsed.status = 'Executando'
    }

    return parsed
  })
}
export default parser
