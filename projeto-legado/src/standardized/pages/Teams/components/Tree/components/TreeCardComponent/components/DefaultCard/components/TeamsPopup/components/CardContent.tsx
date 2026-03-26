import React, { useCallback } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import { debounce } from 'lodash'
import { toast } from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../../../../components/Toaster'
import useTeamsContext from '../../../../../../../../../context'
import {
  checkTeamName,
  editTeamName,
} from '../../../../../../../../../services'
import type { CardNodeDatum } from '../../../../../../../../../types'

import { ErrorMessage, TeamsPopupWrapper } from './styles'

type TeamNameFormType = {
  teamName: string
  loading: boolean
  valid: null | boolean
  validationLoading: boolean
}

export const CardContent = ({
  nodeDatum,
  setOpen,
}: {
  nodeDatum: CardNodeDatum
  setOpen: React.Dispatch<React.SetStateAction<NodeJS.Timeout | boolean>>
}) => {
  const { attributes } = nodeDatum

  const [teamNameForm, setTeamNameForm] = React.useState<TeamNameFormType>({
    teamName: attributes.name || '',
    loading: false,
    valid: null,
    validationLoading: false,
  })

  const {
    loadingNodes,
    hierarchy: [hierarchy],
  } = useTeamsContext()

  const updateTeamNameForm = <K extends keyof TeamNameFormType>(
    name: K,
    value: TeamNameFormType[K],
  ) => {
    setTeamNameForm((prev) => ({ ...prev, [name]: value }))
  }

  const editTeamNameFunc = async () => {
    if (!hierarchy?.id || !attributes.id) return
    updateTeamNameForm('loading', true)
    try {
      await editTeamName(hierarchy.id, attributes.id, teamNameForm.teamName)
      setOpen(false)
      loadingNodes()
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      updateTeamNameForm('loading', false)
    }
  }

  const handleCheck = useCallback(
    debounce(async (value: string) => {
      if (!hierarchy?.id || !attributes.id) return

      updateTeamNameForm('validationLoading', true)

      try {
        const response = await checkTeamName(hierarchy.id, attributes.id, value)
        updateTeamNameForm('valid', response)
      } catch (error) {
        console.error(error)
      }

      updateTeamNameForm('validationLoading', false)
    }, 1000),
    [hierarchy?.id, !attributes.id],
  )

  return (
    <TeamsPopupWrapper>
      <div>
        <MwInput
          label='Defina o nome da Equipe'
          invalid={teamNameForm.valid === false}
          loading={teamNameForm.validationLoading}
          disabled={teamNameForm.loading}
          type='text'
          value={teamNameForm.teamName}
          placeholder='Nome da equipe'
          onChange={(e) => {
            updateTeamNameForm('teamName', e.target.value)

            if (!e.target.value || e.target.value === attributes.name) {
              updateTeamNameForm('valid', true)
            } else {
              updateTeamNameForm('valid', null)
              handleCheck(e.target.value)
            }
          }}
        />
        <ErrorMessage>
          {teamNameForm.valid === false && <span children='Nome duplicado' />}
        </ErrorMessage>
      </div>

      <div>
        <MwButton
          loading={teamNameForm.loading}
          size='mini'
          onClick={editTeamNameFunc}
          disabled={
            !teamNameForm.teamName ||
            !teamNameForm.valid ||
            teamNameForm.teamName === attributes.name
          }
        >
          Salvar
        </MwButton>
      </div>
    </TeamsPopupWrapper>
  )
}
