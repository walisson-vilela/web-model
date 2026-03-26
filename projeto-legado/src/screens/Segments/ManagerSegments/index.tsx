import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import { ManagerProps } from '../../interfaces'

import Create from './Form'
import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getSegments as request } from './services'

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
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  // estado controlador do modal
  const [modal, setModal] = useState<ModalState>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

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
    setBody(parseData(data, setModal))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const getCreateModal = (close: Function, reload: Function) => {
    close(<Create loadData={reload} setOpen={close} />)
  }

  const getEditModal = (data: any, close: Function, reload: Function) => {
    close(<Create loadData={reload} setOpen={close} editData={data} />)
  }

  const onClickTransferPDV = (item: BodyInterface) => {
    setModal(
      <Modals.TransferPDVs
        item={item}
        setOpenedModal={setModal}
        handleLoadData={() => loadData()}
      />,
    )
  }

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => getEditModal(item, setModal, loadData),
        rules: [
          {
            rule: () => !item.default,
            message: (
              <>
                <div>Canais do tipo padrão não podem ser editados!</div>
              </>
            ),
          },
        ],
      },
      {
        content: 'Transferir PDVs',
        onClick: () => onClickTransferPDV(item),
        border: true,
        rules: [],
      },
    ]
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.length > 0
    },
    message: 'Para realizar a ação é necessário selecionar pelo menos um canal',
  }

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => !checked.status)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Active
        segments={toUpdate}
        reload={reload}
        close={() => setModal(null)}
      />,
    )
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.status)

    if (toUpdate.length === 0) return
    setModal(
      <Modals.Inactive
        segments={toUpdate}
        reload={reload}
        close={() => setModal(null)}
      />,
    )
  }

  const onClickDelete = () => {
    const segments = checkeds.filter(
      (checked) => !checked.default && checked.store_count < 1,
    )
    setModal(
      <Modals.Delete
        segments={segments}
        reload={reload}
        close={() => setModal(null)}
        hasInvalid={checkeds.length !== segments.length}
      />,
    )
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      await extractData(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((e) => e.id),
      )
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.filter((checked) => !checked.status).length > 0
          },
          message:
            'Para realizar a ação é necessário selecionar pelo menos um canal inativo',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.filter((checked) => checked.status).length > 0
          },
          message:
            'Para realizar a ação é necessário selecionar pelo menos um canal ativo',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.some(
              (checked) => !checked.default && checked.store_count < 1,
            )
          },
          message: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}
            >
              <span>
                Você não pode deletar Canais Padrão ou que possuam vínculos com
                PDV.
              </span>
            </div>
          ),
        },
      ],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      border: true,
      rules: [],
    },
  ]

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
          content='Criar Canal'
          onClick={() => getCreateModal(setModal, loadData)}
        />
        <Dropdown
          items={dropdownItems}
          loading={loading}
          axis='y'
          centerCoodinates={{ y: 100 }}
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
        checkeds={{ checkeds, setCheckeds }}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      <Modal modal={modal} />
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
