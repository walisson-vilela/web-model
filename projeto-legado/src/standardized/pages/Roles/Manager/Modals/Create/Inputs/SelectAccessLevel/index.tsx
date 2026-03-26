import React, { useCallback } from 'react'

import { MwGrid, MwIcon, MwInput } from '@mw-kit/mw-ui'
import { SelectLoader, SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { ModalState } from '../../../../../../../../components/MwModal'
import { numberOrDefault } from '../../../../../../../../utils/Formatters'
import { isKeyOf } from '../../../../../../../../utils/Validators'
import Popup from '../../../../../../../components/Popup'
import { BodyInterface } from '../../../../interfaces'
import useModalsContext from '../../context'

import ChangeAcessModal from './Modal/ChangeAcessModal'
import AccessContentPopInfo from './Popup/AccessPopInfo'
import * as S from './styled'

type AccessLevel<K extends number> = {
  label: string
  data: {
    weight: number
  }
  value: `${K}`
}

export type AccessLevels = { [k in 1 | 2 | 3]: AccessLevel<k> }

export const access_levels: AccessLevels = {
  2: { label: 'Completo', data: { weight: 3 }, value: '2' },
  1: { label: 'Básico', data: { weight: 2 }, value: '1' },
  3: { label: 'Relatório', data: { weight: 1 }, value: '3' },
}
interface ISelectAccessLevel {
  item: BodyInterface | undefined

  setModal: React.Dispatch<React.SetStateAction<ModalState>>
}

const SelectAccessLevel = (props: ISelectAccessLevel) => {
  const { form, licenses, originals } = useModalsContext()
  const { setModal } = props
  const { watch } = form
  const hierarchies = watch('hierarchies')
  const user_count = watch('user_count')

  const loader: SelectLoader = useCallback(
    async () => ({
      lastPage: true,
      options: Object.values(access_levels).map((level) => {
        return {
          ...level,
          rules: [
            () => {
              const access_level_id = Number(level.value)

              if (access_level_id === originals.access_level_id) {
                return true
              }

              if (!(access_level_id in licenses)) {
                return {
                  content:
                    'Não existem cotas disponíveis para este nível de acesso.',
                }
              }

              return hierarchies.some(({ hierarchy_id }) => {
                if (!(hierarchy_id in licenses[access_level_id])) {
                  return true
                }

                const { consumed, reserved } =
                  licenses[access_level_id][hierarchy_id]
                return consumed + user_count > reserved
              })
                ? {
                    content:
                      'Não existem cotas disponíveis para este nível de acesso.',
                  }
                : true
            },
          ],
        } as SelectOption
      }),
    }),
    [licenses, hierarchies, user_count],
  )

  return (
    <MwGrid.Row>
      <Controller
        name='access_level_id'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='select'
            label={
              <S.IconContent>
                <div>Nível de Acesso*</div>
                <Popup
                  on='click'
                  trigger={
                    <MwIcon
                      type='feather'
                      icon='info'
                      color='darkBlue'
                      onClick={(e) => e.preventDefault()}
                    />
                  }
                  content={<AccessContentPopInfo />}
                  position='right center'
                />
              </S.IconContent>
            }
            placeholder='Selecione'
            value={
              props.value
                ? access_levels[props.value as keyof typeof access_levels]
                : ''
            }
            invalid={form.isInvalid('access_level_id')}
            setValue={(value) => {
              const v = numberOrDefault(value)

              if (v === null || !isKeyOf(access_levels, v)) {
                form.setValue('access_level_id', v)

                return
              }

              if (
                originals.access_level_id === null ||
                !isKeyOf(access_levels, originals.access_level_id)
              ) {
                form.setValue('access_level_id', v)
                return
              }

              const original_weight =
                access_levels[originals.access_level_id].data.weight
              if (access_levels[v].data.weight >= original_weight) {
                form.setValue('access_level_id', v)
                return
              }

              setModal(
                <ChangeAcessModal
                  onClose={() => setModal(null)}
                  onConfirm={() => {
                    form.setValue('access_level_id', v)
                    setModal(null)
                  }}
                  from={originals.access_level_id || (0 as keyof AccessLevels)}
                  to={v}
                />,
              )
            }}
            loading={false}
            position='left bottom'
            loader={loader}
          />
        )}
      />
    </MwGrid.Row>
  )
}

export default SelectAccessLevel
