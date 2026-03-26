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

import { getCreateModal, getEditModal } from './Modals'
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
    ]
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message: 'Para realizar a ação é necessário selecionar pelo menos um grupo',
  }

  const onClickActivate = () => {
    const toUpdate = checkeds.filter(
      (checked) =>
        !checked.active &&
        checked.flag_count_value > 0 &&
        checked.network_count_value > 0,
    )

    const inactives = checkeds.filter((checked) => !checked.active)

    if (toUpdate.length === 0) return

    setConfirmModal({
      title: `Ativar Grupo${toUpdate.length > 1 ? 's' : ''}`,
      content:
        toUpdate.length === 1 ? (
          inactives.length > toUpdate.length ? (
            <React.Fragment>
              Para ativar o Grupo é necessário definir a visão da Rede e
              Bandeira.
              <br />
              Deseja ativar o Grupo <b>{toUpdate[0].name}</b>?<br />
              Esta ação ativa também toda a hierarquia, Rede e Bandeira.
            </React.Fragment>
          ) : (
            <React.Fragment>
              Deseja ativar o Grupo <b>{toUpdate[0].name}</b>?<br />
              Esta ação ativa também toda a hierarquia, Rede e Bandeira.
            </React.Fragment>
          )
        ) : inactives.length > toUpdate.length ? (
          <React.Fragment>
            Para ativar o GRUPO é necessário antes definir a visão da Rede e
            Bandeira.
            <br />
            Deseja ativar os outros <b>{toUpdate.length} Grupos</b>{' '}
            selecionados?
            <br />À ação irá ativar junto toda a hierarquia.
          </React.Fragment>
        ) : (
          <React.Fragment>
            Deseja ativar os <b>{toUpdate.length} Grupos</b> selecionados?
            <br />
            Esta ação ativa também toda a hierarquia, Rede e Bandeira.
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
              else toast(<ToasterContent color='error' />, ErrorStyle)

              reload()
            } catch (error) {
              alert('Erro ao ativar registros')
              console.log(error)
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
      title: `Inativar Grupo${toUpdate.length > 1 ? 's' : ''}`,
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Você deseja inativar o grupo <b>{toUpdate[0].name}</b>?<br />
            Esta ação inativa também toda a hierarquia, Rede e Bandeira
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja inativar os <b>{toUpdate.length} grupos</b>{' '}
            selecionados?
            <br />
            Esta ação inativa também toda a hierarquia, Rede e Bandeira
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
              else toast(<ToasterContent color='error' />, ErrorStyle)

              reload()
            } catch (error) {
              alert('Erro ao inativar registros')
              console.log(error)
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
      title: `Deletar Grupo${toUpdate.length > 1 ? 's' : ''}`,
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Você deseja realmente deletar o grupo <b>{toUpdate[0].name}</b>?
            <br />À ação também deleta as Redes e Bandeiras abaixo na
            hierarquia.
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja realmente deletar os <b>{toUpdate.length} grupos</b>{' '}
            selecionados?
            <br />À ação também deleta as Redes e Bandeiras abaixo na
            hierarquia.
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
              else toast(<ToasterContent color='error' />, ErrorStyle)

              reload()
            } catch (error) {
              alert('Erro ao deletar registros')
              console.log(error)
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
      alert('Erro ao extrair dados')
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
          rule: () => checkeds.filter((checked) => !checked.active).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos um grupo inativo.',
        },
        {
          rule: () => {
            let invalid = checkeds.filter(
              (checked) =>
                checked.flag_count_value == 0 ||
                checked.flag_count_value == null ||
                checked.network_count_value == 0 ||
                checked.network_count_value == null,
            ).length
            return (
              invalid === 0 ||
              (invalid > 0 &&
                invalid < checkeds.filter((checked) => !checked.active).length)
            )
          },
          message:
            'Para ativar o GRUPO é necessário antes definir a visão da Rede e Bandeira.',
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
            'Para realizar a ação é necessário selecionar pelo menos um grupo ativo',
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
          content='Criar Grupo'
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
                style={{ width: '110px', height: '44px' }}
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
