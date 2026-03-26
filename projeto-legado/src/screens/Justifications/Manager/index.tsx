import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Dropdown, MwManager, Toolbar } from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import { download } from '../../../utils/DownloadFile'
import { isNumeric } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'
import { ManagerEvents } from '../modals/ManagerEvents'
import Notification from '../modals/Notification'

import { ManagerProvider } from './context'
import { historyFilters, justifyFilters } from './filters'
import header from './header'
import { BodyInterface, DataInterface, OpenedModal } from './interfaces'
import parseData from './parser'
import { getJustifies as request, toggleStatus } from './services'

interface ComponentProps {
  id: number
  managerProps: ManagerProps
}
const Manager = (props: ComponentProps) => {
  const history = useHistory()
  const firstRenderForAproving = useRef(true)
  const firstRenderForReproving = useRef(true)
  // estado controlado do input de pesquisa
  const { search, setSearch } = props.managerProps.search
  // estado controlador da ordenação
  const { sort, setSort } = props.managerProps.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } =
    props.managerProps.appliedFilters
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do conteudo do manager
  const [loading, setLoading] = useState<boolean>(true)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  // estado de confirmação
  const [confirmModal, setConfirmModal] = useState<OpenedModal | null>(null)
  // estado que controla qual modal está aberto
  const [openedModal, setOpenedModal] = useState<JSX.Element>(
    <React.Fragment />,
  )
  // estado que controla a abertura dos modais de notificação
  const [openNotificationModal, setOpenNotificationModal] =
    useState<JSX.Element | null>(null)

  const [
    loadingAprovingButtonNotification,
    setLoadingAprovingButtonNotification,
  ] = useState<boolean>(false)

  const [
    loadingReprovingButtonNotification,
    setLoadingReprovingButtonNotification,
  ] = useState<boolean>(false)

  const [openManagerEventsModal, setOpenManagerEventsModal] =
    useState<boolean>(false)

  let filters = props.id === 1 ? justifyFilters : historyFilters

  const handleLoadData = useCallback(async () => {
    setLoading(true)
    try {
      // fazendo requisição dos dados
      const responseData = await request(
        props.id,
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

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
      setLoading(false)
    } catch {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  useEffect(() => {
    handleLoadData()
  }, [handleLoadData, props.id])

  useEffect(() => {
    //@ts-ignore
    setBody(parseData(props.id, data, setOpenedModal))
  }, [data, props.id])

  const reload = () => {
    page === 1 ? handleLoadData() : setPage(1)
  }

  const paginator = () => {
    if (!isLastPage) setPage((prevState) => (prevState += 1))
  }

  const noneSelectedRole = {
    rule: () => checkeds.filter((checked) => isNumeric(checked.id)).length > 0,
    message:
      props.id === 1
        ? 'Para realizar a ação é necessário selecionar pelo menos uma justificativa.'
        : 'Para realizar a ação é necessário selecionar pelo menos um histórico.',
  }

  const onClickActive = async () => {
    setLoadingAprovingButtonNotification(true)
    const toUpdated = checkeds
    if (toUpdated.length === 0) return

    const updatedIds = toUpdated.map((checked) => checked.id)
    try {
      const success = await toggleStatus(props.id, updatedIds, 'Aprovado')

      if (success) toast(<ToasterContent color='normal' />, SuccessStyle)

      reload()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingAprovingButtonNotification(false)
      setOpenNotificationModal(<React.Fragment />)
    }
  }

  const onClickInative = async () => {
    setLoadingReprovingButtonNotification(true)
    const toUpdated = checkeds
    if (toUpdated.length === 0) return

    const updatedIds = toUpdated.map((checked) => checked.id)
    try {
      const success = await toggleStatus(props.id, updatedIds, 'Reprovado')

      if (success) toast(<ToasterContent color='normal' />, SuccessStyle)

      reload()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingReprovingButtonNotification(false)
      setOpenNotificationModal(<React.Fragment />)
    }
  }

  const onExtractData = async () => {
    setLoading(true)
    try {
      const { success, data } = await request(
        props.id,
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

  const modalAproveNotification = (
    <Notification
      props={{
        title: 'Aprovar',
        description: (
          <React.Fragment>
            {props.id === 1 && checkeds.length === 1 && (
              <p>
                {' '}
                Deseja aprovar a justificativa do{' '}
                <strong>{checkeds[0].userName}</strong> do dia{' '}
                {checkeds[0].created_at} motivo{' '}
                <strong> {checkeds[0].justify_type} </strong> Selecionado?{' '}
              </p>
            )}
            {props.id === 1 && checkeds.length > 1 && (
              <p>
                {' '}
                Deseja aprovar as{' '}
                <strong> {checkeds.length} Justificativas </strong>{' '}
                Selecionadas?{' '}
              </p>
            )}
          </React.Fragment>
        ),
        actions: [
          <Button
            key={1}
            primary
            loading={loadingAprovingButtonNotification}
            disabled={loadingAprovingButtonNotification}
            content='Sim'
            onClick={onClickActive}
          />,
        ],
        setOpenModalJSX: setOpenNotificationModal,
      }}
    />
  )

  const modalReproveNotification = (
    <Notification
      props={{
        title: 'Reprovar',
        description: (
          <React.Fragment>
            {props.id === 1 && checkeds.length === 1 && (
              <p>
                {' '}
                Deseja reprovar a justificativa do{' '}
                <strong>{checkeds[0].userName}</strong> do dia{' '}
                {checkeds[0].created_at} motivo{' '}
                <strong> {checkeds[0].justify_type} </strong> Selecionado?{' '}
              </p>
            )}
            {props.id === 1 && checkeds.length > 1 && (
              <p>
                {' '}
                Deseja reprovar as{' '}
                <strong> {checkeds.length} Justificativas </strong>{' '}
                Selecionadas?{' '}
              </p>
            )}
          </React.Fragment>
        ),
        actions: [
          <Button
            key={1}
            color='red'
            disabled={loadingReprovingButtonNotification}
            loading={loadingReprovingButtonNotification}
            content='Sim'
            onClick={onClickInative}
          />,
        ],
        setOpenModalJSX: setOpenNotificationModal,
      }}
    />
  )

  const dropdownItems = [
    {
      content: 'Aprovar',
      onClick: () => setOpenNotificationModal(modalAproveNotification),
      rules: [
        noneSelectedRole,
        {
          rule: () => checkeds.length > 0,
          message:
            props.id === 1
              ? 'Para realizar a ação é necessário selecionar pelo menos uma justificativa inativa.'
              : 'Para realizar a ação é necessário selecionar pelo menos um historico inativo.',
        },
      ],
    },

    {
      content: 'Reprovar',
      onClick: () => setOpenNotificationModal(modalReproveNotification),
      rules: [
        noneSelectedRole,
        {
          rule: () => checkeds.length > 0,
          message:
            props.id === 1
              ? 'Para realizar a ação é necessário selecionar pelo menos uma justificativa ativa.'
              : 'Para realizar a ação é necessário selecionar pelo menos um historico ativo.',
        },
      ],
    },

    {
      content: 'Extrair dados',
      onClick: onExtractData,
      border: props.id === 1 ? true : false,
      rules: [],
    },
  ]

  /*
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: "Gerenciar Eventos",
        onClick: () => setOpenManagerEventsModal(true),
        rules: [],
      },
    ];
  };
  */

  useEffect(() => {
    if (!firstRenderForAproving.current) {
      setOpenNotificationModal(modalAproveNotification)
    } else {
      firstRenderForAproving.current = false
    }
  }, [loadingAprovingButtonNotification])

  useEffect(() => {
    if (!firstRenderForReproving.current) {
      setOpenNotificationModal(modalReproveNotification)
    } else {
      firstRenderForReproving.current = false
    }
  }, [loadingReprovingButtonNotification])

  return (
    <ManagerProvider.Provider
      value={{
        handleLoadData,
      }}
    >
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Dropdown
          items={props.id === 1 ? dropdownItems : dropdownItems.slice(2, 3)}
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
        //  getItemMenu={getItemMenu}
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
      {openNotificationModal}
      {openManagerEventsModal && (
        <ManagerEvents setOpenModal={setOpenManagerEventsModal} />
      )}
      <Toaster position='bottom-right' />
    </ManagerProvider.Provider>
  )
}

export default Manager
