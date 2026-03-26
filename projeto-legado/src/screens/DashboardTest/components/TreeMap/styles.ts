import { Card, Dimmer } from 'semantic-ui-react'
import styled from 'styled-components'

export const TreeMapWrapper = styled(Card)``

export const TreeMapDimmerWrapper = styled(Dimmer)`
    background-color: #fff !important;
    opacity: 1 !important;
    z-index: 1 !important;

    > div.content {
        width: 100%;
        border-top: none !important;

    }
 -
`
