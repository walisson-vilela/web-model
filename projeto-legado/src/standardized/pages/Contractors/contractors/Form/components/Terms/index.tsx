import { useCallback, useState } from 'react'

import {
  MwButton,
  MwEllipsisContainer,
  MwGrid,
  MwIcon,
  MwMenu,
  MwScrollContainer,
} from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import { dateOrDefault } from '../../../../../../../utils/Formatters'
import { useOnClickOutState } from '../../../../../../../utils/hooks'
import useContext from '../../context'
import * as S from '../../styled'
import { Term as TermsType } from '../../types'

import { labels } from './constants'
import * as Modals from './modals'

const Menu = (
  props: Pick<Parameters<typeof MwMenu>[0], 'options' | 'boundRef'>,
) => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <MwGrid.Col
      width='auto'
      spacing='0'
      align={{ content: { vertical: 'center' } }}
      ref={useOnClickOutState(() => setOpen(false))}
      style={{ position: 'relative' }}
    >
      <MwIcon
        type='feather'
        icon='more_vertical'
        onClick={() => setOpen((prev) => !prev)}
        color={open ? 'darkestGrey' : undefined}
      />

      <MwMenu
        {...{
          ...props,
          open,
          close,
          containerSpacing: 's1',
          axis: 'x',
          center: { x: 50, y: 25 },
        }}
      />
    </MwGrid.Col>
  )
}

const Terms = (props: { mode: 'termsOfUse' | 'privacyPolicy' }) => {
  const { mode } = props

  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  const {
    setModal,
    form: { watch, setValue, setValueOptions },
    viewMode,
  } = useContext()

  const [terms, setTerms] = [
    watch(mode),
    (v: TermsType[]) => {
      setValue(mode, v, setValueOptions)
    },
  ]

  const onClickManageTerm = useCallback(
    (id?: number) => {
      const props: Parameters<typeof Modals.TermsModal>[0] = {
        mode,
        close: () => setModal(null),
        save: (term) =>
          setTerms([
            ...terms,
            {
              ...term,
              id:
                (terms.length > 0 ? Math.max(...terms.map((e) => e.id)) : 0) +
                1,
            } as TermsType,
          ]),
      }

      if (id) {
        const index = terms.findIndex((e) => e.id === id)
        if (index < 0) {
          console.error('Term not found in list')
          return
        }

        props.initialValue = { ...terms[index] }
        props.save = (term) => {
          const newState = [...terms]
          newState[index] = { ...newState[index], ...term }
          setTerms(newState)
        }
      }

      setModal(<Modals.TermsModal {...props} />)
    },
    [terms],
  )

  const onRemoveTerm = useCallback(
    (id: number) => {
      setTerms(terms.filter((e) => e.id !== id))
    },
    [terms],
  )

  const onClickViewTerm = useCallback(
    (id: number) => {
      const term = terms.find((e) => e.id === id)

      if (term === undefined) {
        console.error('Term not found in list')
        return
      }

      const props: Parameters<typeof Modals.TermsView>[0] = {
        mode,
        close: () => setModal(null),
        term,
      }

      setModal(<Modals.TermsView {...props} />)
    },
    [terms],
  )
  return (
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
      }}
      spacing={{
        top: 's4',
        left: 's3',
        bottom: 's4',
        right: 's3',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col spacing='0'>
          <S.Title children={labels[mode]} />
        </MwGrid.Col>
      </MwGrid.Row>

      {!viewMode && (
        <MwGrid.Row>
          <MwGrid.Col>
            <Popup
              on='click'
              position='right center'
              className='popup-field'
              content={`É possível adicionar somente um ${labels[
                mode
              ].toLowerCase()}`}
              trigger={
                <div>
                  <MwButton
                    type='button'
                    onClick={() => onClickManageTerm()}
                    content={`Incluir ${labels[mode].split(' ')[0]}`}
                    disabled={terms.length !== 0}
                  />
                </div>
              }
              disabled={terms.length === 0}
              pinned
              inverted
            />
          </MwGrid.Col>
        </MwGrid.Row>
      )}

      <MwGrid.Row>
        <MwGrid.Col>
          <MwGrid
            style={{
              borderRadius: 4,
            }}
          >
            <MwScrollContainer
              ref={setRef}
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
                    <MwGrid.Col
                      width='3'
                      children={labels[mode].split(' ')[0]}
                    />
                    <MwGrid.Col children='Última Atualização' />
                  </MwGrid.Row>
                ),
              }}
              spacing={{ top: 's1', bottom: 's1' }}
              empty={{
                empty: terms.length === 0,
                content: (
                  <S.EmptyMessage>
                    {mode === 'termsOfUse'
                      ? 'Não há nenhum termo associado'
                      : 'Não há nenhuma política associada'}
                  </S.EmptyMessage>
                ),
              }}
            >
              {terms.map((e, index) => {
                return (
                  <MwGrid.Row
                    key={index}
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
                    <MwGrid.Col
                      width='2'
                      children={e.id.toString().padStart(7, '0')}
                    />

                    <MwGrid.Col width='3' children={e.title} />

                    <MwGrid.Col
                      children={dateOrDefault(
                        e.updated,
                        '',
                        'DD/MM/YYYY - HH:mm',
                      )}
                    />

                    <Menu
                      boundRef={ref}
                      options={
                        viewMode
                          ? [
                              {
                                label: (
                                  <MwEllipsisContainer
                                    children={`Visualizar ${
                                      labels[mode].split(' ')[0]
                                    }`}
                                  />
                                ),
                                data: {},
                                onClick: () => onClickViewTerm(e.id),
                              },
                            ]
                          : [
                              {
                                label: 'Editar',
                                data: {},
                                onClick: () => onClickManageTerm(e.id),
                              },
                              {
                                label: 'Excluir',
                                data: {},
                                onClick: () => onRemoveTerm(e.id),
                              },
                            ]
                      }
                    />
                  </MwGrid.Row>
                )
              })}
            </MwScrollContainer>
          </MwGrid>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Terms
