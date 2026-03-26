import React, { useCallback } from 'react'

import { MwEllipsisContainer, MwIcon, MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import { dateOrDefault } from '../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../utils/hooks'
import { ParserFunction } from '../../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { isObject } from '../../../../../../../utils/validators'
import useFormContext from '../../../../context'
import { Hierarchy } from '../../../../interfaces'
import { superiorParser } from '../../../../parser'

import * as S from './styles'
import { Container } from './styles'

type Superior = Exclude<Hierarchy['superior'], null>

const toSelectOption = (
  data: Superior,
): Pick<SelectOption<Superior>, 'value' | 'data' | 'label'> => {
  return {
    value: data.id.toString(),
    label: ({ data, mode }) => (
      <S.Option>
        <MwEllipsisContainer children={data.name} />

        {mode !== 'placeholder' && (
          <div>
            {data.id} | <MwEllipsisContainer children={data.role.name} />
          </div>
        )}
      </S.Option>
    ),
    data: data,
  }
}

const parser: ParserFunction<Superior> = (data) => {
  return data.reduce<SelectOption<Superior>[]>((options, e) => {
    if (!isObject(e.user)) return options
    const superior = superiorParser(e.user)
    if (!superior) return options

    return [
      ...options,
      {
        ...toSelectOption(superior),
      },
    ]
  }, [])
}

const Superior = ({
  hierarchy,
  setHierarchies,
}: {
  hierarchy: Hierarchy
  setHierarchies: React.Dispatch<React.SetStateAction<Hierarchy[]>>
}) => {
  const {
    form,
    originals,
    modal: [, setModal],
    disabled,
  } = useFormContext()

  const role = form.watch('role')
  const role_id = role?.id

  const loader = useCallback(
    useSelectLoader({
      request: {
        url: `v1/tr/hierarchies/${hierarchy.hierarchy_id}/superiors`,
        aditionalParams: {
          region_ids: hierarchy.regions.map((e) => e.region_id).join(','),
          role_id,
        },
      },
      parser,
      invalid: !role_id || hierarchy.regions.length < 1,
    }),
    [hierarchy.hierarchy_id, role_id, hierarchy.regions],
  )

  const { superior } = hierarchy

  const setHierarchy: React.Dispatch<React.SetStateAction<Hierarchy>> =
    useCallback(
      (value) => {
        setHierarchies((prev) => {
          const i = prev.findIndex(
            (x) => x.hierarchy_id === hierarchy.hierarchy_id,
          )
          if (i < 0) return prev

          const h = typeof value === 'function' ? value(prev[i]) : value
          if (prev[i] === h) return prev

          const n = [...prev]
          n[i] = h

          return n
        })
      },
      [setHierarchies, hierarchy.id],
    )

  const setSuperior = (superior: Hierarchy['superior']) => {
    const rest = (() => {
      const originalHierarchy = originals.hierarchies.find(
        (e) => e.hierarchy_id === hierarchy.hierarchy_id,
      )

      if (
        originalHierarchy &&
        superior?.id === originalHierarchy.superior?.id
      ) {
        return {
          manual: originalHierarchy.manual,
          modified_at: originalHierarchy.modified_at,
        }
      }

      return {
        manual: true,
        modified_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    })()

    setHierarchy((prev) => ({
      ...prev,
      superior,
      ...rest,
    }))
  }

  return (
    <Container>
      <div>Defina o supervisor direto no Pilar {hierarchy.name}</div>

      <div>
        <MwInput
          type='select'
          loader={loader}
          value={superior ? (toSelectOption(superior) as never) : ''}
          setValue={(_v, data) => {
            setSuperior(data as Hierarchy['superior'])
          }}
          onClear={() => setSuperior(null)}
          placeholder='Selecione'
          search
          disabled={!role_id || hierarchy.regions.length < 1 || disabled}
          width='280px'
        />

        <div>
          Associação: {hierarchy.manual ? 'Manual' : 'Automática'} - Data:{' '}
          {dateOrDefault(hierarchy.modified_at, '-', 'DD/MM/YYYY')}
        </div>

        {!hierarchy.manual && (
          <MwIcon
            type='feather'
            icon='edit_2'
            width='14px'
            height='14px'
            strokeWidth='3px'
            {...(!disabled
              ? {
                  onClick: () => {
                    setModal({
                      title: 'Editar Associação',
                      content:
                        'É possível alterar associação automática do responsável direto para uma decisão manual. Deseja alterar esta Associação Automática para Associação Manual?',
                      buttonType: 'MwButton',
                      actions: [
                        {
                          type: 'button',
                          appearance: 'borderless',
                          children: 'Cancelar',
                          onClick: () => setModal(null),
                        },
                        {
                          type: 'button',
                          children: 'Sim',
                          onClick: () => {
                            setHierarchy((prev) => ({
                              ...prev,
                              manual: true,
                              modified_at: moment().format(
                                'YYYY-MM-DD HH:mm:ss',
                              ),
                            }))
                            setModal(null)
                          },
                        },
                      ],
                    })
                  },
                }
              : {})}
          />
        )}
      </div>
    </Container>
  )
}

export default Superior
