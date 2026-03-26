import { useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import { Grid } from '../../../../../components/FormFields'
import { Loader } from '../../../../../components/Loader'
import Header from '../../../../../components/ModalHeader'
import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { isObject } from '../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { strCmp } from '../../../../../utils/Validators'
import { SavePayload, save, view } from '../services'
import { Button, Error } from '../styles'
import * as Types from '../types'

import { BodyInterface } from './interfaces'

const MIN = 4
const MAX = 20

const Settings190: Types.SettingComponent = ({ setModal }) => {
  const [frequencyOld, setFrequencyOld] = useState<number>()

  const [form, setForm] = useState<BodyInterface>({
    changePassword: 0,
    frequency: 0,
    minimum: 6,
    maximum: 6,
    rules: [],
  })

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    form: false,
    content: false,
  })

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, content: true }))

      const data = await view(190)

      if (isObject(data.settings_decoded)) {
        const {
          frequency,
          minimum,
          maximum,
          rules: rulesOld,
        } = data.settings_decoded
        const rules: number[] = []

        if (rulesOld.ALREADY_USED) rules.push(0)
        if (rulesOld.UPPER_LETTER) rules.push(1)
        if (rulesOld.LOWER_LETTER) rules.push(2)
        if (rulesOld.NUMBER) rules.push(3)
        if (rulesOld.SPECIAL_CHAR) rules.push(4)
        if (rulesOld.NUMERIC_SEQUENCE) rules.push(5)

        setFrequencyOld(frequency)

        setForm({
          changePassword: +(frequency > 0),
          frequency,
          minimum,
          maximum,
          rules,
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
      const params: SavePayload = {
        setting_id: 190,
        settings: {
          frequency: form.frequency,
          frequency_old: frequencyOld,
          minimum: form.minimum,
          maximum: form.maximum,
          rules: {
            ALREADY_USED: form.rules.includes(0),
            UPPER_LETTER: form.rules.includes(1),
            LOWER_LETTER: form.rules.includes(2),
            NUMBER: form.rules.includes(3),
            SPECIAL_CHAR: form.rules.includes(4),
            NUMERIC_SEQUENCE: form.rules.includes(5),
          },
        },
      }

      const { success } = await save(params)

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
          <div style={{ height: 400 }}>
            {loading.content ? (
              <Loader />
            ) : (
              <>
                <Header
                  title='ID: 190 - Formatação e Política da Troca de Senha'
                  description='Utilize os campos abaixo para definir os Parâmetros de Senha.'
                />

                <Grid.Row itemSpacing={28} align='top'>
                  <Grid.Column size={5}>
                    <MwInput
                      type='select'
                      label='Troca de Senha'
                      value={form.changePassword.toString()}
                      loader={async () => [
                        {
                          label: 'Desabilitado (Default)',
                          value: '0',
                          data: {},
                        },
                        { label: 'Habilitado', value: '1', data: {} },
                      ]}
                      setValue={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          frequency: parseInt(value),
                          changePassword: parseInt(value) as 0 | 1,
                        }))
                      }
                    />
                  </Grid.Column>

                  <Grid.Column size={4}>
                    <MwInput
                      type='number'
                      label='Frequência (Dias)'
                      value={form.frequency}
                      disabled={!form.changePassword}
                      min={1}
                      max={365}
                      setValue={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          frequency: parseInt(value),
                        }))
                      }
                      invalid={
                        form.changePassword === 1 &&
                        (typeof form.frequency !== 'number'
                          ? false
                          : form.frequency < 1 || form.frequency > 365)
                      }
                    />

                    <Error>Limite Máximo: 365 dias.</Error>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row itemSpacing={7}>
                  <Header title='Formatação' description='' />
                </Grid.Row>

                <Grid.Row itemSpacing={0}>
                  <span style={{ paddingTop: 21 }}>Tamanho de Senha</span>
                </Grid.Row>

                <Grid.Row itemSpacing={[0, 21]} align='center'>
                  <Grid.Column size={2}>
                    <MwInput
                      type='number'
                      label='Mínimo'
                      value={form.minimum}
                      min={MIN}
                      max={MAX}
                      setValue={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          minimum: parseInt(value),
                        }))
                      }
                      invalid={
                        typeof form.minimum !== 'number'
                          ? false
                          : form.minimum < MIN ||
                            form.minimum > numberOrDefault(form.maximum, MAX)
                      }
                    />
                  </Grid.Column>

                  <Grid.Column size={2}>
                    <MwInput
                      type='number'
                      label='Máximo'
                      value={form.maximum}
                      min={MIN}
                      max={MAX}
                      setValue={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          maximum: parseInt(value),
                        }))
                      }
                      invalid={
                        typeof form.maximum !== 'number'
                          ? false
                          : form.maximum < numberOrDefault(form.minimum, MIN) ||
                            form.maximum > MAX
                      }
                    />
                  </Grid.Column>

                  <Grid.Column>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: 7,
                      }}
                    >
                      &nbsp;
                    </label>
                    <Error>
                      Limite de {MIN} a {MAX} caracteres.
                    </Error>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row itemSpacing={28}>
                  <Grid.Column size={6}>
                    <MwInput
                      type='select-multiple'
                      label='Incluir as regras que serão obrigatórias para a formação da senha'
                      placeholder='Selecione'
                      value={form.rules.map((v) => v.toString())}
                      search
                      selectAll
                      loader={async (search) => {
                        const options = [
                          {
                            label: 'Incluir Letras Maiúsculas',
                            value: '0',
                            data: {},
                          },
                          {
                            label: 'Incluir Letras Minúsculas',
                            value: '1',
                            data: {},
                          },
                          { label: 'Incluir Números', value: '2', data: {} },

                          {
                            label: 'Não conter números sequenciais',
                            value: '3',
                            data: {},
                          },
                          {
                            label:
                              'Incluir Caracteres Especiais (!@#$%&*()-+.,?{[]}^><:)',
                            value: '4',
                            data: {},
                          },
                          {
                            label: 'Não repetir as 3 últimas senhas',
                            value: '5',
                            data: {},
                          },
                        ]

                        const results = options.filter((e) =>
                          strCmp(e.label, search, { contain: true }),
                        )

                        return {
                          options: results,
                          lastPage: true,
                        }
                      }}
                      setValue={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          rules: value.map((v) => parseInt(v)),
                        }))
                      }
                    />
                  </Grid.Column>
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
              !form.minimum ||
              !form.maximum ||
              (form.changePassword.toString() === '1' && !form.frequency) ||
              loading.form ||
              (form.changePassword.toString() === '1' &&
                form.frequency &&
                form.frequency < 0) ||
              (form.frequency && form.frequency > 365) ||
              form.minimum < 4 ||
              form.minimum > form.maximum ||
              form.maximum < form.minimum ||
              form.maximum > 20
            }
            onClick={() => onSubmit()}
          />,
        ],
      }}
    />
  )
}

export default Settings190
