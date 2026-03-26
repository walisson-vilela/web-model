import { useCallback } from 'react'

import { MwEllipsisContainer, MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'

import { numberOrDefault } from '../../../../../../../../utils/Formatters'
import {
  useHookFormsAsState,
  useSelectLoader,
} from '../../../../../../../../utils/hooks'
import { ParserFunction } from '../../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { Licenses } from '../../../../../../../hooks/useLicenses/interfaces'
import { notEmptyStringOrDefault } from '../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../utils/validators'
import useFormContext from '../../../../context'
import * as T from '../../../../interfaces'
import { roleParser } from '../../../../parser'

import * as S from './styles'

const toSelectOption = (
  user: T.User,
): Pick<SelectOption<T.User>, 'value' | 'data' | 'label'> => {
  return {
    value: user.id.toString(),
    label: ({ data: user, mode }) => (
      <S.Option>
        <MwEllipsisContainer children={user.name} />

        {mode !== 'placeholder' && (
          <MwEllipsisContainer>
            ID: {user.id} | {user.role.name}
          </MwEllipsisContainer>
        )}
      </S.Option>
    ),
    data: user,
  }
}

const parser = (licenses: Licenses): ParserFunction<T.User> => {
  return (data) => {
    return data.reduce<SelectOption<T.User>[]>((options, e) => {
      if (!isObject(e)) return options

      const id = numberOrDefault(e.id)
      if (!id) return options

      const role = roleParser(e.role)
      if (!role) return options

      const user: T.User = {
        id,
        name: notEmptyStringOrDefault(e.name, ''),
        role,
      }

      return [
        ...options,
        {
          ...toSelectOption(user),

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

const User = () => {
  const { form, licenses } = useFormContext()

  const { isInvalid } = form

  const [replace, setReplace] = useHookFormsAsState('replace', form)

  const invalid = isInvalid('replace')

  const loader = useCallback(
    useSelectLoader({
      request: {
        url: 'v1/tr/users/options',
        aditionalParams: {
          replaceable: 1,
        },
      },
      parser: parser(licenses),
    }),
    [licenses],
  )

  return (
    <MwInput
      type='select'
      label='Defina Usuário a ser substituído'
      placeholder='Selecione'
      disabled={replace === null}
      invalid={invalid}
      loader={loader}
      value={
        replace && replace.user ? (toSelectOption(replace.user) as never) : ''
      }
      setValue={(...args) => {
        const user = args[1] as T.User | null
        setReplace((prev) => {
          return {
            ...(prev || {
              items: [],
            }),
            user,
          }
        })
      }}
      search
    />
  )
}

export default User
