import React, { useCallback, useEffect } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'
import { useParams } from 'react-router'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/validators'
import useFormContext from '../../../../context'
import labels from '../../../../labels'
import PopupDisabled from '../../../../popups/PopupDisabled'
import { checkCode } from '../../../../services'

import * as Modals from './modals'

const Code = () => {
  const routeParams = useParams()
  const id = isObject(routeParams) ? numberOrDefault(routeParams.id) : null

  const {
    form,
    isInvalid,
    originals,
    dirtyFields,
    modal: [, setModal],
    useValidation,
    mode,
  } = useFormContext()
  const { setValue, formState } = form

  const [validation, setValidation] = useValidation('code')

  const dirty = dirtyFields.includes('code')
  const error = formState.errors.code
  const invalid = error !== undefined

  const createUsedModal = (code: string, nickname: string) => {
    setModal(
      <Modals.UsedModal
        code={code}
        nickname={nickname}
        onConfirm={() => {
          setValue('code', originals.code)
          setModal(null)
        }}
      />,
    )
  }

  return (
    <React.Fragment>
      <MwGrid.Col width='2'>
        <Controller
          name='code'
          control={form.control}
          render={({ field: props }) => {
            const { name } = props

            const check = useCallback(async () => {
              if (!props.value || !dirty || invalid || validation !== false) {
                return
              }

              setValidation(null)

              try {
                const response = await checkCode(props.value, id)

                if (response.success === false) {
                  createUsedModal(props.value, response.nickname)
                }
              } catch (e) {
                console.error(e)
                setValue(name, originals[name])
              }

              setValidation(true)
            }, [props.value, invalid, dirty, id, validation])

            useEffect(() => {
              const timeoutId = setTimeout(check, 1000)
              return () => clearTimeout(timeoutId)
            }, [check])

            return (
              <PopupDisabled
                disabled={mode !== 'base-stores'}
                position='right center'
                trigger={
                  <MwInput
                    {...props}
                    type='text'
                    mask={[/\D/g, '']}
                    placeholder={labels[name].placeholder}
                    label={labels[name].label}
                    value={props.value || ''}
                    invalid={isInvalid(name)}
                    onChange={(event) => {
                      setValidation(
                        !event.target.value ||
                          event.target.value === originals[name],
                      )
                      props.onChange(event)
                    }}
                    loading={validation === null}
                    disabled={mode === 'base-stores'}
                  />
                }
              />
            )
          }}
        />
      </MwGrid.Col>
    </React.Fragment>
  )
}

export default Code
