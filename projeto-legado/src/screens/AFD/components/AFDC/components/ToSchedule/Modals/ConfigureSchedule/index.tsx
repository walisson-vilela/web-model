import { useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { isNull, isUndefined } from 'lodash'
import { useForm } from 'react-hook-form'
import { Popup } from 'semantic-ui-react'

import Modal from '../../../../../../../../components/MwModal'
import {
  ConfigureScheduleProps,
  SingleScheduleProps,
} from '../../../../../../interfaces'
import useAFDContext from '../../../../../../provider'

import { deliveryScheduleOptions, frequencyOptions } from './constants'
import ConfigureContent from './content'
import { Form } from './interface'
import { getDefaultData, resolver } from './schemas'
import * as S from './styles'

const defaultForm: SingleScheduleProps = {
  deliverySchedule: { value: '', label: '' },
  frequency: { value: '', label: '' },
  emails: [],
}

const ConfigureSchedule = (props: ConfigureScheduleProps) => {
  const { schedulesState, modalState } = useAFDContext()
  const { setSchedules, setDirtySchedules, schedules, storageSchedules } =
    schedulesState
  const { setModal } = modalState

  const values = props?.editData?.schedule || defaultForm

  const [emails, setEmails] = useState<string[]>(values.emails || [])

  const [haveEmailErrors, setHaveEmailErrors] = useState<boolean>(false)

  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(values),
  })

  const registerFields = () => {
    const keys: (keyof Form)[] = ['deliverySchedule', 'emails', 'frequency']

    keys.forEach((key) => {
      if (form.getValues(key) === undefined) form.register(key)
    })
  }

  const onSubmit = async () => {
    setSchedules((prev) => {
      let aux = [...prev]

      const auxDelivery = deliveryScheduleOptions.find(
        (e) => e.value === form.getValues('deliverySchedule'),
      )
      const auxFrequency = frequencyOptions.find(
        (e) => e.value === form.getValues('frequency'),
      )

      const auxObject = {
        deliverySchedule: {
          label: auxDelivery ? auxDelivery.text : '-',
          value: auxDelivery ? auxDelivery.value : '',
        },
        frequency: {
          label: auxFrequency ? auxFrequency.text : '-',
          value: auxFrequency ? auxFrequency.value : '',
        },
        emails: emails,
      }

      if (isNull(props?.editData?.index) || isUndefined(props?.editData?.index))
        aux.push(auxObject)
      else aux[props.editData.index] = auxObject

      return aux
    })

    setDirtySchedules(true)
    setModal(null)
  }

  useEffect(() => {
    form.setValue('emails', emails, { shouldValidate: true, shouldDirty: true })

    JSON.stringify(emails) === JSON.stringify(values.emails)
      ? setHaveEmailErrors(true)
      : setHaveEmailErrors(false)
  }, [emails])

  useEffect(() => {
    registerFields()
  }, [])

  return (
    <Modal
      modal={{
        title: 'Configurar Agendamento',
        titleColor: 'blue',
        size: 'tiny',
        modalStyles: { width: '642px' },
        content: (
          <form
            id='add'
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete='off'
          >
            <ConfigureContent
              form={form}
              setEmails={setEmails}
              setHaveEmailErrors={setHaveEmailErrors}
            />
          </form>
        ),
        buttonType: 'MwButton',
        actions: [
          <S.Footer>
            <MwButton
              appearance='borderless'
              type='button'
              content='Cancelar'
              onClick={() => setModal(null)}
            />

            <Popup
              inverted
              on='click'
              position='top right'
              className='popup-field'
              disabled={!haveEmailErrors}
              content='Preencha os campos obrigatórios e valide se os e-mails estão corretos.'
              trigger={
                <div>
                  <MwButton
                    form='add'
                    type='submit'
                    color='blue'
                    appearance='solid'
                    content='Adicionar'
                    disabled={
                      !form.formState.isDirty ||
                      !form.formState.errors ||
                      (!form.getValues('frequency') &&
                        form.getValues('deliverySchedule') !== 'D') ||
                      haveEmailErrors
                    }
                  />
                </div>
              }
            />
          </S.Footer>,
        ],
      }}
    />
  )
}

export default ConfigureSchedule
