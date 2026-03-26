import React, { useEffect, useState } from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import GoogleMap from '../../../../../../../../../components/GoogleMap'
import COLORS from '../../../../../../../../../components/GoogleMap/Marker/colors'
import { useOnClickOutState } from '../../../../../../../../../utils/hooks'
import { cepFormatter } from '../../../../../../../../utils/formatters'
import { BodyInterface } from '../../../../interfaces'
import { Values } from '../../types'

import * as S from './styles'

const Map = (props: {
  values: [Values, React.Dispatch<React.SetStateAction<Values>>]
  audit: BodyInterface
}) => {
  const {
    values: [values, setValues],
    audit,
  } = props

  const [subtitleOpen, setSubtitleOpen] = useState(false)
  const [infoWindow, setInfoWindow] = useState(false)

  useEffect(() => {
    setSubtitleOpen(false)
    setInfoWindow(false)
  }, [values])

  return (
    <React.Fragment>
      <GoogleMap
        containerStyles={{
          height: '100%',
          width: '100%',
        }}
        markers={[
          {
            lat: values.lat,
            lng: values.lng,
            onDragEnd: (_e, lat, lng) =>
              setValues((prev) => ({ ...prev, lat, lng })),
            circle: {
              radius: values.radius,
              options: {
                fillColor: COLORS.GREEN,
                strokeColor: COLORS.GREEN,
              },
            },
            icon: 'user-white-green',
            bound: {
              lat: audit.store.address.lat,
              lng: audit.store.address.lng,
              radius: audit.store.coordinate.tolerance,
              options: {
                strokeColor: COLORS.BLUE,
                fillColor: COLORS.BLUE,
              },
            },
            draggable: true,
            zIndex: 2,
          },
          {
            lat: audit.coordinate.lat,
            lng: audit.coordinate.lng,
            onClick: () => {
              setInfoWindow((prev) => !prev)
            },
            circle: {
              radius: audit.coordinate.radius,
              options: {
                strokeColor: COLORS.YELLOW,
                fillColor: COLORS.YELLOW,
              },
            },
            icon: 'user-white-blue',
            draggable: false,
            infoWindow: {
              active: infoWindow,
              pixelOffset: [-27, -120],
              content: (
                <S.InfoWindowContainer>
                  <MwEllipsisContainer>
                    {audit.address.street_type}: {audit.address.street_name},{' '}
                    {audit.address.street_number}
                  </MwEllipsisContainer>

                  <MwEllipsisContainer>
                    {[
                      audit.address.sublocality_name,
                      audit.address.city_name,
                      audit.address.state_code,
                    ].join(' - ')}
                  </MwEllipsisContainer>

                  <MwEllipsisContainer>
                    {cepFormatter(audit.address.postal_code)}
                  </MwEllipsisContainer>
                </S.InfoWindowContainer>
              ),
            },
          },
        ]}
      />

      <S.Subtitle ref={useOnClickOutState(() => setSubtitleOpen(false))}>
        <div
          onClick={() => setSubtitleOpen((prev) => !prev)}
          children='Legenda'
        />

        {subtitleOpen && (
          <div>
            <div>Raio</div>

            <div>
              <div>
                <S.Circle $color='BLUE' />
                <div children='Área limite de edição' />
              </div>
              <div>
                <S.Circle $color='GREEN' />
                <div children='Posicionamento da Geolocalização' />
              </div>
              <div>
                <S.Circle $color='YELLOW' />
                <div children='Posição da Auditoria' />
              </div>
            </div>
          </div>
        )}
      </S.Subtitle>
    </React.Fragment>
  )
}

export default Map
