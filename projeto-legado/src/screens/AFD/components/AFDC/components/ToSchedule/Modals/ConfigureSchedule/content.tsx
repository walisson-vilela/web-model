import React, { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller, UseFormReturn } from 'react-hook-form'

import { Grid } from '../../../../../../../../components/FormFields'
import { InputChips } from '../../../../../../../../components/InputChips'
import { isValidEmail } from '../../../../../../../../utils/Validators'

import { deliveryScheduleOptions, frequencyOptions } from './constants'
import { Form } from './interface'

interface ConfigureContentInterface {
  form: UseFormReturn<Form>
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
  setHaveEmailErrors: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfigureContent = (props: ConfigureContentInterface) => {
  const { form, setEmails, setHaveEmailErrors } = props
  const { control, setValue, getValues, watch } = form

  const loadDeliverySchedule = useCallback(async () => {
    return deliveryScheduleOptions.map((o) => ({
      label: o.text,
      data: {},
      value: o.value,
    }))
  }, [])

  const loadFrequencyOptions = useCallback(async () => {
    return frequencyOptions.map((o) => ({
      label: o.text,
      data: {},
      value: o.value,
    }))
  }, [])

  return (
    <>
      <Grid.Row itemSpacing={21}>
        <Grid.Column>
          <MwInput
            label='Programação do Envio'
            type='select'
            placeholder='Selecione'
            value={watch('deliverySchedule')}
            loader={loadDeliverySchedule}
            setValue={(v) => {
              setValue('deliverySchedule', v, {
                shouldValidate: true,
                shouldDirty: true,
              })
              if (v === 'D')
                setValue('frequency', '', {
                  shouldValidate: true,
                  shouldDirty: true,
                })
            }}
            required
          />
        </Grid.Column>

        <Grid.Column>
          <MwInput
            type='select'
            label='Frequência de Atualização'
            placeholder='Selecione'
            loader={loadFrequencyOptions}
            value={watch('frequency')}
            disabled={
              getValues('deliverySchedule') === 'D' ||
              !getValues('deliverySchedule')
            }
            setValue={(v) =>
              setValue('frequency', v, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            required
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row itemSpacing={14}>
        <Grid.Column>
          <Controller
            control={control}
            name='emails'
            render={({ field: props }) => {
              return (
                <InputChips
                  value={{
                    value: props.value,
                    setValue: setEmails,
                  }}
                  placeholder='Adicione'
                  chipError={(value) => {
                    const isValid = !isValidEmail(value)
                    isValid
                      ? setHaveEmailErrors(true)
                      : setHaveEmailErrors(false)
                    return isValid
                  }}
                />
              )
            }}
          />
        </Grid.Column>
      </Grid.Row>
    </>
  )
}

export default ConfigureContent
