import React, { useContext, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'
import { Controller, FormProvider, Resolver, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, Form, Loader, Modal, Radio } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { useEndpointValidation } from '../../../../../../../utils/hooks'
import { SurveysContext } from '../../../../../context'

import CalendarComponent from './components/Frequency'
import ValidityComponent from './components/Validity'
import { DataInterface, FormData } from './interface'
import { formSchema, getDefaultValues } from './schema'
import { editConfig, getData } from './service'
import * as S from './styles'

interface Props {
  id: number
  reload: () => void
}

interface DateIntervalProps {
  inicial: string
  final: string
}

export const ConfigurationModal = ({ id, reload }: Props) => {
  const { setOpenCreateModal } = useContext(SurveysContext)
  const [loading, setLoading] = useState(true)
  const [loadingSave, setLoadingSave] = useState(false)
  const [storageData, setStorageData] = useState<FormData>({} as FormData)
  const [data, setData] = useState<DataInterface>()
  const [validityOptions, setValidityOptions] = useState([])
  const [dateInterval, setDateInterval] = useState<DateIntervalProps>({
    inicial: moment().format('DD/MM/YYYY'),
    final: '',
  })

  const resolver = yupResolver(formSchema) as never as Resolver<FormData>
  const methods = useForm<FormData>({
    resolver,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      frequency: '',
      name: '',
      type: false,
      validity: '',
    },
  })

  const getFrequency = () => {
    const frequency = methods.getValues('frequency')
    if (frequency === 'S') {
      return {
        type: 'S',
        cycle: 1,
        days: validityOptions,
      }
    }
    if (frequency === 'Q') {
      return {
        type: 'Q',
        cycle: 1,
        fortnights: validityOptions,
      }
    }
    if (frequency === 'U') {
      return {
        type: 'R',
        cycle: -1,
      }
    }
    if (frequency === 'R') {
      return {
        type: 'R',
        cycle: validityOptions[0],
      }
    }
    if (frequency === 'M') {
      return {
        type: 'M',
        cycle: 1,
      }
    }
    if (frequency === 'D') {
      return {
        type: 'R',
        cycle: 1,
      }
    }
  }

  const loadData = async () => {
    try {
      const response = await getData(id)
      setData(response)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  const onSubmit = async () => {
    setLoadingSave(true)
    const { name, type, validity } = methods.watch()

    const payload = {
      name,
      type: type ? 'R' : 'O',
      frequency: getFrequency(),
      validity: {
        start: moment(dateInterval.inicial).format('YYYY-MM-DD'),
        end:
          validity === 'fi' || dateInterval.final === null
            ? '0000-00-00'
            : moment(dateInterval.final).format('YYYY-MM-DD'),
      },
    }

    try {
      await editConfig(id, payload)
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingSave(false)
      reload()
      setOpenCreateModal(<React.Fragment />)
    }
  }

  const nameCheck = useEndpointValidation<FormData>({
    endpoint: '/v1/tr/surveys/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: methods,
    properties: { id },
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

  useEffect(() => {
    loadData()
  }, [])

  const formatDate = (dateInitial: string, dateFinal: string) => {
    return {
      initial: dateInitial.split('T')[0],
      final: dateFinal === null ? 'indeterminado' : dateFinal.split('T')[0],
    }
  }

  useEffect(() => {
    if (data) {
      const formated = formatDate(data.validity_start, data.validity_end)
      const startDate = moment(formated.initial).format('DD/MM/YYYY')
      const endDate =
        formated.final === 'indeterminado'
          ? 'indeterminado'
          : moment(formated.final).format('DD/MM/YYYY')
      const formatedDate = startDate + ' - ' + endDate

      const values = getDefaultValues(data)
      let convertValidity = ''

      if (data && data.frequency === 'R') {
        if (data.cycle > 1) {
          convertValidity = 'R'
        } else if (data.cycle === 1) {
          convertValidity = 'D'
        } else {
          convertValidity = 'U'
        }
      } else {
        convertValidity = values.frequency
      }

      methods.reset({
        name: values.name,
        frequency: convertValidity,
        type: values.type,
        validity: formatedDate,
      })
      setDateInterval({
        inicial: data ? data.validity_start : '',
        final: data ? data.validity_end : '',
      })
      setStorageData({
        name: values.name,
        frequency: values.frequency,
        type: values.type,
        validity: formatedDate,
      })
      setValidityOptions(
        data.frequency_days
          ? data.frequency_days
          : data.frequency_fortnights
          ? data.frequency_fortnights
          : [data.cycle],
      )
      setLoading(false)
    }
  }, [data])

  const validityIsChangeOptions =
    data && data.frequency_days
      ? data.frequency_days === validityOptions
      : data && data.frequency_fortnights
      ? data.frequency_fortnights === validityOptions
      : data &&
        data.cycle &&
        data.cycle &&
        methods.watch('frequency') !== 'S' &&
        methods.watch('frequency') !== 'Q' &&
        (methods.watch('frequency') !== 'R') === validityOptions[0]

  const validityIsOptionsCanEmpty =
    methods.watch('frequency') === 'Q' ||
    methods.watch('frequency') === 'S' ||
    methods.watch('frequency') === 'R'

  useEffect(() => {
    if (validityIsChangeOptions) {
      methods.formState.isDirty = true
    }
  }, [validityOptions])

  return (
    <Modal open>
      <S.HeaderContainer>
        <span>Dados da Configuração</span>
      </S.HeaderContainer>
      <S.Container>
        {loading ? (
          <Loader active />
        ) : (
          <FormProvider {...methods}>
            <Form id='save' onSubmit={methods.handleSubmit(onSubmit)}>
              <S.DescriptionText>
                Utilize os campos abaixo para realizar a configuração de dados
                da tarefa
              </S.DescriptionText>
              <S.InputContainer>
                <S.NameInput
                  error={methods.formState.errors.name || !nameCheck.isValid}
                >
                  <Controller
                    name='name'
                    control={methods.control}
                    render={({ field: props }) => {
                      return (
                        <MwInput
                          {...props}
                          placeholder='Nome'
                          label={<span>Nome:</span>}
                          loading={nameCheck.loading}
                        />
                      )
                    }}
                  />
                  {!nameCheck.isValid && (
                    <S.ErrorText>{nameCheck.message}</S.ErrorText>
                  )}
                </S.NameInput>

                <S.FrequencyInput>
                  <label>Frequência</label>
                  <CalendarComponent
                    type={methods.getValues('frequency')}
                    setValidityOptions={setValidityOptions}
                    ValidityOptions={validityOptions}
                  />
                </S.FrequencyInput>

                <S.FrequencyInput>
                  <label>Período de Vigência</label>
                  <ValidityComponent
                    value={storageData.validity}
                    dateInterval={dateInterval}
                    setDateInterval={setDateInterval}
                  />
                </S.FrequencyInput>

                <S.ToggleInput>
                  <label htmlFor='NameInput'>Obrigatoriedade:</label>
                  <S.ToggleInputContainer>
                    <span>Não</span>
                    <Controller
                      name='type'
                      control={methods.control}
                      render={({ field: props }) => (
                        <Radio
                          toggle
                          checked={props.value}
                          onChange={(_, value) =>
                            methods.setValue('type', value.checked, {
                              shouldDirty: true,
                              shouldValidate: true,
                            })
                          }
                        />
                      )}
                    />
                    <span>Sim</span>
                  </S.ToggleInputContainer>
                </S.ToggleInput>

                <S.MadeBy>
                  <strong>
                    Criado Por: <span>{data?.formatted_created_by}</span>
                  </strong>
                </S.MadeBy>
              </S.InputContainer>
            </Form>
          </FormProvider>
        )}
      </S.Container>
      <Modal.Actions>
        <Button
          basic
          className='tertiary'
          content='Cancelar'
          onClick={() => setOpenCreateModal(<React.Fragment />)}
        />
        <Button
          primary
          content='Salvar'
          type='submit'
          form='save'
          loading={loadingSave}
          disabled={
            (!methods.formState.isDirty &&
              Object.values(methods.formState.dirtyFields).length === 0) ||
            validityIsChangeOptions ||
            !nameCheck.isValid ||
            (validityIsOptionsCanEmpty && validityOptions.length === 0) ||
            loadingSave
          }
        />
      </Modal.Actions>
    </Modal>
  )
}
