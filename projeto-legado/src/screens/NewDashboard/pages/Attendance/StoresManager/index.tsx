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

import Popup from '../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import axios from '../../../../../services/Axios'
import { segments as getSegmentsOptions } from '../../../../../services/options'
import { getStartEndDayOfWeek } from '../../../../../utils/DateTime'
import { download } from '../../../../../utils/DownloadFile'
import { isNumeric, notEmptyString } from '../../../../../utils/Validators'
import { ManagerProps } from '../../../../interfaces'
import getStoreDetails from '../../../components/PopupDetails/StoreDetails'
import { firstDayWeek, lastDayWeek } from '../../../helpers/getCurrentWeek'

/**
 * Cabeçalho de exemplo
 */
const header: ColumnInterface[] = [
  {
    content: 'Ponto de atendimento',
    key: 'store_name_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'store_name',
  },
  {
    content: 'Estado',
    key: 'state_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'state_name',
  },
  {
    content: 'Cidade',
    key: 'city_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'city_name',
  },
  {
    content: 'Canal',
    key: 'segment_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'segment_name',
  },
  {
    content: 'Qtd. Atendimento S0',
    key: 'attendances_count_week',
    textAlign: 'center',
    width: 3,
    sortKey: 'attendances_count_week',
  },
  {
    content: 'Média (Ano)',
    key: 'average_year',
    textAlign: 'left',
    width: 2,
    sortKey: 'average_year',
  },
  {
    content: 'Média (S0)',
    key: 'average_week',
    textAlign: 'left',
    width: 2,
    sortKey: 'average_week',
  },
]

interface DataInterface {
  store_name?: string | null
  store_id?: number | null
  state_name?: string | null
  city_name?: string | null
  segment_name?: string | null
  attendances_count_week?: number | null
  average_year?: string | null
  average_week?: string | null
}

interface BodyInterface {
  store_name_jsx: JSX.Element | string | null
  store_name: string | null
  store_id: number | null
  state_name: string | null
  city_name: string | null
  segment_name: string | null
  attendances_count_week: number | null
  average_year: string | null
  average_week: string | null
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegmentsOptions,
  },
]

// essa funcao ira pegar os dados recebidos e fazer o parse para o formato que o manager precisa
const parseData = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const data = {
      store_name_jsx: null,
      store_name: notEmptyString(e.store_name) ? e.store_name : null,
      store_id: null,
      state_name: notEmptyString(e.state_name) ? e.state_name : null,
      city_name: notEmptyString(e.city_name) ? e.city_name : null,
      segment_name: notEmptyString(e.segment_name) ? e.segment_name : null,
      attendances_count_week: isNumeric(e.attendances_count_week)
        ? e.attendances_count_week
        : null,
      average_year: notEmptyString(e.average_year) ? e.average_year : null,
      average_week: notEmptyString(e.average_week) ? e.average_week : null,
    }

    data.store_name_jsx = data.store_name
    if (isNumeric(e.store_id)) {
      data.store_id = e.store_id

      data.store_name_jsx = (
        <Popup
          trigger={data.store_name}
          getContent={async (): Promise<JSX.Element> =>
            getStoreDetails(data.store_id)
          }
        />
      )
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
  // inicializando a variavel que contera os parametros da query http
  let params: any = {
    start: firstDayWeek,
    end: lastDayWeek,
    page,
    tab: 1,
  }

  // se existir algo na busca, insere o valor nos parametros da requisicao
  if (search.length > 0) params.q = search

  // para cada filtro aplicado, adiciona o nome do filtro e o valor aos parametros da requisicao
  for (let i = 0; i < appliedFilters.length; i++) {
    const { name, value } = { ...appliedFilters[i] }
    params[name] = value
  }

  // se houver alguma ordenacao aplicada, adiciona o nome da ordenacao e a direcao aos parametros da requisicao
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const requestURL = ['/v1/widgets/details/29']
  if (_export) requestURL.push('.xlsx')

  let response = null

  try {
    response = await axios.get(requestURL.join(''), { params })
  } catch (e) {
    return
  }

  return response.data
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

      // fazendo requisicao dos dados
      const responseData = await request(
        appliedFilters,
        search,
        sort,
        page,
        _export,
      )
      if (!responseData || !responseData.success) {
        alert('Não foi possível encontrar os dados')
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
      } = await axios.get('/v1/widgets/details/29.xlsx', {
        params: { tab: 1, ...getStartEndDayOfWeek() },
      })

      success && download(data.url)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.log(error)
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
