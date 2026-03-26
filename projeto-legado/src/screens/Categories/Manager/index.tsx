import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import { Toaster } from 'react-hot-toast'

import ManagerCounter from '../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../components/MwModal'
import { isNumber } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'

import * as Modals from './Modals'
import Create from './Modals/Create'
import { CreateProps } from './Modals/Create/interfaces'
import Planogram from './Modals/Planogram'
import { PlanogramProps } from './Modals/Planogram/interfaces'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { extractData, getClassifications as request } from './services'

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
  // estado controlador do modal
  const [modal, setModal] = useState<ModalState | null>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    // fazendo requisição dos dados
    const responseData = await request(
      appliedFilters,
      search,
      sort,
      page,

      setModal,
    )

    // setando dados sobre a paginação
    const { has_next_page = false, count: total_registries = 0 } =
      responseData.pagination || {}

    setIsLastPage(!has_next_page)
    setTotalRegistries(total_registries)

    // pegando os resultados da requisição
    const results = responseData.data || []

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

  const openCreate = (item: BodyInterface = null) => {
    const props: CreateProps = {
      setOpen: setModal,
      loadData: loadData,
    }

    if (item) props.editData = item

    setModal(<Create {...props} />)
  }

  const openPlanogram = (item: BodyInterface) => {
    const props: PlanogramProps = {
      setOpen: setModal,
      loadData: loadData,
      planogramData: item,
    }

    setModal(<Planogram {...props} />)
  }

  const noneSelectedRule = {
    rule: () => checkeds.filter((checked) => isNumber(checked.id)).length > 0,

    message:
      'Para realizar a ação é necessário selecionar pelo menos uma categoria ou subnível.',
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => [
    {
      content: 'Editar',
      onClick: () => openCreate(item),
      rules: [],
    },
    {
      content: 'Adicionar Planograma',
      onClick: () => openPlanogram(item),
      rules: [
        {
          rule: () => {
            return item.level === 0
          },
          message: 'Não é possível adicionar Planograma para Subníveis.',
        },
      ],
    },
  ]

  const onClickActivate = () => {
    const toUpdate = checkeds.filter(
      (checked) =>
        !checked.status && (checked.level > 1 || checked.leaf_count > 0),
    )
    if (toUpdate.length === 0) {
      return
    }

    setModal(
      <Modals.Activate
        reload={reload}
        close={() => setModal(null)}
        toUpdate={toUpdate}
        hasInvalid={toUpdate.length !== checkeds.length}
      />,
    )
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.status)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Inactivate
        reload={reload}
        close={() => setModal(null)}
        toUpdate={toUpdate}
      />,
    )
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter((checked) => checked.product_count === 0)
    if (toUpdate.length === 0) {
      return
    }

    setModal(
      <Modals.Delete
        reload={reload}
        close={() => setModal(null)}
        toUpdate={toUpdate}
        hasInvalid={checkeds.length !== toUpdate.length}
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

        checkeds.map((e) => e.id),
      )
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.length > 0,
          message:
            'É necessário selecionar ao menos uma Categoria/Subnível para ativar.',
        },
        {
          rule: () => checkeds.some((checked) => !checked.status),
          message:
            'É necessário selecionar ao menos uma Categoria/Subnível inativo para ativar',
        },
        {
          rule: () =>
            checkeds.some(
              (checked) => checked.level > 1 || checked.leaf_count > 0,
            ),
          message:
            'Para ativar a categoria defina antes a visão da subcategoria e Linha de Produto',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.length > 0,
          message:
            'É necessário selecionar ao menos uma Categoria/Subnível para inativar.',
        },
        {
          rule: () => checkeds.some((checked) => checked.status),
          message:
            'É necessário selecionar ao menos uma Categoria/Subnível ativo para inativar.',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.length > 0,
          message:
            'É necessário selecionar ao menos uma Categoria/Subnível para deletar',
        },
        {
          rule: () => checkeds.some((checked) => checked.product_count === 0),
          message:
            'Você não pode deletar Categorias/Subníveis que possuam produtos associados',
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
          content='Criar Nível'
          onClick={() => openCreate()}
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
