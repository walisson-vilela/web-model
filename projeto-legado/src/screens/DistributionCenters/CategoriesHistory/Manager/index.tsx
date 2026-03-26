import React, { useCallback, useEffect, useState } from 'react'

import {
  DropdownInterfaces,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { download } from '../../../../utils/DownloadFile'
import { booleanOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { isOppenedModal } from '../../functions'
import { OpenedModal } from '../../interfaces'
import * as S from '../../styled'
import Reprocess from '../Reprocess'

import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getHistory as request } from './services'

interface ManagerProps {
  distribution_center_id: number
  title?: JSX.Element | string
}

const Manager = (props: ManagerProps) => {
  const { distribution_center_id, title } = { ...props }

  // estado controlador dos filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado controlador do modal
  const [modal, setModal] = useState<OpenedModal | JSX.Element | null>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    let responseData: any

    try {
      // fazendo requisição dos dados
      responseData = await request(
        distribution_center_id,
        search,
        appliedFilters,
        sort,
        page,
      )
      // setando se a pagina atual e a ultima
      if (isObject(responseData.pagination)) {
        setIsLastPage(
          !booleanOrDefault(responseData.pagination.has_next_page, false),
        )
      } else setIsLastPage(true)
      // pegando os resultados da requisição
      const results: DataInterface[] = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [search, appliedFilters, sort, page])

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
    setBody(
      parseData(
        data,
        distribution_center_id,
        setModal,
        title,
        reload,
        setLoading,
      ),
    )
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      const { data, success } = await extractData(
        distribution_center_id,
        search,
        appliedFilters,
        sort,
      )

      if (!success || !data.url) throw new Error('Reposta inválida do endpoint')
      download(data.url)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const onClickReprocess = async (item: BodyInterface): Promise<any> => {
    setModal(
      <Reprocess
        closeModal={() => setModal(null)}
        distribution_center_id={item.id}
        reference={item.reference_txt || '-'}
        reload={reload}
      />,
    )
  }

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    if (!item.canReprocess) return []

    return [
      {
        content: 'Reprocessar Rateio',
        onClick: () => onClickReprocess(item),
        rules: [],
      },
    ]
  }

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Button
          primary
          size='tiny'
          content='Extrair dados'
          onClick={onClickExtractData}
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
        getItemMenu={getItemMenu}
      />

      {!isOppenedModal(modal) ? (
        modal
      ) : (
        <Modal size={modal.size || 'tiny'} open>
          <S.ModalHeader content={modal.title} color={modal.titleColor} />

          <Modal.Content>{modal.content}</Modal.Content>

          <Modal.Actions>
            {modal.actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </Modal.Actions>
        </Modal>
      )}
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
