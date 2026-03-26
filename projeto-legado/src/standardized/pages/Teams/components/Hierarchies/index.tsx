import { MwIcon } from '@mw-kit/mw-ui'

import QueueSvg from '../../../../../assets/icons/queue.svg?react'
import Popup from '../../../../components/Popup'
import useTeamsContext from '../../context'
import { HierarchyContainer, UsersContainer } from '../../styles'

import { HierarchiesSelectMenu } from './components/HierarchiesSelectMenu'
import { HierarchiesMenu } from './components/Menu'

const Hierarchies = () => {
  const {
    hierarchy: [hierarchy],
    userQueuesPagination: [{ count: userQueuesCount }],
    userQueuesOpen: [, setUsersOpen],
    userQueuesLoading: [userQueuesLoading],
  } = useTeamsContext()

  return (
    <HierarchyContainer>
      <span className='title'>Pilar:</span>
      <HierarchiesSelectMenu borderless={true} paddingless={true} />
      <span>|</span>
      <span>Usuários Associados: </span>
      <span className='title'>{hierarchy?.user_count}</span>
      <HierarchiesMenu />

      <UsersContainer
        {...(userQueuesCount > 0
          ? { 'data-count': userQueuesCount > 9 ? '9+' : userQueuesCount }
          : {})}
      >
        <Popup
          on='click'
          position='left center'
          disabled={userQueuesCount > 0}
          content='Não existe nenhuma alteração em processamento'
          trigger={
            <div>
              <MwIcon
                type='svg'
                icon={QueueSvg}
                {...(userQueuesLoading || userQueuesCount < 1
                  ? {}
                  : { onClick: () => setUsersOpen((prev) => !prev) })}
              />
            </div>
          }
          inverted
        />
      </UsersContainer>
    </HierarchyContainer>
  )
}

export default Hierarchies
