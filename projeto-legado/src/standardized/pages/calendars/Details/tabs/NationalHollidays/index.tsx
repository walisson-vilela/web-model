import React from 'react'

import { Grid, Header, Menu, Toolbar } from '../../components'
import { useTabContext } from '../../contexts'
import {
  ExclusionListHistory,
  ExclusionListManager,
  Form,
  PresenceListHistory,
} from '../../modals'
import type { TabComponent } from '../../types'
import { extract } from '../menus'

import { filters } from './constants'
import { getCardMenu } from './menus'
import { status } from './menus/toolbar'
import { Status } from './modals'

const NationalHolidays: TabComponent = Object.assign(
  () => {
    const {
      data: [data],
    } = useTabContext()

    const eventCount = data.reduce((eventCount, month) => {
      return eventCount + month.events_count
    }, 0)

    return (
      <React.Fragment>
        <Header>Lista de Eventos ({eventCount})</Header>

        <Toolbar>
          <Menu
            {...{
              maxHeight: '132px',
              options: [
                status('ACTIVE'),
                { ...status('INACTIVATED'), delimiter: true },
                extract(),
              ],
            }}
          />

          <Toolbar.Search />

          <Toolbar.AppliedFilters />

          <Toolbar.Filters items={filters} />
        </Toolbar>

        <Grid {...{ getCardMenu }} />
      </React.Fragment>
    )
  },
  {
    modals: {
      ExclusionListHistory,
      ExclusionListManager,
      PresenceListHistory,
      Status,
      Form,
    },
  },
)

export default NationalHolidays
