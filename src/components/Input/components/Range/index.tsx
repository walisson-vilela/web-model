import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import { isObject } from '../../../../functions/validators'
import Form from '../../../Form'
import Icon from '../../../Icon'

import type { Marker, RangeProps } from './interfaces'
import * as S from './styles'

const getMarkers = (
  props: RangeProps,
): {
  min: number
  max: number
  step: number
  strict: boolean | undefined
  markers: Marker[]
  position: 'bottom' | 'top'
  value: number
} => {
  if (props.markers && 'markers' in props.markers) {
    const { strict } = props.markers
    const position = props.markers.position || 'bottom'

    const markers = props.markers.markers.map((m): Marker => {
      return isObject<Marker>(m) ? m : { label: m.toString(), value: m }
    })

    markers.sort((a, b) => a.value - b.value)

    if (strict) {
      const min = 0
      const max = markers.length - 1
      const step = 1
      const value = markers.findIndex((m) => m.value === props.value)

      return {
        min,
        max,
        step,
        strict,
        markers,
        position,
        value,
      }
    }

    const min =
      'min' in props.markers && props.markers.min !== undefined
        ? props.markers.min
        : markers[0].value
    const max =
      'max' in props.markers && props.markers.max !== undefined
        ? props.markers.max
        : markers[markers.length - 1].value
    const step = props.step
      ? parseFloat(`${props.step}`)
      : markers[1].value - markers[0].value

    return {
      min,
      max,
      step,
      strict,
      markers,
      position,
      value: props.value,
    }
  }

  const markers = props.markers || {}
  const step = props.step ? parseFloat(`${props.step}`) : 1
  const min = markers.min || 0
  const max = markers.max || 100
  const strict = false

  return {
    min,
    max,
    step,
    strict,
    markers: [],
    position: 'bottom',
    value: props.value,
  }
}

const getMarkerLeft = (
  markers: number,
  range: number,
  index: number,
  value: number,
  min: number,
  strict: boolean | undefined,
) => {
  let z = markers - 2
  if (z < markers - 1) z = markers - 1
  const y = 20 / z
  const x = 20 - y * (z - index)

  const p = strict ? (index * 100) / range : ((value - min) * 100) / range

  const left = `calc(${p}% - 10px - ${x}px)`
  return left
}

const getLeftCalc = (
  size: number,
  bullet: number,
  value: number,
  min: number,
  max: number,
) => {
  const percent = ((value - min) * 100) / (max - min)
  const calc = `calc(${percent}% - ${(bullet * percent) / 100}px + ${
    (bullet - size) / 2
  }px)`

  return calc
}

const getBarLeft = (size: number, calc: string) => {
  return `min(max(${calc}, 0%), calc(100% - ${size}px))`
}

const getIndicatorLeft = (size: number, calc: string) => {
  return `min(max(${calc}, calc(0% - ${size}px)), calc(100% - ${size}px))`
}

const Range = React.forwardRef(
  (props: RangeProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { label, minLabel, maxLabel, width, setValue, hideNavbar } = props

    const { isRequired, isInvalid, isViewMode, isDisabled } = Form.useContext(
      props.name,
    )

    const invalid = isInvalid() || props.invalid
    const required = isRequired() || props.required
    const disabled = isDisabled() || props.disabled
    const viewMode = isViewMode() || props.viewMode

    const { min, max, strict, markers, step, position, value } =
      getMarkers(props)

    const range = max - min
    const percent = ((value - min) * 100) / range

    if (value < min || value > max) {
      throw new Error(
        `Value must be between "${min}" and "${max}". "${value}" given`,
      )
    }

    const getValue = strict
      ? (v: string | number) => {
          const index = typeof v === 'number' ? v : parseInt(v)
          const value = markers[index].value
          return value
        }
      : (v: string | number) => {
          const value = typeof v === 'number' ? v : parseFloat(v)
          return value
        }

    const currentValue = getValue(value)

    const _onChange = props.onChange || ((_event, value) => setValue(value))
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const value = getValue(event.target.value)
      _onChange(event, value)
    }

    const { increment, canIncrement, decrement, canDecrement } = strict
      ? {
          increment: () => {
            setValue((prev) => {
              const index = markers.findIndex((e) => e.value === prev)
              if (index < 0) return prev
              const x = index + 1
              return x < markers.length ? markers[x].value : prev
            })
          },
          canIncrement: value + 1 < markers.length,
          decrement: () => {
            setValue((prev) => {
              const index = markers.findIndex((e) => e.value === prev)
              if (index < 0) return prev
              const x = index - 1
              return x >= 0 ? markers[x].value : prev
            })
          },
          canDecrement: value - 1 >= 0,
        }
      : {
          increment: () => {
            setValue((prev) => {
              const x = prev + step
              return x > max ? prev : x
            })
          },
          canIncrement: value + step <= max,
          decrement: () => {
            setValue((prev) => {
              const x = prev - step
              return x < min ? prev : x
            })
          },
          canDecrement: value - step >= min,
        }

    const inputProps = filterObject<
      RangeProps,
      React.InputHTMLAttributes<HTMLInputElement>
    >(
      props,
      [
        'hideNavbar',
        'invalid',
        'label',
        'markers',
        'maxLabel',
        'minLabel',
        'onChange',
        'required',
        'setValue',
        'value',
        'viewMode',
        'width',
      ],
      {
        min,
        max,
        step,
        onChange,
        value,
      },
    )

    const bulletSize = strict === true ? 22 : 14

    return (
      <S.Label
        $required={required}
        $disabled={disabled}
        $viewMode={viewMode}
        $width={width}
      >
        {label && <div children={label} />}

        {viewMode ? (
          <S.ViewModeContainer children={currentValue} />
        ) : (
          <S.LabelsContainer $position={position}>
            {minLabel && (
              <S.MinMaxLabelContainer>{minLabel}</S.MinMaxLabelContainer>
            )}

            <S.InputContainer $invalid={invalid}>
              {markers.length > 0 && (
                <S.MarkersContainer>
                  {markers.map((marker, index) => {
                    const firstChild = strict || min === markers[0].value
                    const lastChild =
                      strict || max === markers[markers.length - 1].value

                    const left = getMarkerLeft(
                      markers.length +
                        (firstChild ? 0 : 1) +
                        (lastChild ? 0 : 1),
                      range,
                      index + (firstChild ? 0 : 1),
                      marker.value,
                      min,
                      strict,
                    )

                    const bullet =
                      strict ||
                      (marker.value > currentValue && marker.value < max)

                    return (
                      <S.Marker
                        key={index}
                        $left={left}
                        $bullet={bullet}
                        $firstChild={firstChild}
                        $lastChild={lastChild}
                      >
                        {marker.label}
                      </S.Marker>
                    )
                  })}
                </S.MarkersContainer>
              )}

              <div>
                <S.Input
                  ref={ref}
                  {...inputProps}
                  $activeBullet={
                    (strict === true ? markers[value].value : value) !== 0
                  }
                  $bulletSize={bulletSize}
                />

                {!hideNavbar && (
                  <S.NavBar $position={position} $strict={strict}>
                    <div
                      style={{
                        left: getBarLeft(
                          93,
                          getLeftCalc(93, bulletSize, value, min, max),
                        ),
                      }}
                    >
                      <Icon
                        type='feather'
                        icon='minus_circle'
                        color='white'
                        onClick={canDecrement ? decrement : undefined}
                        width='12px'
                        height='12px'
                        strokeWidth='2.5px'
                      />

                      {currentValue}

                      <Icon
                        type='feather'
                        icon='plus_circle'
                        color='white'
                        onClick={canIncrement ? increment : undefined}
                        width='12px'
                        height='12px'
                        strokeWidth='2.5px'
                      />
                    </div>

                    <div
                      style={{
                        left: getIndicatorLeft(
                          14,
                          getLeftCalc(14, bulletSize, value, min, max),
                        ),
                      }}
                    ></div>
                  </S.NavBar>
                )}

                <S.SelectedArea>
                  <span
                    style={{
                      width: `calc(${percent}% - (${
                        (bulletSize * percent) / 100
                      }px)`,
                    }}
                  />
                </S.SelectedArea>
              </div>
            </S.InputContainer>

            {maxLabel && (
              <S.MinMaxLabelContainer>{maxLabel}</S.MinMaxLabelContainer>
            )}
          </S.LabelsContainer>
        )}
      </S.Label>
    )
  },
)

Range.displayName = 'input'

export default Range
