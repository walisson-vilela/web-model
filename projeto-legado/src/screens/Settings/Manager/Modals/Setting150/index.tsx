import React, { useEffect, useState } from 'react'

import { isObject } from 'lodash'
import toast from 'react-hot-toast'
import { Select } from 'semantic-ui-react'

import { Grid } from '../../../../../components/FormFields'
import { Loader } from '../../../../../components/Loader'
import Header from '../../../../../components/ModalHeader'
import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { Button } from '../styles'
import * as Types from '../types'

import { getSettingData, onSubmit as submit } from './services'

const Settings150: Types.SettingComponent = ({ setModal }) => {
  const [enabled, setEnabled] = useState<0 | 1>(0)
  const [action, setAction] = useState<1 | 2 | 3>(null)

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    form: false,
    content: false,
  })

  const [optionsList, setOptionsList] = useState({
    enabled: [],
    action: [],
  })

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, content: true }))

      const data = await getSettingData()

      setOptionsList((prev) => {
        let aux = { ...prev }

        if (isObject(data.setting) && isObject(data.setting._labels)) {
          const { enabled, action } = data.setting._labels

          Object.keys(enabled).forEach((e, i) => {
            aux.enabled.push({ key: i, text: enabled[e], value: parseInt(e) })
          })

          Object.keys(action).forEach((e, i) => {
            aux.action.push({ key: i, text: action[e], value: parseInt(e) })
          })
        }

        if (isObject(data.settings_decoded)) {
          const { enabled, action } = data.settings_decoded

          setEnabled(enabled)
          setAction(action)
        }

        return aux
      })
    } catch (error) {
      console.error(error)
    }

    setLoading((prev) => ({ ...prev, content: false }))
  }

  const onSubmit = async () => {
    setLoading((prev) => ({ ...prev, form: true }))

    try {
      const params: any = { enabled: enabled ? 1 : 0, action }

      if (!action) delete params.action

      const { success } = await submit(params)

      if (success) {
        setModal(null)
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading((prev) => ({ ...prev, content: false }))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Modal
      modal={{
        size: 'small',
        title: 'Configurações Gerais',
        titleColor: 'blue',
        content: (
          <div style={{ height: 330 }}>
            {loading.content ? (
              <Loader />
            ) : (
              <>
                <Header
                  title='ID: 150 - Habilitar justificativa da imagem | Referência: Galeria de Imagem'
                  description='Utilize os campos para habilitar a justificativa quando Aprovação/Reprovação da imagem.'
                />

                <Grid.Row itemSpacing={28}>
                  <Grid.Label label='Habilitar Justificativa' required>
                    <Select
                      placeholder='Selecione'
                      selectOnBlur={false}
                      value={enabled}
                      onChange={(_, { value }) => {
                        setEnabled(value as 0 | 1)
                        setAction(null)
                      }}
                      options={optionsList.enabled}
                    />
                  </Grid.Label>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Label
                    label='Habilitar sempre que:'
                    required={enabled === 1}
                  >
                    <Select
                      placeholder='Selecione'
                      selectOnBlur={false}
                      value={action}
                      disabled={!enabled}
                      onChange={(_, { value }) => setAction(value as 1 | 2 | 3)}
                      options={optionsList.action}
                    />
                  </Grid.Label>
                </Grid.Row>
              </>
            )}
          </div>
        ),
        actions: [
          <Button
            basic
            content='Cancelar'
            className='tertiary'
            onClick={() => setModal(null)}
          />,
          <Button
            primary
            content='Salvar'
            color='blue'
            loading={loading.form}
            onClick={() => onSubmit()}
            disabled={loading.form || (enabled && !action)}
          />,
        ],
      }}
    />
  )
}

export default Settings150
