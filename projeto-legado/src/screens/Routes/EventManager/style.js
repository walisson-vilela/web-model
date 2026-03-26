import styled from 'styled-components';
import {Tab} from "semantic-ui-react"

export const TabWrapper = styled(Tab)`
  > {
    .menu {
      display: ${({props}) => props.new ? "none" : "flex"} !important;
    }
  }
`
