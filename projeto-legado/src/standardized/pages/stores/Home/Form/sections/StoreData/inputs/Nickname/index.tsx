import { useCallback, useEffect } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'
import { useParams } from 'react-router'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/validators'
import useFormContext from '../../../../context'
import labels from '../../../../labels'
import { checkNickname } from '../../../../services'
import { ResponseBaseStore } from '../../../../services/checkNickname'

import * as Modals from './modals'

const Nickname = () => {
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
    closeTab,
  } = useFormContext()
  const { setValue, formState } = form

  const [validation, setValidation] = useValidation('nickname')

  const resetNickname = () => {
    setValue('nickname', originals.nickname)
  }

  const createUsedModal = (nickname: string) => {
    setModal(
      <Modals.UsedModal
        nickname={nickname}
        onConfirm={() => {
          resetNickname()
          setModal(null)
        }}
      />,
    )
  }

  const createBaseUsedModal = (typedNickname: string, usedNickname: string) => {
    setModal(
      <Modals.BaseUsedModal
        typedNickname={typedNickname}
        usedNickname={usedNickname}
        onConfirm={() => {
          resetNickname()
          setModal(null)
        }}
      />,
    )
  }

  const createAssociateModal = (response: ResponseBaseStore['data']) => {
    setModal(
      <Modals.AssociateModal
        response={response}
        onClose={() => {
          setModal(null)
        }}
        resetAll={resetNickname}
        closeTab={closeTab}
      />,
    )
  }

  const createInvalidSourceModal = (response: ResponseBaseStore['data']) => {
    setModal(
      <Modals.InvalidSourceModal
        response={response}
        onConfirm={() => {
          resetNickname()
          setModal(null)
        }}
      />,
    )
  }

  return (
    <MwGrid.Col width='4'>
      <Controller
        name='nickname'
        control={form.control}
        render={({ field: props }) => {
          const { name } = props

          const dirty = dirtyFields.includes(name)
          const error = formState.errors[name]
          const invalid = error !== undefined

          const check = useCallback(async () => {
            if (!props.value || !dirty || invalid || validation !== false) {
              return
            }

            setValidation(null)

            try {
              const response = await checkNickname(props.value, mode, id)
              if (mode === 'stores') {
                if (!id) {
                  if (response.success === false) {
                    if (props.value === response.nickname) {
                      createUsedModal(response.nickname)
                    } else {
                      createBaseUsedModal(props.value, response.nickname)
                    }
                  } else if ('data' in response) {
                    response.data.source_status === 'INVALID'
                      ? createInvalidSourceModal(response.data)
                      : createAssociateModal(response.data)
                  }
                } else if (response.success === false) {
                  createUsedModal(response.nickname)
                }
              } else {
                if (response.success === false) {
                  createUsedModal(response.nickname)
                }
              }
            } catch (e) {
              console.error(e)
              resetNickname()
            }

            setValidation(true)
          }, [props.value, invalid, dirty, id, validation])

          useEffect(() => {
            const timeoutId = setTimeout(check, 1000)
            return () => clearTimeout(timeoutId)
          }, [check])

          return (
            <MwInput
              {...props}
              type='text'
              placeholder={labels[name].placeholder}
              label={labels[name].label}
              value={props.value || ''}
              invalid={isInvalid(name)}
              onChange={(event) => {
                setValidation(
                  !event.target.value || event.target.value === originals[name],
                )
                props.onChange(event)
              }}
              loading={validation === null}
              required
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Nickname
