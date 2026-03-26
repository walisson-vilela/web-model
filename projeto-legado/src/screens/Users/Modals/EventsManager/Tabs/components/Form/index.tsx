import { useEffect, useMemo, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwLoader } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import {
  Resolver,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { ValidationError } from '../../../../../../../standardized/components/form/modals'
import { keys } from '../../../../../../../utils/Formatters'
import { isRequired as _isRequired } from '../../../../../../../utils/Validators'
import useEventManagerContext from '../../../context'

import Classification from './components/Classification'
import FileInput from './components/File'
import InputType from './components/InputType'
import Period from './components/Period'
import { DEFAULTS } from './constants'
import { FormContext } from './context'
import { EventDates, FormInterface } from './interfaces'
import getSchema from './schema'
import { save } from './services'
import * as S from './styles'

const Form = () => {
  const {
    user_id,
    reload,
    onLoadEvents,
    loading: [loading, setLoading],
    changes: [, setChanges],
  } = useEventManagerContext()

  const schema = getSchema()
  const resolver = yupResolver(schema) as never as Resolver<FormInterface>

  const [eventDates, setEventDates] = useState<EventDates>({})
  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>(null)

  const form = useForm<FormInterface>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: DEFAULTS,
  })

  const setValue: typeof form.setValue = (field, value, options) => {
    form.setValue(field, value as never, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
      ...(options || {}),
    })
  }

  const isInvalid = useMemo(
    () => (field: keyof FormInterface) => {
      return form.formState.isSubmitted && field in form.formState.errors
    },
    [form.formState],
  )

  const isRequired = (field: keyof FormInterface) => _isRequired(schema, field)

  useEffect(() => {
    const values = form.getValues()
    keys(DEFAULTS).forEach((field) => {
      if (field in values) return
      form.register(field)
    })
  }, [])

  const onSubmit: SubmitHandler<FormInterface> = async (values) => {
    setLoading(true)

    try {
      const response = await save(values, user_id)
      if (response.success === false) {
        setValidationErrors(response.errors)
        setLoading(false)
      } else {
        setChanges(true)
        form.reset()
        setEventDates({})
        reload()
        onLoadEvents()
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }

  const onSubmitFail: SubmitErrorHandler<FormInterface> = (errors) => {
    console.error(errors, form.getValues())
  }

  return (
    <S.Form onSubmit={form.handleSubmit(onSubmit, onSubmitFail)}>
      <div>
        <S.Title>Motivo de Inativação</S.Title>

        <FormContext.Provider
          value={{
            form: {
              ...form,
              setValue,

              isInvalid,
              isRequired,
            },
            user_id,
            eventDates: [eventDates, setEventDates],
          }}
        >
          <S.TypeSection>
            <InputType type='Temporário' />
            <InputType type='Definitivo' />
          </S.TypeSection>

          <div>
            <Classification />
          </div>

          <div>
            <Period />
          </div>

          <div>
            <FileInput />
          </div>

          {validationErrors && (
            <ValidationError
              errors={validationErrors}
              onClose={() => setValidationErrors(null)}
              fields={{
                starts_at: {
                  label: 'Início Programado',
                  handler: () => {
                    form.setValue('start', '')
                    form.setValue('end', '')
                  },
                },
                ends_at: {
                  label: 'Término Programado',
                  handler: () => {
                    form.setValue('end', '')
                  },
                },
                classification_id: {
                  label: 'Motivo',
                  handler: () => {
                    form.setValue('classification', null)
                  },
                },
                file: {
                  label: 'Anexo',
                  handler: () => {
                    form.setValue('file', null)
                  },
                },
              }}
            />
          )}
        </FormContext.Provider>
      </div>

      <MwButton
        style={{ borderRadius: '0' }}
        type='submit'
        content='Incluir Evento'
      />

      {loading && <MwLoader filled />}
    </S.Form>
  )
}

export default Form
