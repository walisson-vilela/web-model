import { MwIcon } from '@mw-kit/mw-ui'

import CameraIcon from '../../../../../../../../../../../../assets/icons/camera.svg?react'
import TargetIcon from '../../../../../../../../../../../../assets/icons/centralizar.svg?react'

import { CheckWrapper } from './styles'

export const CheckIn = () => {
  return (
    <CheckWrapper>
      08:00:00 <MwIcon type='svg' icon={TargetIcon} />
    </CheckWrapper>
  )
}

export const CheckOut = () => {
  return (
    <CheckWrapper>
      18:00:00
      <MwIcon type='svg' icon={CameraIcon} />
    </CheckWrapper>
  )
}
