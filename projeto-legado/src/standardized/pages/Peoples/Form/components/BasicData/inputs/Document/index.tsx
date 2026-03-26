import { useCallback, useEffect } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { cpf } from '../../../../../../../../utils/Formatters'
import useFormContext from '../../../../context'
import { labels } from '../../labels'

import { checkPeopleDocument } from './service'

const Document = () => {
  const {
    form,
    id,
    originals,
    dirtyFields,
    isInvalid,
    useValidation,
    modal: [, setModal],
  } = useFormContext()
  const { control, formState, setValue } = form

  const [validation, setValidation] = useValidation('document')

  const resetDocument = () => {
    setValue('document', originals.document)
  }

  return (
    <MwGrid.Col width='3'>
      <Controller
        control={control}
        name='document'
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]

          const dirty = dirtyFields.includes(props.name)
          const error = formState.errors.document
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
                      O CPF <b children={props.value} /> é invalido, informe um
                      CPF correto.
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
              const response = await checkPeopleDocument(props.value, id)
              if (response.success === false) {
                setModal({
                  size: 'tiny',
                  title: 'Notificação',
                  content: (
                    <div>
                      O CPF <b children={props.value} /> está sendo utilizado, o
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
                        resetDocument()
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
              mask={cpf}
              placeholder={placeholder}
              onChange={(event) => {
                setValidation(
                  !event.target.value ||
                    event.target.value === originals[props.name],
                )
                props.onChange(event)
              }}
              loading={validation === null}
              invalid={isInvalid(props.name)}
              value={props.value || ''}
              setValue={props.onChange}
              required={required}
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Document
