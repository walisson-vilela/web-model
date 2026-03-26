import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwIcon } from '@mw-kit/mw-ui'
import type { AppliedFilter } from '@mw-kit/mw-ui/types'
import { cloneDeep } from 'lodash'

import GridSelector from '../../../../../../../components/GridSelector'
import type { Rows } from '../../../../../../../components/GridSelector/interfaces'
import useHomeContext from '../../../../../Home/context'
import { Container } from '../styles'
import type { SelectorComponent } from '../types'

import * as S from './styles'

type Data = { id: number }

const Left: SelectorComponent = (props) => {
  const {
    label,
    loader,
    emptyMessage,
    filters,
    RowComponent,
    selected: [selected, setSelected],
    original,
  } = props

  const [rows, setRows] = useState<Rows<Data>>([])
  const [checked, setChecked] = useState<Data[]>([])

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<boolean>(true)
  const [pagination, setPagination] = useState<{
    page: number
    last: boolean
    total: number
  }>({
    page: 1,
    last: true,
    total: 0,
  })
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])
  const { user } = useHomeContext()
  const { page } = pagination

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data, has_next_page, total_registries } = await loader(
        user.id,
        0,
        {
          appliedFilters,
          search,
          page,
        },
      )

      const parsed = data.map((data) => {
        const disabled = selected.some((e) => e.id === data.id)

        return {
          data,
          disabled,
          content: (
            <S.ContentContainer>
              <RowComponent data={data} />
              {disabled && (
                <MwIcon
                  type='feather'
                  icon='check'
                  width='14px'
                  height='14px'
                  color='black'
                />
              )}
            </S.ContentContainer>
          ),
        }
      })

      setPagination((prev) => ({
        ...prev,
        last: !has_next_page,
        total: total_registries,
      }))

      setRows(page === 1 ? parsed : (prev) => prev.concat(parsed))
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [selected, page, search, appliedFilters, loader, user.id, RowComponent])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        prev[e.id] = e
        return prev
      }, {} as { [key: number]: Data })

      for (const e of checked) {
        newState[e.id] = e
      }

      const n = Object.values(newState).map((e) =>
        cloneDeep(original.find((x) => x.id === e.id) || e),
      ) as typeof prev

      return n
    })

    setPagination({
      page: 1,
      last: true,
      total: 0,
    })
    setChecked([])
  }

  const setPage: React.Dispatch<React.SetStateAction<number>> = (v) => {
    setPagination((prev) => {
      const curv = prev.page
      const newv = typeof v === 'function' ? v(curv) : v
      if (curv === newv) return prev
      if (newv > curv && prev.last) return prev
      return { ...prev, page: newv }
    })
  }

  const total = rows.length > pagination.total ? rows.length : pagination.total

  const filterItems = filters(user.id)

  return (
    <Container>
      <div>
        <b>{`Lista de ${label}`}</b>
      </div>

      <div>
        <GridSelector
          {...{
            rows,
            checked: [checked, setChecked],
            loading,
            messages: {
              empty:
                appliedFilters.length || search.length
                  ? `${emptyMessage} para a busca realizada`
                  : emptyMessage,
            },
            pagination: {
              page: [page, setPage],
              lastPage: pagination.last,
            },
            toolbar: {
              checkAll: true,
              ...(filterItems.length === 0
                ? {
                    search: {
                      submitted: [search, setSearch],
                    },
                  }
                : {
                    search: {
                      collapse: true,
                      submitted: [search, setSearch],
                    },
                    filters: {
                      items: filterItems,
                      setAppliedFilters,
                      containerProps: {
                        position: 'right bottom',
                      },
                      subContainerProps: {
                        center: { x: 0, y: 50 },
                      },
                    },
                    appliedFilters: {
                      appliedFilters: [appliedFilters, setAppliedFilters],
                      containerProps: {
                        position: 'right bottom',
                      },
                    },
                  }),
            },
            scrollHeight: '198px',
          }}
        />
      </div>

      <div>
        <div>
          Exibindo {rows.length} de um total de {total} registros.
        </div>

        <MwButton
          type='button'
          onClick={onSubmit}
          content='Adicionar'
          disabled={checked.length === 0}
        />
      </div>
    </Container>
  )
}

export default Left
