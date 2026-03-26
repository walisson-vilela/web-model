import { useCallback } from 'react'

import { MwButton, MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'

import useContext from '../../context'
import * as S from '../../styled'
import { Form } from '../../types'

import AssociateFormModal from './AssociateFormModal'

const FormDefinition = () => {
  const {
    form: { watch, setValue, setValueOptions },
    setModal,
    viewMode,
  } = useContext()

  const [forms, setForms] = [
    watch('forms'),
    (v: Form['forms']) => {
      setValue('forms', v, setValueOptions)
    },
  ]

  const onClickAssociateForm = () => {
    setModal(<AssociateFormModal />)
  }

  const onRemove = useCallback(
    (id: number) => {
      setForms(forms.filter((e) => e.id !== id))
    },
    [forms],
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
          <S.Title children='Definição dos formulários a serem exibidos para o tipo de acesso Básico' />
        </MwGrid.Col>
      </MwGrid.Row>

      {!viewMode && (
        <MwGrid.Row>
          <MwGrid.Col>
            <MwButton
              type='button'
              onClick={onClickAssociateForm}
              content='Associar Formulários'
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

                    <MwGrid.Col children='Formulários' />

                    <MwGrid.Col
                      width='1'
                      align={{ content: { horizontal: 'center' } }}
                      children={!viewMode && 'Ação'}
                    />
                  </MwGrid.Row>
                ),
              }}
              spacing={{ top: 's1', bottom: 's1' }}
              empty={{
                empty: forms.length === 0,
                content: (
                  <S.EmptyMessage>
                    Não há nenhum formulário associado
                  </S.EmptyMessage>
                ),
              }}
            >
              {forms.map((e, index) => {
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
                    <MwGrid.Col width='2' children={e.id} />

                    <MwGrid.Col children={e.name} />

                    <MwGrid.Col
                      width='1'
                      align={{ content: { horizontal: 'center' } }}
                    >
                      {!viewMode && (
                        <S.Link
                          children='Remover'
                          onClick={() => onRemove(e.id)}
                        />
                      )}
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

export default FormDefinition
