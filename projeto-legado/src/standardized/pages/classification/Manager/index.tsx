import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../../components/ManagerCounter'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { ManagerProps } from '../../../../screens/interfaces'
import { isNumber } from '../../../../utils/Validators'

import Create from './Create'
import { CreateProps } from './Create/interfaces'
import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface, OpenedModal } from './interfaces'
import parseData from './parser'
import {
  deleteMultiple,
  extractData,
  getClassifications as request,
  toggleStatus,
} from './services'

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
  const [confirmModal, setConfirmModal] = useState<OpenedModal | null>(null)
  // estado que controla qual modal está aberto
  const [openedModal, setOpenedModal] = useState<JSX.Element>(
    <React.Fragment />,
  )

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    try {
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
    setBody(parseData(data))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const openCreate = (item: BodyInterface | null = null) => {
    const props: CreateProps = {
      setOpen: setOpenedModal,
      loadData: loadData,
    }

    if (item) props.editData = item

    setOpenedModal(<Modal open size='small' children={<Create {...props} />} />)
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => openCreate(item),
        rules: [
          {
            rule: () =>
              !(item.default && !item.action_id && !item.can_upload_file),
            message: 'O cenário default não pode ser editado.',
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
      'Para realizar a ação é necessário selecionar pelo menos um cenário',
  }

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => !checked.active)

    if (toUpdate.length === 0) return

    setConfirmModal({
      title: `Ativar ${
        toUpdate.length > 1 ? 'Motivos/Classificações' : 'Motivo/Classificação'
      }`,
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Deseja ativar o motivo/classificação <b>{toUpdate[0].name}</b>, do
            cenário <b>{toUpdate[0].scenery_label}</b>?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Deseja ativar os {toUpdate.length} motivos/classificações
            selecionados?
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
                1,
                toUpdate.map((checked) => checked.id),
              )

              if (success) {
                toast(<ToasterContent color='normal' />, SuccessStyle)
              }

              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(true)
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
      title: `Inativar ${
        toUpdate.length > 1 ? 'Motivos/Classificações' : 'Motivo/Classificação'
      }`,
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Deseja inativar o motivo/classificação <b>{toUpdate[0].name}</b>, do
            cenário <b>{toUpdate[0].scenery_label}</b>?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Deseja inativar os {toUpdate.length} motivos/classificações
            selecionados?
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
                0,
                toUpdate.map((checked) => checked.id),
              )

              if (success) {
                toast(<ToasterContent color='normal' />, SuccessStyle)
              }

              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(true)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const decideContentModalInformationDelete = (
    filteredToUpdate: BodyInterface[],
    checkeds: BodyInterface[],
  ) => {
    const dependency_count_sum = filteredToUpdate.reduce(
      (accumulator, checked) => {
        return (
          accumulator +
          (checked.scenery_id !== 8 ? checked.dependency_count : 0)
        )
      },
      0,
    )
    return (
      <React.Fragment>
        {checkeds.some((checked) => checked.future_dependency_count > 0) &&
          'Não é possível deletar motivos/classificações de eventos programados. '}
        {(() => {
          if (dependency_count_sum < 1) {
            return filteredToUpdate.length === 1 ? (
              <React.Fragment>
                Deseja deletar o motivo/classificação{' '}
                <b>{filteredToUpdate[0].name}</b>, do cenário{' '}
                <b>{filteredToUpdate[0].scenery_label}</b>?
              </React.Fragment>
            ) : (
              <React.Fragment>
                Deseja deletar os {filteredToUpdate.length}{' '}
                motivos/classificações selecionados?
              </React.Fragment>
            )
          }
          return (
            <React.Fragment>
              {filteredToUpdate.length === 1 ? (
                <React.Fragment>
                  Ao deletar o motivo/classificação{' '}
                  <b>{filteredToUpdate[0].name}</b>, do cenário{' '}
                  <b>{filteredToUpdate[0].scenery_label}</b>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Ao deletar os {filteredToUpdate.length} motivos/classificações
                  selecionados
                </React.Fragment>
              )}
              , {dependency_count_sum}{' '}
              {dependency_count_sum > 1
                ? 'registros serão impactados e perderão os motivos/classificações definidos.'
                : 'registro será impactado e perderá o motivo/classificação definido.'}
              <br />
              Deseja deletar?
            </React.Fragment>
          )
        })()}
      </React.Fragment>
    )
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter(
      (checked) => !checked.default && checked.future_dependency_count < 1,
    )
    if (toUpdate.length === 0) return
    const contentModal = decideContentModalInformationDelete(toUpdate, checkeds)

    setConfirmModal({
      title: `Deletar ${
        toUpdate.length > 1 ? 'Motivos/Classificações' : 'Motivo/Classificação'
      }`,
      content: { ...contentModal },
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

              if (success) {
                toast(<ToasterContent color='normal' />, SuccessStyle)
              }

              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(true)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onClickExtractData = async (): Promise<void> => {
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
            'Para realizar a ação é necessário selecionar pelo menos um cenário inativo.',
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
            'Para realizar a ação é necessário selecionar pelo menos um cenário ativo',
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
            const isDefault = checkeds.filter(
              (checked) => checked.default,
            ).length

            return (
              isDefault === 0 || (isDefault > 0 && isDefault < checkeds.length)
            )
          },
          message:
            'Você não pode deletar um cenário que contenha Motivos e Classificações como Default.',
        },
        {
          rule: () => {
            const valueCheck = checkeds.some(
              (checked) => checked.future_dependency_count === 0,
            )
            return valueCheck
          },
          message:
            'Não é possível deletar motivos/classificação que já estejam sendo utilizados em eventos programados.',
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
          content='Criar Novo'
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

      {confirmModal && (
        <Modal size='tiny' open>
          <Modal.Header content={confirmModal.title} />

          <Modal.Content>{confirmModal.content}</Modal.Content>

          <Modal.Actions>
            {confirmModal.actions.map((action, index) => (
              <Button key={index} {...action} />
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
