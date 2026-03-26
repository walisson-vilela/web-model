import { Droppable } from 'react-beautiful-dnd'

import EmptyMessage from '../../../../../components/EmptyMessage'
import Search from '../../../../../components/Search'
import useHierarchyContext from '../../../context'
import { Role } from '../../../types'
import RoleList from '../Roles'

import * as S from './styled'

const Left = (props: { roles: Role[] }) => {
  const {
    schedule: [schedule],
    search: [search, setSearch],
    loading: [loading],
    onScrollEnd,
  } = useHierarchyContext()

  return (
    <S.LeftContainer>
      <S.Header>
        <b>Lista de Funções</b>
        <span>Funções com caracteristicas externas</span>
      </S.Header>

      <S.SearchContainer>
        <Search submitted={[search, setSearch]} disabled={schedule !== null} />
      </S.SearchContainer>

      <S.MessageContainer
        {...(props.roles.length === 0 ? { className: 'empty' } : {})}
      >
        <EmptyMessage children='Nenhum resultado encontrado' />

        <S.DroppableContainer loading={loading.roles} onScrollEnd={onScrollEnd}>
          <Droppable droppableId='roles'>
            {(provided) => (
              <S.LeftCard {...provided.droppableProps} ref={provided.innerRef}>
                <RoleList roles={props.roles} />
                {provided.placeholder}
              </S.LeftCard>
            )}
          </Droppable>
        </S.DroppableContainer>
      </S.MessageContainer>
    </S.LeftContainer>
  )
}

export default Left
