import React, { useEffect, useState } from 'react'

import {
  GoogleMap as RGM, GoogleMapProps,
  Libraries,
  Polygon, useJsApiLoader
} from '@react-google-maps/api'
import { Dimmer, Loader } from 'semantic-ui-react'

import { numberOrDefault } from '../../utils/Formatters'

import { getCircle } from './functions'
import { Bound, PropTypes } from './interfaces'
import Marker from './Marker'
import COLORS from './Marker/colors'
import './styles.css'

const config = {
  id: 'google-map-script',
  // Prefer env key (Vite), fallback to current key.
  googleMapsApiKey:'AIzaSyA1ZkVfT2lLyM0YhONX3ToJLJJleMabXh8',
  version: '3.exp',
  libraries: ['geometry', 'drawing', 'places'] as Libraries,
}

const GoogleMap = (props: PropTypes) => {
  const { mode, loading, hideUI, defaultCenter, polygons, circles } = {
    ...props,
  }

  const [ref, setRef] = React.useState<google.maps.Map | null>(null)

  const { isLoaded, loadError } = useJsApiLoader(config)

  const markers = props.markers
    ? Array.isArray(props.markers)
      ? props.markers
      : [props.markers]
    : []

  const [bounds, setBounds] = useState<Bound[]>([])

  const onLoad: GoogleMapProps['onLoad'] = React.useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    setRef(map)
  }, [])

  const onUnmount = React.useCallback(() => {
    setRef(null)
  }, [])

  useEffect(() => {
    if (!ref) return

    // set new bounds if markers has changed
    setBounds((prev) => {
      const newBounds: Bound[] = [
        ...markers.reduce<Bound[]>(
          (bounds, marker) => [
            ...bounds,
            {
              lat: marker.lat,
              lng: marker.lng,
              radius:
                marker.circle && marker.circle.radius
                  ? marker.circle.radius
                  : null,
            },
            ...(marker.bound
              ? [
                  {
                    lat: marker.bound.lat,
                    lng: marker.bound.lng,
                    radius: marker.bound.radius,
                  },
                ]
              : []),
          ],
          [],
        ),
        ...(circles || []).map<Bound>((circle) => ({
          lat: circle.center.lat,
          lng: circle.center.lng,
          radius: circle.radius,
        })),
        ...(polygons || []).reduce<Bound[]>(
          (bounds, polygon) => [...bounds, ...(polygon.path || [])],
          [],
        ),
      ]

      if (newBounds.length === 0) {
        newBounds.push({
          lat: -12.2448278739,
          lng: -51.646240483,
          radius: 1500000,
        })
      }

      if (
        prev.length === newBounds.length &&
        !prev.some((bound, index) => {
          return (
            bound.lat !== newBounds[index].lat ||
            bound.lng !== newBounds[index].lng ||
            bound.radius !== newBounds[index].radius
          )
        })
      ) {
        return prev
      }

      return newBounds
    })
  }, [props.zoom, ref, markers, polygons, circles])

  useEffect(() => {
    if (!ref) return

    const newBounds = new google.maps.LatLngBounds()

    // building new bounds
    bounds.forEach((bound) => {
      // if this marker doesnt have a circle just extend coordinates
      if (!bound.radius) {
        newBounds.extend({
          lat: bound.lat,
          lng: bound.lng,
        })
        return
      }

      // if has a circle, union with circle bounds
      const circle = new google.maps.Circle({
        center: {
          lat: bound.lat,
          lng: bound.lng,
        },
        radius: bound.radius,
      })
      newBounds.union(circle.getBounds())
    })

    ref.fitBounds(newBounds)
  }, [ref, bounds])

  let defaultOptions: google.maps.MapOptions = {
    fullscreenControl: false,
    disableDefaultUI: hideUI || false,
    clickableIcons: false,
  }

  if (props.defaultOptions)
    defaultOptions = { ...defaultOptions, ...props.defaultOptions }

  return (
    <>
      <Dimmer active={!isLoaded || (loading || false)}>
        <Loader content='Carregando...' />
      </Dimmer>

      {loadError && (
        <div
          style={{
            width: props.containerStyles?.width || '100%',
            height: props.containerStyles?.height || '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            textAlign: 'center',
            color: '#6b7280',
          }}
        >
          Não foi possível carregar o Google Maps. Verifique internet e a chave
          `VITE_GOOGLE_MAPS_API_KEY`.
        </div>
      )}

      {isLoaded && !loadError && (
        <RGM
          zoom={numberOrDefault(props.zoom, 18)}
          mapTypeId={mode || 'roadmap'}
          options={defaultOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapContainerStyle={props.containerStyles}
        >
          <>
            {markers.map((marker, index) => {
              return <Marker key={index} marker={marker} />
            })}

            {(circles || []).map((circle, index) => (
              <React.Fragment key={index}>
                {getCircle(
                  circle,
                  circle.center.lat,
                  circle.center.lng,
                  COLORS.YELLOW,
                )}
              </React.Fragment>
            ))}

            {(polygons || []).map((polygon, index) => (
              <Polygon
                options={{
                  strokeColor: COLORS.RED,
                  strokeWeight: 2,
                  strokeOpacity: 1,
                  fillOpacity: 0,
                }}
                {...polygon}
                key={index}
              />
            ))}
          </>
        </RGM>
      )}
    </>
  )
}

export default GoogleMap
