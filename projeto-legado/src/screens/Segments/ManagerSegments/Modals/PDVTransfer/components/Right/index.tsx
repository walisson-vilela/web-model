import { useCallback, useContext, useEffect, useState } from 'react'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import { getSegmentStores } from '../../../../services'
import Context from '../../context'
import { Segment } from '../../interfaces'

import * as S from './styled'

const useRight: TUseContent<Segment> = () => {
  const { selectedSegment, setSelectedSegment, item } = useContext(Context)

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<Segment>>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState<boolean>(false)

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const { data: segments, pagination } = await getSegmentStores(
        search,
        page,
      )
      const loadRows = segments
        .filter((segment) => segment.id !== item.id)
        .map((data): Rows<Segment>[number] => {
          const row: Rows<Segment>[number] = {
            data,
            content: <S.RowContent>{data.name}</S.RowContent>,
          }
          return row
        })
      setRows(page === 1 ? loadRows : (prev) => [...prev, ...loadRows])
      setLastPage(!pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, item.id, page])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: 'Transferir PDVs selecionado para:',
    gridSelector: {
      rows,
      type: 'radio',
      checked: [selectedSegment, setSelectedSegment],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum Canal encontrado na busca realizada'
          : 'Nenhuma Canal encontrada',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
        },
      },
      pagination: { page: [page, setPage], lastPage },
    },
  }
}

export default useRight
