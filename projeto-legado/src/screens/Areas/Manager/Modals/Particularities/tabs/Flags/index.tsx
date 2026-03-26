import { useCallback, useEffect, useState } from 'react'

import { MwManager } from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../../../../../components/ManagerCounter'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { TabComponent } from '../../types'

import header from './header'
import { extractData, getStores } from './services'
import { BodyInterface } from './types'

const Flags: TabComponent = Object.assign(
  ((props) => {
    const {
      search: [search],
      sort: [sort, setSort],
      loading: [loading, setLoading],
      totalRegistries: [totalRegistries, setTotalRegistries],
      data,
    } = props

    // estado controlador do conteudo do manager
    const [body, setBody] = useState<BodyInterface[]>([])

    // estado controlador da paginação
    const [page, setPage] = useState<number>(1)
    // estado controlador do limite da paginação
    const [isLastPage, setIsLastPage] = useState<boolean>(false)

    // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
    const loadData = useCallback(async () => {
      setLoading(true)

      try {
        // fazendo requisição dos dados
        const {
          data: results,
          pagination: { has_next_page, count: total_registries },
        } = await getStores(data.id, search, sort)

        // setando dados sobre a paginação
        setIsLastPage(!has_next_page)
        setTotalRegistries(total_registries)

        // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
        setBody(page === 1 ? results : (prev) => prev.concat(results))
      } catch (error) {
        console.error(error)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
    }, [data.id, search, sort, page])

    // sempre que alguma dependencia da função loadData for alterada, chama a função
    useEffect(() => {
      loadData()
    }, [loadData])

    const paginator = () => {
      if (!isLastPage) setPage((prev) => (prev += 1))
    }

    return (
      <>
        <MwManager
          columns={header}
          rows={body}
          sort={{ sort, setSort }}
          hasFilters={false}
          loading={loading}
          paginator={paginator}
          page={page}
          setPage={setPage}
          list
        />

        <ManagerCounter partial={body.length} total={totalRegistries} />
      </>
    )
  }) as TabComponent,
  {
    label: 'Bandeira',
    extractor: extractData,
  },
)

export default Flags
