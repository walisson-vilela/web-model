import React, { useCallback, useEffect } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { cnpj, keys } from '../../../../../../../../../utils/Formatters'
import { CheckAddress } from '../../../../../components'
import { NotificateInvalidAddress } from '../../../../Modals'
import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'
import { checkDocument } from '../../../../services'
import { ResponseBaseStore } from '../../../../services/checkDocument'
import * as S from '../../../../styled'

import PopupDisabledDocument from './PopupDisabledDocument'
import PopupInvalid from './PopupInvalid'
import { isResponseBaseStoreYourselfData } from './functions'
import * as Modals from './modals'

const Document = () => {
  const {
    form,
    isInvalid,
    originals,
    dirtyFields,
    modal: [, setModal],
    useValidation,
    mode,
    id,
    closeTab,
  } = useFormContext()
  const { watch, setValue, formState } = form

  const [validation, setValidation] = useValidation('document')

  const source_status = watch('source_status')

  const dirty = dirtyFields.includes('document')
  const error = formState.errors.document
  const invalid = error !== undefined

  const required = originals.document !== null && originals.document !== ''

  const disabled =
    originals.source_status === 'UPDATED' || originals.source_status === 'VALID'

  const resetAddress = () => {
    const values: (keyof Form)[] = [
      'source_address',
      'postal_code',
      'street_type',
      'street_address',
      'street_number',
      'complement',
      'sublocality',
      'city',
      'state',
      'address_lat',
      'address_lng',
      'lat',
      'lng',
      'geolocation_status',
      'geolocation_at',
      'geolocation_by_id',
      'geolocation_by_name',
    ]

    values.forEach((f) => setValue(f, originals[f]))
  }

  const resetAll = () => {
    const values: (keyof Form)[] = [
      'document',
      'source_status',
      'fantasy_name',
      'company_name',
      'situation_name',
    ]

    resetAddress()
    values.forEach((f) => setValue(f, originals[f]))
  }

  const createUsedModal = (document: string, nickname: string) => {
    setModal(
      <Modals.UsedModal
        document={document}
        nickname={nickname}
        onConfirm={() => {
          resetAll()
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
        resetAll={resetAll}
        closeTab={closeTab}
      />,
    )
  }

  const createInvalidSourceModal = (response: ResponseBaseStore['data']) => {
    setModal(
      <Modals.InvalidSourceModal
        response={response}
        onConfirm={() => {
          resetAll()
          setModal(null)
        }}
      />,
    )
  }

  return (
    <React.Fragment>
      <MwGrid.Col width='2' spacing={{ right: '0', bottom: 's3' }}>
        <Controller
          name='document'
          control={form.control}
          render={({ field: props }) => {
            const check = useCallback(async () => {
              if (!props.value || !dirty || invalid || validation !== false) {
                return
              }

              setValidation(null)

              try {
                const response = await checkDocument(props.value, mode, id)

                if (response.success === false) {
                  'nickname' in response &&
                    createUsedModal(props.value, response.nickname)
                } else if ('data' in response) {
                  const { data } = response

                  if ('id' in data) {
                    if (!isResponseBaseStoreYourselfData(data, id)) {
                      data.source_status === 'INVALID'
                        ? createInvalidSourceModal(data)
                        : createAssociateModal(data)
                    } else {
                      if (data.source_status === 'INVALID') {
                        setModal(
                          <NotificateInvalidAddress
                            mode='alert'
                            data={data.source_address}
                            close={() => setModal(null)}
                          />,
                        )
                      }
                      resetAddress()
                      keys(data).forEach((f) => setValue(f, data[f]))
                    }
                  } else if ('source' in data) {
                    createAssociateModal(data)
                  } else {
                    keys(data).forEach((f) => setValue(f, data[f]))
                  }
                } else {
                  setValue('source_status', 'UNKNOWN')
                }
              } catch (e) {
                console.error(e)
                resetAll()
              }

              setValidation(true)
            }, [props.value, invalid, dirty, id, validation, mode])

            useEffect(() => {
              const timeoutId = setTimeout(check, 1000)
              return () => clearTimeout(timeoutId)
            }, [check])

            return (
              <PopupDisabledDocument
                disabled={!disabled}
                source_status={source_status}
                children={
                  <div style={{ flex: 1 }}>
                    <MwInput
                      {...props}
                      type='text'
                      mask={cnpj}
                      placeholder='00.000.000/0000-00'
                      label={
                        <CheckAddress
                          status={source_status}
                          children={[...(required ? ['*'] : []), 'CNPJ'].join(
                            ' ',
                          )}
                          right
                        />
                      }
                      value={props.value || ''}
                      invalid={isInvalid('document')}
                      onChange={(event) => {
                        const values: Pick<
                          Form,
                          | 'source_status'
                          | 'fantasy_name'
                          | 'company_name'
                          | 'situation_name'
                        > = {
                          // dados do cnpj
                          source_status: null,
                          fantasy_name: null,
                          company_name: null,
                          situation_name: null,
                        }

                        if (event.target.value === originals.document) {
                          setValidation(true)
                          keys(values).forEach((f) => setValue(f, originals[f]))
                        } else {
                          setValidation(!event.target.value)
                          keys(values).forEach((f) => setValue(f, values[f]))
                        }

                        resetAddress()
                        props.onChange(event)
                      }}
                      loading={validation === null}
                      disabled={disabled}
                    />
                  </div>
                }
              />
            )
          }}
        />
      </MwGrid.Col>

      {source_status === 'INVALID' && (
        <MwGrid.Col
          spacing={{ bottom: 's4', left: 's1' }}
          align={{ content: { vertical: 'bottom' } }}
        >
          <PopupInvalid />
        </MwGrid.Col>
      )}

      {error?.type === 'CNPJ' && (
        <MwGrid.Col
          spacing={{ bottom: 's4', left: 's1' }}
          align={{ content: { vertical: 'bottom' } }}
        >
          <S.ErrorMessage children={error.message} />
        </MwGrid.Col>
      )}
    </React.Fragment>
  )
}

export default Document
