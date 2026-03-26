import styled, { css } from 'styled-components'

import InputContainer from '../InputContainer'
import Marker from '../Marker'
import MinMaxLabelContainer from '../MinMaxLabelContainer'

interface LabelsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  $position: 'bottom' | 'top'
}

const LabelsContainer = styled.div<LabelsContainerProps>`
  display: flex;
  gap: 7px;

  ${({ $position: position }) => {
    if (position === 'bottom') {
      return css`
        ${InputContainer} {
          flex-direction: column-reverse;
        }

        ${Marker} {
          &:after {
            bottom: calc(100% + 9px);
          }
        }

        ${MinMaxLabelContainer} {
          align-items: start;
        }
      `
    }

    return css`
      ${InputContainer} {
        flex-direction: column;
      }

      ${Marker} {
        &:after {
          top: calc(100% + 10px);
        }
      }

      ${MinMaxLabelContainer} {
        align-items: end;
      }
    `
  }}
`

export default LabelsContainer
