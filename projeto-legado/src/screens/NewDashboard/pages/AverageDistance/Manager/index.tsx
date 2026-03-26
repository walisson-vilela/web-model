import React, { useCallback, useEffect, useState } from 'react'

import {
  ColumnInterface,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import { Toaster, toast } from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import Bullet from '../../../../../components/Bullet'
import Popup from '../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import axios from '../../../../../services/Axios'
import { segments as getSegmentsOptions } from '../../../../../services/options'
import { download } from '../../../../../utils/DownloadFile'
import { ManagerProps } from '../../../../interfaces'
import getPeopleDetails from '../../../components/PopupDetails/PeopleDetails'

interface DataInterface {
  id?: string | null
  status?: string | null
  people_id?: string | null
  people_name?: string | null
  supervisor_id?: string | null
  supervisor_name?: string | null
  route_name?: string | null
  attendances_planned?: string | null
  attendances_added?: string | null
  attendances_performed?: string | null
  distance_planned?: string | null
  distance_performed?: string | null
}

interface BodyInterface {
  id: number | null
  status: JSX.Element | null
  people_id: number | null
  people_name: JSX.Element | null
  supervisor_id: number | null
  supervisor_name: string | null
  route_name: string | null
  attendances_planned: number | null
  attendances_added: number | null
  attendances_performed: number | null
  distance_planned: string | null
  distance_performed: string | null
}

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 1,
    sortKey: 'status',
  },
  {
    content: 'Executor',
    key: 'people_name',
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
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Atend. Previstos',
    key: 'attendances_planned',
    textAlign: 'center',
    width: 2,
    sortKey: 'attendances_planned',
  },
  {
    content: 'Atend. Adicionados',
    key: 'attendances_added',
    textAlign: 'center',
    width: 2,
    sortKey: 'attendances_added',
  },
  {
    content: 'Atend. Realizados (∑)',
    key: 'attendances_performed',
    textAlign: 'center',
    width: 2,
    sortKey: 'attendances_performed',
  },
  {
    content: 'Distância Prevista',
    key: 'distance_planned',
    textAlign: 'center',
    width: 2,
    sortKey: 'distance_planned',
  },
  {
    content: 'Distância Realizada',
    key: 'distance_performed',
    textAlign: 'center',
    width: 2,
    sortKey: 'distance_performed',
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
    options: getSegmentsOptions,
  },
]

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parseData = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      id: e.hasOwnProperty('id') ? parseInt(e.id) : null,
      status: e.hasOwnProperty('status') ? (
        <Bullet content={e.status} color={statusColors[e.status]} />
      ) : null,
      people_id: e.hasOwnProperty('people_id') ? parseInt(e.people_id) : null,
      people_name: e.hasOwnProperty('people_name') ? (
        <Popup
          trigger={e.people_name}
          getContent={async (): Promise<JSX.Element> =>
            getPeopleDetails(parseInt(e.people_id))
          }
        />
      ) : null,
      supervisor_id: e.hasOwnProperty('supervisor_id')
        ? parseInt(e.supervisor_id)
        : null,
      supervisor_name: e.hasOwnProperty('supervisor_name')
        ? e.supervisor_name
        : null,
      route_name: e.hasOwnProperty('route_name') ? e.route_name : null,
      attendances_planned: e.hasOwnProperty('attendances_planned')
        ? parseInt(e.attendances_planned)
        : null,
      attendances_added: e.hasOwnProperty('attendances_added')
        ? parseInt(e.attendances_added)
        : null,
      attendances_performed: e.hasOwnProperty('attendances_performed')
        ? parseInt(e.attendances_performed)
        : null,
      distance_planned: e.hasOwnProperty('distance_planned')
        ? e.distance_planned
        : null,
      distance_performed: e.hasOwnProperty('distance_performed')
        ? e.distance_performed
        : null,
    }
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

  const { data } = await axios.get('/v1/widgets/details/36', { params })

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
      } = await axios.get('/v1/widgets/details/36.xlsx')

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
