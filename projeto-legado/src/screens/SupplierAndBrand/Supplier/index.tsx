import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast, { Toaster } from 'react-hot-toast'

import ManagerCounter from '../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import { download } from '../../../utils/DownloadFile'
import { isNumeric } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'

import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import parseData from './parser'
import { getAllSuppliers } from './services'

const SupplierManager = (props: ManagerProps): JSX.Element => {
  // estado controlado do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do conteudo do manager
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  // estado de confirmação
  const [modal, setModal] = useState<ModalState>(null)

  const handleLoadData = useCallback(async () => {
    setLoading(true)

    // fazendo requisição dos dados
    const responseData = await getAllSuppliers(
      appliedFilters,
      search,
      sort,
      page,
    )

    // setando dados sobre a paginação
    const { has_next_page = false, count: total_registries = 0 } =
      responseData.pagination || {}

    setIsLastPage(!has_next_page)
    setTotalRegistries(total_registries)

    // pegando os resultados da requisição

    const results = responseData.data || []

    const body = parseData(results, setModal)

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setBody(page === 1 ? body : (prev) => prev.concat(body))

    setLoading(false)
  }, [appliedFilters, search, sort, page])

  useEffect(() => {
    handleLoadData()
  }, [handleLoadData])

  const reload = () => {
    page === 1 ? handleLoadData() : setPage(1)
  }

  const paginator = () => {
    if (!isLastPage) setPage((prevState) => (prevState += 1))
  }

  const noneSelectedRole = {
    rule: () => checkeds.filter((checked) => isNumeric(checked.id)).length > 0,
    message:
      'Para realizar a ação é necessário selecionar pelo menos um fabricante',
  }

  const onClickActive = () => {
    const suppliers = checkeds.filter(
      (checked) => !checked.status && checked.brand_count > 0,
    )

    setModal(
      <Modals.Active
        close={() => setModal(null)}
        reload={reload}
        isInvalid={suppliers.length !== checkeds.length}
        suppliers={suppliers}
      />,
    )
  }

  const openCreate = (item: BodyInterface = null) => {
    setModal(
      <Modals.Create
        close={() => setModal(null)}
        reload={reload}
        {...(item ? { editData: item } : {})}
      />,
    )
  }

  const onClickInative = () => {
    const suppliers = checkeds.filter((checked) => checked.status)
    if (suppliers.length === 0) return

    setModal(
      <Modals.Inactive
        close={() => setModal(null)}
        reload={reload}
        suppliers={suppliers}
      />,
    )
  }

  const onClickDelete = () => {
    const suppliers = checkeds.filter((checked) => checked.product_count === 0)
    if (suppliers.length < 1) return

    setModal(
      <Modals.Delete
        close={() => setModal(null)}
        reload={reload}
        isInvalid={suppliers.length !== checkeds.length}
        suppliers={suppliers}
      />,
    )
  }

  const onExtractData = async () => {
    setLoading(true)
    try {
      const { success, data } = await getAllSuppliers(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((item) => item.id),
        true,
      )
      if (success) {
        download(data.url)
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActive,
      rules: [
        noneSelectedRole,
        {
          rule: () => {
            return checkeds.some((checked) => checked.brand_count > 0)
          },

          message: 'Para ativar o Fabricante defina antes a visão das Marcas',
        },
        {
          rule: () => {
            return checkeds.some((checked) => checked.status === false)
          },

          message:
            'Para realizar a ação é necessário selecionar pelo menos um Fabricante Inativo',
        },
      ],
    },

    {
      content: 'Inativar',
      onClick: onClickInative,
      rules: [
        noneSelectedRole,
        {
          rule: () => {
            return checkeds.some((checked) => checked.status === true)
          },

          message:
            'Para realizar a ação é necessário selecionar pelo menos um Fabricante Ativo',
        },
      ],
    },

    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRole,
        {
          rule: () => {
            return checkeds.some((checked) => checked.product_count === 0)
          },
          message:
            'Você não pode deletar os Fabricantes que possuam produtos associados',
        },
      ],
    },

    {
      content: 'Extrair dados',
      onClick: onExtractData,
      border: true,
      rules: [],
    },
  ]

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => openCreate(item),
        rules: [],
      },
    ]
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
        <MwButton
          type='button'
          size='mini'
          content='Criar Fabricante'
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

export default SupplierManager
