import React, { useCallback, useEffect, useState } from 'react'

import { MwManager, SearchFilter } from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Popup, Radio } from 'semantic-ui-react'

import ManagerCounter from '../../../../components/ManagerCounter'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'

import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { getCategories as request } from './services'
import * as S from './styled'

interface ManagerProps {
  title?: JSX.Element | string
  distribution_center_id: number
  categories: number[]
  setCategories: Function
  loading: boolean
  setLoading: Function
}

const Manager = (props: ManagerProps) => {
  const {
    title,
    distribution_center_id,
    categories,
    setCategories,
    loading,
    setLoading,
  } = { ...props }

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager pre processado
  const [parsed, setParsed] = useState<BodyInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
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
      responseData = await request(distribution_center_id, search, page)
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
  }, [search, page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setParsed(parseData(data, setCategories))
  }, [data])

  // sempre que os dados pre processados ou o estado de algum input porem alterados, altera o estado das linhas do manager
  useEffect(() => {
    const radio = (
      checked: boolean,
      item: BodyInterface,
      disabled?: boolean,
    ) => {
      return (
        <Radio
          toggle
          checked={checked}
          onChange={(_event: any, data: any) => {
            const newCategories = categories.filter((id) => id !== item.id)
            if (data.checked) newCategories.push(item.id)

            setCategories(newCategories)
          }}
          disabled={disabled}
        />
      )
    }

    const getRadio =
      categories.length === 1
        ? (checked: boolean, item: BodyInterface) => {
            if (!checked) return radio(checked, item)

            return (
              <Popup
                content={
                  <React.Fragment>
                    <h4>Notificação</h4>
                    Regra de rateio foi aplicada ao faturamento da Central, logo
                    é necessário haver como particularidade pelo menos uma linha
                    de produto ativa.
                  </React.Fragment>
                }
                trigger={radio(checked, item, true)}
                inverted
              />
            )
          }
        : (checked: boolean, item: BodyInterface) => {
            return radio(checked, item)
          }

    setBody(
      parsed.map((item: BodyInterface): BodyInterface => {
        const newItem = { ...item }

        const checked = categories.includes(item.id)

        newItem.included_jsx = getRadio(checked, item)

        return newItem
      }),
    )
  }, [parsed, categories])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  return (
    <React.Fragment>
      <S.Toolbar>
        {title && <S.Title>{title}</S.Title>}

        <SearchFilter setSearch={setSearch} />
      </S.Toolbar>

      <MwManager
        columns={header}
        rows={body}
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
