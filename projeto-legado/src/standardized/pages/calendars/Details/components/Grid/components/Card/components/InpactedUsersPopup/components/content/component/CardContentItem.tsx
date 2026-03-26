import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import type { UserEvents } from '../../../../../../../types'

import { CardContentItemWrapper } from './styles'

export const CardContentItem = ({ user }: { user: UserEvents }) => {
  return (
    <CardContentItemWrapper>
      <div>
        <span>{user.user.id}</span>
        <span> - </span>
        <MwEllipsisContainer>{user.user.name}</MwEllipsisContainer>
      </div>
      <div className='info'>
        <span>Função: </span>
        <MwEllipsisContainer>
          <b>{user.role.name}</b>
        </MwEllipsisContainer>
        <span> | </span>
        <span>Pilares: </span>
        <b>{user.hierarchy_count}</b>
      </div>
    </CardContentItemWrapper>
  )
}
