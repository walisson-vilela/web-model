import React, { useCallback, useEffect, useState } from 'react'

import {
  ColumnInterface,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import Bullet from '../../../../../components/Bullet'
import Popup from '../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import WeekDaysConstants from '../../../../../constants/WeekDaysConstants'
import axios from '../../../../../services/Axios'
import { segments as getSegments } from '../../../../../services/options'
import { download } from '../../../../../utils/DownloadFile'
import { ManagerProps } from '../../../../interfaces'
import getPeopleDetails from '../../../components/PopupDetails/PeopleDetails'
import getStoreDetails from '../../../components/PopupDetails/StoreDetails'
import { firstDayWeek, lastDayWeek } from '../../../helpers/getCurrentWeek'

interface DataInterface {
  id?: number
  attendance_status?: string
  route_name?: string
  store_id?: string | null
  store_name?: string | null
  segment_id?: string | null
  segment_name?: string | null
  date?: string | null
  day_visit?: string | null
  people_id?: string | null
  people_name?: string | null
  supervisor_id?: string | null
  supervisor_name?: string | null
}

interface BodyInterface {
  id?: number | null
  attendance_status?: JSX.Element
  route_name?: string | null
  store_id?: number | null
  store_name?: JSX.Element | null
  segment_id?: number | null
  segment_name?: string | null
  date?: string | null
  day_visit?: string | null
  people_id?: number | null
  people_name?: JSX.Element | null
  supervisor_id?: number | null
  supervisor_name?: string | null
}

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'attendance_status',
    textAlign: 'left',
    width: 2,
    sortKey: 'attendance_status',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Ponto de Atendimento',
    key: 'store_name',
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
    content: 'Dia de Visita',
    key: 'day_visit',
    textAlign: 'left',
    width: 2,
    sortKey: 'day_visit',
  },
  {
    content: 'Executor',
    key: 'people_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'people_name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'supervisor_name',
  },
]

const statusOptions: { [key: string]: { color: string; value: string } } = {
  Concluído: { color: '#66BB6A', value: 'Concluído' },
  Andamento: { color: '#FBCF30', value: 'Andamento' },
  'Não Realizado': { color: '#E23851', value: 'Não Realizado' },
  Previsto: { color: '#3455AB', value: 'Previsto' },
  Justificado: { color: '#E23851', value: 'Justificado' },
  Recusado: { color: '#E23851', value: 'Recusado' },
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'attendance_status',
    options: Object.keys(statusOptions).map((key) => {
      return {
        label: <Bullet content={key} color={statusOptions[key].color} />,
        value: statusOptions[key].value,
      }
    }),
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegments,
  },
  {
    label: 'Dia da Semana',
    name: 'day_visit',
    options: WeekDaysConstants,
  },
]

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parseData = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    return {
      id: e.hasOwnProperty('id') ? e.id : null,
      attendance_status: e.hasOwnProperty('attendance_status') ? (
        <Bullet
          content={e.attendance_status}
          color={statusOptions[e.attendance_status].color}
        />
      ) : (
        <Bullet />
      ),
      route_name: e.hasOwnProperty('route_name') ? e.route_name : null,
      store_id: e.hasOwnProperty('store_id') ? parseInt(e.store_id) : null,
      store_name: e.hasOwnProperty('store_id') ? (
        <Popup
          trigger={e.store_name}
          getContent={async (): Promise<JSX.Element> =>
            getStoreDetails(parseInt(e.store_id))
          }
        />
      ) : null,
      segment_id: e.hasOwnProperty('segment_id')
        ? parseInt(e.segment_id)
        : null,
      segment_name: e.hasOwnProperty('segment_name') ? e.segment_name : null,
      date: e.hasOwnProperty('date')
        ? moment(e.date).format('DD/MM/YYYY')
        : null,
      day_visit: e.hasOwnProperty('day_visit') ? e.day_visit : null,
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
  let params = {
    tab: 1,
    'no-paginate': 1,
    page: _page,
    start: firstDayWeek,
    end: lastDayWeek,
  }
  if (_appliedFilters.length > 0)
    _appliedFilters.map((e) => (params[e.name] = e.value))
  if (_search) params['q'] = _search
  if (_sort) params = { ...params, ..._sort }

  try {
    const { data } = await axios.get('/v1/widgets/details/14', { params })

    // Retornando o conteúdo do body da requisição
    return data
  } catch (error) {
    alert('Erro ao buscar dados do widget')
    console.log(error)
  }
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
      } = await axios.get('/v1/widgets/details/14.xlsx', {
        params: { tab: 1, start: firstDayWeek, end: lastDayWeek },
      })

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
