import { MwButton, MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'

import { useHookFormsAsState } from '../../../../../../../utils/hooks'
import useContext from '../../context'

import AssociateFormModal from './AssociateFormModal'
import * as S from './styles'

const GroupAssociated = () => {
  const {
    form: {
      watch,
      setValue,
      formState: { isSubmitted },
    },
    setModal,
    viewMode,
  } = useContext()

  const [groupAssociated, setGroupAssociated] = useHookFormsAsState(
    'group_associated',
    {
      watch,
      setValue,
    },
  )

  const onClickManageUsers = () => {
    setModal(
      <AssociateFormModal
        selected={groupAssociated}
        onClose={() => setModal(null)}
        onSave={setGroupAssociated}
      />,
    )
  }

  const onRemove = (id: number) => {
    setGroupAssociated((prev) => {
      const index = prev.findIndex((e) => e.subcontractor_id === id)
      if (index < 0) {
        console.error('Group not found in list')
        return prev
      }

      const newState = [...prev]
      newState.splice(index, 1)
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
          <S.Title children='Contas Associadas ao Agrupamento*' />
        </MwGrid.Col>
      </MwGrid.Row>

      {!viewMode && (
        <MwGrid.Row>
          <MwGrid.Col>
            <MwButton
              type='button'
              onClick={onClickManageUsers}
              content='Associar Contas'
            />
          </MwGrid.Col>
        </MwGrid.Row>
      )}

      <MwGrid.Row>
        <MwGrid.Col>
          <S.Grid
            style={{
              borderRadius: 4,
            }}
            $invalid={groupAssociated.length === 0 && isSubmitted}
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
                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children='ID'
                    />

                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children='Conta'
                    />

                    <MwGrid.Col
                      align={{ content: { horizontal: 'left' } }}
                      children='Tipo de Conta'
                    />

                    <MwGrid.Col
                      width='1'
                      align={{ content: { horizontal: 'center' } }}
                      children={viewMode ? '' : 'Ação'}
                    />
                  </MwGrid.Row>
                ),
              }}
              empty={{
                empty: groupAssociated.length === 0,
                content: (
                  <S.EmptyMessage>
                    Não há nenhuma conta associada
                  </S.EmptyMessage>
                ),
              }}
              spacing={{ top: 's1', bottom: 's1' }}
            >
              {groupAssociated.map((e, index) => {
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
                      children={e.subcontractor_id}
                    />

                    <MwGrid.Col
                      width='3'
                      align={{ content: { horizontal: 'left' } }}
                      children={e.name || '-'}
                    />

                    <MwGrid.Col
                      align={{ content: { horizontal: 'left' } }}
                      children={e.type_text}
                    />

                    <MwGrid.Col
                      width='1'
                      align={{ content: { horizontal: 'center' } }}
                    >
                      {!viewMode && (
                        <S.Link
                          children='Remover'
                          onClick={() => onRemove(e.subcontractor_id)}
                        />
                      )}
                    </MwGrid.Col>
                  </MwGrid.Row>
                )
              })}
            </MwScrollContainer>
          </S.Grid>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default GroupAssociated
