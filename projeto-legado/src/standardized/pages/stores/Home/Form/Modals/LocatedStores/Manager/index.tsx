import React, { useCallback, useEffect, useRef, useState } from 'react'

import {
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'

import { getByCoordinate } from '../services'
import { BodyInterface, LocatedStoresProps } from '../types'

import filters from './filters'
import header from './header'

const Manager = (
  props: LocatedStoresProps & {
    checked: [
      BodyInterface | null,
      React.Dispatch<React.SetStateAction<BodyInterface | null>>,
    ]
  },
) => {
  const { lat, lng, data } = props

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState('')
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador dos filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([...data])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  const isMountingRef = useRef(false)

  useEffect(() => {
    isMountingRef.current = true
  }, [])

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    // fazendo requisição dos dados e listagem dos PDV's
    const responseData = await getByCoordinate(
      lat,
      lng,
      appliedFilters,
      search,
      sort,
      page,
    )

    // setando dados sobre a paginação
    setIsLastPage(!responseData.pagination.has_next_page)

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setBody(
      page === 1 ? responseData.data : (prev) => prev.concat(responseData.data),
    )

    setLoading(false)
  }, [lat, lng, appliedFilters, search, sort, page])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  // sempre que alguma dependencia da função loadData for alterada, chama a função, exceto no primeiro render
  useEffect(() => {
    if (!isMountingRef.current) {
      loadData()
    } else {
      isMountingRef.current = false
    }
  }, [loadData])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      />

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        checkeds={{
          checkeds: props.checked[0] ? [props.checked[0]] : [],
          setCheckeds: (s) => {
            props.checked[1]((prev) => {
              const v = typeof s === 'function' ? s(prev ? [prev] : []) : s
              if (v.length === 0) return null
              const newv = v.slice(-1)[0]
              return newv
            })
          },
          asRadio: true,
          hideCheckAll: true,
        }}
      />
    </React.Fragment>
  )
}

export default Manager
