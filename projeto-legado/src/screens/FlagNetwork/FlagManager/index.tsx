import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import { isNumber } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'

import { getCreateModal, getEditModal, getManagePDVModal } from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface, OpenedModal } from './interfaces'
import parseData from './parser'
import {
  deleteMultiple,
  extractData,
  getRegions as request,
  toggleStatus,
} from './services'

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
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
  const [confirmModal, setConfirmModal] = useState<OpenedModal | null>(null)
  // estado que controla qual modal está aberto
  const [openedModal, setOpenedModal] = useState<JSX.Element>(
    <React.Fragment />,
  )

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
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
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
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
    setBody(parseData(data, setOpenedModal))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => getEditModal(item, setOpenedModal, loadData),
        rules: [],
      },
      {
        content: 'Gerenciar PDVs',
        onClick: () => getManagePDVModal(item, setOpenedModal, loadData),
        rules: [
          {
            rule: () => item.active,
            message:
              'Para realizar a ação é necessário a bandeira estar com o status ativo.',
          },
        ],
      },
    ]
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma bandeira',
  }

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => !checked.active)

    if (toUpdate.length === 0) return

    setConfirmModal({
      title: `Ativar Bandeira${toUpdate.length > 1 ? 's' : ''}`,
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Deseja ativar a Bandeira <b>{toUpdate[0].name}</b>?<br />
            Esta ação irá ativar a Rede e o Grupo da hierarquia.
          </React.Fragment>
        ) : (
          <React.Fragment>
            Deseja ativar as <b>{toUpdate.length} Bandeiras</b> selecionadas?
            <br />
            Esta ação irá ativar as Redes e os Grupos das hierarquias.
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setConfirmModal(null),
        },
        {
          type: 'button',
          content: 'Ativar',
          color: 'blue',
          onClick: async () => {
            setLoading(true)
            setConfirmModal(null)

            try {
              const success = await toggleStatus(
                true,
                toUpdate.map((checked) => checked.id),
              )

              if (success)
                toast(<ToasterContent color='normal' />, SuccessStyle)
              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.active)

    if (toUpdate.length === 0) return

    setConfirmModal({
      title: `Inativar Bandeira${toUpdate.length > 1 ? 's' : ''}`,
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Deseja inativar a Bandeira <b>{toUpdate[0].name}</b>?<br />
            Sendo ela a única Bandeira ativa, a ação irá inativar toda a
            hierarquia Rede e Grupo.
          </React.Fragment>
        ) : (
          <React.Fragment>
            Deseja inativar as <b>{toUpdate.length} Bandeiras</b> selecionadas?
            <br />
            Se não restar nenhuma Bandeira ativa na hierarquia, a ação irá
            inativar toda a hierarquia Rede e Grupo.
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setConfirmModal(null),
        },
        {
          type: 'button',
          content: 'Inativar',
          color: 'red',
          onClick: async () => {
            setLoading(true)
            setConfirmModal(null)

            try {
              const success = await toggleStatus(
                false,
                toUpdate.map((checked) => checked.id),
              )

              if (success)
                toast(<ToasterContent color='normal' />, SuccessStyle)

              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter((checked) => checked)

    if (toUpdate.length === 0) return

    setConfirmModal({
      title: `Deletar Bandeira${toUpdate.length > 1 ? 's' : ''}`,
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Deseja deletar a Bandeira <b>{toUpdate[0].name}</b>?<br />
            Sendo ela a única Bandeira ativa, a ação irá inativar toda a
            hierarquia Rede e Grupo.
          </React.Fragment>
        ) : (
          <React.Fragment>
            Deseja deletar as <b>{toUpdate.length} Bandeiras</b> selecionadas?
            <br />
            Se não restar nenhuma Bandeira ativa na hierarquia, a ação irá
            inativar toda a hierarquia Rede e Grupo.
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setConfirmModal(null),
        },
        {
          type: 'button',
          content: 'Deletar',
          color: 'red',
          onClick: async () => {
            setLoading(true)
            setConfirmModal(null)

            try {
              const success = await deleteMultiple(
                toUpdate.map((checked) => checked.id),
              )

              if (success)
                toast(<ToasterContent color='normal' />, SuccessStyle)

              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
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
          rule: () => checkeds.filter((checked) => !checked.active).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma bandeira inativa.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.filter((checked) => checked.active).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma bandeira ativa',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [noneSelectedRule],
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
          content='Criar Bandeira'
          onClick={() => getCreateModal(setOpenedModal, loadData)}
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

      {confirmModal && (
        <Modal size='tiny' open>
          <Modal.Header content={confirmModal.title} />

          <Modal.Content>{confirmModal.content}</Modal.Content>

          <Modal.Actions>
            {confirmModal.actions.map((action, index) => (
              <Button
                key={index}
                {...action}
                style={{ width: 110, height: 41 }}
              />
            ))}
          </Modal.Actions>
        </Modal>
      )}

      {openedModal}
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
