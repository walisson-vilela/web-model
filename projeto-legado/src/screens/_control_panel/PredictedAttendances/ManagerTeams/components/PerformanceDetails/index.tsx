import React from 'react'

import moment from 'moment'
import { Table, TableBody, TableCell, TableRow } from 'semantic-ui-react'

import axios from '../../../../../../services/Axios'
import { notEmptyString } from '../../../../../../utils/Validators'

import { Details, PerformanceDetailsProps } from './interfaces'
import * as S from './styled'

const PerformanceDetails = (props: PerformanceDetailsProps) => {
  const { data } = { ...props }

  const display = {
    name: notEmptyString(data.name) ? data.name : '-',
    function: notEmptyString(data) ? data.function : '-',
    registration: data.registration ? data.registration : '-',
    journey: {
      date: notEmptyString(data.journey.date) ? data.journey.date : '-',
      start: notEmptyString(data.journey.start) ? data.journey.start : '-',
      end: notEmptyString(data.journey.end) ? data.journey.end : '-',
      diff: notEmptyString(data.journey.diff) ? data.journey.diff : '-',
    },
    tmo: {
      scheduled: {
        percent: data.tmo.scheduled.percent,
        hours: notEmptyString(data.tmo.scheduled.hours)
          ? data.tmo.scheduled.hours
          : '-',
      },
      realized: {
        percent: data.tmo.realized.percent,
        hours: data.tmo.realized.hours,
      },
    },
    attendance: {
      scheduled: {
        pdvs: data.attendance.scheduled.pdvs,
      },
      realized: {
        pdvs: data.attendance.realized.pdvs,
        percent: data.attendance.realized.percent,
      },
    },
  }

  return (
    <S.Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={16}>
              <strong>{display.name}</strong>
              <br />
              Função: {display.function} | Matricula: {display.registration}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={16}>
              <strong>Jornada:</strong>{' '}
              {`(${display.journey.date}) - ${display.journey.start} as ${display.journey.end} (${display.journey.diff})`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={6}>
              <strong>TMO:</strong>
            </TableCell>
            <TableCell width={10}>
              Programado:{' '}
              <S.RedText>{`${display.tmo.scheduled.percent}% (${display.tmo.scheduled.hours})`}</S.RedText>
              <br />
              Realizado:{' '}
              {`${display.tmo.realized.percent}% (${display.tmo.realized.hours})`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={6}>
              <strong>Atendimento:</strong>
            </TableCell>
            <TableCell width={10}>
              Programado: {`${display.attendance.scheduled.pdvs} PDVs`}
              <br />
              Realizado:{' '}
              {`${display.attendance.realized.pdvs} PDVs (${display.attendance.realized.percent}%)`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </S.Container>
  )
}

const requestPerformanceDetails = async (
  id: number,
  date: string,
): Promise<Details> => {
  const response = await axios.get(`/v1/statistic-performances`, {
    params: {
      contain: ['People', 'Journey'].join(),
      date,
      people_id: id,
    },
  })
  const responseData = response.data
  const peopleData: any = responseData.data[0]

  const secondsToTime = (value: number) => {
    var date = new Date(null)
    date.setSeconds(value)
    return `${date.getUTCHours()}h:${date.getMinutes()}min`
  }

  let working_time =
    peopleData.journey && peopleData.journey.planned_working_time
      ? peopleData.journey.planned_working_time * 60
      : 0
  let tmo_time = (working_time * peopleData.tmo) / 100
  let check_working_time =
    peopleData.journey && peopleData.journey.check_working_time
      ? peopleData.journey.check_working_time * 60
      : 0
  let tmo_performed =
    working_time > 0 ? (check_working_time * 100) / working_time : 0
  tmo_performed = Math.round(tmo_performed * 100) / 100

  const details = {
    name:
      peopleData.people && peopleData.people.name
        ? peopleData.people.name
        : null,
    function:
      peopleData.people && peopleData.people.role
        ? peopleData.people.role.name
        : null,
    registration:
      peopleData.people && peopleData.people.id ? peopleData.people.id : null,
    journey: {
      date:
        peopleData.journey && peopleData.date
          ? moment(peopleData.date).add(1, 'days').format('DD/MM')
          : null,
      start:
        peopleData.journey && peopleData.date
          ? moment(peopleData.journey.planned_start).format('HH:mm')
          : null,
      end:
        peopleData.journey && peopleData.date
          ? moment(peopleData.journey.planned_end).format('HH:mm')
          : null,
      diff: secondsToTime(working_time),
    },
    tmo: {
      scheduled: {
        percent: peopleData.tmo,
        hours: secondsToTime(tmo_time),
      },
      realized: {
        percent: tmo_performed,
        hours: secondsToTime(check_working_time),
      },
    },
    attendance: {
      scheduled: {
        pdvs: peopleData.planned,
      },
      realized: {
        pdvs: peopleData.performed,
        percent:
          peopleData.planned > 0
            ? Math.round(
                ((peopleData.performed * 100) / peopleData.planned) * 100,
              ) / 100
            : null,
      },
    },
  }

  return details
}

const getPerformanceDetails = async (
  id: number,
  date: any,
): Promise<JSX.Element> => {
  try {
    const details = await requestPerformanceDetails(id, date)
    return <PerformanceDetails data={details} />
  } catch (e) {
    return (
      <React.Fragment>
        Não foi possível encontrar os dados de performance
      </React.Fragment>
    )
  }
}

export default getPerformanceDetails
