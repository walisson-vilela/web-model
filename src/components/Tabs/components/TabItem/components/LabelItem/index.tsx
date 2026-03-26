import React, { useState } from 'react'

import { useEllipsis } from '../../../../../EllipsisContainer/functions'
import type { TabsProps } from '../../../../interfaces'

import * as S from './styled'

type LabelItemProps = React.PropsWithChildren<{
  onClick?: () => void
  /** se a aba é primária do grupo */
  primary?: boolean
  /** se a aba primária possui mais de uma aba nesse grupo */
  hasSiblings?: boolean
  internal?: TabsProps['internal']
}>

const LabelItem = (props: LabelItemProps) => {
  const { children, onClick, primary, hasSiblings, internal } = props

  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  return (
    <S.StyledTab
      ref={setRef}
      $primary={primary}
      $hasSiblings={hasSiblings}
      $internal={internal}
      onClick={onClick}
      {...useEllipsis()}
      {...(ref && ref.scrollWidth > ref.offsetWidth
        ? {
            className: 'overflow',
          }
        : {})}
      children={children}
    />
  )
}

export default LabelItem
