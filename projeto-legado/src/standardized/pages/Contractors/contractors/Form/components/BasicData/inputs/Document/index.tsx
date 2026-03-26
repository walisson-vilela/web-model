import { useCallback, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import { cnpj as formatCNPJ } from '../../../../../../../../../utils/Formatters'
import useAddessContext from '../../../../../../../../components/form/sections/Address/context'
import useContext from '../../../../context'
import labels from '../../../../labels'
import { getContractorByDocument } from '../../../../services'

import CNPJInUse from './Modals/CNPJInUse'
import CNPJInvalid from './Modals/CNPJInvalid'

const name = 'document'

const Document = () => {
  const { isMaster, data, setModal, form } = useContext()

  const { loadCoordinates } = useAddessContext()

  const {
    control,
    formState: { dirtyFields, errors },
    setValue,
    setValueOptions,
    isInvalid,
  } = form

  const dirty = name in dirtyFields

  const [loading, setLoading] = useState(false)

  const createUsedDocumentModal = (document: string, name: string) => {
    setModal(<CNPJInUse document={document} name={name} />)
  }

  const createInvalidDocumentModal = (document: string) => {
    setModal(<CNPJInvalid document={document} />)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: props }) => {
        const document = props.value
        const invalid = name in errors

        const checkDocument = useCallback(async () => {
          if (!document || !dirty) return

          if (invalid) {
            createInvalidDocumentModal(document)
            return
          }

          setLoading(true)
          try {
            const response = await getContractorByDocument(document, data)

            if (response.success === false) {
              createUsedDocumentModal(document, response.data.name)
            } else {
              Object.keys(response.data).forEach((field) => {
                const value = (response.data as { [key: string]: unknown })[
                  field
                ]

                setValue(field as never, value as never, setValueOptions)
              })

              loadCoordinates(response.data)
            }
          } catch (e) {
            console.error(e)
            toast(<ToasterContent color='error' />, ErrorStyle)
          }
          setLoading(false)
        }, [document, invalid, dirty])

        return (
          <MwInput
            {...props}
            type='text'
            label={labels[name].label}
            placeholder={labels[name].placeholder}
            mask={formatCNPJ}
            disabled={isMaster || loading}
            loading={loading}
            onBlur={checkDocument}
            invalid={isInvalid(name)}
            required
          />
        )
      }}
    />
  )
}

export default Document
