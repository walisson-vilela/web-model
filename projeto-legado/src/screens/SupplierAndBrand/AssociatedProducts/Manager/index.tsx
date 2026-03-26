import React, { useCallback, useEffect, useState } from 'react'

import { MwManager, SortState } from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../../components/ManagerCounter'
import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { download } from '../../../../utils/DownloadFile'
import { ModalProps } from '../types'

import header from './header'
import { BodyInterface } from './interfaces'
import parseData from './parser'
import { getAllProducts } from './services'

const Manager = (props: ModalProps) => {
  const { filter, id, label, name } = props

  const [search, setSearch] = useState<string>('')
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
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

    let responseData: any

    try {
      // fazendo requisição dos dados
      responseData = await getAllProducts(search, sort, page, false, filter, id)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)

      setLoading(false)
      setBody([])
      setIsLastPage(true)
      setTotalRegistries(0)

      return
    }

    // setando dados sobre a paginação
    const { has_next_page = false, count: total_registries = 0 } =
      responseData.pagination || {}

    setIsLastPage(!has_next_page)
    setTotalRegistries(total_registries)

    // pegando os resultados da requisição
    const results: unknown[] = responseData.data || []

    const body = parseData(results)
    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setBody(page === 1 ? body : (prev) => prev.concat(body))

    setLoading(false)
  }, [search, sort, page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickExtractData = useCallback(async () => {
    setLoading(true)

    try {
      const { success, data } = await getAllProducts(
        search,
        sort,
        page,
        true,
        filter,
        id,
      )

      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        download(data.url)
      }
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [search, sort, page])

  return (
    <React.Fragment>
      <Modal.Toolbar
        search={{ submitted: [search, setSearch] }}
        dropdown={{
          loading,
          items: [
            {
              content: 'Extrair dados',
              onClick: onClickExtractData,
              rules: [],
            },
          ],
        }}
      >
        {label} <strong>{name || ''} </strong>
      </Modal.Toolbar>

      <Modal.Toolbar.ManagerContainer>
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
      </Modal.Toolbar.ManagerContainer>

      <ManagerCounter partial={body.length} total={totalRegistries} />
    </React.Fragment>
  )
}

export default Manager
