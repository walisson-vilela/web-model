import React from 'react'

import { Popup as SemanticPopup } from 'semantic-ui-react'

import Bullet from '../../../../components/Bullet'
import {
  default as ManagerColumnPopup,
  default as Popup,
} from '../../../../components/ManagerColumnPopup'
import ProgressColumn from '../../../../components/ProgressColumn'
import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import Punctuality from './Modals/Punctuallity'
import getPeopleDetails from './components/PeopleDetails'
import getPerformanceDetails from './components/PerformanceDetails'
import StoresList from './components/StoresList'
import { BodyInterface, DataInterface } from './interfaces'
import { statusLabel } from './labels'
import * as S from './styled'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
/*
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      date: dateOrDefault(e.date), // date
      people_id: numberOrDefault(e.people_id),
      people_name: notEmptyStringOrDefault(e.people_name),
      journey_start: notEmptyStringOrDefault(e.journey_start), // time
      journey_end: notEmptyStringOrDefault(e.journey_end), // time
      journey_interval: numberOrDefault(e.journey_interval),
      route_name: notEmptyStringOrDefault(e.route_name),
      attendances_count: numberOrDefault(e.attendances_count),
      planned_count: numberOrDefault(e.planned_count),
      added: numberOrDefault(e.added),
      in_progress: numberOrDefault(e.in_progress),
      justified: numberOrDefault(e.justified),
      realized: numberOrDefault(e.realized),
      punctuality_in: numberOrDefault(e.punctuality_in),
      punctuality_total: numberOrDefault(e.punctuality_total),
      min_check_in: notEmptyStringOrDefault(e.min_check_in), // time
      max_check_out: notEmptyStringOrDefault(e.max_check_out), // time
      attendance_performance: numberOrDefault(e.attendance_performance),
      punctuality_performance: numberOrDefault(e.punctuality_performance),
      tmo_status: numberOrDefault(e.tmo_status),

      people_name_jsx: null,
      predicted_realized_jsx: null,
      added_jsx: null,
      justified_jsx: null,
      attendance_performance_jsx: null,
      punctuality_performance_jsx: null,
    }

    if (notEmptyString(item.people_name)) {
      item.people_name_jsx = <Bullet color='#4caf50' content={item.people_name} />

      if (isNumber(item.people_id)) {
        item.people_name_jsx = <Popup
          trigger={item.people_name_jsx}
          getContent={async (): Promise<JSX.Element> => await getPeopleDetails(item.people_id)}
        />
      }
    }

    const popupSubitle = <React.Fragment>
      Executor: <b>{notEmptyStringOrDefault(item.people_name, '-')}</b>
    </React.Fragment>

    if (isNumber(item.realized) || isNumber(item.planned_count)) {

      item.predicted_realized_jsx =
    }

    if (isNumber(item.added)) {
      item.added_jsx = <SemanticPopup
        on='click'
        trigger={<S.Link>{item.added}</S.Link>}
        content={<StoresList
          title='Adicionado(s)'
          subtitle={popupSubitle}
          filters={{}}
        />}
        position='bottom center'
        style={{maxWidth: 'unset'}}
      />
    }

    if (isNumber(item.justified)) {
      item.justified_jsx = <SemanticPopup
        on='click'
        trigger={<S.Link>{item.justified}</S.Link>}
        content={<StoresList
          title='Justificado(s)'
          subtitle={popupSubitle}
          filters={{}}
        />}
        position='bottom center'
        style={{maxWidth: 'unset'}}
      />
    }

    if (isNumber(item.attendance_performance)) {
      const label = !isNumber(item.tmo_status) || item.tmo_status <= 0 ? undefined : <Popup
        trigger={<React.Fragment>
          {item.attendance_performance}%
          <S.Dot/>
        </React.Fragment>}
        getContent={async (): Promise<JSX.Element> => await getPerformanceDetails(item.people_id)}
        position='left center'
      />

      item.attendance_performance_jsx = <ProgressColumn
        color={COLORS.green}
        percent={item.attendance_performance}
        label={label}
      />
    }

    if (isNumber(item.punctuality_performance)) {
      item.punctuality_performance_jsx = <ProgressColumn
        color={COLORS.red}
        percent={item.punctuality_performance}
      />
    }

    return item;
  })
}
*/

const parser = (
  data: DataInterface[],
  date: string,
  setModal: Function,
): BodyInterface[] => {
  return data.map((item) => {
    let parsedItem: BodyInterface = {
      people_id: numberOrDefault(item.people_id),
      active_status: notEmptyStringOrDefault(item.active_status),
      people_name: notEmptyStringOrDefault(item.people_name),
      people_name_jsx: null,
      route_name: notEmptyStringOrDefault(item.route_name),
      realized_planned: notEmptyStringOrDefault(item.realized_planned),
      realized_planned_jsx: null,
      added: numberOrDefault(item.added),
      added_jsx: null,
      justified: numberOrDefault(item.justified),
      justified_jsx: null,
      min_check_in: notEmptyStringOrDefault(item.min_check_in),
      max_check_out: notEmptyStringOrDefault(item.max_check_out),
      attendance_performance: numberOrDefault(item.attendance_performance),
      attendance_performance_jsx: null,
      punctuality_performance: numberOrDefault(item.punctuality_performance),
      punctuality_performance_jsx: null,
    }

    parsedItem.people_name_jsx = (
      <ManagerColumnPopup
        trigger={
          <Bullet
            color={statusLabel[item.active_status].color}
            content={parsedItem.people_name}
          />
        }
        getContent={async (): Promise<JSX.Element> =>
          getPeopleDetails(parsedItem.people_id)
        }
      />
    )

    parsedItem.realized_planned_jsx = (
      <SemanticPopup
        on='click'
        trigger={<S.Link>{item.realized_planned}</S.Link>}
        content={
          <StoresList
            title='Previsto Realizado'
            subtitle={
              <span>
                Executor: <strong> {item.people_name}</strong>
              </span>
            }
            filters={{
              people_id: item.people_id,
              type: 'P',
              date: dateOrDefault(date, '', 'YYYY-MM-DD', 'DD/MM/YYYY'),
            }}
          />
        }
        position='bottom center'
        style={{ maxWidth: 'unset' }}
      />
    )

    parsedItem.added_jsx =
      parsedItem.added > 0 ? (
        <SemanticPopup
          on='click'
          trigger={<S.Link>{item.added}</S.Link>}
          content={
            <StoresList
              title='Adicionados'
              subtitle={
                <span>
                  Executor: <strong> {item.people_name}</strong>
                </span>
              }
              filters={{
                people_id: item.people_id,
                type: 'NP',
                date: dateOrDefault(date, '', 'YYYY-MM-DD', 'DD/MM/YYYY'),
              }}
            />
          }
          position='bottom center'
          style={{ maxWidth: 'unset' }}
        />
      ) : (
        '0'
      )

    parsedItem.justified_jsx =
      parsedItem.justified > 0 ? (
        <SemanticPopup
          on='click'
          trigger={<S.Link>{item.added}</S.Link>}
          content={
            <StoresList
              title='Justificados'
              subtitle={
                <span>
                  Executor: <strong> {item.people_name}</strong>
                </span>
              }
              filters={{
                people_id: item.people_id,
                date: dateOrDefault(date, '', 'YYYY-MM-DD', 'DD/MM/YYYY'),
                justify: 1,
              }}
            />
          }
          position='bottom center'
          style={{ maxWidth: 'unset' }}
        />
      ) : (
        '0'
      )

    parsedItem.attendance_performance_jsx = (
      <Popup
        trigger={
          <ProgressColumn
            color={statusLabel['Ativo'].color}
            percent={parsedItem.attendance_performance}
            label={`${parsedItem.attendance_performance}%`}
          />
        }
        getContent={async (): Promise<JSX.Element> =>
          await getPerformanceDetails(item.people_id, dateOrDefault(date, '', 'YYYY-MM-DD', 'DD/MM/YYYY'))
        }
        position='left center'
      />
    )

    parsedItem.punctuality_performance_jsx =
      parsedItem.punctuality_performance > 0 ? (
        <S.Link
          onClick={() =>
            setModal(
              <Punctuality
                data={{
                  date: dateOrDefault(date, '', 'YYYY-MM-DD', 'DD/MM/YYYY'),
                  item: item,
                }}
                onClose={() => setModal(null)}
              />,
            )
          }
        >
          {parsedItem.punctuality_performance}
        </S.Link>
      ) : (
        0
      )
    return parsedItem
  })
}

export default parser
