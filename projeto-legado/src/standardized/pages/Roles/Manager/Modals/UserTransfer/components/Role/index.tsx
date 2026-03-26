import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import * as T from '../../interfaces'

import * as S from './styled'

const Role = (props: { item: T.Role; title?: boolean }) => {
  const { item } = props

  return (
    <S.Container $title={props.title}>
      <div>
        {props.title && 'Função Atual:'}
        <MwEllipsisContainer className='bold' children={item.name} /> (Nível de
        Acesso:{' '}
        <div>
          <MwEllipsisContainer children={item.access_level_label} />)
        </div>
      </div>

      <div>
        Interna:{' '}
        <MwEllipsisContainer
          className='bold'
          children={item.internal_access ? 'Sim' : 'Não'}
        />{' '}
        | Pilar:
        <MwEllipsisContainer
          className='bold'
          children={item.hierarchies
            .map((hierarchy) => hierarchy.name)
            .join(' / ')}
        />
      </div>
    </S.Container>
  )
}

export default Role
