import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  SearchFilter,
  SortState,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'

import ManagerCounter from '../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { download } from '../../../../utils/DownloadFile'
import * as S from '../../styled'
import { Item } from '../interfaces'

import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getStores as request } from './services'

interface ManagerProps {
  title?: string | JSX.Element
  item: Item
  historic?: boolean
}

const Manager = (props: ManagerProps) => {
  const { title, item, historic } = { ...props }

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
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

    let responseData: any

    try {
      // fazendo requisição dos dados
      responseData = await request(
        item.distribution_center_id,
        search,
        sort,
        page,
        historic,
      )
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results: DataInterface[] = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [search, sort, page])

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

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      const { data, success } = await extractData(
        item.distribution_center_id,
        search,
        sort,
        historic,
      )

      if (!success || !data.url) throw new Error('Reposta inválida do endpoint')
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
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
