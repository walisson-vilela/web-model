import React from 'react'

import type { FiltersInterfaces } from '@mw-kit/mw-manager'
import type {
  Option,
  OptionsReturn
} from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import axios from '../services/Axios'
import { cepFormatter } from '../standardized/utils/formatters'
import { notEmptyStringOrDefault } from '../utils/Formatters'
import {
  isBoolean,
  isNumber,
  isObject,
  notEmptyString
} from '../utils/Validators'

import * as S from './styles'

interface getOptionsArguments {
  endpoint: string
  value: string | number | boolean
  page?: number
  searchKey?: string
  sort?: string
  direction?: 'ASC' | 'DESC'
  searchOptions?: string[] | string
  contain?: string[] | string
  params?: any
}

const getOptions = async (
  args: getOptionsArguments & {
    getLabel?: (item: any) => string | JSX.Element
    valueName?: string
    thin?: boolean
  },
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  const getLabel = args.getLabel || ((item: any) => item.name)
  const valueName = args.valueName || 'id'

  try {
    const response = await _getOptions(args)

    const options = response.data
      .filter((item) => !!item[valueName])
      .map((item) => ({
        label: getLabel(item),
        value: item[valueName],
        thin: args.thin,
      }))

    return !response.hasOwnProperty('pagination')
      ? options
      : { options, lastPage: !response.pagination.has_next_page }
  } catch (e) {
    console.error(e)
    return []
  }
}

const getOptionsMwUi = async (
  args: getOptionsArguments & {
    getLabel?: (item: any) => Option['label']
    valueName?: string
    thin?: boolean
    page?: number
  },
): Promise<OptionsReturn | Option[]> => {
  const getLabel =
    args.getLabel ||
    ((item: any) => {
      if (item.name !== null) {
        return notEmptyStringOrDefault(item.name)
      }
      if (item?.hierarchy?.name !== null) {
        return notEmptyStringOrDefault(item.hierarchy.name)
      }
      return null
    })

  const valueName = args.valueName || 'id'

  try {
    const response = await _getOptions(args)

    const options = response.data
      .filter((item) => !!item[valueName])
      .reduce((acc, item) => {
        const label = getLabel(item)
        if (!label) return acc

        acc.push({
          label,
          value: item[valueName],
          thin: args.thin,
        })

        return acc
      }, [])

    return !response.hasOwnProperty('pagination')
      ? options
      : { options, lastPage: !response.pagination.has_next_page }
  } catch (e) {
    console.error(e)
    return []
  }
}

const _getOptions = async (args: getOptionsArguments): Promise<any> => {
  let { endpoint, value, searchKey, sort, direction, searchOptions, contain } =
    { ...args }

  const params: any = args.params || {}

  try {
    searchKey = searchKey || 'q'

    if (sort && !direction) direction = 'ASC'

    if (args.page) {
      params.page = args.page
    }

    if (sort) {
      params.sort = sort
      params.direction = direction
    }

    if (notEmptyString(value) || isNumber(value) || isBoolean(value)) {
      params[searchKey] = value
    }

    if (searchOptions) {
      typeof searchOptions === 'string'
        ? (params.q_options = searchOptions)
        : (params.q_options = searchOptions.join(','))
    }

    if (contain) {
      params.contain = typeof contain === 'string' ? contain : contain.join()
    }

    const response = await axios.get(endpoint, { params })

    const responseData = response.data
    if (!responseData.success)
      throw new Error('Request Failed, success is false')

    return responseData
  } catch (e) {
    return []
  }
}

type Return<T> = T extends 'mw-ui'
  ? OptionsReturn | Option[]
  : FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]

type Types = 'mw-ui' | 'mw-manager'

export const segments = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/segments',
    value,
    page,
    sort: 'name',
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

const flagsCustomLabel = (item: any): Option['label'] => {
  if (!isObject(item)) return ''

  const name = notEmptyStringOrDefault(item.name, '')

  const subtitle = isObject(item.network)
    ? [
        notEmptyStringOrDefault(item.network.name, '-'),
        isObject(item.network.group)
          ? notEmptyStringOrDefault(item.network.group.name, '-')
          : '-',
      ]
    : ['-', '-']

  return {
    element: (
      <S.Container>
        <S.Title>{name}</S.Title>
        <S.Subtitle>{subtitle.join(' > ')}</S.Subtitle>
      </S.Container>
    ),
    text: name,
  }
}

export const flags = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/markets/flags',
    value,
    page,
    sort: 'name',
    contain: ['NetworkFlag'],
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi({ ...args, getLabel: flagsCustomLabel })
    : getOptions({
        ...args,
        getLabel: (item) => {
          const label = flagsCustomLabel(item)
          return typeof label === 'string'
            ? label
            : (label.element as JSX.Element)
        },
      }))) as Return<T>
}

const chainCustomLabel = (item: any): Option['label'] => {
  if (!isObject(item)) return ''

  const name = notEmptyStringOrDefault(item.name, '')
  const groupName = isObject(item.group)
    ? notEmptyStringOrDefault(item.group.name, '')
    : ''

  return {
    element: (
      <S.Container>
        <S.Title>{name}</S.Title>
        <S.Subtitle>{groupName}</S.Subtitle>
      </S.Container>
    ),
    text: name,
  }
}

export const chains = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: '/v1/tr/markets/options?level=2',
    value,
    page,
    sort: 'name',
    contain: 'GroupNetwork',
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi({ ...args, getLabel: chainCustomLabel })
    : getOptions({
        ...args,
        getLabel: (item) => {
          const label = chainCustomLabel(item)
          return typeof label === 'string'
            ? label
            : (label.element as JSX.Element)
        },
      }))) as Return<T>
}

export const groups = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: '/v1/tr/markets/options?level=1',
    value,
    page,
    sort: 'name',
  }
  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const typologies = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/typologies',
    value,
    page,
    sort: 'name',
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const peoples = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
  user_id?: number,
): Promise<Return<T>> => {
  const params = {
    ...(user_id ? { user_id } : {}),
  }

  const args = {
    endpoint: 'v1/tr/users/options',
    value,
    page,
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

const storesCustomLabel = (item: any) => {
  if (!isObject(item.address) || !isObject(item.stores_contractor)) return

  const name = notEmptyStringOrDefault(item.stores_contractor.nickname, '')
  const formatted = notEmptyStringOrDefault(item.address.formatted, '')
  const postal_code = cepFormatter(
    notEmptyStringOrDefault(item.address.postal_code, ''),
  )
  const address = [
    ...[formatted ? [formatted] : []],
    ...[postal_code ? [postal_code] : []],
  ].join(' - ')

  return (
    <React.Fragment>
      <S.Title>{name}</S.Title>
      <S.Subtitle>{address}</S.Subtitle>
    </React.Fragment>
  )
}

export const stores: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/tr/stores/options',
    value,
    page,
    sort: 'name',
    getLabel: storesCustomLabel,
    searchOptions: ['Stores.name', 'Stores.formatted_address'],
    thin: true,
  })
}

export const states = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
  hierarchy_id?: number,
): Promise<Return<T>> => {
  const params: {} = {
    ...(hierarchy_id ? { hierarchy_id } : {}),
  }

  const args = {
    endpoint: 'v1/region-states',
    value,
    page,
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const mesoregions = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/global-regions',
    value,
    page,
    sort: 'name',
    params: {
      global_region_type: 5,
    },
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

const citiesCustomLabel = (item: any) => (
  <div>
    <S.Title>{item.name || '-'}</S.Title>
    <S.Subtitle>
      {isObject(item.state) && notEmptyString(item.state.name)
        ? item.state.name
        : '-'}
    </S.Subtitle>
  </div>
)

export const cities = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
  hierarchy_id?: number,
): Promise<Return<T>> => {
  const params: {} = {
    ...(hierarchy_id ? { hierarchy_id } : {}),
  }

  const args = {
    endpoint: 'v1/region-cities',
    value,
    page,
    sort: 'name',
    contain: 'RegionStates',
    thin: true,
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi({
        ...args,
        getLabel: (item) => ({
          element: citiesCustomLabel(item),
          text: item.name,
        }),
      })
    : getOptions({ ...args, getLabel: citiesCustomLabel }))) as Return<T>
}

const sublocalitiesCustomLabel = (item: any) => {
  const address = []

  if (item.city) address.push(item.city.name)
  if (item.state) address.push(item.state.name)

  return (
    <div>
      <S.Title>{item.name || '-'}</S.Title>
      <S.Subtitle>{address.length > 0 ? address.join(' - ') : '-'}</S.Subtitle>
    </div>
  )
}

export const sublocalities = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/region-sublocalities',
    contain: 'RegionCities,RegionStates',
    value,
    page,
    sort: 'name',
    thin: true,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi({
        ...args,
        getLabel: (item) => ({
          element: sublocalitiesCustomLabel(item),
          text: item.name,
        }),
      })
    : getOptions({
        ...args,
        getLabel: (item) => sublocalitiesCustomLabel(item),
      }))) as Return<T>
}

export const categories = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: '/v1/tr/categories',
    value,
    page,
    sort: 'name',
    params: { level: 0, status: '1' },
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const parentCategories: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/tr/categories',
    value,
    page,
    sort: 'name',
    params: { classification: 0 },
  })
}

const sublevelCustomLabel = (item: any) => {
  const title = [item.name, item.parent_label].filter(Boolean).join(' | ')

  return (
    <React.Fragment>
      <S.Title title={title}>
        <b>{title}</b>
      </S.Title>
      <S.Subtitle>{item.level_label}</S.Subtitle>
    </React.Fragment>
  )
}

export const subLevel: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/tr/categories',
    value,
    page,
    sort: 'name',
    getLabel: sublevelCustomLabel,
    params: { classification: 1 },
  })
}

export const epiType: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/epi-types',
    value,
    page,
    sort: 'name',
    getLabel: sublevelCustomLabel,
    params: { classification: 1 },
  })
}

export const profiles: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/profiles',
    value,
    page,
    sort: 'name',
  })
}

export const roles = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number | undefined,
  type?: T,
): Promise<Return<T>> => {
  const params = {}

  const args = {
    endpoint: 'v1/tr/roles/options',
    value,
    ...(page ? { page } : {}),
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const justifications: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/justify-types',
    value,
    page,
    sort: 'name',
  })
}

export const classifications = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/classifications?scenery_id=14',
    value,
    page,
    sort: 'name',
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const scenarios: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/classifications/scenarios',
    value,
    page,
    sort: 'name',
  })
}

export const products: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/products',
    value,
    page,
    sort: 'name',
  })
}

export const suppliers = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/suppliers?status=A',
    value,
    page,
    sort: 'name',
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const brands = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/brands/options',
    value,
    page,
    sort: 'name',
    params: { status: 1 },
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const menus: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/menus?level=0',
    value,
    page,
    sort: 'name',
  })
}

const getRegionsLabel = (item: any): Option['label'] => {
  if (!isObject(item)) return ''

  const name = notEmptyStringOrDefault(item.name, '-')
  const hierarchyName = isObject(item.hierarchy)
    ? notEmptyStringOrDefault(item.hierarchy.name, '-')
    : '-'

  return {
    element: (
      <S.Container>
        <S.Title title={name}>
          <b>{name}</b>
        </S.Title>
        <S.Subtitle>{hierarchyName}</S.Subtitle>
      </S.Container>
    ),
    text: item.name,
  }
}

export const regions = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
  hierarchy_id?: number,
): Promise<Return<T>> => {
  const params: {} = {
    ...(hierarchy_id ? { hierarchy_id } : {}),
  }

  const args = {
    endpoint: 'v1/tr/regions',
    value,
    page,
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi({ ...args, getLabel: getRegionsLabel })
    : getOptions({
        ...args,
        getLabel: (item) => {
          const label = getRegionsLabel(item)
          return typeof label === 'string'
            ? label
            : (label.element as JSX.Element)
        },
      }))) as Return<T>
}

export const contractors = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number | undefined,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/contractors/options',
    value,
    page,
    sort: 'nickname',
    getLabel: (item) => item.nickname,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const forms: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/forms',
    value,
    page,
    sort: 'name',
  })
}

export const subCategories = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: '/v1/tr/categories',
    value,
    page,
    sort: 'name',
    params: { level: 1, status: '1' },
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const productLine = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: '/v1/tr/categories',
    value,
    page,
    sort: 'name',
    params: { level: 2, status: '1' },
  }
  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const groupingAreas = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  hierarchy_id?: number,
  type?: T,
): Promise<Return<T>> => {
  const params: Record<number | string | symbol, any> = {}

  if (hierarchy_id) params.hierarchy_id = hierarchy_id

  const args = {
    endpoint: 'v1/tr/grouping-areas',
    value,
    page,
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const countries: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/region-countries',
    value,
    page,
    sort: 'name',
  })
}

const getAccountCountriesLabel = (item: any): Option['label'] => {
  if (!isObject(item) || !isObject(item.region_country)) return ''

  const name = notEmptyStringOrDefault(item.region_country.name, '')

  return name
}

export const accountCountries = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/contractors/0/countries',
    value,
    page,
    valueName: 'country_id',
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi({ ...args, getLabel: getAccountCountriesLabel })
    : getOptions({
        ...args,
        getLabel: (item) => {
          const label = getAccountCountriesLabel(item)
          return typeof label === 'string'
            ? label
            : (label.element as JSX.Element)
        },
      }))) as Return<T>
}

export const justifies: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/justify-types',
    value,
    page,
    sort: 'name',
    params: { audited: 0 },
  })
}

export const historic: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: 'v1/justify-types',
    value,
    page,
    sort: 'name',
    params: { audited: 1 },
  })
}

export const userInactivationReasons = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page: number,
  type?: T,
  reason_type?: 'T' | 'P',
): Promise<Return<T>> => {
  const params: {
    type?: 'T' | 'P'
  } = {}

  if (reason_type) params.type = reason_type

  const args = {
    endpoint: 'v1/tr/user-inactivation-reasons/options',
    value,
    page,
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const teams = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
  hierarchy_id?: number,
  by_user?: number,
): Promise<Return<T>> => {
  const params = {
    ...(hierarchy_id ? { hierarchy_id } : {}),
    ...(by_user ? { by_user } : {}),
  }

  const args = {
    endpoint: 'v1/tr/hierarchy-elements/options',
    value,
    page,
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

const productsOptionsLabel = (item: any) => {
  return (
    <React.Fragment>
      <S.Title title={item.name}>
        <b>{item.name}</b>
      </S.Title>
      <S.Subtitle>
        {item && item.product_line && item.product_line.fullpath_label}
      </S.Subtitle>
    </React.Fragment>
  )
}

export const productsOptions: FiltersInterfaces.OptionsCallback = async (
  value: string | number | boolean,
  page: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  return getOptions({
    endpoint: '/v1/tr/products/options',
    value,
    page,
    sort: 'name',
    getLabel: productsOptionsLabel,
  })
}

export const hierarchies = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
  by_person?: true,
): Promise<Return<T>> => {
  const args = {
    endpoint: 'v1/tr/hierarchies/options',
    value,
    page,
    params: {
      ...(by_person ? { by_person: '' } : {}),
    },
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}

export const region = async <T extends Types = 'mw-manager'>(
  value: string | number | boolean,
  page?: number,
  type?: T,
  hierarchy_id?: number,
): Promise<Return<T>> => {
  const params: {} = {
    ...(hierarchy_id ? { hierarchy_id } : {}),
  }

  const args = {
    endpoint: 'v1/tr/regions/options',
    value,
    page,
    sort: 'name',
    params,
  }

  return (await (type === 'mw-ui'
    ? getOptionsMwUi(args)
    : getOptions(args))) as Return<T>
}
