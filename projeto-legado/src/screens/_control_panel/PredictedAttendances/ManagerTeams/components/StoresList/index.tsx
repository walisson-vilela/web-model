import React, { useCallback, useEffect, useState } from 'react'

import { EllipsisContainer, SearchFilter } from '@mw-kit/mw-manager'
import { Loader } from 'semantic-ui-react'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import {
  isNumber,
  isObject,
  notEmptyString,
} from '../../../../../../utils/Validators'

import { StoreData, StoresListProps } from './interfaces'
import { getStores } from './services'
import * as S from './styled'

const StoresList = (props: StoresListProps) => {
  const { title, subtitle, filters } = { ...props }

  const [data, setData] = useState<StoreData[]>([])
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    setLoading(true)

    const params: any = { ...filters }

    if (notEmptyString(search)) params.q = search

    try {
      const responseData = await getStores(params)

      if (!responseData.success || !Array.isArray(responseData.data))
        throw new Error('Invalid response')

      // setando se a pagina atual e a ultima
      setIsLastPage(
        isObject(responseData.pagination) &&
          responseData.pagination.has_next_page === false,
      )

      const results: StoreData[] = responseData.data.map(
        (e: any): StoreData => ({
          store_id: numberOrDefault(e.store_id),
          checked: e.checked,
          formatted_address: notEmptyStringOrDefault(e.formatted_address),
          justify_name: notEmptyStringOrDefault(e.justify_name),
          people_name: notEmptyStringOrDefault(e.people_name),
          store_name: notEmptyStringOrDefault(e.store_name),
          people_id: numberOrDefault(e.store_id),
        }),
      )

      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (e) {
      console.error(e)
      alert('Erro ao buscar os dados')
    }

    setLoading(false)
  }, [search, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onScroll = (event: any) => {
    const scrollTopMax = event.nativeEvent.target.scrollTopMax
    const scrollTop = event.nativeEvent.target.scrollTop

    if (scrollTopMax !== 0 && scrollTopMax === scrollTop) {
      if (!isLastPage) setPage((prev) => (prev += 1))
    }
  }

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title>{title}</S.Title>
          {subtitle}
        </div>

        <div>
          <SearchFilter
            setSearch={(value: string) => {
              setSearch(value)
              setPage(1)
            }}
            size='mini'
          />
        </div>
      </S.Header>

      <S.ListContainer>
        <S.List onScroll={onScroll}>
          {data.map((store, index) => (
            <S.Item key={index}>
              <div>
                <EllipsisContainer>
                  {isNumber(store.store_id) ? `${store.store_id} - ` : ''}
                  {notEmptyStringOrDefault(store.people_name)}
                </EllipsisContainer>
                <S.OpacityEllipsis>
                  {notEmptyStringOrDefault(store.formatted_address)}
                </S.OpacityEllipsis>
              </div>

              <div>
                <S.CheckIcon name='check circle' checked={store.checked} />
              </div>
            </S.Item>
          ))}
        </S.List>

        {loading ? (
          <S.LoadingContainer>
            <Loader active />
          </S.LoadingContainer>
        ) : null}
      </S.ListContainer>
    </S.Container>
  )
}

export default StoresList
