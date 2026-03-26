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
import { peoples as getSupervisorOptions } from '../../../../../services/options'
import { download } from '../../../../../utils/DownloadFile'
import { ManagerProps } from '../../../../interfaces'
import getPeopleDetails from '../../../components/PopupDetails/PeopleDetails'

interface DataInterface {
  impact?: number | null
  impact_name?: string | null
  impact_color?: string | null
  route_name?: string | null
  people_id?: number | null
  people_name?: string | null
  supervisor_id?: number | null
  supervisor_name: string | null
  sun_tmo?: number | null
  sun_date?: number | null
  sun_planned?: number | null
  mon_tmo?: number | null
  mon_date?: number | null
  mon_planned?: number | null
  tue_tmo?: number | null
  tue_date?: number | null
  tue_planned?: number | null
  wed_tmo?: number | null
  wed_date?: number | null
  wed_planned?: number | null
  thu_tmo?: number | null
  thu_date?: number | null
  thu_planned?: number | null
  fri_tmo?: number | null
  fri_date?: number | null
  fri_planned?: number | null
  sat_tmo?: number | null
  sat_date?: number | null
  sat_planned?: number | null
  tmo_positive?: number | null
  tmo_negative?: number | null
}

interface BodyInterface {
  impact: number | null
  impact_name: JSX.Element | null
  impact_color: string | null
  route_name: string | null
  people_id: number | null
  people_name: JSX.Element | null
  supervisor_id: number | null
  supervisor_name: string | null
  sun_tmo: JSX.Element | null
  sun_date: number | null
  sun_planned: number | null
  mon_tmo: JSX.Element | null
  mon_date: number | null
  mon_planned: number | null
  tue_tmo: JSX.Element | null
  tue_date: number | null
  tue_planned: number | null
  wed_tmo: JSX.Element | null
  wed_date: number | null
  wed_planned: number | null
  thu_tmo: JSX.Element | null
  thu_date: number | null
  thu_planned: number | null
  fri_tmo: JSX.Element | null
  fri_date: number | null
  fri_planned: number | null
  sat_tmo: JSX.Element | null
  sat_date: number | null
  sat_planned: number | null
  tmo_positive: JSX.Element | null
  tmo_negative: JSX.Element | null
}

const header: ColumnInterface[] = [
  {
    content: 'Impacto',
    key: 'impact_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'impact_name',
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
    content: 'D',
    key: 'sun_tmo',
    textAlign: 'center',
    width: 1,
    sortKey: 'sun_tmo',
  },
  {
    content: 'S',
    key: 'mon_tmo',
    textAlign: 'center',
    width: 1,
    sortKey: 'mon_tmo',
  },
  {
    content: 'T',
    key: 'tue_tmo',
    textAlign: 'center',
    width: 1,
    sortKey: 'tue_tmo',
  },
  {
    content: 'Q',
    key: 'wed_tmo',
    textAlign: 'center',
    width: 1,
    sortKey: 'wed_tmo',
  },
  {
    content: 'Q',
    key: 'thu_tmo',
    textAlign: 'center',
    width: 1,
    sortKey: 'thu_tmo',
  },
  {
    content: 'S',
    key: 'fri_tmo',
    textAlign: 'center',
    width: 1,
    sortKey: 'fri_tmo',
  },
  {
    content: 'S',
    key: 'sat_tmo',
    textAlign: 'center',
    width: 1,
    sortKey: 'sat_tmo',
  },
  {
    content: 'TMO+ (S0)',
    key: 'tmo_positive',
    textAlign: 'left',
    width: 2,
    sortKey: 'tmo_positive',
  },
  {
    content: 'TMO- (S0)',
    key: 'tmo_negative',
    textAlign: 'left',
    width: 2,
    sortKey: 'tmo_negative',
  },
]

const statusColors: { [key: string]: string } = {
  Alto: '#66BB6A',
  Moderado: '#FBCF30',
  Baixo: '#EF5350',
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'impact',
    options: Object.keys(statusColors).map((key, index) => {
      return {
        label: <Bullet content={key} color={statusColors[key]} />,
        value: key,
      }
    }),
  },
  {
    label: 'Supervisor',
    name: 'supervisor_name',
    options: getSupervisorOptions,
  },
  {
    label: 'TMO+',
    name: 'tmo_positive',
    options: [
      { label: '0% a 75%', value: 1 },
      { label: '75% a 90%', value: 2 },
      { label: '90% a 100%', value: 3 },
    ],
  },
  {
    label: 'TMO-',
    name: 'tmo_negative',
    options: [
      { label: 'Abaixo de 10%', value: 1 },
      { label: 'Acima de 10%', value: 2 },
    ],
  },
]

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parseData = (data: DataInterface[]): BodyInterface[] => {
  const getColumnColor = (value: number): string => {
    if (value <= 90) return '#CC00CC'
    else if (value <= 110) return '#000000CC'
    else return '#EF5350'
  }

  return data.map((e) => {
    return {
      impact: e.hasOwnProperty('impact') ? e.impact : null,
      impact_name: (
        <Bullet content={e.impact_name} color={statusColors[e.impact_name]} />
      ),
      impact_color: e.hasOwnProperty('impact_color') ? e.impact_color : null,
      route_name: e.hasOwnProperty('route_name') ? e.route_name : null,
      people_id: e.hasOwnProperty('people_id') ? e.people_id : null,
      people_name: e.hasOwnProperty('people_name') ? (
        <Popup
          trigger={e.people_name}
          getContent={async (): Promise<JSX.Element> =>
            getPeopleDetails(e.people_id)
          }
        />
      ) : null,
      supervisor_id: e.hasOwnProperty('supervisor_id') ? e.supervisor_id : null,
      supervisor_name: e.hasOwnProperty('supervisor_name')
        ? e.supervisor_name
        : null,
      sun_tmo: e.hasOwnProperty('sun_tmo') ? (
        <Popup
          inverted
          on='hover'
          disabled={!e.sun_date || e.sun_planned === null}
          trigger={
            <ColoredColumn
              content={e.sun_tmo ? e.sun_tmo : '0'}
              color={getColumnColor(e.sun_tmo)}
            />
          }
          getContent={async () => (
            <>
              <p>{e.sun_date}</p>
              <p>
                Quantidade de Atendimentos <br /> Previstos: {e.sun_planned}
              </p>
            </>
          )}
        />
      ) : null,
      sun_date: e.hasOwnProperty('sun_date') ? e.sun_date : null,
      sun_planned: e.hasOwnProperty('sun_planned') ? e.sun_planned : null,
      mon_tmo: e.hasOwnProperty('mon_tmo') ? (
        <Popup
          inverted
          on='hover'
          disabled={!e.mon_date || e.mon_planned === null}
          trigger={
            <ColoredColumn
              content={e.mon_tmo ? e.mon_tmo : '0'}
              color={getColumnColor(e.mon_tmo)}
            />
          }
          getContent={async () => (
            <>
              <p>{e.mon_date}</p>
              <p>
                Quantidade de Atendimentos <br /> {e.mon_planned}
              </p>
            </>
          )}
        />
      ) : null,
      mon_date: e.hasOwnProperty('mon_date') ? e.mon_date : null,
      mon_planned: e.hasOwnProperty('mon_planned') ? e.mon_planned : null,
      tue_tmo: e.hasOwnProperty('tue_tmo') ? (
        <Popup
          inverted
          on='hover'
          disabled={!e.tue_date || e.tue_planned === null}
          trigger={
            <ColoredColumn
              content={e.tue_tmo ? e.tue_tmo : '0'}
              color={getColumnColor(e.tue_tmo)}
            />
          }
          getContent={async () => (
            <>
              <p>{e.tue_date}</p>
              <p>
                Quantidade de Atendimentos <br /> {e.tue_planned}
              </p>
            </>
          )}
        />
      ) : null,
      tue_date: e.hasOwnProperty('tue_date') ? e.tue_date : null,
      tue_planned: e.hasOwnProperty('tue_planned') ? e.tue_planned : null,
      wed_tmo: e.hasOwnProperty('wed_tmo') ? (
        <Popup
          inverted
          on='hover'
          disabled={!e.wed_date || e.wed_planned === null}
          trigger={
            <ColoredColumn
              content={e.wed_tmo ? e.wed_tmo : '0'}
              color={getColumnColor(e.wed_tmo)}
            />
          }
          getContent={async () => (
            <>
              <p>{e.wed_date}</p>
              <p>
                Quantidade de Atendimentos <br /> {e.wed_planned}
              </p>
            </>
          )}
        />
      ) : null,
      wed_date: e.hasOwnProperty('wed_date') ? e.wed_date : null,
      wed_planned: e.hasOwnProperty('wed_planned') ? e.wed_planned : null,
      thu_tmo: e.hasOwnProperty('thu_tmo') ? (
        <Popup
          inverted
          on='hover'
          disabled={!e.thu_date || e.thu_planned === null}
          trigger={
            <ColoredColumn
              content={e.thu_tmo ? e.thu_tmo : '0'}
              color={getColumnColor(e.thu_tmo)}
            />
          }
          getContent={async () => (
            <>
              <p>{e.thu_date}</p>
              <p>
                Quantidade de Atendimentos <br /> {e.thu_planned}
              </p>
            </>
          )}
        />
      ) : null,
      thu_date: e.hasOwnProperty('thu_date') ? e.thu_date : null,
      thu_planned: e.hasOwnProperty('thu_planned') ? e.thu_planned : null,
      fri_tmo: e.hasOwnProperty('fri_tmo') ? (
        <Popup
          inverted
          on='hover'
          disabled={!e.fri_date || e.fri_planned === null}
          trigger={
            <ColoredColumn
              content={e.fri_tmo ? e.fri_tmo : '0'}
              color={getColumnColor(e.fri_tmo)}
            />
          }
          getContent={async () => (
            <>
              <p>{e.fri_date}</p>
              <p>
                Quantidade de Atendimentos <br /> {e.fri_planned}
              </p>
            </>
          )}
        />
      ) : null,
      fri_date: e.hasOwnProperty('fri_date') ? e.fri_date : null,
      fri_planned: e.hasOwnProperty('fri_planned') ? e.fri_planned : null,
      sat_tmo: e.hasOwnProperty('sat_tmo') ? (
        <Popup
          inverted
          on='hover'
          disabled={!e.sat_date || e.sat_planned === null}
          trigger={
            <ColoredColumn
              content={e.sat_tmo ? e.sat_tmo : '0'}
              color={getColumnColor(e.sat_tmo)}
            />
          }
          getContent={async () => (
            <>
              <p>{e.sat_date}</p>
              <p>
                Quantidade de Atendimentos <br /> {e.sat_planned}
              </p>
            </>
          )}
        />
      ) : null,
      sat_date: e.hasOwnProperty('sat_date') ? e.sat_date : null,
      sat_planned: e.hasOwnProperty('sat_planned') ? e.sat_planned : null,
      tmo_positive: e.hasOwnProperty('tmo_positive') ? (
        <ProgressColumn
          percent={e.tmo_positive ? e.tmo_positive : '0'}
          color='#66BB6A'
        />
      ) : null,
      tmo_negative: e.hasOwnProperty('tmo_negative') ? (
        <ProgressColumn
          percent={e.tmo_negative ? e.tmo_negative : '0'}
          color='#EF5350'
        />
      ) : null,
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

  const { data } = await axios.get('/v1/widgets/details/18', { params })

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
      } = await axios.get('/v1/widgets/details/18.xlsx')

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
