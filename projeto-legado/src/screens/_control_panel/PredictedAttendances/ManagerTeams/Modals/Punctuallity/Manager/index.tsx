import React, { useCallback, useEffect, useState } from 'react'

import { MwManager, SearchFilter, SortState } from '@mw-kit/mw-manager'

import ManagerCounter from '../../../../../../../components/ManagerCounter'

//import { getStores as request, extractData } from "./services";
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { getData as request } from './services'
import * as S from './styles'

interface ComponentProps {
  data: any
}
const Manager = (props: ComponentProps) => {
  const { item, date } = props.data
  console.log({ item, date })
  const [search, setSearch] = useState<string>('')
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias

  const loadData = useCallback(async () => {
    setLoading(true)

    let responseData: any

    // fazendo requisição dos dados
    responseData = await request(search, sort, page, item.people_id, date)
    console.log('Response Data', responseData)
    // setando dados sobre a paginação
    const { has_next_page = false, count: total_registries = 0 } =
      responseData.pagination || {}

    setIsLastPage(!has_next_page)
    setTotalRegistries(total_registries)

    // pegando os resultados da requisição
    const results: DataInterface[] = responseData.data || []

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setData(page === 1 ? results : (prev) => prev.concat(results))

    setLoading(false)
  }, [search, sort, page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
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

  useEffect(() => {
    setBody(parseData(data))
  }, [data])

  return (
    <React.Fragment>
      <S.Header>
        <S.RightContent>
          <span>
            {' '}
            Executor: <strong>{item.people_name || ''} </strong>{' '}
          </span>
          <SearchFilter setSearch={setSearch} />
        </S.RightContent>
      </S.Header>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />
    </React.Fragment>
  )
}

export default Manager
