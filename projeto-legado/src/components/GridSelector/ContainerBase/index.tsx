import { MwGrid } from '@mw-kit/mw-ui'

import * as S from './styles'

const ContainerBase = (props: {
  left: React.ReactNode
  right: React.ReactNode
}) => {
  const { left, right } = props
  return (
    <S.Container>
      <MwGrid
        spacing={{ top: 's3', left: '0', bottom: '0', right: '0' }}
        cols={{
          spacing: { top: '0', left: 's1', bottom: 's1', right: 's1' },
          bordered: true,
        }}
        borderless
      >
        <MwGrid.Row>
          <S.Col children={left} />
          <S.Col children={right} />
        </MwGrid.Row>
      </MwGrid>
    </S.Container>
  )
}

export default ContainerBase
