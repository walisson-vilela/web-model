import React, { useCallback, useEffect, useState } from 'react'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'

import Modal, { ModalState } from '../../../components/MwModal'
import { ManagerProps } from '../../interfaces'

import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { getRoles as request } from './services'

const Manager = (props: ManagerProps) => {
  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
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
  // estado que controla há um modal aberto
  const [modal, setModal] = useState<ModalState>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      // fazendo requisição dos dados
      const responseData = await request(search, sort, page)

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)

      // pegando os resultados da requisição
      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [search, sort, page])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

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
    <React.Fragment>
      <Toolbar
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <p style={{ margin: 0 }}>
          <b>Total de Pesquisas: </b> 180 | <b>Total de PDVs: </b> 150
        </p>

        <p>
          <b>Legenda: 0 a 6,0: </b> Ruim | <b>6,1 a 8,0: </b> Bom |{' '}
          <b>8,1 a 10: </b> Ótimo
        </p>
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={false}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager
