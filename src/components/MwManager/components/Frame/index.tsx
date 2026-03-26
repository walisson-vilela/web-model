import type React from 'react'

import * as S from './styled'

interface FrameProps {
  children: React.ReactNode
  className?: string
}

const Frame = (props: FrameProps) => {
  const { children, className } = props

  return (
    <S.Shell className={className}>
      <S.Frame>{children}</S.Frame>
    </S.Shell>
  )
}

export default Frame
