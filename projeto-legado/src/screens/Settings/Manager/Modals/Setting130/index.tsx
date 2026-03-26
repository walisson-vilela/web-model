import React, { useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Icon, Loader, Popup } from 'semantic-ui-react'

import Header from '../../../../../components/ModalHeader'
import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import { save, view } from '../services'
import * as Types from '../types'

import * as S from './styles'

const SETTING_ID = 130

const isValid = (value: number): value is 1 | 2 | 3 => {
  return [1, 2, 3].includes(value)
}

const Settings130: Types.SettingComponent = ({ setModal }) => {
  const [value, setValue] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await view(SETTING_ID)
      if (!isObject(data.settings_decoded)) {
        return
      }
      const v = numberOrDefault(data.settings_decoded.frequency)
      if (!isValid(v)) {
        return
      }
      setValue(v)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  const saveApi = async () => {
    setLoading(true)
    const payload = {
      setting_id: SETTING_ID,
      settings: {
        frequency: value,
      },
    }
    try {
      await save(payload)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      setModal(null)
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Modal
      modal={{
        size: 'small',
        title: 'Configurações Gerais',
        titleColor: 'blue',
        content: (
          <>
            {loading && (
              <S.LoaderContainer>
                <Loader active />
              </S.LoaderContainer>
            )}

            <Header
              title='ID: 130 - Frequência da Coleta do GPS'
              description='Utilize o campo para definir a intensidade da coleta de GPS.'
            />

            <S.Row>
              <S.DivSpan>
                <span>Ajuste a Frequência do GPS</span>
                <Popup
                  on={'click'}
                  trigger={<Icon name='info' size='tiny' circular />}
                  content={
                    <S.PopUpText>
                      Considerando uma jornada de 8h a frequência de coleta
                      aproximada são: <br />
                      <ul>
                        <li>Baixo: até 16 registros</li>
                        <li>Médio: até 24 registros</li>
                        <li>Alto: até 32 registros</li>
                      </ul>
                    </S.PopUpText>
                  }
                  position='right center'
                  inverted
                  style={{ backgroundColor: '#192338' }}
                />
              </S.DivSpan>

              <S.divRelative>
                <MwInput
                  type='range'
                  setValue={
                    setValue as React.Dispatch<React.SetStateAction<number>>
                  }
                  value={value}
                  width='161.5px'
                  height='22px'
                  markers={{
                    markers: [
                      { label: 'Baixo', value: 1 },
                      { label: 'Médio', value: 2 },
                      { label: 'Alto', value: 3 },
                    ],
                  }}
                />
              </S.divRelative>
            </S.Row>
            <S.Textbox>
              <S.Title>Notificação</S.Title>
              <S.Text>
                A Coleta das coordenadas depende do sinal GPS e das Condições do
                Dispositivo. A frequência de coleta de GPS ocorrerá somente
                dentro da jornada de trabalho do colaborador.
              </S.Text>
            </S.Textbox>
          </>
        ),
        actions: [
          {
            content: 'Cancelar',
            secondary: true,
            onClick: () => setModal(null),
          },
          {
            content: 'Salvar',
            color: 'blue',
            primary: true,
            onClick: saveApi,
            disabled: loading,
          },
        ],
      }}
    />
  )
}

export default Settings130
