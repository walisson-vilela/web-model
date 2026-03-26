import React from 'react'

import { Draggable } from 'react-beautiful-dnd'

import useHierarchyContext from '../../../context'
import { Role } from '../../../types'
import RoleCard from '../RoleCard'

interface IRoleList {
  roles: Role[]
}

const RoleList = (props: IRoleList) => {
  const { roles } = props

  const {
    schedule: [schedule],
  } = useHierarchyContext()

  return (
    <React.Fragment>
      {roles.map((role, index) => (
        <Draggable
          key={role.id}
          draggableId={String(role.id)}
          index={index}
          isDragDisabled={schedule !== null}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={provided.draggableProps.style}
            >
              <RoleCard title={role.name} disabled={schedule !== null} />
            </div>
          )}
        </Draggable>
      ))}
    </React.Fragment>
  )
}

export default RoleList
