import React, { useState } from 'react'

import { Marker as GoogleMarker, InfoBox } from '@react-google-maps/api'

import { getCircle } from '../functions'
import { MarkerInterface } from '../interfaces'

import COLORS from './colors'
import icons from './icons'

const Marker = (props: { marker: MarkerInterface }) => {
  const { marker } = props

  const { lat, lng, draggable, circle, icon, clickable } = {
    ...marker,
  }

  const onDragEnd = marker.onDragEnd || (() => {})

  const onClick = marker.onClick || (() => {})

  const [ref, setRef] = useState<GoogleMarker>()

  const iconObj: google.maps.Icon | undefined = icon
    ? {
        url: icons[icon].url,
        ...(icons[icon].position
          ? {
              anchor: new google.maps.Point(
                icons[icon].position.x,
                icons[icon].position.y,
              ),
            }
          : {}),
      }
    : undefined

  return (
    <GoogleMarker
      ref={setRef}
      position={{ lat, lng }}
      draggable={draggable}
      icon={iconObj}
      onDragEnd={(e) => {
        // if the marker has bounds, validate if it is inside it
        if (marker.bound) {
          const distance =
            google.maps.geometry.spherical.computeDistanceBetween(
              {
                lat: marker.bound.lat,
                lng: marker.bound.lng,
              },
              e.latLng,
            )

          // if it is outside, set the marker back to the current position
          if (distance > marker.bound.radius) {
            onDragEnd(e, lat, lng)
            return
          }
        }

        onDragEnd(e, e.latLng.lat(), e.latLng.lng())
      }}
      onClick={(e) => {
        const { domEvent } = e

        const target = domEvent.target as HTMLElement

        if (target.tagName !== 'AREA') {
          onClick(e, undefined)
          return
        }

        const container = target.parentElement.parentElement
        const position = container.getBoundingClientRect()

        onClick(e, position)
      }}
      zIndex={marker.zIndex}
      clickable={clickable}
    >
      <React.Fragment>
        {marker.bound &&
          getCircle(
            marker.bound,
            marker.bound.lat,
            marker.bound.lng,
            COLORS.BLUE,
          )}

        {getCircle(circle, lat, lng)}

        {marker.infoWindow && marker.infoWindow.active ? (
          <InfoBox
            anchor={ref?.marker}
            options={{
              pane: 'overlayMouseTarget',
              pixelOffset: new google.maps.Size(
                ...marker.infoWindow.pixelOffset,
              ),
              closeBoxURL: ``,
              enableEventPropagation: true,
              zIndex: 9999,
            }}
          >
            {marker.infoWindow.content}
          </InfoBox>
        ) : undefined}
      </React.Fragment>
    </GoogleMarker>
  )
}

export default Marker
