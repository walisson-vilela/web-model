import { CSSProperties } from 'react'

import * as S from './styles'

export interface ItemProps {
  label: string | number
  value: number | string
}

interface HeaderContentProps {
  items: ItemProps[]
  style?: CSSProperties
}

const HeaderContent = ({ items, style }: HeaderContentProps) => {
  return (
    <S.Container style={style || {}}>
      {items.map((item, index) => (
        <S.Item key={index}>
          <p>{item.value}</p>
          <p>{item.label}</p>
        </S.Item>
      ))}
    </S.Container>
  )
}

export default HeaderContent
