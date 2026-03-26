import React, { useCallback, useEffect, useState } from 'react'

import {
  ColumnInterface,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import Bullet from '../../../../../components/Bullet'
import Popup from '../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'
import { ManagerProps } from '../../../../interfaces'
import getPeopleDetails from '../../../components/PopupDetails/PeopleDetails'
import getStoreDetails from '../../../components/PopupDetails/StoreDetails'

// TODO: Reescrever as interfaces Data e Body para adequar ao retorno da API
// TODO: Alterar o header para adequar ao retorno da API
// TODO: Conferir se os valores dos filtros estão corretos
// TODO: Alterar endpoint do filtro de Supervisor
// TODO: Alterar retorno do parseData para adequar os dados de retorno da API
// TODO: Adicionar ação a função extractData

interface DataInterface {
  status: any
  store_id: any
  store_name: any
  segment_name: any
  route_name: any
  people_id: any
  people_name: any
  supervisor_name: any
  window_planned: any
  window_performed: any
}

interface BodyInterface {
  status: any | null
  store_id: any | null
  store_name: any | null
  store_name_jsx: string | JSX.Element | null
  segment_name: any | null
  route_name: any | null
  people_id: any | null
  people_name: any | null
  people_name_jsx: string | JSX.Element | null
  supervisor_name: any | null
  window_planned: any | null
  window_performed: any | null
}

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Ponto de Atendimento',
    key: 'store_name_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'store_name',
  },
  {
    content: 'Canal',
    key: 'segment_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'segment_name',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Executor',
    key: 'people_name_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'people_name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_name',
  },
  {
    content: 'Janela Prevista',
    key: 'window_planned',
    textAlign: 'left',
    width: 2,
    sortKey: 'window_planned',
  },
  {
    content: 'Janela Realizada',
    key: 'window_performed',
    textAlign: 'left',
    width: 2,
    sortKey: 'window_performed',
  },
]

const statusColors: { [key: string]: string } = {
  Dentro: '#66BB6A',
  Fora: '#EF5350',
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusColors).map((key, index) => {
      return {
        label: <Bullet content={key} color={statusColors[key]} />,
        value: key,
      }
    }),
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: async (
      value: string | number | boolean,
    ): Promise<FiltersInterfaces.Option[]> => {
      const { data } = await axios.get('/v1/tr/segments', {
        params: { q: value },
      })

      return data.success
        ? data.data.map((e) => {
            return { label: e.name, value: e.id }
          })
        : []
    },
  },
]

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parseData = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const data = {
      status: <Bullet content={e.status} color={statusColors[e.status]} />,
      store_id: e.store_id || null,
      store_name: e.store_name || null,
      store_name_jsx: null,
      segment_name: e.segment_name || null,
      route_name: e.route_name || null,
      people_name: e.people_name || null,
      people_id: e.people_id || null,
      people_name_jsx: null,
      supervisor_name: e.supervisor_name || null,
      window_planned: e.window_planned || null,
      window_performed: e.window_performed || null,
    }

    data.store_name_jsx = !e.hasOwnProperty('store_id') ? (
      data.store_name
    ) : (
      <Popup
        trigger={data.store_name}
        getContent={async (): Promise<JSX.Element> =>
          getStoreDetails(data.store_id)
        }
      />
    )

    data.people_name_jsx = !e.hasOwnProperty('people_id') ? (
      data.people_name
    ) : (
      <Popup
        trigger={data.people_name}
        getContent={async (): Promise<JSX.Element> =>
          getPeopleDetails(data.people_id)
        }
      />
    )

    return data
  })
}

// Essa função irá fazer a requisição dos dados.
const request = async (
  _appliedFilters: FiltersInterfaces.AppliedFilter[],
  _search: string,
  _sort: SortState | null,
  _page: number,
): Promise<any> => {
  let params = { page: _page }
  if (_appliedFilters.length > 0)
    _appliedFilters.map((e) => (params[e.name] = e.value))
  if (_search) params['q'] = _search
  if (_sort) params = { ...params, ..._sort }

  const { data } = await axios.get('/v1/tr/widgets/details/30', { params })

  // Retornando o conteúdo do body da requisição
  return data
}

const Manager = (props: ManagerProps) => {
  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
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
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [appliedFilters, search, sort, page])

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

  const extractData = async (): Promise<any> => {
    setLoading(true)

    try {
      const {
        data: { data, success },
      } = await axios.get('/v1/widgets/details/30.xlsx')

      success && download(data.url)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Button
          primary
          size='tiny'
          content='Extrair dados'
          onClick={extractData}
        />
      </Toolbar>

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

      <ManagerCounter partial={body.length} total={totalRegistries} />
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
