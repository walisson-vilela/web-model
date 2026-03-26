import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import { dateOrDefault } from '../../../../../utils/Formatters'

import * as S from './styled'

export type Modifier = {
  id?: number | string | null
  name: string | null
  at: string | null
}

type FooterProps = {
  lastModified?: Modifier | null
} & (
  | React.PropsWithChildren<{}>
  | {
      buttons: Parameters<typeof MwButton>[0][]
    }
)

const Footer = (props: FooterProps) => {
  const children = (() => {
    if (!('buttons' in props)) return props.children

    return props.buttons.map((button, index) => (
      <MwButton key={index} size='large' {...button} />
    ))
  })()

  return (
    <S.FooterContainer>
      {props.lastModified && (
        <S.Content>
          <div>Última edição realizada:</div>
          <div>
            {dateOrDefault(
              props.lastModified.at,
              '-',
              'dddd[,] DD/MM/YYYY HH:mm:ss',
            )}
            , por{' '}
            {[props.lastModified.id, props.lastModified.name]
              .filter(Boolean)
              .join(' - ')}
          </div>
        </S.Content>
      )}

      <S.Container>{children}</S.Container>
    </S.FooterContainer>
  )
}
export default Footer
