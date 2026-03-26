import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import {
  CurrentBodyInterface,
  CurrentDataInterface,
  ExpiredBodyInterface,
  ExpiredDataInterface,
  PrivacyPolicityProps,
  UserListProps,
} from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  tabId: number,
  data: CurrentDataInterface[] | ExpiredDataInterface[],
): CurrentBodyInterface[] | ExpiredBodyInterface[] => {
  return tabId === 1
    ? data.map((item: CurrentDataInterface) => {
        let parsed: CurrentBodyInterface = {
          id: numberOrDefault(item.id),
          contractor_id: numberOrDefault(item.contractor_id),
          account_name: notEmptyStringOrDefault(item.Account.name),
          created_at: notEmptyStringOrDefault(item.created_at),
          percentage: notEmptyStringOrDefault(item.percentage),
          title: notEmptyStringOrDefault(item.title),
          accepted_count: notEmptyStringOrDefault(item.accepted_count),
          validity_at: notEmptyStringOrDefault(item.validity_at),
        }
        return parsed
      })
    : data.map((item: ExpiredDataInterface) => {
        let parsed: ExpiredBodyInterface = {
          id: numberOrDefault(item.id),
          contractor_id: numberOrDefault(item.contractor_id),
          title: notEmptyStringOrDefault(item.title),
          account_name: notEmptyStringOrDefault(item.Account.name),
          accepted_count: notEmptyStringOrDefault(item.accepted_count),
          percentage: notEmptyStringOrDefault(item.percentage),
          validity_at: notEmptyStringOrDefault(item.validity_at),
          created_at: notEmptyStringOrDefault(item.created_at),
        }
        return parsed
      })
}

export const parserPropsToPrivacyPolicity = (
  tabId: number,
  item: ExpiredBodyInterface | CurrentBodyInterface,
): PrivacyPolicityProps => {
  return {
    id: item.id,
    accountName: item.account_name,
    createdAt: tabId === 0 ? item.validity_at : item.created_at,
  }
}

export const parserPropsToUserList = (
  tabId: number,
  item: ExpiredBodyInterface | CurrentBodyInterface,
): UserListProps => {
  return {
    id: item.id,
    accountName: item.account_name,
    created_at: tabId === 0 ? item.validity_at : item.created_at,
    title: item.title,
  }
}

export default parser
