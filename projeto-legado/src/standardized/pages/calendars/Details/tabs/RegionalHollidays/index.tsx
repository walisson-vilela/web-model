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
import { EventsStep, NameStep, RegionsStep } from '../../modals/Form/steps'
import type { TabComponent } from '../../types'
import { city, region, state, status } from '../filters'
import { extract, remove } from '../menus'

import { getCardMenu } from './menus'

const modals = {
  ExclusionListManager,
  ExclusionListHistory,
  Remove,
  Form,
  PresenceListHistory,
}

const RegionalHollidays: TabComponent = Object.assign(
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
          NameStep,
          EventsStep,
          RegionsStep,
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

          <Toolbar.Filters items={[status, region(), state(), city()]} />
        </Toolbar>

        <Grid {...{ getCardMenu }} />
      </React.Fragment>
    )
  },
  {
    modals,
  },
)

export default RegionalHollidays
