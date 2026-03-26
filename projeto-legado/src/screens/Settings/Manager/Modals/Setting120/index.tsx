import { useCallback, useEffect, useState } from 'react'

import { SelectOption } from '@mw-kit/mw-ui/types'
import { isArray } from 'lodash'
import toast from 'react-hot-toast'
import { Message } from 'semantic-ui-react'

import { Grid } from '../../../../../components/FormFields'
import { Loader } from '../../../../../components/Loader'
import Header from '../../../../../components/ModalHeader'
import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { save, view } from '../services'
import { Button } from '../styles'
import * as Types from '../types'

import * as Inputs from './inputs'
import { BodyInterface, Frequency } from './interfaces'

const Settings120: Types.SettingComponent = ({ setModal }) => {
  const [primaryRule, setPrimaryRule] = useState<BodyInterface>({
    frequency: '',
    days: [],
  })

  const [secondaryRule, setSecondaryRule] = useState<BodyInterface>({
    frequency: '',
    days: [],
  })

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    form: false,
    content: false,
  })

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, content: true }))

      const data = await view(120)

      if (isArray(data.settings_decoded) && data.settings_decoded.length > 0) {
        setPrimaryRule({
          frequency: data.settings_decoded[0].frequency,
          days: data.settings_decoded[0].days,
        })
      }

      if (isArray(data.settings_decoded) && data.settings_decoded.length > 1) {
        setSecondaryRule({
          frequency: data.settings_decoded[1].frequency,
          days: data.settings_decoded[1].days,
        })
      }
    } catch (error) {
      console.error(error)
    }

    setLoading((prev) => ({ ...prev, content: false }))
  }

  const onSubmit = async () => {
    setLoading((prev) => ({ ...prev, form: true }))

    try {
      const params = {
        setting_id: 120,
        settings: [
          ...(primaryRule.frequency ? [{ ...primaryRule }] : []),
          ...(secondaryRule.frequency ? [{ ...secondaryRule }] : []),
        ],
      }

      const { success } = await save(params)

      if (success) {
        setModal(null)
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading((prev) => ({ ...prev, form: false }))
  }

  useEffect(() => {
    getData()
  }, [])

  const secondaryLoader = useCallback(async () => {
    const map: { [k in Frequency]: SelectOption[] } = {
      '': [],
      D: [],
      W: [{ label: 'Mensal', value: 'M', data: {} }],
      M: [{ label: 'Semanal', value: 'W', data: {} }],
    }

    return [
      { label: 'Não Se Aplica', value: '', data: {} },
      ...map[primaryRule.frequency],
    ]
  }, [primaryRule.frequency])

  return (
    <Modal
      modal={{
        size: 'small',
        title: 'Configurações Gerais',
        titleColor: 'blue',
        content: (
          <div style={{ height: 342 }}>
            {loading.content ? (
              <Loader />
            ) : (
              <>
                <Header
                  title='ID: 120 - Regra de Atualização de Conexões'
                  description='Utilize os campos para definir as regras referentes ao ciclo de conexão do dispositivo móvel.'
                />

                <Grid.Row itemSpacing={28} align='center'>
                  <Grid.Column size={5}>
                    <Inputs.Frequency
                      label='Regra Primária'
                      loader={async () => [
                        { label: 'Não Se Aplica', value: '', data: {} },
                        { label: 'Diário', value: 'D', data: {} },
                        { label: 'Semanal', value: 'W', data: {} },
                        { label: 'Mensal', value: 'M', data: {} },
                      ]}
                      value={[
                        primaryRule,
                        (value) => {
                          setSecondaryRule({
                            frequency: '',
                            days: [],
                          })
                          setPrimaryRule(value)
                        },
                      ]}
                    />
                  </Grid.Column>

                  <Grid.Column size={5}>
                    <Inputs.Days value={[primaryRule, setPrimaryRule]} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row itemSpacing={28} align='center'>
                  <Grid.Column size={5}>
                    <Inputs.Frequency
                      label='Regra Secundária'
                      loader={secondaryLoader}
                      value={[secondaryRule, setSecondaryRule]}
                      disabled={['', 'D'].includes(primaryRule.frequency)}
                    />
                  </Grid.Column>

                  <Grid.Column size={5}>
                    <Inputs.Days value={[secondaryRule, setSecondaryRule]} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row itemSpacing={28}>
                  <Message
                    warning
                    header='Notificação'
                    content='Independente das regras configuradas acima, caso o dispositivo não possua conexão, o limite máximo de utilização off-line será de 7 dias.'
                  />
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
            disabled={
              (primaryRule.frequency !== 'D' &&
                primaryRule.frequency !== '' &&
                primaryRule.days.length === 0) ||
              (secondaryRule.frequency === 'M' &&
                secondaryRule.days.length === 0)
            }
            onClick={() => onSubmit()}
          />,
        ],
      }}
    />
  )
}

export default Settings120
