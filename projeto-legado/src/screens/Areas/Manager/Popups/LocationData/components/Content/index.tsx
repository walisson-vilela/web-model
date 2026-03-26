import { RowsComponents } from '..'

import { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { MwEllipsisContainer, MwScrollContainer } from '@mw-kit/mw-ui'

import { LocationDataProps, Rows } from '../../interfaces'

import { getRows } from './services'
import * as S from './styles'

const Content = <T extends keyof Rows>(props: LocationDataProps<T>) => {
  type Row = Rows[T]
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>()
  const [rows, setRows] = useState<Row[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    count: 0,
    has_next_page: false,
  })

  const { count, id, subtitle, title, type } = props

  const paginator = () => {
    setPagination((prev) => {
      return prev.has_next_page ? { ...prev, page: prev.page + 1 } : prev
    })
  }

  const resetPage = () => {
    setPagination((prev) => {
      return prev.page !== 1 ? { ...prev, page: 1 } : prev
    })
  }

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const { data: rows, pagination: page } = await getRows(
        id,
        search,
        pagination.page,
        type,
      )
      setRows(pagination.page === 1 ? rows : (prev) => [...prev, ...rows])
      setPagination((prev) => ({ ...prev, ...page }))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [search, pagination.page])

  useEffect(() => {
    getData()
  }, [getData])

  const RowComponent = RowsComponents[type] as React.FunctionComponent<{
    data: Row
  }>

  return (
    <S.PopupContainer>
      <S.PopupHeader>
        <div>
          <div>{title}</div>
          <div>
            Área de Atuação:
            <MwEllipsisContainer>{subtitle}</MwEllipsisContainer>
          </div>
        </div>

        <SearchFilter
          setSearch={(s) => {
            resetPage()
            setSearch(s)
          }}
          search={search}
        />
      </S.PopupHeader>

      <MwScrollContainer
        loading={loading}
        spacing={{
          left: 's1',
        }}
        onScrollEnd={paginator}
      >
        {rows.map((row, index) => (
          <S.Row key={index}>
            <RowComponent data={row} />
          </S.Row>
        ))}
      </MwScrollContainer>
    </S.PopupContainer>
  )
}

export default Content
