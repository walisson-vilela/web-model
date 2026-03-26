import React, { useState } from 'react'

import moment from 'moment'

import Modal, {
  ModalState,
} from '../../../../../../../../../components/MwModal'
import { notEmptyStringOrDefault } from '../../../../../../../../utils/formatters'
import useAddessContext from '../../../../context'
import * as S from '../../styles'

interface IGelocationComponent {
  resendToAudit?: 'disabled' | 'none'
}

const GeolocationStatus = (props: IGelocationComponent) => {
  const { resendToAudit } = props

  const context = useAddessContext()
  const { form, withGeolocationStatus, invalidCheck, modalMode } = context

  const { watch, setValue } = form

  const geolocation_at = watch('geolocation_at')
  const geolocation_by_name = watch('geolocation_by_name')
  const geolocation_status = watch('geolocation_status')
  const lat = watch('lat')
  const lng = watch('lng')

  const [notification, setNotification] = useState<ModalState | null>(null)

  const checkStatusSimple = (): { label: React.ReactNode; value: boolean } => {
    return geolocation_at &&
      !invalidCheck('street_number') &&
      !invalidCheck('postal_code') &&
      notEmptyStringOrDefault(lat) &&
      notEmptyStringOrDefault(lng)
      ? { label: 'Realizado', value: true }
      : { label: 'Pendente', value: false }
  }

  const checkStatusComplete = (): {
    label: React.ReactNode
    value: boolean
  } => {
    if (geolocation_status === undefined) {
      return { label: 'Pendente', value: false }
    }

    if (geolocation_status === null) {
      return { label: 'Pendente Executor', value: false }
    }

    if (geolocation_status === true) {
      return {
        label: (
          <span>
            Auditado{' '}
            {resendToAudit !== 'none' && (
              <S.ResentToAudit
                {...(resendToAudit !== 'disabled'
                  ? {
                      onClick: () =>
                        setNotification({
                          title: 'Auditoria',
                          titleColor: 'white',
                          contentPadding: '0',
                          buttonType: 'MwButton',
                          content: (
                            <div
                              style={{
                                width: 500,
                                minHeight: 89,
                                padding: 21,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <p>
                                Você deseja enviar o PDV{' '}
                                <b>{form.getValues('company_name')}</b> para
                                auditoria?
                              </p>
                            </div>
                          ),
                          actions: [
                            {
                              appearance: 'borderless',
                              content: 'Cancelar',
                              onClick: () => setNotification(null),
                            },
                            {
                              content: 'Enviar',
                              onClick: () => {
                                setValue('geolocation_status', null)
                                setNotification(null)
                              },
                            },
                          ],
                        }),
                    }
                  : {})}
              >
                (Reenviar para auditoria de Campo)
              </S.ResentToAudit>
            )}
          </span>
        ),
        value: true,
      }
    }

    return { label: 'Pendente Gestor', value: false }
  }

  const { label, value } = withGeolocationStatus
    ? checkStatusComplete()
    : checkStatusSimple()

  if (modalMode) {
    return (
      <React.Fragment>
        <p>Mapeado por: {value && geolocation_by_name}</p>
        <p>
          <b>
            {value && moment(geolocation_at).format('DD/MM/YYYY [às] HH:mm')}
          </b>
        </p>

        <Modal modal={notification} />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <p>
        Status da geolocalização: <b>{label}</b>
      </p>
      <p>
        Realizada por:{' '}
        <b>
          {value &&
            `${geolocation_by_name} - ${moment(geolocation_at).format(
              'DD/MM/YYYY [às] HH:mm',
            )}`}
        </b>
      </p>

      <Modal modal={notification} />
    </React.Fragment>
  )
}

export default GeolocationStatus
