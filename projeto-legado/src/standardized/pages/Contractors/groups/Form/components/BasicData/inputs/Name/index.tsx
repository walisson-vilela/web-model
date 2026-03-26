import React, { useCallback, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import useContext from '../../../../context'
import labels from '../../../../labels'
import { getContractorByName } from '../../../../services'

const name = 'name'

const Name = () => {
  const {
    data,
    setModal,
    form: {
      control,
      formState: { dirtyFields, errors },
      setValue,
      setValueOptions,
    },
  } = useContext()

  const [loading, setLoading] = useState(false)

  const createUsedNameModal = (value: string) => {
    setModal({
      title: 'Notificação',
      actions: [
        {
          primary: true,
          content: 'OK',
          onClick: () => {
            setValue(name, '', setValueOptions)
            setModal(null)
          },
        },
      ],
      content: (
        <React.Fragment>
          <p style={{ marginBottom: '3.5px' }}>
            O nome informado <b>{value}</b> já está sendo utilizado.
          </p>
        </React.Fragment>
      ),
    })
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: props }) => {
        const { value } = props

        const invalid = name in errors
        const dirty = name in dirtyFields

        const checkName = useCallback(async () => {
          if (!value || invalid || !dirty) return

          setLoading(true)

          try {
            const response = await getContractorByName(value, data.id)

            if (!response.success) createUsedNameModal(value)
          } catch (e) {
            toast(<ToasterContent color='error' />, ErrorStyle)
          }

          setLoading(false)
        }, [value, invalid, dirty])

        return (
          <MwInput
            {...props}
            type='text'
            label={labels[name].label}
            placeholder={labels[name].placeholder}
            disabled={loading}
            loading={loading}
            onBlur={checkName}
            invalid={invalid}
            required
          />
        )
      }}
    />
  )
}

export default Name
