import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import ManagerCounter from '../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { isNumber } from '../../../../utils/Validators'
import { ManagerProps } from '../../../interfaces'
import { TransferProducts } from '../Modals'

import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interface'
import parseData from './parser'
import { extractData, getBrands as request } from './services'

const Manager = (props: ManagerProps) => {
  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
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
  // estado que controla há um modal aberto
  const [modal, setModal] = useState<ModalState>(null)

  const history = useHistory()

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
    const results = parseData(responseData.data || [], setModal)

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setBody(page === 1 ? results : (prev) => prev.concat(results))

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

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (
    item: BodyInterface,
  ): DropdownInterfaces.Item[] | string => [
    {
      content: 'Editar',
      onClick: () => history.push(`${location.pathname}/edit/${item.id}`),
      rules: [],
    },
    {
      content: 'Transferir Produto',
      onClick: () => {
        setModal(
          <TransferProducts
            close={() => setModal(null)}
            reload={reload}
            data={item}
          />,
        )
      },

      rules: [
        {
          rule: () => item.product_count > 0,
          message: 'Esta marca não tem nenhum produto vinculado.',
        },
      ],
    },
  ]

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => !checked.status)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Activate
        brands={toUpdate}
        close={() => setModal(null)}
        reload={() => reload()}
      />,
    )
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.status)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Inactivate
        brands={toUpdate}
        close={() => setModal(null)}
        reload={() => reload()}
      />,
    )
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter((checked) => checked.product_count < 1)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Delete
        brands={toUpdate}
        close={() => setModal(null)}
        reload={() => reload()}
        hasValid={toUpdate.length !== checkeds.length}
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

  const noneSelectedRule = {
    rule: () => checkeds.filter((checked) => isNumber(checked.id)).length > 0,
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma marca.',
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.filter((checked) => !checked.status).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma marca inativa.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.filter((checked) => checked.status).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma marca ativa.',
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
            const containProduct = checkeds.filter(
              (checked) => checked.product_count > 0,
            ).length

            return containProduct < 1 || containProduct < checkeds.length
          },
          message:
            'Você não pode deletar marcas que possuam produtos associados.',
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
        <MwButton
          type='button'
          size='mini'
          content='Criar Marca'
          onClick={() => history.push(`${location.pathname}/create`)}
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
