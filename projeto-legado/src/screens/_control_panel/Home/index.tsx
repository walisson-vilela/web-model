import {useEffect, useState} from 'react'

import moment from 'moment'
import {Toaster} from 'react-hot-toast'

import {Header} from '../../../components'
import {Grid} from '../../../components/FormFields'
import {createRouteTab} from '../../../routes'
import useIsFirstRender from '../../../utils/hooks/useIsFirstRender'

import {HeaderDescription} from './components'
import Provider from './context'
import {DataType, Filters} from './interfaces'
import * as S from './styles'
import {
  AverageDistance,
  AverageSpeed,
  BatteryLevel,
  DisconnectedUsers,
  ExceptedAttendances,
  ExecutionCycle,
  Humor,
  Justifications,
  NotStartedAttendences,
  PendingData,
  RangeQuality,
  RoadmapCoverage,
  TMOXRay,
  TMOxPerformance,
} from './widgets'

const Home = createRouteTab(
  () => {
    const firstRender = useIsFirstRender()

    const filtersCache = JSON.parse(
      localStorage.getItem('control_panel_filters'),
    ) as Filters

    const dataCache = JSON.parse(
      localStorage.getItem('control_panel_cache_data'),
    ) as DataType

    const lastRefreshCache = localStorage.getItem('control_panel_last_refresh')

    const [hierarchy, setHierarchy] = useState<string>(
      filtersCache ? filtersCache.hierarchy : '',
    )

    const [regions, setRegions] = useState<string[]>(
      filtersCache ? filtersCache.regions : [],
    )

    const [teams, setTeams] = useState<string[]>(
      filtersCache ? filtersCache.teams : [],
    )

    const [filters, setFilters] = useState<Filters>(
      filtersCache || {
        hierarchy: '',
        regions: [],
        teams: [],
      },
    )

    const [lastRefresh, setLastRefresh] = useState<string>(
      lastRefreshCache || moment().toISOString(),
    )

    const [data, setData] = useState<DataType>(
      dataCache || {
        roadmap_coverage: null,
        not_started_attendances: null,
        disconnected_users: null,
        excepted_attendances: null,
        battery_level: null,
        pending_data: null,
        range_quality: null,
        average_speed: null,
        average_distance: null,
        humor: null,
        justifications: null,
        tmo_x_performance: null,
        tmo_x_ray: null,
        execution_cycle: null,
      },
    )

    useEffect(() => {
      localStorage.setItem('control_panel_last_refresh', lastRefresh)
      localStorage.setItem('control_panel_cache_data', JSON.stringify(data))
      localStorage.setItem('control_panel_filters', JSON.stringify(filters))
    }, [lastRefresh, data, filters])

    useEffect(() => {
      const handleTabClose = (event) => {
        event.preventDefault()
        localStorage.removeItem('control_panel_filters')
        localStorage.removeItem('control_panel_last_refresh')
        localStorage.removeItem('control_panel_cache_data')
      }

      window.addEventListener('beforeunload', handleTabClose)

      return () => {
        window.removeEventListener('beforeunload', handleTabClose)
      }
    }, [])

    return (
      <Provider
        value={{
          data: {data, setData},
          hierarchy: {hierarchy, setHierarchy},
          regions: {regions, setRegions},
          teams: {teams, setTeams},
          lastRefresh: {lastRefresh, setLastRefresh},
          filters: {filters, setFilters},
          firstRender,
        }}
      >
        <S.Container>

          <Header
            description='Painel do Sistema GIV v2'
            style={{paddingBottom: 0}}
          />

          {/*
          <Header
            style={{ paddingBottom: 0 }}
            borderless
            description={<HeaderDescription />}
          />
          */}

          {/* <S.Widgets>
            <Grid.Row itemSpacing={[14, 21]}>
              <Grid.Column>
                <RoadmapCoverage />
              </Grid.Column>

              <Grid.Column>
                <NotStartedAttendences />
              </Grid.Column>

              <Grid.Column>
                <DisconnectedUsers />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row itemSpacing={[14, 21]}>
              <Grid.Column>
                <ExceptedAttendances />
              </Grid.Column>

              <Grid.Column>
                <BatteryLevel />
              </Grid.Column>

              <Grid.Column>
                <PendingData />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row itemSpacing={[14, 21]}>
              <Grid.Column>
                <RangeQuality />
              </Grid.Column>

              <Grid.Column>
                <AverageSpeed />
              </Grid.Column>

              <Grid.Column>
                <AverageDistance />
                <Humor />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row itemSpacing={[14, 21]}>
              <Grid.Column>
                <Justifications />
              </Grid.Column>

              <Grid.Column>
                <TMOxPerformance />
              </Grid.Column>

              <Grid.Column>
                <TMOXRay />
                <ExecutionCycle />
              </Grid.Column>
            </Grid.Row>
          </S.Widgets> */}

        </S.Container>

        <Toaster position='bottom-right'/>
      </Provider>
    )
  },
  (props) => <>{props.children}</>,
)

export default Home
