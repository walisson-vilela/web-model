import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'
import styled from 'styled-components'

interface BulletProps {
  color: ColorOptions | string
}

export const Bullet = styled.span<BulletProps>`
  position: relative;
  padding-left: 13px; // 6px do bullet + 7px de distância

  :before {
    content: '';
    width: 6px;
    height: 6px;
    background-color: ${({ theme, color }) =>
      theme.colors[color] ? theme.colors[color] : color};
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 3px);
    left: 0;
  }
`
