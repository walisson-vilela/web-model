import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  SearchFilter,
  SortState,
} from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { download } from '../../../../utils/DownloadFile'
import * as S from '../../styled'
import { Item } from '../interfaces'

import header from './header'
import { BodyInterface } from './interfaces'
import { extractData, getStores } from './services'

interface ManagerProps {
  title?: string | JSX.Element
  segment: Item
}

const Manager = (props: ManagerProps) => {
  const { title, segment } = { ...props }

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')

  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
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
      const response = await getStores(
        segment.segment_id,
        search,
        sort,
        page,
        segment.region_id,
      )
      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        response.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results = response.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? results : (prev) => prev.concat(results))

      setLoading(false)
    } catch (e) {
      setLoading(false)
      return
    }
  }, [search, sort, page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      const { data } = await extractData(
        segment.segment_id,
        search,
        sort,
        segment.region_id,
      )
      download(data.url)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      rules: [],
    },
  ]

  return (
    <React.Fragment>
      <S.Toolbar>
        <S.ToolbarCell>
          <S.ToolbarTitle>{title}</S.ToolbarTitle>
        </S.ToolbarCell>

        <S.ToolbarCell>
          <SearchFilter setSearch={setSearch} />
        </S.ToolbarCell>

        <S.ToolbarCell>
          <Dropdown
            items={dropdownItems}
            loading={loading}
            axis='y'
            centerCoodinates={{ y: 100 }}
          />
        </S.ToolbarCell>
      </S.Toolbar>

      <MwManager
        list={true}
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />
    </React.Fragment>
  )
}

export default Manager
