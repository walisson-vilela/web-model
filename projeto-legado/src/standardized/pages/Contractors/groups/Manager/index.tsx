import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { isNumber } from 'lodash'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router'
import { Button } from 'semantic-ui-react'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { ManagerProps } from '../../../../../screens/interfaces'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { ManageMenus } from '../../../../components/modals'
import { getContractorsMenus, updateContractor } from '../../services'

import { filters } from './filters'
import { header } from './header'
import { BodyInterface } from './interfaces'
import * as Modals from './modals'
import { managerParser } from './parser'
import { extractData, getManager } from './services'

const GroupsManager = (props: ManagerProps) => {
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])

  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  // estado controlador dos dados recebidos
  const [data, setData] = useState([])
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

  const [notificationModal, setNotificationModal] = useState<ModalState>(null)

  const history = useHistory()

  const loadData = useCallback(async () => {
    try {
      setLoading(true)

      // Requisição ao end point
      const responseData = await getManager(appliedFilters, search, sort, page)

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setBody(managerParser(data))
  }, [data])

  // função que retorna os itens do menu lateral elaborar mais tarde
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Gerenciar Menu',
        onClick: () =>
          setNotificationModal(
            <ManageMenus
              loadSelectedMenus={async () => await getContractorsMenus(item.id)}
              onSubmit={async (ids) => {
                await updateContractor(item.id, {
                  contractors_menus: ids.map((id) => ({ menu_id: id })),
                })
                toast(<ToasterContent color='normal' />, SuccessStyle)
              }}
              onClose={() => setNotificationModal(null)}
              title={
                <React.Fragment>
                  Agrupamento: <b>{item.name}</b>
                </React.Fragment>
              }
            />,
          ),

        rules: [],
      },
      {
        content: 'Editar',
        onClick: () =>
          history.push(`/main/accounts/contractors/groups/edit/${item.id}`),
        rules: [],
      },
    ]
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
    } finally {
      setLoading(false)
    }
  }
  const noneSelectedRule = (type?: string) => {
    return {
      rule: () => checkeds.filter((checked) => isNumber(checked.id)).length > 0,
      message: `Para realizar à ação é necessário selecionar pelo menos um agrupamento ${
        type ? type + '.' : '.'
      }`,
    }
  }

  const onClickActive = () => {
    const toUpdate = checkeds.filter((checked) => checked.active === 0)
    if (toUpdate.length === 0) return

    setNotificationModal(
      <Modals.Activate
        checked={toUpdate}
        invalid={checkeds.length !== toUpdate.length}
        reload={reload}
        close={() => setNotificationModal(<React.Fragment></React.Fragment>)}
      />,
    )
  }

  const onClickInative = () => {
    const toUpdate = checkeds.filter((checked) => checked.active === 1)
    if (toUpdate.length === 0) return

    setNotificationModal(
      <Modals.Inactivate
        checked={toUpdate}
        invalid={checkeds.length !== toUpdate.length}
        reload={reload}
        close={() => setNotificationModal(<React.Fragment></React.Fragment>)}
      />,
    )
  }

  const onClickDelete = () => {
    if (checkeds.length === 0) return

    setNotificationModal(
      <Modals.Delete
        checked={checkeds}
        reload={reload}
        close={() => setNotificationModal(<React.Fragment></React.Fragment>)}
      />,
    )
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActive,
      rules: [
        noneSelectedRule('inativo'),
        {
          rule: () =>
            checkeds.filter((checked) => checked.active === 0).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos um agrupamento inativo.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInative,
      rules: [
        noneSelectedRule('ativo'),
        {
          rule: () =>
            checkeds.filter((checked) => checked.active === 1).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos um agrupamento ativo.',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [noneSelectedRule()],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      rules: [],
      border: true,
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
          content='Novo Agrupamento'
          onClick={() =>
            history.push('/main/accounts/contractors/groups/create')
          }
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
        hasFilters={appliedFilters.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        checkeds={{ checkeds, setCheckeds }}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />
      <Toaster position='bottom-right' />

      <Modal modal={notificationModal} />
    </React.Fragment>
  )
}

export default GroupsManager
