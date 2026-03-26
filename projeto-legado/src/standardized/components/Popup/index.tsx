import React from 'react'

import { PopupProps, Popup as SemanticPopup } from 'semantic-ui-react'
import styled from 'styled-components'

import { TriggerContainer } from './styles'

const StyledPopup = styled.div`
  &.ui.popup {
    border-radius: 4px;

    &.inverted,
    &.inverted:before {
      background-color: ${({ theme }) => theme.colors.greyishBlue} !important;
    }
  }
`

const fallbackPlacementsByPosition: Partial<{
  [P in Exclude<PopupProps['position'], undefined>]: string[]
}> = {
  'right center': ['top-start', 'bottom-start'],
  'left center': ['top-end', 'bottom-end'],
}

const Popup = Object.assign<
  React.FunctionComponent<PopupProps>,
  {
    Content: typeof SemanticPopup.Content
    Header: typeof SemanticPopup.Header
    TriggerContainer: typeof TriggerContainer
  }
>(
  (props) => {
    const fallbackPlacements =
      (props.position && fallbackPlacementsByPosition[props.position]) || []

    return (
      <SemanticPopup
        as={StyledPopup}
        {...props}
        popperModifiers={[
          ...(props.popperModifiers || []),
          {
            name: 'flip',
            options: {
              fallbackPlacements,
            },
          },
        ]}
      />
    )
  },
  {
    Content: SemanticPopup.Content,
    Header: SemanticPopup.Header,
    TriggerContainer,
  },
)

export default Popup
