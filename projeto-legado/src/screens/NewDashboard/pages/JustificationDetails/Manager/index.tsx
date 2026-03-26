import React, { useCallback, useEffect, useState } from 'react'

import {
  ColumnInterface,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import moment from 'moment'
import { Toaster, toast } from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import Popup from '../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import axios from '../../../../../services/Axios'
import {
  segments as getSegmentsOptions,
  peoples as getSupervisorOptions,
} from '../../../../../services/options'
import { getStartEndDayOfWeek } from '../../../../../utils/DateTime'
import { download } from '../../../../../utils/DownloadFile'
import { ManagerProps } from '../../../../interfaces'
import getPeopleDetails from '../../../components/PopupDetails/PeopleDetails'
import getStoreDetails from '../../../components/PopupDetails/StoreDetails'

interface DataInterface {
  id?: string | null
  route_name?: string | null
  store_id?: string | null
  store_name?: string | null
  segment_id?: string | null
  segment_name?: string | null
  date?: string | null
  people_id?: string | null
  people_name?: string | null
  supervisor_name?: string | null
  justify_name?: string | null
}

interface BodyInterface {
  id: number | null
  route_name: string | null
  store_id: number | null
  store_name: JSX.Element | null
  segment_id: number | null
  segment_name: string | null
  date: string | null
  people_id: number | null
  people_name: JSX.Element | null
  supervisor_name: string | null
  justify_name: string | null
}

const header: ColumnInterface[] = [
  {
    content: 'Ponto de Atendimento',
    key: 'store_name',
    textAlign: 'left',
    width: 3,
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
  {
    content: 'Os Motivos de Justificativas',
    key: 'justify_name',
    textAlign: 'center',
    width: 3,
    sortKey: 'justify_name',
  },
]

// TODO: Alterar filtro de Motivos

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegmentsOptions,
  },
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: getSupervisorOptions,
  },
  {
    label: 'Motivo',
    name: 'justify_name',
    options: async (
      value: string | number | boolean,
    ): Promise<FiltersInterfaces.Option[]> => {
      console.log(value)

      await fetch('https://pokeapi.co/api/v2/pokemon')

      return [
        { label: 'Motivo 1', value: 1 },
        { label: 'Motivo 2', value: 2 },
      ]
    },
  },
]

// essa funcao ira pegar os dados recebidos e fazer o parse para o formato que o manager precisa
const parseData = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const data = {
      id: e.hasOwnProperty('id') ? parseInt(e.id) : null,
      route_name: e.hasOwnProperty('route_name') ? e.route_name : null,
      store_id: e.hasOwnProperty('store_id') ? parseInt(e.store_id) : null,
      store_name: e.hasOwnProperty('store_name') ? (
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
      people_id: e.hasOwnProperty('people_id') ? parseInt(e.people_id) : null,
      people_name: e.hasOwnProperty('people_name') ? (
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
      justify_name: e.hasOwnProperty('justify_name') ? e.justify_name : null,
    }

    return data
  })
}

// essa funcao ira fazer a requisicao dos dados
const request = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  _export?: boolean,
): Promise<any> => {
  let params = { page, ...getStartEndDayOfWeek() }
  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (search) params['q'] = search
  if (sort) params = { ...params, ...sort }

  try {
    const { data } = await axios.get('/v1/widgets/details/16', { params })

    // Retornando o conteúdo do body da requisição
    return data
  } catch (error) {
    toast(<ToasterContent color='error' />, ErrorStyle)
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
  // estado controlador da paginacao
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)

  // essa funcao tem os filtros aplicados, o valor do input de busca e o valor da ordenacao como dependencias
  const loadData = useCallback(
    async (_export?: boolean) => {
      setLoading(true)

      try {
        // fazendo requisicao dos dados
        const responseData = await request(
          appliedFilters,
          search,
          sort,
          page,
          _export,
        )
        if (!responseData || !responseData.success) {
          setLoading(false)
          return
        }

        // setando dados sobre a paginação
        const { has_next_page = false, count: total_registries = 0 } =
          responseData.pagination || {}

        setIsLastPage(!has_next_page)
        setTotalRegistries(total_registries)

        // pegando os resultados da requisicao
        const results = responseData.data || []

        // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
        setData(page === 1 ? results : (prev) => prev.concat(results))
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    },
    [appliedFilters, search, sort, page],
  )

  // essa funcao sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  // sempre que alguma dependencia da funcao loadData for alterada, chama a funcao
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
      } = await axios.get('/v1/widgets/details/16.xlsx', {
        params: { ...getStartEndDayOfWeek() },
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
