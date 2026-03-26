import React from 'react'

import { Header } from '../../../components/Header'
import Tabs from '../../../components/Tabs'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useContext, { Provider } from './provider'

const tabs = [
  {
    label: 'Documentos Vigentes',
    id: 1,
  },
  {
    label: 'Documentos Vencidos',
    id: 0,
  },
]

const Home = createRouteTab(() => {
  const {
    managerProps,
    activeTab: [activeTab, setActiveTab],
  } = useContext()

  const { id: tabId } = tabs[activeTab]

  return (
    <React.Fragment>
      <Header description='Utilize os campos abaixo para gerenciar as Políticas e Termos de uso' />

      <Tabs
        options={tabs.map((e) => ({ label: e.label, data: {} }))}
        active={{
          active: activeTab,
          setActive: setActiveTab,
        }}
      />

      <Manager {...managerProps} tabId={tabId} />
    </React.Fragment>
  )
}, Provider)

export default Home
