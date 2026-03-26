import { CardContent, Dimmer } from 'semantic-ui-react'
import styled from 'styled-components'

interface SimpleWrapperProps {
  withHeader: boolean
}

export const SimpleWrapper = styled(CardContent)<SimpleWrapperProps>`
  margin-top: ${({ withHeader }) =>
    !withHeader ? '1rem !important' : 'initial'};
  margin-bottom: ${({ withHeader }) =>
    withHeader ? '1rem !important' : 'initial'};
  border-top: inherit !important;
  > div {
    color: var(--new-gray) !important;
  }

  .ui.medium + .ui.small {
    margin-top: 0.3rem !important;
  }

  .ui.medium.big {
    font-size: 22px;
    font-weight: 900;
  }

  .details {
    color: var(--new-gray-light);

    .header {
      color: var(--new-gray-light) !important;
    }
  }
  .last-card {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
  }
  .ui.medium.center.aligned.header.custom-text {
    color: #263046;
  }
`

export const SimpleDimmerWrapper = styled(Dimmer)`
  height: 100%;
  background-color: #fff !important;
  opacity: 1 !important;
  border-top: none !important;

  z-index: 1 !important;

  > div.content {
    width: 100%;
  }
`

interface CustomSpanProps {
  textAlign: string
}
export const CustomSpan = styled.span<CustomSpanProps>`
  display: block;
  color: var(--new-gray-light);
  text-align: ${(props) => props.textAlign || 'center'};
  font-weight: normal;
  font-size: 14px;
`
