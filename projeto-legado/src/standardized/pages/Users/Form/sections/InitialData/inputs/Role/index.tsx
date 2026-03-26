import { useCallback } from 'react'

import { MwEllipsisContainer, MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { Controller } from 'react-hook-form'

import {
  useHookFormsAsState,
  useSelectLoader,
} from '../../../../../../../../utils/hooks'
import { ParserFunction } from '../../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { Licenses } from '../../../../../../../hooks/useLicenses/interfaces'
import { labels } from '../../../../constants'
import useFormContext from '../../../../context'
import * as T from '../../../../interfaces'
import { roleParser } from '../../../../parser'

import * as S from './styles'

const toSelectOption = (
  role: T.Role,
): Pick<SelectOption<T.Role>, 'value' | 'data' | 'label'> => {
  return {
    value: role.id.toString(),
    label: ({ data: role, mode }) => (
      <S.Option>
        <MwEllipsisContainer children={role.name} />

        {mode !== 'placeholder' && (
          <MwEllipsisContainer>
            Tipo de Acesso: {role.access_level_label}
          </MwEllipsisContainer>
        )}
      </S.Option>
    ),
    data: role,
  }
}

const parser = (licenses: Licenses): ParserFunction<T.Role> => {
  return (data) => {
    return data.reduce<SelectOption<T.Role>[]>((options, e) => {
      const role = roleParser(e)
      if (!role) return options

      return [
        ...options,
        {
          ...toSelectOption(role),

          rules: [
            () => {
              const { access_level_id, hierarchies } = role

              return !(access_level_id in licenses) ||
                hierarchies.some(({ id }) => {
                  if (!(id in licenses[access_level_id])) return true
                  const { consumed, reserved } = licenses[access_level_id][id]
                  return reserved - consumed < 1
                })
                ? {
                    content: `Para acessar a Função, é necessário avaliar a quantidade limite de acesso de Usuário ao Plano ${role.access_level_label}`,
                  }
                : true
            },
          ],
        },
      ]
    }, [])
  }
}

const Role = () => {
  const { form, licenses, originals, disabled } = useFormContext()

  const { setValue, isInvalid } = form

  const [, setHierarchies] = useHookFormsAsState('hierarchies', form)

  return (
    <Controller
      name='role'
      control={form.control}
      render={({ field: props }) => {
        const invalid = isInvalid(props.name)

        const loader = useCallback(
          useSelectLoader({
            request: {
              url: 'v1/tr/roles',
              aditionalParams: {
                contain: 'RolesHierarchies',
                not_master: '',
              },
            },
            parser: parser(licenses),
          }),
          [licenses],
        )

        return (
          <MwInput
            {...props}
            {...labels[props.name]}
            disabled={disabled}
            invalid={invalid}
            type='select'
            loader={loader}
            value={props.value ? (toSelectOption(props.value) as never) : ''}
            setValue={(...args) => {
              const role = args[1] as T.Role | null
              setValue(props.name, role)

              if (!role || role.internal_access) {
                setValue('route_contractor', null)
                setHierarchies([])
                return
              }

              setHierarchies((prev) => {
                const hierarchies = role.hierarchies
                  .map(({ id, name }) => {
                    return {
                      ...([...prev, ...cloneDeep(originals.hierarchies)].find(
                        ({ hierarchy_id }) => id === hierarchy_id,
                      ) || {
                        hierarchy_id: id,
                        name,
                        regions: [],
                      }),

                      superior: null,
                      manual: false,
                      modified_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    }
                  })
                  .sort((a, b) => a.hierarchy_id - b.hierarchy_id)

                return hierarchies
              })
            }}
            onClear={() => {
              setValue(props.name, null)
              setValue('route_contractor', null)
              setHierarchies([])
            }}
            width='280px'
            search
          />
        )
      }}
    />
  )
}

export default Role
