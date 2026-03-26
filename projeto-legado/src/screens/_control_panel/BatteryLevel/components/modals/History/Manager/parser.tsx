import React from 'react'

import moment from 'moment'

import Bullet from '../../../../../../../components/Bullet'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { BodyBattery, DataBattery } from '../interface'

import { activityLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataBattery[]): BodyBattery[] => {
  return data.map((e) => ({
    activity_status: numberOrDefault(e.activity_status) ? null : (
      <Bullet
        color={activityLabels[e.activity_status].color}
        content={activityLabels[e.activity_status].name}
      />
    ),
    battery_consumption: notEmptyStringOrDefault(e.battery_consumption),
    battery_level: notEmptyStringOrDefault(e.battery_level),
    mobile_date: moment(e.mobile_date).format('HH:mm'),
  }))
}

export default parser
