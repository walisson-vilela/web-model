import React, { useEffect, useState } from 'react'

import { MwLoader, MwTabs } from '@mw-kit/mw-ui'
import { Toaster } from 'react-hot-toast'

import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import Modal, { ModalState } from '../../components/MwModal'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import * as Modals from './modals'
import useContext, { Provider } from './provider'
import { Container } from './styles'

const Areas = createRouteTab(() => {
  const {
    hierarchies,
    pendingRegions,
    loading,
    activeTab: [activeTab, setActiveTab],
    managerProps,
  } = useContext()

  const [modal, setModal] = useState<ModalState>(null)

  useEffect(() => {
    if (pendingRegions.length < 1) return

    setModal(
      <Modals.PendingRegionsModal
        regions={pendingRegions}
        close={() => setModal(null)}
      />,
    )
  }, [pendingRegions])

  return (
    <React.Fragment>
      <MwManagerContainer style={{ position: 'relative' }}>
        <Header description='Crie e gerencie áreas de atuação' />

        {loading && <MwLoader filled />}

        {hierarchies.length !== 0 ? (
          <React.Fragment>
            <MwTabs
              options={hierarchies.map((e) => ({
                label: e.name,
                data: { ...e },
              }))}
              active={[activeTab, setActiveTab]}
              internal
              alwaysOpen
            />

            <Manager
              modal={[modal, setModal]}
              {...managerProps}
              hierarchy={hierarchies[activeTab]}
            />
          </React.Fragment>
        ) : (
          <Container>
            <span>Dados não encontrados!</span>
          </Container>
        )}
      </MwManagerContainer>

      <Modal modal={modal} />

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}, Provider)

export default Areas
