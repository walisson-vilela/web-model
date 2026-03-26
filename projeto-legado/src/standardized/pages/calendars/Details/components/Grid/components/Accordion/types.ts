import type { Data } from '../../types'

export type AccordionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  data: Data
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
