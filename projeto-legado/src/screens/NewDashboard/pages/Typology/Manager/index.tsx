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
import ManagerCounter from '../../../../../components/ManagerCounter'
import ProgressColumn from '../../../../../components/ProgressColumn'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'
import { isNumeric, notEmptyString } from '../../../../../utils/Validators'
import { ManagerProps } from '../../../../interfaces'

// TODO: Reescrever as interfaces Data e Body para adequar ao retorno da API
// TODO: Alterar o header para adequar ao retorno da API
// TODO: Conferir se os valores dos filtros estão corretos
// TODO: Alterar endpoint do filtro de Supervisor
// TODO: Alterar retorno do parseData para adequar os dados de retorno da API
// TODO: Adicionar ação a função extractData

interface DataInterface {
  id: number | null
  typology_name: string | null
  typology_store_count: number | null
  typology_store_percentage: number | null
  sun_planned: number | null
  sun_performed: number | null
  sun_tmo: number | null
  sun_performance: number | null
  mon_planned: number | null
  mon_performed: number | null
  mon_tmo: number | null
  mon_performance: number | null
  tue_planned: number | null
  tue_performed: number | null
  tue_tmo: number | null
  tue_performance: number | null
  wed_planned: number | null
  wed_performed: number | null
  wed_tmo: number | null
  wed_performance: number | null
  thu_planned: number | null
  thu_performed: number | null
  thu_tmo: number | null
  thu_performance: number | null
  fri_planned: number | null
  fri_performed: number | null
  fri_tmo: number | null
  fri_performance: number | null
  sat_planned: number | null
  sat_performed: number | null
  sat_tmo: number | null
  sat_performance: number | null
  planned: number | null
  performed: number | null
  reach_performed: number | null
  reach_performance: number | null
  impact: number | null
  impact_name: string | null
  impact_color: string | null
  representativeness: number | null
}

interface BodyInterface {
  impact: number | null
  impact_jsx: JSX.Element | string | null
  typology_name: string | null
  typology_store_count: number | null
  typology_store_percentage: number | null
  typology_store_percentage_txt: string | null
  sun: number | null
  sun_jsx: JSX.Element | string | null
  mon: number | null
  mon_jsx: JSX.Element | string | null
  tue: number | null
  tue_jsx: JSX.Element | string | null
  thu: number | null
  thu_jsx: JSX.Element | string | null
  wed: number | null
  wed_jsx: JSX.Element | string | null
  fri: number | null
  fri_jsx: JSX.Element | string | null
  sat: number | null
  sat_jsx: JSX.Element | string | null
  performed: number | null
  performed_jsx: JSX.Element | string | null
  reach: number | null
  reach_jsx: JSX.Element | string | null
}

const header: ColumnInterface[] = [
  {
    content: 'Impacto',
    key: 'impact_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'impact',
  },
  {
    content: 'Tipologia',
    key: 'typology_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'typology_name',
  },
  {
    content: 'Representatividade',
    key: 'typology_store_percentage_txt',
    textAlign: 'center',
    width: 2,
    sortKey: 'typology_store_percentage',
  },
  {
    content: 'Qtd. PDVs',
    key: 'typology_store_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'typology_store_count',
  },
  {
    content: 'D',
    key: 'sun_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'sun',
  },
  {
    content: 'S',
    key: 'mon_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'mon',
  },
  {
    content: 'T',
    key: 'tue_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'tue',
  },
  {
    content: 'Q',
    key: 'wed_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'wed',
  },
  {
    content: 'Q',
    key: 'thu_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'thu',
  },
  {
    content: 'S',
    key: 'fri_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'fri',
  },
  {
    content: 'S',
    key: 'sat_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'sat',
  },
  {
    content: 'Realizado % (S0)',
    key: 'performed_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'performed',
  },
  {
    content: 'Alcance % (S0)',
    key: 'reach_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'reach',
  },
]

const statusColors: { [key: string]: { name: string; color: string } } = {
  '3': {
    name: 'Alto',
    color: '#EF5350',
  },
  '2': {
    name: 'Moderado',
    color: '#FBCF30',
  },
  '1': {
    name: 'Baixo',
    color: '#66BB6A',
  },
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'impact',
    options: Object.keys(statusColors).map((key) => {
      const { name, color } = { ...statusColors[key] }

      return {
        label: <Bullet content={name} color={color} />,
        value: key,
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
    name: 'reach',
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
    if (value <= 75) return '#EF5350'
    else if (value <= 95) return '#FBCF30'
    else return '#66BB6A'
  }

  return data.map((e) => {
    const data = {
      impact: isNumeric(e.impact) ? e.impact : null,
      impact_jsx: notEmptyString(e.impact_name) ? (
        <Bullet content={e.impact_name} color={statusColors[e.impact].color} />
      ) : null,
      typology_name: notEmptyString(e.typology_name) ? e.typology_name : null,
      typology_store_count: isNumeric(e.typology_store_count)
        ? e.typology_store_count
        : null,
      typology_store_percentage: null,
      typology_store_percentage_txt: null,

      sun: null,
      sun_jsx: null,
      mon: null,
      mon_jsx: null,
      tue: null,
      tue_jsx: null,
      thu: null,
      thu_jsx: null,
      wed: null,
      wed_jsx: null,
      fri: null,
      fri_jsx: null,
      sat: null,
      sat_jsx: null,

      performed: null,
      performed_jsx: null,
      reach: null,
      reach_jsx: null,
    }

    if (isNumeric(e.typology_store_percentage)) {
      const value = e.typology_store_percentage
      data.typology_store_percentage = value
      data.typology_store_percentage_txt = `${value}%`
    }

    const days = ['sun', 'mon', 'tue', 'thu', 'wed', 'fri', 'sat']
    for (let i = 0; i < days.length; i++) {
      const day = days[i]
      const key = `${day}_performance`
      const key_jsx = `${key}_jsx`
      if (isNumeric(e[key])) {
        const value = e[key]
        data[key] = value
        data[key_jsx] = (
          <ColoredColumn content={value} color={getColumnColor(value)} />
        )
      }
    }

    if (isNumeric(e.performed)) {
      const value = e.performed
      data.performed = value
      data.performed_jsx = (
        <ProgressColumn percent={value} color={getColumnColor(value)} />
      )
    }

    // if (isNumeric(e.reach)) {
    //   const value = e.reach
    //   data.reach = value
    //   data.reach_jsx = <ProgressColumn
    //     percent={value}
    //     color={getColumnColor(value)}
    //   />
    // }

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

  const { data } = await axios.get('/v1/widgets/details/26', { params })

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
      } = await axios.get('/v1/widgets/details/26.xlsx')

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
