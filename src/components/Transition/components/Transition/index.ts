import { useEffect, useState } from 'react'

import { isBoolean } from '../../../../functions/validators'

import type { TransitionProps } from './interfaces'

const Transition = (props: TransitionProps) => {
  const { active, mountDuration, element } = props

  const [render, setRender] = useState<boolean | 'unmounted' | 'first'>('first')

  useEffect(() => {
    // se o estado inicial é fechado, nao precisa passar pelo estado fechado pra desmontar, simplismente nao monta
    setRender((prev) =>
      prev === 'first' && active === false ? 'unmounted' : false,
    )

    const timeoutId = active
      ? setTimeout(() => setRender(true))
      : setTimeout(() => setRender('unmounted'), mountDuration)

    return () => clearTimeout(timeoutId)
  }, [active])

  return isBoolean(render) ? element({ active: render, mountDuration }) : null
}

export default Transition
