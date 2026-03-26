import React from 'react'

import * as S from './styled'

interface RoleCardProps {
  title: string
  disabled?: boolean
}

const RoleCard: React.FC<RoleCardProps> = ({ title, disabled }) => {
  return (
    <S.Card $disabled={disabled}>
      <S.DotsWrapper>
        {Array.from({ length: 12 }).map((_, index) => (
          <S.Dot key={index} />
        ))}
      </S.DotsWrapper>
      {title}
    </S.Card>
  )
}

export default RoleCard
