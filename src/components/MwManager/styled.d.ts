// styled.d.ts
import type { ThemeInterface } from '@mw-kit/mw-ui/types'
import 'styled-components'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}
