import { useCallback, useEffect, useState } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import Popup from '../../../../../../../components/Popup'
import useModalsContext from '../../context'

import { checkName } from './service'

const FunctionNameInput = () => {
  const { form, dirtyFields, originals, useValidation, item } =
    useModalsContext()

  const { formState, control, isInvalid, watch } = form

  const [validation, setValidation] = useValidation('name')

  const [loading, setLoading] = useState(false)

  const name = 'name'

  const id = watch('id')

  return (
    <MwGrid.Col width='4'>
      <Popup
        on='click'
        trigger={
          <div>
            <Controller
              name={name}
              control={control}
              render={({ field: props }) => {
                const dirty = dirtyFields.includes(name)
                const error = formState.errors[name]
                const invalid = error !== undefined

                const check = useCallback(async () => {
                  if (
                    !props.value ||
                    !dirty ||
                    invalid ||
                    validation !== null
                  ) {
                    setLoading(false)
                    return
                  }

                  setLoading(true)

                  try {
                    const responseSuccess = await checkName(props.value, id)

                    setValidation(responseSuccess)

                    setLoading(false)
                  } catch (e) {
                    console.error(e)
                  }
                }, [props.value, invalid, dirty, id, validation])

                useEffect(() => {
                  const timeoutId = setTimeout(check, 1000)
                  return () => clearTimeout(timeoutId)
                }, [check])

                return (
                  <MwInput
                    {...props}
                    type='text'
                    label='Atribua o nome para a Função'
                    placeholder='Nome da Função'
                    value={props.value}
                    onChange={(event) => {
                      const newValue = event.target.value

                      if (newValue.length === 0) {
                        setValidation(true)
                      } else {
                        setValidation(
                          newValue === originals[name] ? true : null,
                        )
                      }

                      form.setValue(name, newValue)
                    }}
                    loading={loading}
                    invalid={isInvalid(name) || validation === false}
                    required
                    disabled={item && item.default}
                  />
                )
              }}
            />
          </div>
        }
        content='Funções Default não poder ter o nome editado.'
        position='right center'
        className='popup-field'
        disabled={!item || !item.default}
        inverted
        wide
      />
    </MwGrid.Col>
  )
}

export default FunctionNameInput
