import { useCallback, useEffect } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { pis } from '../../../../../../../../utils/Formatters'
import useFormContext from '../../../../context'
import { labels } from '../../labels'

import { checkPeoplePis } from './service'

const Pis = () => {
  const {
    form,
    isInvalid,
    originals,
    useValidation,
    id,
    dirtyFields,
    modal: [, setModal],
    pisRequired,
  } = useFormContext()
  const { control, setValue, formState } = form
  const [validation, setValidation] = useValidation('pis')

  const resetPis = () => {
    setValue('pis', originals.pis)
  }

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name='pis'
        render={({ field: props }) => {
          const { label, placeholder } = labels[props.name]

          const dirty = dirtyFields.includes(props.name)
          const error = formState.errors.pis
          const invalid = error !== undefined

          const check = useCallback(async () => {
            if (!props.value || !dirty) {
              setValidation(true)
              return
            }

            if (invalid) {
              setValidation(true)

              if (props.value.length === 14) {
                setModal({
                  size: 'tiny',
                  title: 'Notificação',
                  content: (
                    <div>
                      O PIS <b children={props.value} /> é invalido, informe um
                      PIS correto.
                    </div>
                  ),
                  buttonType: 'MwButton',
                  actions: [
                    {
                      type: 'button',
                      color: 'warningRed',
                      content: 'Ok',
                      onClick: () => {
                        setModal(null)
                      },
                    },
                  ],
                })
              }

              return
            }

            if (validation !== false) {
              return
            }

            setValidation(null)

            try {
              const response = await checkPeoplePis(props.value, id)
              if (response.success === false) {
                setModal({
                  size: 'tiny',
                  title: 'Notificação',
                  content: (
                    <div>
                      O PIS <b children={props.value} /> está sendo utilizado, o
                      mesmo está vinculado ao usuario (
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
                        resetPis()
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
              required={pisRequired}
              mask={pis}
              onChange={(event) => {
                setValidation(
                  !event.target.value ||
                    event.target.value === originals[props.name],
                )
                props.onChange(event.target.value)
              }}
              loading={validation === null}
              invalid={isInvalid(props.name)}
              setValue={(value) => props.onChange(value)}
              value={props.value || ''}
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Pis
