import type { Common } from '../../interfaces'

export type MainProps = Common &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'>
