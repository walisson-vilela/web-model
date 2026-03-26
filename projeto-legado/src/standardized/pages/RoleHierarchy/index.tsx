import React, { useCallback, useState } from 'react'

import { MwLoader, MwTabs } from '@mw-kit/mw-ui'

import { Header } from '../../../components/Header'
import Modal, { ModalState } from '../../../components/MwModal'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useHierarchyContext, { Provider } from './context'
import * as S from './styles'

const RoleHierarchy = createRouteTab(() => {
  const {
    hierarchies: [hierarchies],
    loading: [loading],
    activeTab: [activeTab, setActiveTab],
    isDirty,
  } = useHierarchyContext()

  const [modal, setModal] = useState<ModalState>(null)

  const handleChangeTab = useCallback(
    (newTabIndex: number) => {
      if (!isDirty) {
        setActiveTab(newTabIndex)
        return
      }

      setModal({
        title: 'Notificação',
        content:
          'A estrutura ainda não foi salva e será perdida caso alterne entre as abas. Deseja Continuar?',
        actions: [
          {
            children: 'Cancelar',
            onClick: () => {
              setModal(null)
            },
            appearance: 'borderless',
          },
          {
            children: 'Sim',
            onClick: () => {
              setActiveTab(newTabIndex)
              setModal(null)
            },
          },
        ],
        buttonType: 'MwButton',
        titleColor: 'white',
        size: 'tiny',
      })
    },
    [isDirty],
  )

  return (
    <S.Container>
      <Header description='Estabelaça níveis e ordene as funções hierarquicamente para cada um dos pilares' />

      {(loading.hierarchies || loading.levels) && (
        <MwLoader filled zIndex={4} />
      )}

      {!loading.hierarchies && (
        <React.Fragment>
          <MwTabs
            options={hierarchies.map((e) => ({
              label: e.name,
              data: { ...e },
            }))}
            active={[activeTab, handleChangeTab]}
            internal
            alwaysOpen
          />

          <Manager />

          <Modal modal={modal} />
        </React.Fragment>
      )}
    </S.Container>
  )
}, Provider)

export default RoleHierarchy
