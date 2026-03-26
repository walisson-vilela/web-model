import React, { useEffect, useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import { isBoolean } from 'lodash'

import { Grid } from '../../../../components/FormFields'
import Modal from '../../../../components/MwModal'
import { SettingProps } from '../Setting/interfaces'

import { getForms } from './services'
import * as S from './styles'

const FormModal = ({ setModal, setForm, selected }: SettingProps) => {
  const onSubmit = async () => {
    setForm((prev) => ({
      ...prev,
      settings: {
        form_id: parseInt(formType.toString()),
        attach_all_stores: formName === 'Sim',
      },
    }))

    setModal(null)
  }

  //salvar estado do select
  const [formType, setFormType] = useState('')
  //salvar estado do input
  const [formName, setFormName] = useState(
    (isBoolean(selected.attach_all_stores) &&
      selected.attach_all_stores.toString()) ||
      '',
  )
  //salvar estado do input
  const [formOptions, setFormOptions] = useState([])

  const loadForms = async () => {
    const responseData = await getForms()

    if (responseData.success) {
      const options = responseData.data.map((e) => {
        return { label: e.name, value: e.id, data: {} }
      })
      setFormOptions(options)
      if (selected.form_id) {
        //@ts-ignore
        setFormType(parseInt(selected.form_id))
      }
    } else {
      setFormOptions([])
    }
  }

  useEffect(() => {
    loadForms()
  }, [])

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
              <Grid.Column size={7}>
                <S.Divcontainer>
                  <Grid.Row>
                    <S.Span>Selecione o formulário a ser importado</S.Span>
                  </Grid.Row>
                  <MwInput
                    type='select'
                    placeholder='Selecione'
                    value={formType}
                    setValue={(value) => setFormType(value)}
                    loader={async () => {
                      return { options: formOptions, lastPage: true }
                    }}
                  />
                  <S.Input>
                    <p>Atribuir formulários a todos PDVS?</p>
                    <S.DivComponents>
                      <MwInput
                        type='radio'
                        name='importação para o arquivo'
                        label='Sim'
                        value='Sim'
                        onChange={handleChangeInput}
                        defaultChecked={formName === 'true'}
                      />
                      <MwInput
                        type='radio'
                        name='importação para o arquivo'
                        label='Não'
                        value='Sobrescrever'
                        onChange={handleChangeInput}
                        defaultChecked={formName === 'false'}
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
            disabled={!formType || !formName}
            onClick={() => onSubmit()}
          />,
        ],
      }}
    />
  )
}

export default FormModal
