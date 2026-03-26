import React from 'react'

import Bullet from '../../../../components/Bullet'
import ColoredColumn from '../../../../components/ColoredColumn'
import Popup from '../../../../components/ManagerColumnPopup'
import ProgressColumn from '../../../../components/ProgressColumn'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import Notification from './components/Notification'
import { BodyInterface, DataInterface } from './interfaces'
import { impactLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  const getColumnColor = (value: number): string => {
    if (value <= 90) return '#CC00CC'
    else if (value <= 110) return '#000000CC'
    else return '#EF5350'
  }

  return data.map((e) => {
    let parsed: BodyInterface = {
      id: numberOrDefault(e.id),
      impact: numberOrDefault(e.impact),
      impact_jsx: null,
      route_name: notEmptyStringOrDefault(e.route_name),
      people_id: numberOrDefault(e.people_id),
      people_name: notEmptyStringOrDefault(e.people_name),
      supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
      sunday_tmo: numberOrDefault(e.sunday_tmo),
      monday_tmo: numberOrDefault(e.monday_tmo),
      tuesday_tmo: numberOrDefault(e.tuesday_tmo),
      wednesday_tmo: numberOrDefault(e.wednesday_tmo),
      thursday_tmo: numberOrDefault(e.thursday_tmo),
      friday_tmo: numberOrDefault(e.friday_tmo),
      saturday_tmo: numberOrDefault(e.saturday_tmo),
      tmo_positive: numberOrDefault(e.tmo_positive),
      tmo_negative: numberOrDefault(e.tmo_negative),
      sunday_tmo_jsx: null,
      sunday_planned: numberOrDefault(e.sunday_planned),
      monday_tmo_jsx: null,
      monday_planned: numberOrDefault(e.monday_planned),
      tuesday_tmo_jsx: null,
      tuesday_planned: numberOrDefault(e.thursday_planned),
      wednesday_tmo_jsx: null,
      wednesday_planned: numberOrDefault(e.wednesday_planned),
      thursday_tmo_jsx: null,
      thursday_planned: numberOrDefault(e.thursday_planned),
      saturday_tmo_jsx: null,
      saturday_planned: numberOrDefault(e.saturday_planned),
      friday_tmo_jsx: null,
      friday_planned: numberOrDefault(e.friday_planned),
      tmo_positive_jsx: null,
      tmo_negative_jsx: null,
      monday_date: notEmptyStringOrDefault(e.monday_date),
      tuesday_date: notEmptyStringOrDefault(e.tuesday_date),
      wednesday_date: notEmptyStringOrDefault(e.wednesday_date),
      thursday_date: notEmptyStringOrDefault(e.thursday_date),
      friday_date: notEmptyStringOrDefault(e.friday_date),
      saturday_date: notEmptyStringOrDefault(e.saturday_date),
      sunday_date: notEmptyStringOrDefault(e.sunday_date),
    }

    parsed.impact_jsx = (
      <Bullet
        color={impactLabels[parsed.impact].color}
        content={impactLabels[parsed.impact].name}
      />
    )
    parsed.sunday_tmo_jsx =
      parsed.sunday_tmo !== null ? (
        <Popup
          inverted
          on='click'
          trigger={
            <ColoredColumn
              content={Math.ceil(parsed.sunday_tmo)}
              color={getColumnColor(parsed.sunday_tmo)}
            />
          }
          disabled={parsed.saturday_tmo === null}
          getContent={async () => (
            <Notification
              data={{
                day: 'Domingo',
                attendences: parsed.sunday_planned,
                attendenceDate: parsed.sunday_date,
              }}
            />
          )}
        />
      ) : (
        '-'
      )

    parsed.monday_tmo_jsx =
      parsed.monday_tmo !== null ? (
        <Popup
          inverted
          on='click'
          trigger={
            <ColoredColumn
              content={Math.ceil(parsed.monday_tmo)}
              color={getColumnColor(e.monday_tmo)}
            />
          }
          getContent={async () => (
            <Notification
              data={{
                day: 'Segunda-Feira',
                attendences: parsed.monday_planned,
                attendenceDate: parsed.monday_date,
              }}
            />
          )}
        />
      ) : (
        '-'
      )

    parsed.tuesday_tmo_jsx =
      parsed.tuesday_tmo !== null ? (
        <Popup
          inverted
          on='click'
          trigger={
            <ColoredColumn
              content={Math.ceil(parsed.tuesday_tmo)}
              color={getColumnColor(e.tuesday_tmo)}
            />
          }
          getContent={async () => (
            <Notification
              data={{
                day: 'Terça-Feira',
                attendences: parsed.tuesday_planned,
                attendenceDate: parsed.tuesday_date,
              }}
            />
          )}
        />
      ) : (
        '-'
      )

    parsed.wednesday_tmo_jsx =
      parsed.wednesday_tmo !== null ? (
        <Popup
          inverted
          on='click'
          trigger={
            <ColoredColumn
              content={Math.ceil(parsed.wednesday_tmo)}
              color={getColumnColor(e.wednesday_tmo)}
            />
          }
          getContent={async () => (
            <Notification
              data={{
                day: 'Quarta-Feira',
                attendences: parsed.wednesday_planned,
                attendenceDate: parsed.wednesday_date,
              }}
            />
          )}
        />
      ) : (
        '-'
      )

    parsed.thursday_tmo_jsx =
      parsed.thursday_tmo !== null ? (
        <Popup
          inverted
          on='click'
          trigger={
            <ColoredColumn
              content={Math.ceil(parsed.thursday_tmo)}
              color={getColumnColor(e.thursday_tmo)}
            />
          }
          getContent={async () => (
            <Notification
              data={{
                day: 'Quinta-Feira',
                attendences: parsed.thursday_planned,
                attendenceDate: parsed.thursday_date,
              }}
            />
          )}
        />
      ) : (
        '-'
      )

    parsed.friday_tmo_jsx =
      parsed.friday_tmo !== null ? (
        <Popup
          inverted
          on='click'
          trigger={
            <ColoredColumn
              content={Math.ceil(parsed.friday_tmo)}
              color={getColumnColor(e.friday_tmo)}
            />
          }
          getContent={async () => (
            <Notification
              data={{
                day: 'Sexta-Feira',
                attendences: parsed.friday_planned,
                attendenceDate: parsed.friday_date,
              }}
            />
          )}
        />
      ) : (
        '-'
      )

    parsed.saturday_tmo_jsx =
      parsed.saturday_tmo !== null ? (
        <Popup
          inverted
          on='click'
          trigger={
            <ColoredColumn
              content={Math.ceil(parsed.saturday_tmo)}
              color={getColumnColor(e.saturday_tmo)}
            />
          }
          getContent={async () => (
            <Notification
              data={{
                day: 'Sábado',
                attendences: parsed.saturday_planned,
                attendenceDate: parsed.saturday_date,
              }}
            />
          )}
        />
      ) : (
        '-'
      )
    parsed.tmo_positive_jsx =
      parsed.tmo_positive !== null ? (
        <ProgressColumn
          color={'#66BB6A'}
          percent={Math.ceil(parsed.tmo_positive)}
        />
      ) : (
        '-'
      )

    parsed.tmo_negative_jsx =
      parsed.tmo_negative !== null ? (
        <ProgressColumn
          color={'#EF5350'}
          percent={Math.ceil(parsed.tmo_positive)}
        />
      ) : (
        '-'
      )
    return parsed
  })
}

export default parser
