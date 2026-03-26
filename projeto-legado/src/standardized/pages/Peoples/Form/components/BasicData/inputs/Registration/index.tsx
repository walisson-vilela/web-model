import { useCallback, useEffect } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { labels } from '../../labels'

import { checkPeopleRegistration } from './service'

const Registration = () => {
  const {
    form,
    useValidation,
    originals,
    id,
    registrationRequired,
    dirtyFields,
    modal: [, setModal],
  } = useFormContext()

  const [validation, setValidation] = useValidation('registration')

  const { control, isInvalid, setValue, formState } = form

  const resetRegistration = () => {
    setValue('registration', originals.registration)
  }

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name='registration'
        render={({ field: props }) => {
          const { label, placeholder } = labels[props.name]

          const dirty = dirtyFields.includes(props.name)
          const error = formState.errors.name
          const invalid = error !== undefined

          const check = useCallback(async () => {
            if (!props.value || !dirty || invalid) {
              setValidation(true)
              return
            }

            if (validation !== false) {
              return
            }

            setValidation(null)

            try {
              const response = await checkPeopleRegistration(props.value, id)
              if (response.success === false) {
                setModal({
                  size: 'tiny',
                  title: 'Notificação',
                  content: (
                    <div>
                      A Matrícula <b children={props.value} /> está sendo
                      utilizada, a mesma está vinculada ao usuario (
                      <b children={response.data.name} />
                      ).
                    </div>
                  ),
                  actions: [
                    {
                      color: 'red',
                      content: 'Ok',
                      onClick: () => {
                        setModal(null)
                        resetRegistration()
                      },
                    },
                  ],
                  buttonType: 'MwButton',
                })
              }
            } catch (e) {
              console.error(e)
            }

            setValidation(true)
          }, [props.value, invalid, dirty, id])

          useEffect(() => {
            const timeoutId = setTimeout(check, 1000)
            return () => clearTimeout(timeoutId)
          }, [check])

          return (
            <MwInput
              {...props}
              type='text'
              label={label}
              placeholder={placeholder}
              onChange={(event) => {
                console.log(event)
                setValidation(
                  !event.target.value ||
                    event.target.value === originals[props.name],
                )
                props.onChange(event)
              }}
              loading={validation === null}
              invalid={isInvalid(props.name)}
              setValue={(value) => props.onChange(value)}
              value={props.value || ''}
              required={registrationRequired}
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Registration
