import React from 'react'

import { Table, TableBody, TableCell, TableRow } from 'semantic-ui-react'

import axios from '../../../../../../services/Axios'
import {
  cpf as formatCPF,
  date as formatDate,
  phone as formatPhone,
  time as formatTime,
} from '../../../../../../utils/Formatters'
import {
  isDateInstance,
  isNumeric,
  isObject,
  notEmptyString,
} from '../../../../../../utils/Validators'

import * as S from './styled'

interface Details {
  avatar: string | null
  name: string | null
  function: string | null
  registration: number | null
  document: string | null
  re: string | null
  ipa: number | null
  address: string | null
  phones: string[] | null
  journey: {
    start: string | null
    end: string | null
    break: string | null
  } | null
  leader: {
    name: string | null
    phones: string[] | null
  }
  last_connection: string | null
}

interface PeopleDetailsProps {
  data: Details
}

const PeopleDetails = (props: PeopleDetailsProps) => {
  const { data } = { ...props }

  const display = {
    avatar: !notEmptyString(data.avatar) ? (
      '-'
    ) : (
      <S.RoundedImage src={data.avatar} />
    ),
    name: notEmptyString(data.name) ? data.name : '-',
    function: notEmptyString(data.function) ? data.function : '-',
    registration: isNumeric(data.registration) ? data.registration : '-',
    document: notEmptyString(data.document) ? formatCPF(data.document) : '-',
    re: notEmptyString(data.re) ? data.re : '-',
    ipa: data.ipa !== null ? `${data.ipa} %` : '-',
    address: notEmptyString(data.address) ? data.address : '-',
    phones: '-',
    journey: '-',
    leader: {
      name: '-',
      phones: '-',
    },
    last_connection: '-',
  }

  if (Array.isArray(data.phones)) {
    const phones = data.phones.filter((phone) => notEmptyString(phone))
    if (phones.length > 0) {
      display.phones = phones.map((phone) => formatPhone(phone)).join(' | ')
    }
  }

  if (data.journey !== null) {
    const start = notEmptyString(data.journey.start) ? data.journey.start : '-'
    const end = notEmptyString(data.journey.end) ? data.journey.end : '-'

    const text = [`${start} às ${end}`]
    if (notEmptyString(data.journey.break))
      text.push(`Pausa Total: ${data.journey.break}`)
    display.journey = text.join(' - ')
  }

  if (data.leader !== null) {
    if (notEmptyString(data.leader.name)) {
      display.leader.name = data.leader.name
    }

    if (Array.isArray(data.leader.phones)) {
      const phones = data.leader.phones.filter((phone) => notEmptyString(phone))
      if (phones.length > 0) {
        display.leader.phones = phones
          .map((phone) => formatPhone(phone))
          .join(' | ')
      }
    }
  }

  if (notEmptyString(data.last_connection)) {
    display.last_connection = data.last_connection

    const date = new Date(data.last_connection)
    // verificando se a data e valida
    if (isDateInstance(date)) {
      const todayDate = Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date())
      const valueDate = Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date)

      display.last_connection =
        todayDate === valueDate
          ? `Hoje ${formatDate(
              data.last_connection,
              '(DD/MM/YYYY) às HH:mm:ss',
            )}`
          : formatDate(data.last_connection, '(DD/MM/YYYY) [às] HH:mm:ss')
    }
  }

  return (
    <S.Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={4}>{display.avatar}</TableCell>
            <TableCell width={12}>
              <S.FlexContainer>
                <div>
                  <div>
                    <b>{display.name}</b>
                  </div>
                  <div>
                    Função: {display.function} | Matrícula:{' '}
                    {display.registration}
                  </div>
                  <div>
                    CPF: {display.document} | RE: {display.re}
                  </div>
                </div>
                <S.MarginXAuto>
                  <div>
                    <S.NormalH5>I.P.A</S.NormalH5>
                  </div>
                  <div>
                    <h2>
                      <b>{display.ipa}</b>
                    </h2>
                  </div>
                </S.MarginXAuto>
              </S.FlexContainer>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>Endereço:</strong>
            </TableCell>
            <TableCell width={12}>{display.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>Telefone:</strong>
            </TableCell>
            <TableCell width={12}>{display.phones}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>Jornada do dia:</strong>
            </TableCell>
            <TableCell width={12}>{display.journey}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>Líder direto:</strong>
            </TableCell>
            <TableCell width={12}>
              <div>{display.leader.name}</div>
              <div>{display.leader.phones}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>Última conexão:</strong>
            </TableCell>
            <TableCell width={12}>{display.last_connection}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </S.Container>
  )
}

const RequestPeopleDetails = async (
  people_id: number,
  journey_date?: string,
): Promise<Details> => {
  if (!journey_date) journey_date = new Date().toISOString().split('T')[0]

  const response = await axios.get(`/v1/peoples/${people_id}`, {
    params: {
      contain: [
        'Roles',
        'Users',
        'PeopleStatisticAttendances',
        'PeopleLastConnections',
        'Supervisors',
        'Avatar',
        'Journey',
      ].join(),
      journey_date,
    },
  })

  const responseData = response.data
  const peopleData: any = responseData.data

  const details = {
    avatar:
      isObject(peopleData.avatar) && notEmptyString(peopleData.avatar.avatar)
        ? peopleData.avatar.avatar
        : null,
    name: notEmptyString(peopleData.name) ? peopleData.name : null,
    function:
      isObject(peopleData.role) && notEmptyString(peopleData.role.name)
        ? peopleData.role.name
        : null,
    registration: isNumeric(peopleData.id) ? peopleData.id : null,
    document: notEmptyString(peopleData.document) ? peopleData.document : null,
    re: notEmptyString(peopleData.re) ? peopleData.re : null,
    ipa:
      isObject(peopleData.people_statistic_attendances) &&
      peopleData.people_statistic_attendances.planned > 0
        ? Math.round(
            ((peopleData.people_statistic_attendances.performed * 100) /
              peopleData.people_statistic_attendances.planned) *
              100,
          ) / 100
        : null, // I.P.A
    address: notEmptyString(peopleData.formatted_address)
      ? peopleData.formatted_address
      : null,
    phones: [
      peopleData.phone,
      peopleData.work_phone,
      peopleData.mobile_phone,
      peopleData.mobile_phone_2,
    ].filter((phone) => notEmptyString(phone)),
    journey:
      Array.isArray(peopleData.journeys) &&
      peopleData.journeys.length > 0 &&
      isObject(peopleData.journeys[0]) &&
      isObject(peopleData.journeys[0].planned_interval_parms) &&
      isObject(peopleData.journeys[0].planned_interval_parms.journey)
        ? {
            start: peopleData.journeys[0].planned_interval_parms.journey.start,
            end: peopleData.journeys[0].planned_interval_parms.journey.end,
            break: formatTime(
              peopleData.journeys[0].planned_interval_parms.journey.interval,
            ),
          }
        : null,
    leader: !isObject(peopleData.supervisor)
      ? null
      : {
          name: notEmptyString(peopleData.supervisor.name)
            ? peopleData.supervisor.name
            : null,
          phones: [
            peopleData.supervisor.phone,
            peopleData.supervisor.work_phone,
            peopleData.supervisor.mobile_phone,
            peopleData.supervisor.mobile_phone_2,
          ].filter((phone) => notEmptyString(phone)),
        },
    last_connection:
      isObject(peopleData.people_last_connection) &&
      notEmptyString(peopleData.people_last_connection.last_connection)
        ? peopleData.people_last_connection.last_connection
        : null,
  }

  return details
}

const getPeopleDetails = async (
  people_id: number,
  journey_date?: string,
): Promise<JSX.Element> => {
  try {
    const details = await RequestPeopleDetails(people_id, journey_date)
    return <PeopleDetails data={details} />
  } catch (e) {
    return (
      <React.Fragment>
        Não foi possível encontrar os dados da Pessoa
      </React.Fragment>
    )
  }
}

export default getPeopleDetails
