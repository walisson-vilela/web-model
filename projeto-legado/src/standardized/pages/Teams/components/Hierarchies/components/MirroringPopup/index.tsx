import styled from 'styled-components'

import People from '../../../../../../../assets/icons/people.svg?react'
import Popup from '../../../../../../components/Popup'
import { centeringTransitionDuration } from '../../../../constants'
import { usePopupTimeout } from '../../../Tree/functions'

import ContentPopup from './components/ContentPopup'
import type { MirroringPopupProps } from './types'

const IconContainer = styled.div`
  display: flex;
  cursor: pointer;

  > svg {
    width: ${({ theme }) => theme.spacings.s3};
    height: ${({ theme }) => theme.spacings.s3};
  }
  > svg,
  > svg * {
    stroke: #bdbabf;
    fill: #bdbabf;
  }
`

const MirroringPopup = (props: MirroringPopupProps) => {
  return (
    <Popup
      on='click'
      position='left center'
      trigger={<IconContainer children={<People />} />}
      content={<ContentPopup {...props} />}
      style={{
        padding: '0px',
      }}
      {...usePopupTimeout(centeringTransitionDuration)}
    />
  )
}

export default MirroringPopup
