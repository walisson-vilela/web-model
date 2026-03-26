import React from 'react'

import { EllipsisContainer } from '@mw-kit/mw-manager'
import moment from 'moment'
import { Table, TableBody, TableCell, TableRow } from 'semantic-ui-react'

import { getIntlTelInputInfo } from '../../../../../components/IntlTelInput'
import axios from '../../../../../services/Axios'
import {
  cnpj as formatCNPJ,
  notEmptyStringOrDefault,
} from '../../../../../utils/Formatters'
import { isObject, notEmptyString } from '../../../../../utils/Validators'

import * as S from './styled'

interface Attendance {
  datetime: string | null
  name: string | null
}

interface Details {
  id: number | null
  name: string | null
  document: string | null
  flag: string | null
  network: string | null
  group: string | null
  address: string | null
  phones: string[] | null
  contact: {
    name: string | null
    phone: string | null
  } | null
  history: {
    predicted: number | null
    performed: number | null
    attendances: {
      first: Attendance | null
      last: Attendance | null
    }
  } | null
  classification: string | null
  checkouts: string | null
}

interface StoreDetailsProps {
  data: Details
}

const StoreDetails = (props: StoreDetailsProps) => {
  const { data } = { ...props }

  const display = {
    id: data.id !== null ? data.id : '-',
    name: notEmptyString(data.name) ? data.name : '-',
    document: '',
    address: notEmptyString(data.address) ? data.address : '-',
    phones: '-',
    markets: '-',
    contact: '-',
    history: <React.Fragment>-</React.Fragment>,
    otherInfo: '-',
  }

  if (isObject(data.contact)) {
    if (
      notEmptyString(data.contact.name) ||
      notEmptyString(data.contact.name)
    ) {
      const name = notEmptyStringOrDefault(data.contact.name, '-')
      const info = getIntlTelInputInfo(data.contact.phone)
      const phone = info ? info.masked : '-'
      display.contact = `${name} (Gerente) - ${phone}`
    }
  }

  if (notEmptyString(data.document)) {
    display.document = `(${formatCNPJ(data.document)})`
  }

  if (Array.isArray(data.phones) && data.phones.length > 0) {
    display.phones = data.phones
      .map((phone) => {
        const info = getIntlTelInputInfo(phone)
        return info ? info.masked : '-'
      })
      .join(' | ')
  }

  const markets = [data.group, data.network, data.flag].filter((e) =>
    notEmptyString(e),
  )
  if (markets.length > 0) {
    display.markets = markets.join(' > ')
  }

  if (data.history !== null) {
    const texts = []
    if (data.history.predicted !== null && data.history.performed !== null) {
      const percent = Math.round(
        (data.history.performed * 100) / data.history.predicted,
      )

      texts.push(
        <React.Fragment>
          Total de visitas programadas {data.history.predicted} sendo{' '}
          {data.history.performed} realizadas <b>({percent}%)</b>
        </React.Fragment>,
      )
    }

    if (data.history.attendances !== null) {
      if (data.history.attendances.first !== null) {
        const tmp = []
        if (notEmptyString(data.history.attendances.first.datetime)) {
          // formatar data
          tmp.push(
            moment(data.history.attendances.first.datetime).format(
              'DD/MM/YYYY [às] HH:mm:ss',
            ),
          )
        }
        if (notEmptyString(data.history.attendances.first.name)) {
          // formatar data
          tmp.push(data.history.attendances.first.name)
        }

        if (tmp.length > 0) {
          texts.push(
            <React.Fragment>1° visita: {tmp.join(' - ')}</React.Fragment>,
          )
        }
      }

      if (data.history.attendances.last !== null) {
        const tmp = []
        if (notEmptyString(data.history.attendances.last.datetime)) {
          // formatar data
          tmp.push(
            moment(data.history.attendances.last.datetime).format(
              'DD/MM/YYYY [às] HH:mm:ss',
            ),
          )
        }
        if (notEmptyString(data.history.attendances.last.name)) {
          // formatar data
          tmp.push(data.history.attendances.last.name)
        }

        if (tmp.length > 0) {
          texts.push(
            <React.Fragment>Ultima visita: {tmp.join(' - ')}</React.Fragment>,
          )
        }
      }
    }

    if (texts.length > 0) {
      display.history = (
        <React.Fragment>
          {texts.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </React.Fragment>
      )
    }
  }

  const text = []

  if (notEmptyString(data.classification))
    text.push(`Classificação: ${data.classification}`)
  if (notEmptyString(data.checkouts)) text.push(`Checkouts: ${data.checkouts}`)

  if (text.length > 0) display.otherInfo = text.join(' | ')

  return (
    <S.Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={4}>
              <strong>ID: </strong>
              {display.id}
            </TableCell>
            <TableCell width={12}>
              <S.BoldFlexContainer>
                <EllipsisContainer>{display.name}</EllipsisContainer>
                <span>{display.document}</span>
              </S.BoldFlexContainer>
              {display.markets}
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
              <strong>Contato PDV:</strong>
            </TableCell>
            <TableCell width={12}>{display.contact}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>Histórico de visita:</strong>
            </TableCell>
            <TableCell width={12}>{display.history}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>Outras informações:</strong>
            </TableCell>
            <TableCell width={12}>{display.otherInfo}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </S.Container>
  )
}

const requestStoreDetails = async (store_id: number): Promise<Details> => {
  const response = await axios.get(`/v1/stores/${store_id}`, {
    params: {
      contain: [
        'Market',
        'MarketChains',
        'MarketFlags',
        'StoreStatisticAttendances',
        'StorePeoples',
      ].join(),
    },
  })

  const responseData = response.data
  const storeData: any = responseData.data

  const details: Details = {
    id: storeData.hasOwnProperty('id') ? storeData.id : null,
    name: notEmptyString(storeData.name) ? storeData.name : null,
    document: notEmptyString(storeData.document) ? storeData.document : null,
    group: null,
    network: null,
    flag: null,
    address: notEmptyString(storeData.formatted_address)
      ? storeData.formatted_address
      : null,
    phones: [storeData.phone1, storeData.phone2, storeData.phone3].filter(
      (phone) => typeof phone === 'string' && phone.trim() !== '',
    ),
    contact: null,
    history: null,
    classification: notEmptyString(storeData.classification)
      ? storeData.classification
      : null,
    checkouts: notEmptyString(storeData.checkouts) ? storeData.checkouts : null,
  }

  if (Array.isArray(storeData.store_peoples)) {
    const store_people = storeData.store_peoples.find(
      (e: any): boolean =>
        notEmptyString(e.sector) && e.sector.trim().toLowerCase() === 'gerente',
    )
    if (store_people) {
      details.contact = {
        name: store_people.name,
        phone: notEmptyStringOrDefault(store_people.phone1),
      }
    }
  }

  if (
    storeData.market instanceof Object &&
    storeData.market.hasOwnProperty('name')
  ) {
    details.group = storeData.market.name
  }

  if (
    storeData.market_chain instanceof Object &&
    storeData.market.hasOwnProperty('name')
  ) {
    details.network = storeData.market_chain.name
  }

  if (
    storeData.market_flag instanceof Object &&
    storeData.market.hasOwnProperty('name')
  ) {
    details.flag = storeData.market_flag.name
  }

  if (storeData.store_statistic_attendance instanceof Object) {
    const statistic = storeData.store_statistic_attendance

    details.history = {
      predicted: statistic.hasOwnProperty('planned') ? statistic.planned : null,
      performed: statistic.hasOwnProperty('performed')
        ? statistic.performed
        : null,
      attendances: {
        first: null,
        last: null,
      },
    }

    const getAttendance = (attendance: any) => {
      return {
        datetime: attendance.hasOwnProperty('check_in')
          ? attendance.check_in
          : null,
        name:
          attendance.people instanceof Object &&
          notEmptyString(attendance.people.name)
            ? attendance.people.name
            : null,
      }
    }

    if (statistic.first_attendance instanceof Object) {
      details.history.attendances.first = getAttendance(
        statistic.first_attendance,
      )
    }

    if (statistic.last_attendance instanceof Object) {
      details.history.attendances.last = getAttendance(
        statistic.last_attendance,
      )
    }
  }

  return details
}

const getStoreDetails = async (store_id: number): Promise<JSX.Element> => {
  try {
    const details = await requestStoreDetails(store_id)
    return <StoreDetails data={details} />
  } catch (e) {
    return (
      <React.Fragment>
        Não foi possível encontrar os dados do PDV
      </React.Fragment>
    )
  }
}

export default getStoreDetails
