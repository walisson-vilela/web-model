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
import { createRouteTab } from '../../../routes'
import { isNumber } from '../../../utils/Validators'
import useContext from '../provider'

import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { extractData, getProducts as request } from './services'

const Manager = createRouteTab((props) => {
  const {
    data: {
      route: { history },
    },
  } = props

  const {
    managerProps: {
      search: { search, setSearch },
      sort: { sort, setSort },
      appliedFilters: { appliedFilters, setAppliedFilters },
    },
  } = useContext()

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
  //  estado controlador do modal
  const [modal, setModal] = useState<ModalState | null>(null)

  // essa função tem os
  const handleLoadData = useCallback(async () => {
    setLoading(true)
    try {
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
      setBody(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
      console.error(error)
    }
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

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos um produto',
  }

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => Boolean(!checked.status))
    if (toUpdate.length === 0) return

    setModal(
      <Modals.Activate
        products={toUpdate}
        close={() => setModal(null)}
        reload={reload}
      />,
    )
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter((checked) => Boolean(checked.status))

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Inactivate
        products={toUpdate}
        close={() => setModal(null)}
        reload={reload}
      />,
    )
  }

  const onClickDelete = () => {
    const toUpdate = checkeds
    if (toUpdate.length === 0) return

    setModal(
      <Modals.Delete
        products={toUpdate}
        close={() => setModal(null)}
        reload={reload}
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

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => history.push(`/main/products/home/edit/${item.id}`),
        rules: [],
      },
    ]
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () =>
            checkeds.filter((checked) => Boolean(!checked.status)).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo o menos um produto inativo.',
        },
      ],
    },

    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () =>
            checkeds.filter((checked) => Boolean(checked.status)).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo o menos um produto ativo',
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
            'Para realizar a ação é necessário selecionar pelo o menos um produto',
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
          content='Criar Produto'
          onClick={() => history.push('/main/products/home/create')}
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
})

export default Manager
