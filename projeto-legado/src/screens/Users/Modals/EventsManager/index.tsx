import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwGrid, MwTabs } from '@mw-kit/mw-ui'

import Modal, { ModalState } from '../../../../components/MwModal'

import Tabs from './Tabs'
import { EventManagerContext } from './context'
import { useMode } from './hooks'
import { Props } from './interfaces'
import { getEvents } from './services'
import * as S from './styles'

const EventsManager = (props: Props) => {
  const { close, user_id, name } = props

  const {
    active: [active, setActive],
    mode,
    search: [search, setSearch],
    appliedFilters: [appliedFilters, setAppliedFilters],
    pagination: [pagination, setPagination],
    events: [events, setEvents],
  } = useMode()

  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<ModalState>(null)
  const [changes, setChanges] = useState(false)
  const [confirmInterrupt, setConfirmInterrupt] = useState(true)

  const onLoadEvents = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getEvents(
        user_id,
        mode,
        appliedFilters,
        search,
        pagination.page,
      )
      const { has_next_page, count: total_registries } =
        response.pagination || {}

      setPagination((prev) => ({
        ...prev,
        has_next_page: has_next_page || false,
        count: total_registries || 0,
      }))

      const results = response.data || []
      setEvents((prev) =>
        pagination.page === 1 ? [...results] : [...prev, ...results],
      )
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [user_id, mode, appliedFilters, search, pagination.page, setPagination])

  useEffect(() => {
    onLoadEvents()
  }, [onLoadEvents])

  const reload = () => {
    if (pagination.page === 1) {
      onLoadEvents()
    } else {
      setPagination((prev) => ({ ...prev, page: 1 }))
    }
  }

  const paginator = () => {
    setPagination((prev) => {
      return prev.has_next_page ? { ...prev, page: prev.page + 1 } : prev
    })
  }

  const tabs = [
    { label: 'Eventos', component: <Tabs /> },
    { label: 'Historico', component: <Tabs /> },
  ]

  const onOk = useCallback(() => {
    if (changes) props.reload()
    props.close()
  }, [changes, props.reload, props.close])

  return (
    <Modal.Modal
      open
      style={{
        width: '1010px',
        height: '550px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <EventManagerContext.Provider
        value={{
          close,
          reload,
          user_id,
          name,
          mode,
          loading: [loading, setLoading],
          modal: [modal, setModal],
          appliedFilters: [appliedFilters, setAppliedFilters],
          pagination: [pagination, setPagination],
          search: [search, setSearch],
          events: [events, setEvents],
          changes: [changes, setChanges],
          onLoadEvents,
          paginator,
          confirmInterrupt: [confirmInterrupt, setConfirmInterrupt],
        }}
      >
        <Modal.Header color='blue' key={mode}>
          Gerenciar Eventos
        </Modal.Header>
        <Modal.Body $paddingTop='s3' $paddingBottom='s1'>
          <S.Container>
            <div>
              Usuário: {name} | ID: {user_id}
            </div>
            <div>
              <MwTabs
                options={tabs.map(({ label }) => ({ label, data: {} }))}
                active={[active, setActive]}
                internal
                alwaysOpen
                delimiter='grey'
                style={{ marginBottom: '7px' }}
              />

              <MwGrid
                key={mode}
                cols={{ bordered: true }}
                style={{
                  height: '325px',
                  boxSizing: 'border-box',
                }}
              >
                {tabs[active].component}
              </MwGrid>
            </div>
          </S.Container>
        </Modal.Body>
        <Modal.Footer>
          <MwButton
            type='button'
            content='Ok'
            size='large'
            onClick={() => {
              onOk()
            }}
            disabled={loading}
          />
        </Modal.Footer>
        <Modal modal={modal} />
      </EventManagerContext.Provider>
    </Modal.Modal>
  )
}

export default EventsManager
