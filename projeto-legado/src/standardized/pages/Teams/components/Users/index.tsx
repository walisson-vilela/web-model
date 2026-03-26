import { MwEllipsisContainer, MwScrollContainer } from '@mw-kit/mw-ui'
import moment from 'moment'

import EmptyMessage from '../../../../components/EmptyMessage'
import { Initials } from '../../../Home/components/Header/styles'
import useTeamsContext from '../../context'

import {
  CloseContainer,
  Container,
  NameContainer,
  RoleContainer,
  TimeContainer,
  Title,
  UserContainer,
} from './styles'
import { UserQueue } from './types'

const User = ({ userQueue }: { userQueue: UserQueue }) => {
  return (
    <UserContainer>
      <div>
        <Initials name={userQueue.user.name} src={userQueue.user.avatar?.url} />
      </div>

      <div>
        <NameContainer>
          <MwEllipsisContainer>
            <span>
              <b>{userQueue.user.name}</b>
            </span>
          </MwEllipsisContainer>
        </NameContainer>

        <RoleContainer>
          <span>Função:</span>
          <MwEllipsisContainer>
            <span>
              <b>{userQueue.user.role.name}</b>
            </span>
          </MwEllipsisContainer>

          <span>| Área:</span>
          <span>
            <b>{userQueue.user.region_count.toString().padStart(2, '0')}</b>
          </span>

          <span>| Nível:</span>
          <span>
            <b>{(userQueue.priority + 1).toString().padStart(2, '0')}</b>
          </span>
        </RoleContainer>

        <TimeContainer>
          <span>Criado à:</span>
          <span>
            <b>
              {(() => {
                const seconds = moment().diff(
                  moment(userQueue.created),
                  'seconds',
                )

                const labels = ['hora(s)', 'minuto(s)']
                for (let i = 0; i < labels.length; i++) {
                  const v = Math.pow(60, labels.length - i)
                  if (seconds > v) {
                    return `${Math.round(seconds / v)} ${labels[i]}`
                  }
                }

                return `${seconds} segundo(s)`
              })()}
            </b>
          </span>
        </TimeContainer>
      </div>
    </UserContainer>
  )
}

const Users = () => {
  const {
    userQueuesOpen: [usersOpen, setUsersOpen],
    userQueues: [userQueues],
    userQueuesPagination: [pagination, setPagination],
    userQueuesLoading: [loading],
  } = useTeamsContext()

  return (
    <Container {...(usersOpen ? { className: 'active' } : {})}>
      <Title>Usuários em Processamento ({pagination.count})</Title>

      <MwScrollContainer
        loading={loading}
        empty={{
          empty: userQueues.length === 0,
          content: <EmptyMessage children='Não há usuários em processamento' />,
        }}
        onScrollEnd={() => {
          setPagination((prev) =>
            prev.last
              ? prev
              : {
                  ...prev,
                  last: true,
                  page: prev.page + 1,
                },
          )
        }}
      >
        {userQueues.map((userQueue) => (
          <User
            key={`${userQueue.user.id}-${userQueue.created}`}
            userQueue={userQueue}
          />
        ))}
      </MwScrollContainer>

      <CloseContainer>
        <button type='button' onClick={() => setUsersOpen(false)}>
          Fechar
        </button>
      </CloseContainer>
    </Container>
  )
}

export default Users
