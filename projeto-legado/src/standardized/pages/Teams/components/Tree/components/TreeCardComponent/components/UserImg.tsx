import { Initials } from '../../../../../../Home/components/Header/styles'
import type { NodeUserType } from '../../../../../types'

import { UserNameCard } from './styles'

export const UserImg = ({ user }: { user: NodeUserType | undefined }) => {
  if (!user) {
    return (
      <UserNameCard>
        <Initials name='?' />
      </UserNameCard>
    )
  }

  return (
    <UserNameCard>
      <Initials name={user.name} src={user.avatar?.url} />
    </UserNameCard>
  )
}
