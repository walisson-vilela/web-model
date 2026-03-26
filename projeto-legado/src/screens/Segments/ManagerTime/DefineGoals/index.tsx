import React, { useEffect, useState } from 'react'

import { Button, Loader, Modal } from 'semantic-ui-react'

import TimeInput from '../../../../components/TimeInput'
import { SuccessStyle, ToasterContent } from '../../../../components/Toaster'
import { reverseSimpleTime } from '../../../../utils/Formatters'
import { notEmptyString } from '../../../../utils/Validators'
import { editGoal } from '../services'

import * as S from './styled'

interface DefineGoalsProps {
  segments: {
    id: number
    region_id?: number
    store_id?: number
    role_id?: number
    name: string
    store_statistic_attendance_id: number | null
  }[]
  closeModal: () => void
  toast: Function
  reload: Function
  messages: {
    title: string
    label: string
  }
}

interface DefineGoalsData {
  time: string
}

interface Errors {
  time?: string
}

const defaults: DefineGoalsData = {
  time: '',
}

const DefineGoals = (props: DefineGoalsProps) => {
  const { segments, closeModal, toast, reload, messages } = { ...props }

  const [dirty, setDirty] = useState<string[]>([])
  const [data, setData] = useState<DefineGoalsData>({ ...defaults })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [firstRender, setFirstRender] = useState<boolean>(true)

  useEffect(() => {
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if (firstRender) return

    const newDirty = []
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (data[key] !== defaults[key]) newDirty.push(key)
    }
    setDirty(newDirty)

    const newErrors: Errors = {}

    if (data.time.length < 5)
      newErrors.time = 'Por favor informe um tempo válido!'

    setErrors(newErrors)
  }, [data])

  const onSubmit = async () => {
    setLoading(true)

    const success = await editGoal(
      segments.map((segment) => ({
        id: segment.id,
        region_id: segment.region_id,
        store_id: segment.store_id,
        role_id: segment.role_id,
        goal: reverseSimpleTime(data.time),
        store_statistic_attendance_id: segment.store_statistic_attendance_id,
      })),
    )

    setLoading(false)

    if (success) {
      closeModal()
      reload()
      toast(<ToasterContent color='normal' />, SuccessStyle)
    }
    //else toast(<ToasterContent color="error" />, ErrorStyle)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Modal size='small' open className='default-large-modal'>
      <S.ModalHeader content='Definir Metas' />

      <S.ModalContent>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <S.Title>{messages.title}</S.Title>
            <label>
              {(() => {
                const [error, message] = notEmptyString(errors.time)
                  ? [true, errors.time]
                  : [false, '']

                return (
                  <React.Fragment>
                    <S.LabelContainer>
                      <S.Label error={error} required>
                        {messages.label}
                      </S.Label>
                    </S.LabelContainer>

                    <TimeInput
                      value={data.time}
                      apperance={
                        notEmptyString(data.time) ? 'focus' : undefined
                      }
                      setValue={(time: string) =>
                        setData((prev) => ({ ...prev, time }))
                      }
                      error={error}
                      autoFocus
                    />

                    <S.Error>{message}</S.Error>
                  </React.Fragment>
                )
              })()}
            </label>
          </form>
        )}
      </S.ModalContent>

      <Modal.Actions>
        <Button
          basic
          className='tertiary'
          type='button'
          content='Cancelar'
          onClick={() => closeModal()}
        />
        <Button
          type='button'
          content='Salvar'
          color='blue'
          disabled={Object.keys(errors).length > 0 || dirty.length === 0}
          onClick={onSubmit}
          style={{ marginRight: 0 }}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DefineGoals
