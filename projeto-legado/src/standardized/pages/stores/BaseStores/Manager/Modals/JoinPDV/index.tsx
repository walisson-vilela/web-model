import { useCallback, useEffect, useState } from 'react'

import {
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton, MwIcon } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import Popup from '../../../../../../components/Popup'
import CheckAddress from '../../../../Home/components/CheckAddress'
import { BodyInterface } from '../../interfaces'
import { getStores } from '../../service'

import * as Modals from './Modals'
import * as Popups from './Popup'
import filters from './filters'
import header from './header'
import * as S from './styled'

interface IJoinPdv {
  item: BodyInterface
  close: () => void
  reloadManager: () => void
}

const JoinPdv = (props: IJoinPdv) => {
  const { item, close, reloadManager } = props
  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador dos filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])

  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])

  // abrir modal de confirmação
  const [modal, setModal] = useState<ModalState>(null)

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados e listagem dos PDV's
      const { data, pagination } = await getStores(
        appliedFilters,
        search,
        sort,
        page,

        item.id,
      )

      // setando dados sobre a paginação
      const { has_next_page = false } = pagination || {}

      setIsLastPage(!has_next_page)

      const filterData = data.filter((data) => data.id !== item.id)

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? filterData : (prev) => [...prev, ...filterData])
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [appliedFilters, search, sort, page, item.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  return (
    <Modal.Modal
      open
      size='large'
      style={{
        width: '1095px',
        height: '607px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Unir PDV</Modal.Header>

      <Modal.Body>
        <Modal.Subtitle>
          <div
            style={{ display: 'flex', lineHeight: '17px', marginBottom: '3px' }}
          >
            Selecione na lista abaixo os PDV&apos;s que deseja Unir ao PDV Base
            &nbsp;
            <Popup
              on='click'
              position='bottom left'
              hideOnScroll
              offset={[-13, 0]}
              inverted
              trigger={
                <div
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                  }}
                >
                  <MwIcon
                    type='feather'
                    icon='info'
                    height='14px'
                    width='14px'
                    color='#192338'
                  />
                </div>
              }
              content={<Popups.ContentPopup />}
            />
          </div>
          <div style={{ display: 'flex' }}>
            PDV Base:&nbsp;
            <b>
              <CheckAddress
                children={item.nickname}
                status={item.source_status}
                right={true}
              />
            </b>
            &nbsp; | {item.address_formatted}
          </div>
          <S.Line />
        </Modal.Subtitle>
        <Toolbar
          filters={{ filters, setAppliedFilters, appliedFilters }}
          search={{ search, setSearch }}
          loading={loading}
          reloader={reload}
          pagination={{ setPage, isLastPage, paginator }}
        />
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
        />
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          {...(loading ? { disabled: true } : { onClick: close })}
          children='Cancelar'
          size='large'
        />

        <MwButton
          disabled={checkeds.length === 0}
          type='button'
          color='blue'
          loading={loading}
          onClick={() =>
            setModal(
              <Modals.ConfirmationModal
                onClose={() => setModal(null)}
                close={close}
                item={item}
                reloadManager={reloadManager}
                checkeds={checkeds}
              />,
            )
          }
          children='Unir PDVs'
          size='large'
        />
      </Modal.Footer>

      <Modal modal={modal} />
    </Modal.Modal>
  )
}

export default JoinPdv
