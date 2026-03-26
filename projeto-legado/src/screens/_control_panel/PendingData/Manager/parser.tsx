import React from 'react'

import moment from 'moment'

import Bullet from '../../../../components/Bullet'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import ActivityStatus from './components/ActivityStatus'
import { BodyInterface, DataInterface } from './interfaces'
import { status } from './labels'

const today = moment()
const yesterday = today.clone().subtract(1, 'day')

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
/*
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      people_name: notEmptyStringOrDefault(e.people_name),
      role_name: notEmptyStringOrDefault(e.role_name),
      active: booleanOrDefault(e.active),
      supervisor: notEmptyStringOrDefault(e.supervisor),
      supervisor_hierarchy: notEmptyStringOrDefault(e.supervisor_hierarchy),
      connection_type: notEmptyStringOrDefault(e.connection_type),
      notification_date: dateOrDefault(e.notification_date),
      image_count: numberOrDefault(e.image_count),
      data_count: numberOrDefault(e.data_count),
      connection_level: numberOrDefault(e.connection_level),

      active_jsx: null,
      notification_date_txt: null,
      image_count_txt: null,
      data_count_txt: null,
      connection_level_jsx: <S.Container><div>-</div><S.Circle /></S.Container>,
    }

    if (isBoolean(item.active)) {
      const { color, name } = { ...statusLabels[item.active.toString()] }
      item.active_jsx = <Bullet color={color} content={name} />
    }

    if (notEmptyString(item.notification_date)) {
      const date = moment(item.notification_date)
      if (date.isValid()) {
        const format = date.format('DD/MM/YY HH:mm:ss').split(' ')
        if (date.isSame(today, 'date')) {
          format[0] = 'Hoje'
        }
        else if (date.isSame(yesterday, 'date')) {
          format[0] = 'Ontem'
        }
        item.notification_date_txt = format.join(' às ')
      }
    }

    if (isNumber(item.image_count)) {
      item.image_count_txt = item.image_count.toString().padStart(2, '0')
    }

    if (isNumber(item.data_count)) {
      item.data_count_txt = item.data_count.toString().padStart(2, '0')
    }

    if (isNumber(item.connection_level) && item.connection_level in connectionLevelLabels) {
      const { color, name } = { ...connectionLevelLabels[item.connection_level] }

      if (item.connection_level === 1) {
        item.connection_level_jsx = <Popup
          on='click'
          trigger={<S.Container linked>
            <div>{name}</div>
            <S.Circle color={color} />
          </S.Container>}
          content={<React.Fragment>
            Data análise: 15/01/2022
            <br />
            <br />
            Percentual de falhas
            <br />
            <S.BiggerText>53,2% </S.BiggerText>(53/100)
          </React.Fragment>}
          inverted
          position='left center'
        />
      }
      else {
        item.connection_level_jsx = <S.Container>
          <div>{name}</div>
          <S.Circle color={color} />
        </S.Container>
      }
    }

    return item;
  })
}

*/

const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((item) => {
    let parsedItem: BodyInterface = {
      people_name: notEmptyStringOrDefault(item.people_name),
      role_name: notEmptyStringOrDefault(item.role_name),
      active_status: notEmptyStringOrDefault(item.active_status) ? (
        <Bullet
          color={status[item.active_status].color}
          content={status[item.active_status].name}
        />
      ) : null,
      supervisor_name: notEmptyStringOrDefault(item.supervisor_name),
      supervisor_hierarchy: notEmptyStringOrDefault(item.supervisor_hierarchy),
      connection_type: notEmptyStringOrDefault(item.connection_type),
      notification_date: notEmptyStringOrDefault(item.notification_date),
      images_count: numberOrDefault(item.images_count),
      data_count: numberOrDefault(item.data_count),
      connection_level_status: notEmptyStringOrDefault(
        item.connection_level_status,
      ) ? (
        <ActivityStatus id={212045} status={item.connection_level_status} />
      ) : null,
    }

    return parsedItem
  })
}
export default parser
