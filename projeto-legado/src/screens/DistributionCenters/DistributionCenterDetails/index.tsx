import React from 'react'

import { Table, TableBody, TableCell, TableRow } from 'semantic-ui-react'

import axios from '../../../services/Axios'
import {
  phone as formatPhone,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject, notEmptyString } from '../../../utils/Validators'

import * as S from './styled'

interface Details {
  id: number | null
  name: string | null
  store: string | null
  segment: string | null
  flag: string | null
  network: string | null
  group: string | null
  address: string | null
  phones: string[] | null
}

interface DistributionCenterDetailsProps {
  data: Details
}

const DistributionCenterDetails = (props: DistributionCenterDetailsProps) => {
  const { data } = { ...props }

  const display = {
    id: data.id !== null ? data.id : '-',
    name: notEmptyString(data.name) ? data.name : '-',
    store: notEmptyString(data.store) ? data.store : '-',
    address: notEmptyString(data.address) ? data.address : '-',
    phones: '-',
    markets: '-',
  }

  if (Array.isArray(data.phones) && data.phones.length > 0) {
    display.phones = data.phones.map((phone) => formatPhone(phone)).join(' | ')
  }

  const markets = [data.group, data.network, data.flag].filter((e) =>
    notEmptyString(e),
  )
  if (markets.length > 0) {
    display.markets = markets.join(' > ')
  }

  if (notEmptyString(data.segment)) {
    display.markets = [data.segment, display.markets].join(' - ')
  }

  return (
    <S.Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={4}>
              <strong>Central:</strong>
            </TableCell>
            <TableCell width={12}>
              <S.BoldFlexContainer>
                <S.Ellipsis>{display.name}</S.Ellipsis>
              </S.BoldFlexContainer>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4}>
              <strong>ID: </strong>
              {display.id}
            </TableCell>
            <TableCell width={12}>
              <S.BoldFlexContainer>
                <S.Ellipsis>{display.store}</S.Ellipsis>
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
        </TableBody>
      </Table>
    </S.Container>
  )
}

const requestDistributionCenterDetails = async (
  store_id: number,
): Promise<Details> => {
  const { data } = await axios.get(`/v1/distribution-centers/${store_id}`, {
    params: {
      contain: ['StoresOne'].join(),
    },
  })

  const responseData: any = data.data

  const details: Details = {
    id: numberOrDefault(responseData.id),
    name: notEmptyStringOrDefault(responseData.name),
    store: null,
    segment: null,
    group: null,
    network: null,
    flag: null,
    address: null,
    phones: null,
  }

  if (!isObject(responseData.stores_one)) return details

  details.store = notEmptyStringOrDefault(responseData.stores_one.name)
  ;(details.segment = isObject(responseData.stores_one.segment)
    ? notEmptyStringOrDefault(responseData.stores_one.segment.name)
    : null),
    (details.group = isObject(responseData.stores_one.market_group)
      ? notEmptyStringOrDefault(responseData.stores_one.market_group.name)
      : null),
    (details.network = isObject(responseData.stores_one.market_chain)
      ? notEmptyStringOrDefault(responseData.stores_one.market_chain.name)
      : null),
    (details.flag = isObject(responseData.stores_one.market_flag)
      ? notEmptyStringOrDefault(responseData.stores_one.market_flag.name)
      : null),
    (details.address = notEmptyStringOrDefault(
      responseData.stores_one.formatted_address,
    ))
  details.phones = [
    responseData.stores_one.phone1,
    responseData.stores_one.phone2,
    responseData.stores_one.phone3,
  ].filter(notEmptyString)

  return details
}

const getDistributionCenterDetails = async (
  store_id: number,
): Promise<JSX.Element> => {
  try {
    const details = await requestDistributionCenterDetails(store_id)
    return <DistributionCenterDetails data={details} />
  } catch (e) {
    console.error(e)
    return (
      <React.Fragment>
        Não foi possível encontrar os dados da Central de Compras
      </React.Fragment>
    )
  }
}

export default getDistributionCenterDetails
