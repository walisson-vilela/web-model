import React, { useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Option } from '@mw-kit/mw-ui/dist/components/Input/components/Select/hooks/interfaces'
import { GenericObject } from '@mw-kit/mw-ui/types'
import toast from 'react-hot-toast'

import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isArray, strCmp } from '../../../../../utils/Validators'
import { useControlPanelContext } from '../../context'

import { RefreshAt } from './components/RefreshAt'
import { getHierarchies, getRegions, getTeams } from './services'
import * as S from './styles'

const HeaderDescription = () => {
  const {
    hierarchy: { hierarchy, setHierarchy },
    regions: { regions, setRegions },
    teams: { teams, setTeams },
  } = useControlPanelContext()

  const [hierarchyOptions, setHierarchyOptions] = useState<
    Option<GenericObject>[]
  >([])
  const [hierarchyRolesAvailable, setHierarchyRolesAvailable] = useState<
    Option<GenericObject>[]
  >([])
  const [regionOptions, setRegionOptions] = useState<Option<GenericObject>[]>(
    [],
  )
  const [teamOptions, setTeamOptions] = useState<Option<GenericObject>[]>([])

  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [loading, setLoading] = useState({
    hierarchy: false,
    region: false,
    team: false,
  })

  const loadHierarchies = async () => {
    setLoading((prev) => ({ ...prev, hierarchy: true }))

    try {
      const { data } = await getHierarchies()

      if (isArray(data)) {
        setHierarchyOptions(
          data.map((e) => ({
            label: notEmptyStringOrDefault(e.name),
            value: numberOrDefault(e.id, '').toString(),
            data: {},
          })),
        )
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, hierarchy: false }))
    }
  }

  const loadRegions = async () => {
    setLoading((prev) => ({ ...prev, region: true }))

    try {
      const { data } = await getRegions(hierarchy)

      if (isArray(data)) {
        setRegionOptions(
          data.map((e) => ({
            label: notEmptyStringOrDefault(e.name),
            value: numberOrDefault(e.id, '').toString(),
            data: {},
          })),
        )
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, region: false }))
    }
  }

  const loadTeams = async () => {
    setLoading((prev) => ({ ...prev, team: true }))

    try {
      const { data } = await getTeams(hierarchy)

      if (isArray(data)) {
        setTeamOptions(
          data.map((e) => ({
            label: notEmptyStringOrDefault(e.name),
            value: numberOrDefault(e.id, '').toString(),
            data: {},
          })),
        )
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, team: false }))
    }
  }

  useEffect(() => {
    loadHierarchies()
    const availableRoles = JSON.parse(
      localStorage.getItem('control_panel_roles'),
    )

    setHierarchyRolesAvailable(
      availableRoles !== null
        ? availableRoles.map((e) => ({
            label: notEmptyStringOrDefault(e.name),
            value: numberOrDefault(e.id, '').toString(),
            data: {},
          }))
        : null,
    )
  }, [])

  useEffect(() => {
    if (hierarchy) {
      loadRegions()
      loadTeams()
    }
  }, [hierarchy])

  return (
    <S.Flex>
      <S.Flex>
        <small>
          <b>Filtros:</b>
        </small>

        <label htmlFor='hierarchy'>
          <small>Pilar:</small>
        </label>

        <MwInput
          type='select'
          id='hierarchy'
          value={hierarchy}
          borderless
          unselectable='on'
          width='160px'
          setValue={(value) => {
            setHierarchy(value)
            setIsDirty(true)
            setRegions([])
            setTeams([])
          }}
          placeholder='Selecione'
          loading={loading.hierarchy}
          loader={async () => ({
            lastPage: true,
            options:
              hierarchyRolesAvailable !== null
                ? hierarchyRolesAvailable
                : hierarchyOptions,
          })}
        />

        <label htmlFor='teams'>
          <small>Equipes:</small>
        </label>

        <MwInput
          type='select-multiple'
          id='teams'
          value={teams}
          borderless
          setValue={(value) => {
            setTeams(value)
            setIsDirty(true)
          }}
          placeholder='Selecione'
          width='260px'
          loading={loading.team}
          disabled={!hierarchy}
          search
          selectAll
          loader={async (search) => {
            const results = teamOptions.filter((e) =>
              strCmp(e.label.toString(), search, { contain: true }),
            )
            return {
              lastPage: true,
              options: results,
            }
          }}
        />

        <label htmlFor='regions'>
          <small>Áreas:</small>
        </label>

        <MwInput
          type='select-multiple'
          id='regions'
          value={regions}
          borderless
          setValue={(value) => {
            setRegions(value)
            setIsDirty(true)
          }}
          placeholder='Selecione'
          width='260px'
          loading={loading.region}
          disabled={!hierarchy}
          search
          selectAll
          loader={async (search) => {
            const results = regionOptions.filter((e) =>
              strCmp(e.label.toString(), search, { contain: true }),
            )

            return {
              lastPage: true,
              options: results,
            }
          }}
        />
      </S.Flex>
      <RefreshAt isDirty={isDirty} setIsDirty={setIsDirty} />
    </S.Flex>
  )
}

export default HeaderDescription
