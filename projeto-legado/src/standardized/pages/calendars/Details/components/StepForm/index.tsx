import type React from 'react'
import { useCallback, useState } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'
import type { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'

import type { ModalState } from '../../../../../../components/MwModal'
import MwModal from '../../../../../../components/MwModal'
import { keys } from '../../../../../../utils/Formatters'
import { useDirty } from '../../../../../../utils/hooks'
import { isObject } from '../../../../../utils/validators'
import { useTabContext } from '../../contexts'
import Modal from '../Modal'
import type { FooterButtonProps } from '../Modal/types'

import { ErrorModal } from './components/ErrorModal'
import useFormContext, { Provider } from './context'
import * as S from './styles'
import type * as Types from './types'

const Body = () => {
  const {
    steps,
    step: [step, setStep],
    isValid,
    loading: [loading],
  } = useFormContext()

  const StepComponent = steps[step]

  const { title } = StepComponent

  return (
    <S.Container>
      <S.StepBar>
        <div children={title} />
        <div>
          {keys(steps).map((id, index, ids) => {
            const name = index + 1

            return (
              <S.StepBarItem
                key={index}
                {...(() => {
                  if (step === id) return { $active: true }
                  return ids.slice(0, index).some((id) => !isValid[id])
                    ? {}
                    : {
                        onClick: () => setStep(id),
                      }
                })()}
              >
                <div children={name} />
                Passo {name}
              </S.StepBarItem>
            )
          })}
        </div>
      </S.StepBar>

      <div>
        <StepComponent />
        {loading && <MwLoader filled />}
      </div>
    </S.Container>
  )
}

const StepForm = <Value extends GenericObject, Step extends string>(
  props: Types.FormProps<Value, Step>,
) => {
  const {
    card_id,
    close,
    value: [value, setValue],
    steps,
    save,
    loading: [loading, setLoading],
  } = props

  const { reload } = useTabContext()

  const [modal, setModal] = useState<ModalState | null>(null)
  const stepKeys = keys(steps)
  const dirty = props.dirty || {}
  const originals = dirty.originals || useState<Value>({ ...value })[0]
  const { fields: dirtyFields } = useDirty(value, originals, dirty.comparators)
  const [errors, setErrors] = props.errors || useState<Types.Errors<Value>>({})
  const [step, setStep] = useState<Step>(stepKeys[0])
  const StepComponent: Types.StepComponent<Value> = steps[step]

  const isValid = keys(steps).reduce((isValid, id) => {
    const { validator } = steps[id]
    return { ...isValid, [id]: validator(value, errors) }
  }, {} as { [key in Step]: boolean | FooterButtonProps })
  const curIsValid = isValid[step]
  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>(null)

  const useField: Types.FormContext<Value, Step>['useField'] = useCallback(
    (field) => {
      type FieldValue = Value[typeof field]
      type SetState = (prevState: FieldValue) => FieldValue

      const state = value[field]
      const setState: React.Dispatch<React.SetStateAction<FieldValue>> = (
        value,
      ) => {
        setValue((prev) => {
          const curv = prev[field]
          const newv =
            typeof value === 'function' ? (value as SetState)(curv) : value
          return curv === newv ? prev : { ...prev, [field]: newv }
        })
      }

      return [state, setState]
    },
    [value, setValue],
  )

  const onMoveStep = () => {
    setStep((prev) => {
      const ids = keys(steps)
      const curi = ids.findIndex((e) => e === prev)
      const newi = curi < ids.length - 1 ? curi + 1 : 0
      const id = ids[newi]
      return id
    })
  }

  const onSave = useCallback(async () => {
    try {
      const response = await save({
        card_id,
        close,
        value,
        errors,
        dirtyFields,
      })

      if (!response.success) {
        setValidationErrors(response.errors)
        setStep(keys(steps)[0])
      }
    } catch (e) {
      if (
        isAxiosError(e) &&
        isObject(e.response) &&
        e.response.status === 404
      ) {
        setModal({
          title: 'Notificação',
          content: 'Registro não encontrado',
          buttonType: 'MwButton',
          actions: [
            {
              content: 'Ok',
              onClick: () => {
                reload()
                close()
              },
            },
          ],
        })
        return
      }

      throw e
    }
  }, [save, card_id, value, errors, dirtyFields, close])

  return (
    <Provider
      value={{
        card_id,
        close,
        value: [value, setValue],
        errors: [errors, setErrors],
        steps,
        step: [step, setStep],
        isValid: keys(isValid).reduce(
          (parsed, step) => ({
            ...parsed,
            [step]: typeof isValid[step] === 'boolean' ? isValid[step] : false,
          }),
          {} as Types.FormContext<Value, Step>['isValid'],
        ),
        dirtyFields,
        originals,
        useField,
        loading: [loading, setLoading],
      }}
    >
      {modal && <MwModal modal={modal} />}

      <ErrorModal validationErrors={[validationErrors, setValidationErrors]} />

      <Modal
        {...{
          modal: {
            size: 'large',
            style: { width: 1095 },
          },
          header: {
            $appearance: 'info',
            children: card_id ? 'Editar Evento' : 'Novo Evento',
          },
          body: Body,
          footer: [
            {
              children: 'Cancelar',
              onClick: close,
            },
            {
              appearance: 'solid',
              ...(step === stepKeys[stepKeys.length - 1]
                ? {
                    children: 'Salvar',
                    ...(Object.keys(errors).length === 0 &&
                    dirtyFields.length > 0
                      ? { onClick: onSave }
                      : {
                          popup: {
                            on: 'click',
                            content: 'Nada para salvar',
                            inverted: true,
                            position: 'left center',
                          },
                          ...(typeof curIsValid === 'boolean'
                            ? {}
                            : curIsValid),
                          onClick: undefined,
                          disabled: true,
                        }),
                  }
                : { children: 'Avançar', onClick: onMoveStep }),
              ...(StepComponent.button || {}),
              ...(curIsValid === true && !loading
                ? {}
                : {
                    popup: {
                      on: 'click',
                      content: 'É necessário preencher os campos obrigatórios.',
                      inverted: true,
                      position: 'left center',
                    },
                    ...(typeof curIsValid === 'boolean' ? {} : curIsValid),
                    onClick: undefined,
                    disabled: true,
                  }),
            },
          ],
        }}
      />
    </Provider>
  )
}

export default StepForm
