import React, { useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'

import { Grid } from '../../../../components/FormFields'
import Modal from '../../../../components/MwModal'
import { SettingProps } from '../Setting/interfaces'

import * as S from './styles'

const Meta = ({ setModal, setForm, selected }: SettingProps) => {
  const onSubmit = async () => {
    setForm((prev) => ({
      ...prev,
      settings: {
        action: formName,
      },
    }))

    setModal(null)
  }

  //salvar estado do input
  const [formName, setFormName] = useState('')

  //funçao para salvar o estado do input
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value)
  }

  return (
    <Modal
      modal={{
        size: 'large',
        title: 'Parâmetros de configuração',
        titleColor: 'blue',
        content: (
          <>
            <S.Title>Estabeleça as configurações abaixo:</S.Title>
            <S.ImportContainer itemSpacing={0}>
              <Grid.Column>
                <S.Divcontainer>
                  <S.Input>
                    <p>Defina uma ação para de importação para o arquivo</p>
                    <S.DivComponents>
                      <MwInput
                        type='radio'
                        name='importação para o arquivo'
                        label='Apagar todas as configurações e considerar a da planilha'
                        value='REPLACE'
                        onChange={handleChangeInput}
                        defaultChecked={
                          selected.action &&
                          selected.action.toString() === 'REPLACE'
                        }
                      />
                      <MwInput
                        type='radio'
                        name='importação para o arquivo'
                        label='Sobrescrever configurações conforme a planilha'
                        value='OVERWRITE'
                        onChange={handleChangeInput}
                        defaultChecked={
                          selected.action &&
                          selected.action.toString() === 'OVERWRITE'
                        }
                      />
                      <MwInput
                        type='radio'
                        name='importação para o arquivo'
                        label='Complementar/Atualizar configurações'
                        value='UPSERT'
                        onChange={handleChangeInput}
                        defaultChecked={
                          selected.action &&
                          selected.action.toString() === 'UPSERT'
                        }
                      />
                    </S.DivComponents>
                  </S.Input>
                </S.Divcontainer>
              </Grid.Column>
            </S.ImportContainer>
          </>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={() => setModal(null)}
          />,
          <MwButton
            size='large'
            content='Aplicar'
            disabled={!formName}
            onClick={() => onSubmit()}
          />,
        ],
      }}
    />
  )
}

export default Meta
