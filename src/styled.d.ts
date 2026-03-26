// styled.d.ts
import 'styled-components'

import type { ThemeInterface } from './theme/interfaces'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeInterface {}
}
