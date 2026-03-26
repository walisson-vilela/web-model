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
import ColoredColumn from '../../../../../components/ColoredColumn'
import Popup from '../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../components/ManagerCounter'
import ProgressColumn from '../../../../../components/ProgressColumn'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'
import { ManagerProps } from '../../../../interfaces'
import getPeopleDetails from '../../../components/PopupDetails/PeopleDetails'
import getPerformanceDetails from '../../../components/PopupDetails/PerformanceDetails'
import { firstDayWeek, lastDayWeek } from '../../../helpers/getCurrentWeek'

// TODO: Conferir se os valores dos filtros estão corretos

interface DataInterface {
  id?: string | null
  route_name?: string | null
  people_id?: string | null
  people_name?: string | null
  supervisor_name?: string | null
  team?: string | null
  sunday_planned?: string | null
  sunday_performed?: string | null
  sunday_performance?: string | null
  sunday_tmo?: string | null
  sunday_date?: string | null
  monday_planned?: string | null
  monday_performed?: string | null
  monday_performance?: string | null
  monday_tmo?: string | null
  monday_date?: string | null
  tuesday_planned?: string | null
  tuesday_performed?: string | null
  tuesday_performance?: string | null
  tuesday_tmo?: string | null
  tuesday_date?: string | null
  wednesday_planned?: string | null
  wednesday_performed?: string | null
  wednesday_performance?: string | null
  wednesday_tmo?: string | null
  wednesday_date?: string | null
  thursday_planned?: string | null
  thursday_performed?: string | null
  thursday_performance?: string | null
  thursday_tmo?: string | null
  thursday_date?: string | null
  friday_planned?: string | null
  friday_performed?: string | null
  friday_performance?: string | null
  friday_tmo?: string | null
  friday_date?: string | null
  saturday_planned?: string | null
  saturday_performed?: string | null
  saturday_performance?: string | null
  saturday_tmo?: string | null
  saturday_date?: string | null
  planned?: string | null
  performed?: string | null
  performance?: string | null
  reach_performed?: string | null
  reach_performance?: string | null
  impact?: string | null
}
interface BodyInterface {
  id?: number | null
  route_name?: string | null
  people_id?: number | null
  people_name?: JSX.Element | null
  supervisor_name?: string | null
  team?: string | null
  sunday_planned?: number | null
  sunday_performed?: JSX.Element | null
  sunday_performance?: number | null
  sunday_tmo?: number | null
  monday_planned?: number | null
  monday_performed?: JSX.Element | null
  monday_performance?: number | null
  monday_tmo?: number | null
  tuesday_planned?: number | null
  tuesday_performed?: JSX.Element | null
  tuesday_performance?: number | null
  tuesday_tmo?: number | null
  wednesday_planned?: number | null
  wednesday_performed?: JSX.Element | null
  wednesday_performance?: number | null
  wednesday_tmo?: number | null
  thursday_planned?: number | null
  thursday_performed?: JSX.Element | null
  thursday_performance?: number | null
  thursday_tmo?: number | null
  friday_planned?: number | null
  friday_performed?: JSX.Element | null
  friday_performance?: number | null
  friday_tmo?: number | null
  saturday_planned?: number | null
  saturday_performed?: JSX.Element | null
  saturday_performance?: number | null
  saturday_tmo?: number | null
  planned?: number | null
  performed?: JSX.Element | null
  reach_performed?: JSX.Element | null
  impact?: JSX.Element | null
}

const header: ColumnInterface[] = [
  {
    content: 'Impacto',
    key: 'impact',
    textAlign: 'left',
    width: 2,
    sortKey: 'impact',
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
    content: 'Equipe',
    key: 'team',
    textAlign: 'left',
    width: 2,
    sortKey: 'team',
  },
  {
    content: 'D',
    key: 'sunday_performed',
    textAlign: 'center',
    width: 1,
    sortKey: 'sunday_performed',
  },
  {
    content: 'S',
    key: 'monday_performed',
    textAlign: 'center',
    width: 1,
    sortKey: 'monday_performed',
  },
  {
    content: 'T',
    key: 'tuesday_performed',
    textAlign: 'center',
    width: 1,
    sortKey: 'tuesday_performed',
  },
  {
    content: 'Q',
    key: 'wednesday_performed',
    textAlign: 'center',
    width: 1,
    sortKey: 'wednesday_performed',
  },
  {
    content: 'Q',
    key: 'thursday_performed',
    textAlign: 'center',
    width: 1,
    sortKey: 'thursday_performed',
  },
  {
    content: 'S',
    key: 'friday_performed',
    textAlign: 'center',
    width: 1,
    sortKey: 'friday_performed',
  },
  {
    content: 'S',
    key: 'saturday_performed',
    textAlign: 'center',
    width: 1,
    sortKey: 'saturday_performed',
  },
  {
    content: 'Realizado % (S0)',
    key: 'performed',
    textAlign: 'left',
    width: 2,
    sortKey: 'performed',
  },
  {
    content: 'Alcance % (S0)',
    key: 'reach_performed',
    textAlign: 'left',
    width: 2,
    sortKey: 'reach_performed',
  },
]

const statusOptions: { [key: string]: { color: string; value: number } } = {
  Alto: { color: '#E23851', value: 1 },
  Moderado: { color: '#FBCF30', value: 2 },
  Baixo: { color: '#66BB6A', value: 3 },
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'impact',
    options: Object.keys(statusOptions).map((key, index) => {
      return {
        label: <Bullet content={key} color={statusOptions[key].color} />,
        value: statusOptions[key].value,
      }
    }),
  },
  {
    label: 'Realizado %',
    name: 'performed',
    options: [
      { label: '0% a 75%', value: 1 },
      { label: '75% a 95%', value: 2 },
      { label: '95% a 100%', value: 3 },
    ],
  },
  {
    label: 'Alcance %',
    name: 'reach_performed',
    options: [
      { label: '0% a 75%', value: 1 },
      { label: '75% a 95%', value: 2 },
      { label: '95% a 100%', value: 3 },
    ],
  },
]

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parseData = (data: DataInterface[]): BodyInterface[] => {
  const getColumnColor = (value: number): string => {
    if (value === null) return 'black'
    else if (value <= 75) return '#EF5350'
    else if (value <= 95) return '#FBCF30'
    else return '#66BB6A'
  }

  return data.map((e) => {
    let reachPerformance =
      e.reach_performed && e.planned
        ? (parseFloat(e.reach_performed) * 100) / parseFloat(e.planned)
        : 0
    let performance =
      e.performed && e.planned
        ? (parseFloat(e.performed) * 100) / parseFloat(e.planned)
        : 0
    return {
      id: e.hasOwnProperty('id') ? parseInt(e.id) : null,
      route_name: e.hasOwnProperty('route_name') ? e.route_name : null,
      people_id: e.hasOwnProperty('people_id') ? parseInt(e.people_id) : null,
      people_name: e.hasOwnProperty('people_id') ? (
        <Popup
          trigger={e.people_name}
          getContent={async (): Promise<JSX.Element> =>
            getPeopleDetails(parseInt(e.people_id))
          }
        />
      ) : null,
      supervisor_name: e.hasOwnProperty('supervisor_name')
        ? e.supervisor_name
        : null,
      team: e.hasOwnProperty('team') ? e.team : null,
      sunday_planned: e.hasOwnProperty('sunday_planned')
        ? parseFloat(e.sunday_planned)
        : null,
      sunday_performance: e.hasOwnProperty('sunday_performance')
        ? parseFloat(e.sunday_performance)
        : null,
      sunday_performed: e.hasOwnProperty('sunday_planned') ? (
        <Popup
          trigger={
            <ColoredColumn
              content={
                parseFloat(e.sunday_planned) > 0 &&
                parseFloat(e.sunday_performance) == 0
                  ? '0'
                  : e.sunday_performance
              }
              color={getColumnColor(parseFloat(e.sunday_performance))}
              withDot={
                e.hasOwnProperty('sunday_tmo') &&
                parseFloat(e.sunday_planned) > 0 &&
                (parseFloat(e.sunday_tmo) < 75 ||
                  parseFloat(e.sunday_tmo) > 110)
              }
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPerformanceDetails(parseInt(e.people_id), e.sunday_date)
          }
        />
      ) : null,
      sunday_tmo: e.hasOwnProperty('sunday_tmo')
        ? parseFloat(e.sunday_tmo)
        : null,
      monday_planned: e.hasOwnProperty('monday_planned')
        ? parseFloat(e.monday_planned)
        : null,
      monday_performance: e.hasOwnProperty('monday_performance')
        ? parseFloat(e.monday_performance)
        : null,
      monday_performed: e.hasOwnProperty('monday_planned') ? (
        <Popup
          trigger={
            <ColoredColumn
              content={
                parseFloat(e.monday_planned) > 0 &&
                parseFloat(e.monday_performance) == 0
                  ? '0'
                  : e.monday_performance
              }
              color={getColumnColor(parseFloat(e.monday_performance))}
              withDot={
                e.hasOwnProperty('monday_tmo') &&
                parseFloat(e.monday_planned) > 0 &&
                (parseFloat(e.monday_tmo) < 75 ||
                  parseFloat(e.monday_tmo) > 110)
              }
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPerformanceDetails(parseInt(e.people_id), e.monday_date)
          }
        />
      ) : null,
      monday_tmo: e.hasOwnProperty('monday_tmo')
        ? parseFloat(e.monday_tmo)
        : null,
      tuesday_planned: e.hasOwnProperty('tuesday_planned')
        ? parseFloat(e.tuesday_planned)
        : null,
      tuesday_performance: e.hasOwnProperty('tuesday_performance')
        ? parseFloat(e.tuesday_performance)
        : null,
      tuesday_performed: e.hasOwnProperty('tuesday_performance') ? (
        <Popup
          trigger={
            <ColoredColumn
              content={
                parseFloat(e.tuesday_planned) > 0 &&
                parseFloat(e.tuesday_performance) == 0
                  ? '0'
                  : e.tuesday_performance
              }
              color={getColumnColor(parseFloat(e.tuesday_performance))}
              withDot={
                e.hasOwnProperty('tuesday_tmo') &&
                parseFloat(e.tuesday_planned) > 0 &&
                (parseFloat(e.tuesday_tmo) < 75 ||
                  parseFloat(e.tuesday_tmo) > 110)
              }
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPerformanceDetails(parseInt(e.people_id), e.tuesday_date)
          }
        />
      ) : null,
      tuesday_tmo: e.hasOwnProperty('tuesday_tmo')
        ? parseFloat(e.tuesday_tmo)
        : null,
      wednesday_planned: e.hasOwnProperty('wednesday_planned')
        ? parseFloat(e.wednesday_planned)
        : null,
      wednesday_performance: e.hasOwnProperty('wednesday_performance')
        ? parseFloat(e.wednesday_performance)
        : null,
      wednesday_performed: e.hasOwnProperty('wednesday_performed') ? (
        <Popup
          trigger={
            <ColoredColumn
              content={
                parseFloat(e.wednesday_planned) > 0 &&
                parseFloat(e.wednesday_performance) == 0
                  ? '0'
                  : e.wednesday_performance
              }
              color={getColumnColor(parseFloat(e.wednesday_performance))}
              withDot={
                e.hasOwnProperty('wednesday_tmo') &&
                parseFloat(e.wednesday_planned) > 0 &&
                (parseFloat(e.wednesday_tmo) < 75 ||
                  parseFloat(e.wednesday_tmo) > 110)
              }
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPerformanceDetails(parseInt(e.people_id), e.wednesday_date)
          }
        />
      ) : null,
      wednesday_tmo: e.hasOwnProperty('wednesday_tmo')
        ? parseFloat(e.wednesday_tmo)
        : null,
      thursday_planned: e.hasOwnProperty('thursday_planned')
        ? parseFloat(e.thursday_planned)
        : null,
      thursday_performance: e.hasOwnProperty('thursday_performance')
        ? parseFloat(e.thursday_performance)
        : null,
      thursday_performed: e.hasOwnProperty('thursday_performed') ? (
        <Popup
          trigger={
            <ColoredColumn
              content={
                parseFloat(e.thursday_planned) > 0 &&
                parseFloat(e.thursday_performance) == 0
                  ? '0'
                  : e.thursday_performance
              }
              color={getColumnColor(parseFloat(e.thursday_performance))}
              withDot={
                e.hasOwnProperty('thursday_tmo') &&
                parseFloat(e.thursday_planned) > 0 &&
                (parseFloat(e.thursday_tmo) < 75 ||
                  parseFloat(e.thursday_tmo) > 110)
              }
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPerformanceDetails(parseInt(e.people_id), e.thursday_date)
          }
        />
      ) : null,
      thursday_tmo: e.hasOwnProperty('thursday_tmo')
        ? parseFloat(e.thursday_tmo)
        : null,
      friday_planned: e.hasOwnProperty('friday_planned')
        ? parseFloat(e.friday_planned)
        : null,
      friday_performance: e.hasOwnProperty('friday_performance')
        ? parseFloat(e.friday_performance)
        : null,
      friday_performed: e.hasOwnProperty('friday_performed') ? (
        <Popup
          trigger={
            <ColoredColumn
              content={
                parseFloat(e.friday_planned) > 0 &&
                parseFloat(e.friday_performance) == 0
                  ? '0'
                  : e.friday_performance
              }
              color={getColumnColor(parseFloat(e.friday_performance))}
              withDot={
                e.hasOwnProperty('friday_tmo') &&
                parseFloat(e.friday_planned) > 0 &&
                (parseFloat(e.friday_tmo) < 75 ||
                  parseFloat(e.friday_tmo) > 110)
              }
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPerformanceDetails(parseInt(e.people_id), e.friday_date)
          }
        />
      ) : null,
      friday_tmo: e.hasOwnProperty('friday_tmo')
        ? parseFloat(e.friday_tmo)
        : null,
      saturday_planned: e.hasOwnProperty('saturday_planned')
        ? parseFloat(e.saturday_planned)
        : null,
      saturday_performance: e.hasOwnProperty('saturday_performance')
        ? parseFloat(e.saturday_performance)
        : null,
      saturday_performed: e.hasOwnProperty('saturday_performed') ? (
        <Popup
          trigger={
            <ColoredColumn
              content={
                parseFloat(e.saturday_planned) > 0 &&
                parseFloat(e.saturday_performance) == 0
                  ? '0'
                  : e.saturday_performance
              }
              color={getColumnColor(parseFloat(e.saturday_performed))}
              withDot={
                e.hasOwnProperty('saturday_tmo') &&
                parseFloat(e.saturday_planned) > 0 &&
                (parseFloat(e.saturday_tmo) < 75 ||
                  parseFloat(e.saturday_tmo) > 110)
              }
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPerformanceDetails(parseInt(e.people_id), e.saturday_date)
          }
        />
      ) : null,
      saturday_tmo: e.hasOwnProperty('saturday_tmo')
        ? parseFloat(e.saturday_tmo)
        : null,
      planned: e.hasOwnProperty('planned') ? parseFloat(e.planned) : null,
      performed: e.hasOwnProperty('performed') ? (
        <ProgressColumn
          percent={performance}
          color={getColumnColor(performance)}
        />
      ) : null,
      reach_performed: e.hasOwnProperty('reach_performed') ? (
        <ProgressColumn
          percent={reachPerformance}
          color={getColumnColor(reachPerformance)}
        />
      ) : null,
      impact: e.hasOwnProperty ? (
        <Bullet
          content={Object.keys(statusOptions).find(
            (key) => statusOptions[key].value === parseInt(e.impact),
          )}
          color={
            statusOptions[
              Object.keys(statusOptions).find(
                (key) => statusOptions[key].value === parseInt(e.impact),
              )
            ].color
          }
        />
      ) : (
        <Bullet />
      ),
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
    tab: 2,
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
        params: { tab: 2, start: firstDayWeek, end: lastDayWeek },
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
