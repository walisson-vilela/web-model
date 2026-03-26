import React, { useCallback, useContext, useEffect, useState } from 'react'

import { MwManager } from '@mw-kit/mw-manager'

import { booleanOrDefault } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import ParticularitiesContext from '../context'

import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { getRegions as request } from './services'

interface ComponentProps {
  setPdv: Function
}

const Manager = ({ setPdv }: ComponentProps) => {
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])

  const {
    segment_id,
    search,
    sort,
    setSort,
    loading,
    setLoading,
    page,
    setPage,
    isLastPage,
    setIsLastPage,
  } = useContext(ParticularitiesContext)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    let responseData: any

    try {
      // fazendo requisição dos dados
      responseData = await request(segment_id, search, sort, page)
      setPdv(responseData.data.length)
    } catch (e) {
      setLoading(false)
      return
    }

    // setando se a pagina atual e a ultima
    if (isObject(responseData.pagination)) {
      setIsLastPage(
        !booleanOrDefault(responseData.pagination.has_next_page, false),
      )
    } else setIsLastPage(true)
    // pegando os resultados da requisição
    const results: DataInterface[] = responseData.data || []

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setData(page === 1 ? results : (prev) => prev.concat(results))

    setLoading(false)
  }, [search, sort, page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setBody(parseData(data))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  return (
    <MwManager
      list
      columns={header}
      rows={body}
      sort={{ sort, setSort }}
      hasFilters={search.length > 0}
      loading={loading}
      paginator={paginator}
      page={page}
      setPage={setPage}
    />
  )
}

export default Manager
