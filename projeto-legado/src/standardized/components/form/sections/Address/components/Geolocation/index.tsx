import React, { useCallback, useState } from 'react'

import { MwButton, MwGrid, MwIcon } from '@mw-kit/mw-ui'

import GoogleMap from '../../../../../../../components/GoogleMap'
import type { MarkerInterface } from '../../../../../../../components/GoogleMap/interfaces'
import Modal, { type ModalState } from '../../../../../../../components/MwModal'
import { keys, numberOrDefault } from '../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import Popup from '../../../../../Popup'
import { Title } from '../../../../components'
import LocationModal from '../../../LocationModal'
import { DEFAULT_RADIUS } from '../../constants'
import useAddessContext from '../../context'
import type { IAddress } from '../../interfaces'

import GeolocationStatus from './components/GeolocationStatus'
import * as S from './styles'

const defaultCoordinates = {
  lat: '-12.2448278739',
  lng: '-51.646240483',
  radius: DEFAULT_RADIUS,
}

interface GeolocationProp {
  textInformation: string
  disabled?: boolean

  resendToAudit?: 'disabled' | 'none'
}

const Geolocation = (props: GeolocationProp) => {
  const { textInformation, disabled, resendToAudit } = props

  const {
    form,
    viewMode,
    withAddressCoordinate,
    markers,
    audits,
    fillGeolocationStatus,
    modalMode,
  } = useAddessContext()

  const { watch, getValues, setValue } = form

  const [modal, setModal] = useState<ModalState | null>(null)

  const lat = watch('lat')
  const lng = watch('lng')

  const invalidCheck = useCallback(
    (key: keyof IAddress | string) => key in form.formState.errors,
    [form.formState],
  )

  const address_lat = numberOrDefault(watch('address_lat'))
  const address_lng = numberOrDefault(watch('address_lng'))

  const bound: Pick<MarkerInterface, 'bound'> =
    withAddressCoordinate && address_lat && address_lng
      ? {
          bound: {
            lat: address_lat as number,
            lng: address_lng as number,
            radius: watch('geolocation_tolerance') as number,
          },
        }
      : {}

  if (modalMode) {
    return (
      <React.Fragment>
        <MwGrid
          borderless
          spacing={{ bottom: 's4', top: 's4', left: 's3', right: 's3' }}
          cols={{ spacing: '0' }}
        >
          <MwGrid.Row>
            <MwGrid
              borderless
              spacing='0'
              rows={{ spacing: '0', borderless: true }}
              cols={{ spacing: '0' }}
            >
              <MwGrid.Row style={{ height: 'calc(100% - 27.5px)' }}>
                <S.CenteredContainer>
                  {!viewMode && (
                    <React.Fragment>
                      <p>Mapear Endereço:</p>

                      <Popup
                        on='click'
                        position='right center'
                        offset={({ placement }) =>
                          placement === 'top-start' ? [10, 0] : []
                        }
                        positionFixed
                        hideOnScroll
                        disabled={!disabled}
                        content={
                          <div style={{ maxWidth: '210px' }}>
                            Não é possível fazer a geolocalização enquanto
                            existe uma Atualização de Endereço Pendente.
                          </div>
                        }
                        inverted
                        trigger={
                          <div>
                            <MwButton
                              content='Mapear'
                              size='large'
                              style={{
                                minWidth: '76px',
                                minHeight: '31px',
                                fontSize: '14px',
                              }}
                              disabled={
                                !watch('postal_code') ||
                                !watch('street_type') ||
                                !watch('street_address') ||
                                !watch('street_number') ||
                                !watch('sublocality') ||
                                !watch('city') ||
                                !watch('state') ||
                                !lat ||
                                !lng ||
                                disabled
                              }
                              onClick={() => {
                                setModal(
                                  <LocationModal
                                    mode='only_map'
                                    close={() => setModal(null)}
                                    save={(values) => {
                                      for (const key of keys(values)) {
                                        setValue(key, values[key])
                                      }

                                      fillGeolocationStatus()
                                    }}
                                    value={getValues()}
                                    account_name={getValues('name')}
                                    audits={audits}
                                    {...bound}
                                  />,
                                )
                              }}
                            />
                          </div>
                        }
                      />
                    </React.Fragment>
                  )}

                  <GeolocationStatus
                    {...{
                      resendToAudit,
                    }}
                  />
                </S.CenteredContainer>
              </MwGrid.Row>
            </MwGrid>
          </MwGrid.Row>
        </MwGrid>

        <Modal modal={modal} />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <MwGrid
        borderless
        spacing={{ bottom: 's4', top: 's4', left: 's3', right: 's3' }}
        cols={{ spacing: '0' }}
      >
        <MwGrid.Row>
          <MwGrid.Col width='6'>
            <MwGrid
              borderless
              spacing='0'
              rows={{ spacing: '0', borderless: true }}
              cols={{ spacing: '0' }}
            >
              <MwGrid.Row>
                <MwGrid.Col>
                  <Title $marginBottom='0' children='Geolocalização' />
                </MwGrid.Col>
              </MwGrid.Row>

              <MwGrid.Row style={{ height: 'calc(100% - 27.5px)' }}>
                <S.CenteredContainer>
                  {!viewMode && (
                    <React.Fragment>
                      <p style={{ opacity: 0.5 }}>
                        <b>{textInformation}</b>
                      </p>
                      <p style={{ opacity: 0.5 }}>
                        <b>Para mapear, clique no botão abaixo:</b>
                      </p>

                      <Popup
                        on='click'
                        position='right center'
                        offset={({ placement }) =>
                          placement === 'top-start' ? [10, 0] : []
                        }
                        positionFixed
                        hideOnScroll
                        disabled={!disabled}
                        content={
                          <div style={{ maxWidth: '210px' }}>
                            Não é possível fazer a geolocalização enquanto
                            existe uma Atualização de Endereço Pendente.
                          </div>
                        }
                        inverted
                        trigger={
                          <div>
                            <MwButton
                              content='Mapear'
                              size='large'
                              style={{ width: '170px' }}
                              disabled={
                                !watch('postal_code') ||
                                !watch('street_type') ||
                                !watch('street_address') ||
                                !watch('street_number') ||
                                !watch('sublocality') ||
                                !watch('city') ||
                                !watch('state') ||
                                !lat ||
                                !lng ||
                                disabled
                              }
                              onClick={() => {
                                setModal(
                                  <LocationModal
                                    mode='only_map'
                                    close={() => setModal(null)}
                                    save={(values) => {
                                      keys(values).forEach((key) => {
                                        setValue(key, values[key])
                                      })

                                      fillGeolocationStatus()
                                    }}
                                    value={getValues()}
                                    account_name={getValues('name')}
                                    audits={audits}
                                    {...bound}
                                  />,
                                )
                              }}
                            />
                          </div>
                        }
                      />
                    </React.Fragment>
                  )}

                  <GeolocationStatus
                    {...{
                      resendToAudit,
                    }}
                  />
                </S.CenteredContainer>
              </MwGrid.Row>
            </MwGrid>
          </MwGrid.Col>

          <MwGrid.Col width='6'>
            <MwGrid
              borderless
              spacing='0'
              rows={{
                spacing: { left: '0', right: '0', bottom: 's1', top: 's1' },
                borderless: true,
              }}
              cols={{
                spacing: { top: '0', bottom: '0', left: 's3', right: 's4' },
              }}
            >
              <MwGrid.Row>
                <MwGrid.Col>
                  <GoogleMap
                    markers={[
                      ...(markers || []),
                      ...(lat && lng && !invalidCheck('street_number')
                        ? [
                            {
                              lat: Number.parseFloat(
                                notEmptyStringOrDefault(
                                  lat,
                                  defaultCoordinates.lat,
                                ),
                              ),
                              lng: Number.parseFloat(
                                notEmptyStringOrDefault(
                                  lng,
                                  defaultCoordinates.lng,
                                ),
                              ),

                              circle: {
                                options: { clickable: false },
                                radius: Number.parseInt(
                                  notEmptyStringOrDefault(
                                    watch('radius'),
                                    defaultCoordinates.radius,
                                  ),
                                ),
                              },

                              icon: 'user-white-green' as const,

                              clickable: false,
                              ...bound,
                            },
                          ]
                        : []),
                    ]}
                    hideUI={true}
                    containerStyles={{
                      width: '100%',
                      height: '300px',
                    }}
                    loadingElement={<S.Map />}
                    defaultOptions={{
                      gestureHandling: 'none',
                    }}
                  />
                </MwGrid.Col>
              </MwGrid.Row>

              <MwGrid.Row horizontalAlign='between'>
                <MwGrid.Col width='auto'>
                  <span style={{ opacity: 0.5 }}>
                    Raio de Referência: <b>{watch('radius')}m</b>
                  </span>
                </MwGrid.Col>

                <MwGrid.Col width='auto'>
                  <S.ExpandMap
                    onClick={() => {
                      setModal({
                        title: 'Expandir Mapa',
                        titleColor: 'blue',
                        size: 'large',
                        contentPadding: '0',
                        content: (
                          <div style={{ height: 400 }}>
                            <GoogleMap
                              markers={[
                                ...(markers || []),
                                ...(lat && lng
                                  ? [
                                      {
                                        lat: Number.parseFloat(
                                          notEmptyStringOrDefault(
                                            lat,
                                            defaultCoordinates.lat,
                                          ),
                                        ),
                                        lng: Number.parseFloat(
                                          notEmptyStringOrDefault(
                                            lng,
                                            defaultCoordinates.lng,
                                          ),
                                        ),
                                        circle: {
                                          radius: Number.parseInt(
                                            notEmptyStringOrDefault(
                                              watch('radius'),
                                              defaultCoordinates.radius,
                                            ),
                                          ),
                                        },

                                        icon: 'user-white-green' as const,

                                        ...bound,
                                      },
                                    ]
                                  : []),
                              ]}
                              containerStyles={{
                                width: '100%',
                                height: '100%',
                              }}
                              loadingElement={<S.FullMap />}
                            />
                          </div>
                        ),
                        actions: [
                          {
                            primary: true,
                            content: 'OK',
                            onClick: () => setModal(null),
                          },
                        ],
                      })
                    }}
                  >
                    <MwIcon
                      type='semantic'
                      icon='external alternate'
                      width='14px'
                      height='14px'
                    />{' '}
                    Expandir mapa
                  </S.ExpandMap>
                </MwGrid.Col>
              </MwGrid.Row>
            </MwGrid>
          </MwGrid.Col>
        </MwGrid.Row>
      </MwGrid>

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Geolocation
