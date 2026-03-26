import React from 'react'

import { MwButton, MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'
import moment from 'moment'

import { ModalState } from '../../../../../../components/MwModal'
import { ManageRegionsModal } from '../../../../../../screens/Users/Form/components'
import { useHookFormsAsState } from '../../../../../../utils/hooks'
import useFormContext from '../../context'
import * as T from '../../interfaces'

import { Superior } from './components'
import * as S from './styles'

const Hierarchy = (props: {
  original: T.Hierarchy | undefined
  hierarchy: T.Hierarchy
  setHierarchies: React.Dispatch<React.SetStateAction<T.Hierarchy[]>>
  setModal: React.Dispatch<React.SetStateAction<ModalState | null>>
  disabled: boolean
  invalid: boolean
}) => {
  const { original, hierarchy, setHierarchies, setModal, disabled, invalid } =
    props

  const setRegions: React.Dispatch<React.SetStateAction<T.Region[]>> = (
    value,
  ) => {
    setHierarchies((prev) => {
      const i = prev.findIndex((x) => x.hierarchy_id === hierarchy.hierarchy_id)
      if (i < 0) return prev

      const regions =
        typeof value === 'function' ? value(prev[i].regions) : value

      if (prev[i].regions === regions) return prev

      const n = [...prev]
      n[i] = {
        ...n[i],
        regions,
        superior: null,
        manual: false,
        modified_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      }

      return n
    })
  }

  const onDefineAreas = () => {
    setModal(
      <ManageRegionsModal
        hierarchy={hierarchy}
        close={() => setModal(null)}
        save={(regions) => {
          setRegions(
            (() => {
              if (!original || original.regions.length < 1) return regions
              return regions.map((r) => ({
                // keep original id
                ...(original.regions.find((e) => e.region_id === r.region_id) ||
                  {}),

                ...r,
              }))
            })(),
          )
        }}
      />,
    )
  }

  const onRemoveRegion = (region_id: number) => {
    setRegions((prev) => prev.filter((e) => e.region_id !== region_id))
  }

  return (
    <S.Section $invalid={invalid}>
      <MwGrid
        rows={{
          borderless: true,
        }}
        cols={{
          spacing: {
            top: 's1',
            left: 's3',
            bottom: 's1',
            right: 's3',
          },
          spacingAround: true,
        }}
        spacing={{
          top: 's3',
          left: '0',
          bottom: 's3',
          right: '0',
        }}
        borderless
      >
        <MwGrid.Row>
          <MwGrid.Col>
            <S.Title $marginBottom='0'>
              Área de Atuação - Pilar {hierarchy.name} *
            </S.Title>
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col>
            <MwButton
              type='button'
              {...(disabled ? { disabled: true } : { onClick: onDefineAreas })}
              {...(invalid ? { color: 'warningRed' } : {})}
              content='Definir Áreas'
            />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col>
            <MwGrid
              style={{
                borderRadius: 4,
              }}
            >
              <MwScrollContainer
                height='82px'
                before={{
                  background: 'ghostWhite',
                  children: (
                    <MwGrid.Row
                      backgroundColor='ghostWhite'
                      cols={{
                        spacing: 's3',
                        spacingAround: true,
                      }}
                      style={{ fontWeight: 'bold' }}
                    >
                      <MwGrid.Col width='2' children='ID' />

                      <MwGrid.Col children='Áreas' />

                      <MwGrid.Col
                        width='1'
                        align={{ content: { horizontal: 'center' } }}
                        children='Ação'
                      />
                    </MwGrid.Row>
                  ),
                }}
                spacing={{ top: 's1', bottom: 's1' }}
                empty={{
                  empty: hierarchy.regions.length === 0,
                  content: (
                    <S.EmptyMessage>
                      Não há nenhuma área associada
                    </S.EmptyMessage>
                  ),
                }}
              >
                {hierarchy.regions.map((region) => {
                  return (
                    <MwGrid.Row
                      key={region.region_id}
                      cols={{
                        spacing: {
                          top: 's1',
                          right: 's3',
                          bottom: 's1',
                          left: 's3',
                        },
                        spacingAround: true,
                      }}
                      borderless
                    >
                      <MwGrid.Col width='2' children={region.region_id} />

                      <MwGrid.Col children={region.name} />

                      <MwGrid.Col
                        width='1'
                        align={{ content: { horizontal: 'center' } }}
                      >
                        <S.Link
                          children='Remover'
                          {...(disabled
                            ? {}
                            : {
                                onClick: () => onRemoveRegion(region.region_id),
                              })}
                        />
                      </MwGrid.Col>
                    </MwGrid.Row>
                  )
                })}
              </MwScrollContainer>
            </MwGrid>
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col>
            <Superior hierarchy={hierarchy} setHierarchies={setHierarchies} />
          </MwGrid.Col>
        </MwGrid.Row>
      </MwGrid>
    </S.Section>
  )
}

const Hierarchies = () => {
  const {
    form,
    modal: [, setModal],
    originals,
    disabled,
  } = useFormContext()

  const role = form.watch('role')

  const errors = form.formState.errors.hierarchies || []

  const [hierarchies, setHierarchies] = useHookFormsAsState('hierarchies', form)

  if (!role || role.internal_access) return null

  return (
    <React.Fragment
      children={hierarchies.map((hierarchy, index) => (
        <Hierarchy
          key={hierarchy.hierarchy_id}
          original={originals.hierarchies.find(
            (e) => e.hierarchy_id === hierarchy.hierarchy_id,
          )}
          hierarchy={hierarchy}
          setHierarchies={setHierarchies}
          setModal={setModal}
          disabled={disabled}
          invalid={
            form.formState.submitCount > 0 && errors[index] !== undefined
          }
        />
      ))}
    />
  )
}

export default Hierarchies
