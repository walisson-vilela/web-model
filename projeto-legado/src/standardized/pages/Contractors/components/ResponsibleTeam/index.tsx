import React, { useState } from 'react'

import {
  MwButton,
  MwGrid,
  MwInput,
  MwScrollContainer,
  Popup,
} from '@mw-kit/mw-ui'

import * as S from '../../styles'

import AssociateFormModal from './AssociateFormModal'
import MenuOptions from './components/MenuOptions'
import { AssociatedUser, Props } from './types'

const ResponsibleTeam = (props: Props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  const {
    value: [userAssociated, setUserAssociated],
    setModal,
    viewMode,
    typeForm,
  } = props

  const onClickManageUsers = () => {
    setModal(
      <AssociateFormModal
        onClose={() => {
          setModal(null)
        }}
        onSave={setUserAssociated}
        selected={userAssociated}
      />,
    )
  }

  const onChangeUser = (
    id: number,
    value: Partial<Omit<AssociatedUser, 'id'>>,
  ) => {
    setUserAssociated((prev) => {
      const index = prev.findIndex((e) => e.person_id === id)
      if (index < 0) {
        console.error('User not found in list')
        return prev
      }

      const newState = [...prev]
      newState[index] = { ...newState[index], ...value }
      return newState
    })
  }

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
          <S.Title
            children={
              typeForm === 'conta'
                ? 'Equipe Responsável pela Conta'
                : 'Equipe Responsável pelo Agrupamento'
            }
          />
        </MwGrid.Col>
      </MwGrid.Row>

      {!viewMode && (
        <MwGrid.Row>
          <MwGrid.Col>
            <MwButton
              type='button'
              onClick={onClickManageUsers}
              content='Associar Usuário'
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
              height='82px'
              ref={setRef}
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
                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children='ID'
                    />

                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children='Usuário'
                    />

                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children='Função'
                    />

                    <MwGrid.Col
                      width='2'
                      align={{ content: { horizontal: 'center' } }}
                      children='Administrador'
                    />

                    <MwGrid.Col width='1' spacing={{ right: '0' }} />
                  </MwGrid.Row>
                ),
              }}
              empty={{
                empty: userAssociated.length === 0,
                content: (
                  <S.EmptyMessage>
                    Não há nenhuma equipe associada
                  </S.EmptyMessage>
                ),
              }}
              spacing={{ top: 's1', bottom: 's1' }}
            >
              {userAssociated.map((e, index) => {
                const [roleName, isMaster] = e.role
                  ? [e.role.name || '-', e.role.master]
                  : ['-', false]

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
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children={e.person_id}
                    />

                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children={e.name || '-'}
                    />

                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children={roleName}
                    />

                    <MwGrid.Col
                      width='2'
                      align={{ content: { horizontal: 'center' } }}
                    >
                      <Popup
                        on='click'
                        disabled={!isMaster}
                        content='Não é possível desmarcar usuários Master.'
                        position='left center'
                        inverted
                        className='popup-field'
                        trigger={
                          <div>
                            <MwInput
                              {...{
                                name: 'responsible-team[]',
                                type: 'checkbox',
                                checked: e.administrator,
                                ...(isMaster
                                  ? {
                                      disabled: true,
                                    }
                                  : {
                                      onChange: (
                                        event: React.ChangeEvent<HTMLInputElement>,
                                      ) => {
                                        onChangeUser(e.person_id, {
                                          administrator: event.target.checked,
                                        })
                                      },
                                    }),
                              }}
                            />
                          </div>
                        }
                      />
                    </MwGrid.Col>

                    <MwGrid.Col
                      width='1'
                      align={{ content: { horizontal: 'right' } }}
                      spacing={{ right: '0' }}
                    >
                      <MenuOptions
                        e={e}
                        boundRef={ref}
                        setModal={setModal}
                        setUserAssociated={setUserAssociated}
                        typeForm={typeForm}
                        viewMode={viewMode}
                        name={props.name}
                      />
                    </MwGrid.Col>
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

export default ResponsibleTeam
