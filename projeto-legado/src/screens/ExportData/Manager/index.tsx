import React, { useCallback, useEffect, useState } from 'react'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'

import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import { ManagerProps } from '../../interfaces'
import Export from '../Export'

import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { getProcesses as request } from './services'

const Manager = (props: ManagerProps) => {
  // estado contralador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do conteudo do manager

  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoadData = useCallback(async () => {
    setLoading(true)
    try {
      // fazendo requisição dos dados
      const responseData = await request(appliedFilters, search, sort, page)

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição

      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
      toast(<ToasterContent />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  useEffect(() => {
    handleLoadData()
  }, [handleLoadData])

  useEffect(() => {
    setBody(parseData(data))
  }, [data])

  const reload = () => {
    page === 1 ? handleLoadData() : setPage(1)
  }

  const paginator = () => {
    if (!isLastPage) setPage((prevState) => (prevState += 1))
  }

  return (
    <React.Fragment>
      <Export handleLoadData={reload} />
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
      />

      {/* <ManagerCounter partial={body.length} total={totalRegistries} /> */}

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
