import React from 'react'

import { Grid, Header, Menu, Toolbar } from '../../components'
import { useModalContext, useTabContext } from '../../contexts'
import {
  ExclusionListHistory,
  ExclusionListManager,
  Form,
  PresenceListHistory,
  Remove,
} from '../../modals'
import { AddressStep, EventsStep, UsersStep } from '../../modals/Form/steps'
import type { TabComponent } from '../../types'
import { status, team, user } from '../filters'
import { extract, remove } from '../menus'

import { getCardMenu } from './menus'

const modals = {
  ExclusionListHistory,
  ExclusionListManager,
  PresenceListHistory,
  Remove,
  Form,
}

const Meettings: TabComponent = Object.assign(
  () => {
    const {
      data: [data],
    } = useTabContext()

    const { openModal, closeModal } = useModalContext<typeof modals>()

    const eventCount = data.reduce((eventCount, month) => {
      return eventCount + month.events_count
    }, 0)

    const onClickNewEvent = () => {
      openModal('Form', {
        close: closeModal,
        steps: {
          AddressStep,
          EventsStep,
          UsersStep,
        },
      })
    }

    return (
      <React.Fragment>
        <Header>Lista de Eventos ({eventCount})</Header>

        <Toolbar>
          <Toolbar.Button onClick={onClickNewEvent}>Novo Evento</Toolbar.Button>

          <Menu {...{ maxHeight: '122px', options: [remove(), extract()] }} />

          <Toolbar.Search />

          <Toolbar.AppliedFilters />

          <Toolbar.Filters items={[status, team(), user()]} />
        </Toolbar>

        <Grid {...{ getCardMenu }} />
      </React.Fragment>
    )
  },
  {
    modals,
  },
)

export default Meettings
