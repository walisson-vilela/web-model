import { useCallback, useContext, useEffect, useState } from 'react'

import { Dropdown, MwManager, Toolbar } from '@mw-kit/mw-manager'
import { Toaster, toast } from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import { download } from '../../../utils/DownloadFile'
import { isNumber } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'
import { CreateModalSurvey } from '../Modals/create'
import { SurveysContext } from '../context'

import { ToggleStatusModal } from './components/ToggleStatusModal'
import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interface'
import { parseSurveys } from './parse'
import { getData } from './services'
import * as S from './styles'

export const SurveyManager = (props: ManagerProps) => {
  const {
    openCreateModal,
    openSelectModal,
    setOpenCreateModal,
    setOpenSelectModal,
  } = useContext(SurveysContext)

  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  const { search, setSearch } = props.search
  const { setSort, sort } = props.sort

  const [page, setPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [totalRegistries, setTotalRegistries] = useState<number>()

  const [data, setData] = useState<DataInterface[]>([])
  const [body, setBody] = useState<BodyInterface[]>([])

  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const [notificationModal, setNotificationModal] = useState<JSX.Element>(<></>)

  const LoadData = useCallback(async () => {
    setLoading(true)
    try {
      const responseData = await getData(appliedFilters, search, sort, page)

      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      const result = responseData.data || []

      setData(page === 1 ? result : (prev) => prev.concat(result))
    } catch (error) {
      console.log(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  const reload = () => {
    page === 1 ? LoadData() : setPage(1)
  }

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const noneSelectedRule = {
    rule: () => checkeds.filter((checked) => isNumber(checked.id)).length > 0,
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma pesquisa.',
  }

  const onExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      const { success, data } = await getData(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((e) => e.id),
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

  const onClickActive = () => {
    const toUpdated = checkeds.filter((checked) => checked.status === 'I')
    if (toUpdated.length === 0) return
    const updatedIds = toUpdated.map((checked) => checked.id)

    const content = (
      <>
        <Modal.Header>
          <S.ModalHeaderText>
            Ativar pesquisa{toUpdated.length > 1 && 's'}
          </S.ModalHeaderText>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <S.ModalDescriptionText>
              Deseja ativar{' '}
              {toUpdated.length > 1
                ? `as ${toUpdated.length} pesquisas selecionadas?`
                : `a pesquisa ${toUpdated[0].name}?`}
            </S.ModalDescriptionText>
          </Modal.Description>
        </Modal.Content>
      </>
    )

    setNotificationModal(
      <ToggleStatusModal
        content={content}
        reload={reload}
        setNotificationModal={setNotificationModal}
        status='A'
        toUpdated={updatedIds}
      />,
    )
  }

  const onClickInative = () => {
    const toUpdated = checkeds.filter((checked) => checked.status === 'A')
    if (toUpdated.length === 0) return
    const updatedIds = toUpdated.map((checked) => checked.id)

    const content = (
      <>
        <Modal.Header>
          <S.ModalHeaderText>
            Inativar pesquisa{toUpdated.length > 1 && 's'}
          </S.ModalHeaderText>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <S.ModalDescriptionText>
              Deseja inativar{' '}
              {toUpdated.length > 1
                ? `as ${toUpdated.length} pesquisas selecionadas?`
                : `a pesquisa ${toUpdated[0].name}?`}
            </S.ModalDescriptionText>
          </Modal.Description>
        </Modal.Content>
      </>
    )

    setNotificationModal(
      <ToggleStatusModal
        content={content}
        reload={reload}
        setNotificationModal={setNotificationModal}
        status='I'
        toUpdated={updatedIds}
      />,
    )
  }

  const onClickDelete = () => {
    const toUpdated = checkeds.filter((checked) => checked.status !== 'E')
    if (toUpdated.length === 0) return
    const updatedIds = toUpdated.map((checked) => checked.id)

    const content = (
      <>
        <Modal.Header>
          <S.ModalHeaderText>
            Deletar pesquisa{toUpdated.length > 1 && 's'}
          </S.ModalHeaderText>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <S.ModalDescriptionText>
              Deseja deletar{' '}
              {toUpdated.length > 1
                ? `as ${toUpdated.length} pesquisas selecionadas?`
                : `a pesquisa ${toUpdated[0].name}?`}
            </S.ModalDescriptionText>
          </Modal.Description>
        </Modal.Content>
      </>
    )

    setNotificationModal(
      <ToggleStatusModal
        content={content}
        reload={reload}
        setNotificationModal={setNotificationModal}
        status='E'
        toUpdated={updatedIds}
      />,
    )
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActive,
      rules: [
        noneSelectedRule,
        {
          // O fabricante não pode estar inativo e a pesquisa deve estar inativa
          rule: () =>
            checkeds.filter((checked) => checked.status === 'I').length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma pesquisa inativa.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInative,
      rules: [
        noneSelectedRule,
        {
          rule: () =>
            checkeds.filter((checked) => checked.status === 'A').length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma pesquisa ativa.',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRule,
        {
          rule: () =>
            checkeds.filter((checked) => checked.status !== 'E').length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma pesquisa.',
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

  useEffect(() => {
    LoadData()
  }, [LoadData])

  useEffect(() => {
    setBody(parseSurveys(data, reload))
  }, [data])

  return (
    <>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ setSearch, search }}
        loading={loading}
        reloader={reload}
      >
        <Button
          primary
          size='tiny'
          content='Criar Pesquisa'
          onClick={() =>
            setOpenCreateModal(
              <CreateModalSurvey
                setOpenCreateModal={setOpenCreateModal}
                reload={reload}
              />,
            )
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
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        paginator={paginator}
        loading={loading}
        page={page}
        setPage={setPage}
        checkeds={{ checkeds, setCheckeds }}
      />
      <ManagerCounter partial={body.length} total={totalRegistries} />

      {openCreateModal}
      {openSelectModal}
      {notificationModal}
      <Toaster position='bottom-right' />
    </>
  )
}
