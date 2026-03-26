import { css } from 'styled-components'

import { keys } from '../../../../functions/formatters'

import type { MappedTransitions, Transition } from './interfaces'

const useTransition = <P extends string>(
  props: Transition<P>,
  values: MappedTransitions<P>,
) => {
  const { active, mountDuration } = props

  const animation = {
    enabled: css``,
    disabled: css``,
  }

  const properties: string[] = []
  const durations: number[] = []
  const functions: string[] = []

  keys(props.properties).forEach((k) => {
    const config = props.properties[k]
    if (config === undefined) return
    properties.push(k)
    durations.push(
      config.duration && config.duration <= mountDuration
        ? config.duration
        : mountDuration,
    )
    functions.push(config.function || 'ease-in-out')

    if (values[k].disabled) {
      animation.disabled = animation.disabled.concat(
        `${k}: ${values[k].disabled};`,
      )
    }

    if (values[k].enabled) {
      animation.enabled = animation.enabled.concat(
        `${k}: ${values[k].enabled};`,
      )
    }
  })

  if (properties.length === 0) return

  return css`
    transition-property: ${properties.join(', ')};
    transition-duration: ${durations.map((d) => `${d}ms`).join(', ')};
    transition-timing-function: ${functions.join(', ')};
    ${animation[active ? 'enabled' : 'disabled']}
  `
}

export default useTransition
