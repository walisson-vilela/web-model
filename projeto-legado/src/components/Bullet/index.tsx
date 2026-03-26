
import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'

import { Bullet } from './styles'

interface MwBulletProps {
  color?: ColorOptions | string
  content?: string | number | JSX.Element
}

const MwBullet = ({ color, content }: MwBulletProps) => (
  <Bullet color={color || 'gray'}>{content || '-'}</Bullet>
)

export default MwBullet
