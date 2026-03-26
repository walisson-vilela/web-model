import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'
import { RouteComponentProps } from 'react-router'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { ManagerProps } from '../../../../../screens/interfaces'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { isNumber } from '../../../../utils/validators'

import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { extractData, getStores } from './service'

const BaseStoresManager = (
  props: ManagerProps & {
    showUpdated: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    route: RouteComponentProps
  },
) => {
  const {
    // estado controlador do valor do input de pesquisa
    search: { search, setSearch },
    // estado controlador da ordenação
    sort: { sort, setSort },
    // estado controlador dos filtros aplicados
    appliedFilters: { appliedFilters, setAppliedFilters },
    showUpdated: [showUpdated, setShowUpdated],
    route: { history },
  } = props

  const [updated, setUpdated] = useState<number>(0)

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

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados e listagem dos PDV's
      const response = await getStores(appliedFilters, search, sort, page)

      const { data, pagination } = response

      setUpdated(response.updated)

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? data : (prev) => [...prev, ...data])
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [appliedFilters, search, sort, page])

  useEffect(() => {
    if (!showUpdated || updated < 1) return
    setModal(
      <Modals.UpdateAlertAddress
        onClose={() => setModal(null)}
        updated={updated}
        setShowUpdated={setShowUpdated}
      />,
    )
  }, [showUpdated, updated])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }
  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message: 'Para realizar a ação é necessário selecionar pelo menos um PDV',
  }

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => history.push(`/main/stores/base/edit/${item.id}`),
        rules: [],
      },
      {
        content: 'Unir PDV',
        onClick: () =>
          setModal(
            <Modals.JoinPDV
              item={item}
              close={() => setModal(null)}
              reloadManager={reload}
            />,
          ),
        rules: [
          {
            rule: () => {
              return (
                item.source_status === null ||
                !['UPDATED', 'INVALID'].includes(item.source_status)
              )
            },
            message:
              'PDVs de Selo Vermelho ou Roxo não podem ser base para unificações.',
          },
        ],
      },
    ]
  }
  const onClickDelete = () => {
    const isChecked = checkeds.filter((e) => e.contractor_count < 1)
    if (isChecked.length === 0) return

    setModal(
      <Modals.Delete
        checkeds={isChecked}
        close={() => setModal(null)}
        invalidDelete={isChecked.length !== checkeds.length}
        reload={reload}
      />,
    )
  }
  const onClickExtractData = async (): Promise<void> => {
    setLoading(true)

    try {
      await extractData(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((e) => numberOrDefault(e.id)),
      )
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.error(error)
    }

    setLoading(false)
  }

  const dropdownItems = [
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.some((e) => e.contractor_count < 1),
          message: 'Não é possível deletar PDVs com Contas associadas.',
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
  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
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
    </React.Fragment>
  )
}

export default BaseStoresManager
