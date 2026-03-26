import React, { SetStateAction, useCallback } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { SelectLoader, SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { ModalState } from '../../../../../../../../components/MwModal'
import useModalsContext from '../../context'

import { IHierarchies, getHierarchies } from './service'

interface ISelectPillarProps {
  setModal: React.Dispatch<SetStateAction<ModalState>>
}

const SelectPillar = (props: ISelectPillarProps) => {
  const { form, licenses, originals } = useModalsContext()
  const { setModal } = props

  const { setValueOptions } = form

  const access_level_id = form.watch('access_level_id')
  const internal_access = form.watch('internal_access')

  const user_count = form.watch('user_count')

  const RemovePillarModal = (pillarsName: string[], newv: IHierarchies[]) => {
    setModal({
      title: 'Remover Pilar',
      content: (
        <React.Fragment>
          <div>
            A ação poderá remover as informações de Área de atuação e Superios
            direto.
          </div>
          <div>
            Deseja realmente remover os pilares <b>{pillarsName.join(' e ')}</b>{' '}
            ?
          </div>
        </React.Fragment>
      ),
      actions: [
        {
          content: 'Cancelar',
          appearance: 'borderless',
          onClick: () => setModal(null),
        },
        {
          children: 'Remover',
          color: 'red',
          onClick: () => {
            form.setValue('hierarchies', newv, setValueOptions)
            setModal(null)
          },
        },
      ],
      buttonType: 'MwButton',
    })
  }

  return (
    <MwGrid.Row>
      <Controller
        name='hierarchies'
        control={form.control}
        defaultValue={[]} // Garante que o valor inicial seja um array vazio
        render={({ field: props }) => {
          const hierarchies = props.value || []

          const getPilarOptions: SelectLoader<IHierarchies> =
            useCallback(async () => {
              const response = await getHierarchies()

              const options = response.map<SelectOption<IHierarchies>>(
                (hierarchy) => {
                  const data =
                    originals.hierarchies.find(
                      (item) => item.hierarchy_id === hierarchy.hierarchy_id,
                    ) || hierarchy

                  const checked = originals.hierarchies.some(
                    (item) => item.hierarchy_id === hierarchy.hierarchy_id,
                  )

                  return {
                    label: data.name, // Label visível no componente
                    value: data.hierarchy_id.toString(), // Valor associado
                    data: data, // Dados associados para validação adicional
                    rules: [
                      () => {
                        if (!access_level_id) {
                          return true
                        }
                        if (
                          !(access_level_id in licenses) ||
                          !(data.hierarchy_id in licenses[access_level_id])
                        ) {
                          return {
                            content:
                              'Não existem cotas disponíveis para este pilar',
                          }
                        }

                        const { consumed, reserved } =
                          licenses[access_level_id][data.hierarchy_id]
                        return consumed + user_count > reserved
                          ? {
                              content:
                                'Não existem cotas disponíveis para este pilar',
                            }
                          : true
                      },
                      () => {
                        if (internal_access) return true
                        if (checked) {
                          return data.hierarchy_structure_id === null
                            ? true
                            : {
                                content:
                                  'Pilares associados a hierarquia não podem ser removidos da função.',
                              }
                        }
                        return user_count > 0
                          ? {
                              content:
                                'Não é possível adicionar pilar em funções que contenham Usuários Cadastrados.',
                            }
                          : true
                      },
                    ],
                  }
                },
              )

              return options
            }, [
              access_level_id,
              hierarchies,
              originals.hierarchies,
              internal_access,
              user_count,
              licenses,
            ])

          return (
            <MwInput
              {...{
                ...props,
                type: 'select-multiple',
                placeholder: 'Selecione',
                label: 'Selecione ao menos 1 Pilar*',
                value: hierarchies.map((item) => ({
                  value: item.hierarchy_id.toString(),
                  data: item,
                })),
                setValue: (value, data) => {
                  // keep original data
                  const newv = (data as typeof hierarchies).map((e) => {
                    return (
                      originals.hierarchies.find(
                        (item) => item.hierarchy_id === e.hierarchy_id,
                      ) || e
                    )
                  })

                  if (
                    // if internal access is unchecked
                    !internal_access &&
                    // if has associated users
                    user_count > 0
                  ) {
                    const pillarsName = hierarchies.reduce<string[]>(
                      (acc, item) => {
                        return !newv.some(
                          (y) => item.hierarchy_id === y.hierarchy_id,
                        )
                          ? [...acc, item.name]
                          : acc
                      },
                      [],
                    )
                    if (pillarsName.length > 0) {
                      RemovePillarModal(pillarsName, newv)
                      return
                    }
                  }

                  form.setValue('hierarchies', newv, setValueOptions)
                },
                loader: getPilarOptions as never as SelectLoader,
                invalid: form.isInvalid('hierarchies'),
              }}
            />
          )
        }}
      />
    </MwGrid.Row>
  )
}

export default SelectPillar
