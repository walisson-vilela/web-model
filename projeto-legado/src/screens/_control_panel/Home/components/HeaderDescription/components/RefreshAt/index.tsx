import React, { useEffect, useState } from 'react'

import { MwButton, MwIcon } from '@mw-kit/mw-ui'
import moment, { Moment } from 'moment'

import { useControlPanelContext } from '../../../../context'

import * as S from './styles'

interface RefreshAtProps {
  isDirty: boolean
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>
}

export const RefreshAt = ({ isDirty, setIsDirty }: RefreshAtProps) => {
  const {
    lastRefresh: { lastRefresh, setLastRefresh },
    hierarchy: { hierarchy, setHierarchy },
    regions: { regions, setRegions },
    teams: { teams, setTeams },
    filters: { filters, setFilters },
  } = useControlPanelContext()

  const lastRefreshCache = localStorage.getItem('control_panel_last_refresh')

  const [lastRefreshLabel, setLastRefreshLabel] = useState<string>(
    lastRefreshCache ? moment(lastRefreshCache).fromNow() : 'agora',
  )

  const [currentTime, setCurrentTime] = useState<Moment>(moment())

  useEffect(() => {
    if (moment().diff(lastRefresh, 'minutes') >= 5) {
      setLastRefresh(moment().toISOString())
      setLastRefreshLabel(moment().fromNow())

      setHierarchy(filters.hierarchy)
      setRegions(filters.regions)
      setTeams(filters.teams)
    }

    setLastRefreshLabel(moment(lastRefresh).fromNow())

    const interval = setInterval(() => {
      setCurrentTime(moment())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLastRefreshLabel(moment(lastRefresh).fromNow())
  }, [currentTime])

  return (
    <S.Container>
      <MwButton
        content='Aplicar'
        size='tiny'
        color='grey'
        disabled={!isDirty}
        onClick={() => {
          setLastRefresh(moment().toISOString())
          setLastRefreshLabel(moment().fromNow())
          setIsDirty(false)

          setFilters({
            hierarchy,
            regions,
            teams,
          })
        }}
      />

      <S.RefreshContainer>
        <MwIcon
          type='feather'
          icon='refresh_cw'
          width={12}
          onClick={() => {
            setLastRefresh(moment().toISOString())
            setLastRefreshLabel(moment().fromNow())

            setHierarchy(filters.hierarchy)
            setRegions(filters.regions)
            setTeams(filters.teams)
          }}
        />

        <small>Atualizado {lastRefreshLabel}</small>
      </S.RefreshContainer>
    </S.Container>
  )
}
