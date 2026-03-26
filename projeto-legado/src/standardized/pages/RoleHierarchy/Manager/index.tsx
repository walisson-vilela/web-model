import React, { useCallback, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
import { Toaster } from 'react-hot-toast'

import Modal, { ModalState } from '../../../../components/MwModal'
import { dateOrDefault } from '../../../../utils/Formatters'
import useHierarchyContext from '../context'
import {
  addIndex,
  changeIndex,
  getLevelFromId,
  removeIndex,
} from '../functions'
import { Role } from '../types'

import { NotificationModal } from './Modal'
import DeletePrograming from './Modal/DeletePrograming'
import ProgramingHierarchy from './Modal/ProgramingHierarchy'
import * as Component from './components'
import * as S from './styled'

const Manager = () => {
  const {
    roles: [roles, setRoles],
    levels: [levels, setLevels],
    schedule: [schedule],
    lastModify,
  } = useHierarchyContext()

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { source, destination } = result
      if (!destination) return

      if (source.droppableId === destination.droppableId) {
        if (source.droppableId === 'roles') {
          setRoles(changeIndex(roles, source.index, destination.index))
          return
        }

        const level = getLevelFromId(source.droppableId)
        if (level === null || levels[level] === undefined) return

        const newLevels = [...levels]
        newLevels[level].roles = changeIndex(
          levels[level].roles,
          source.index,
          destination.index,
        )
        setLevels(newLevels)
        return
      }

      if (destination.droppableId === 'roles') {
        const level = getLevelFromId(source.droppableId)
        if (level === null || levels[level] === undefined) return

        const newLevels = [...levels]
        newLevels[level].roles = [...newLevels[level].roles]
        const role = removeIndex(newLevels[level].roles, source.index)
        setLevels(newLevels)

        setRoles(addIndex(roles, destination.index, role))
        return
      }

      const level = getLevelFromId(destination.droppableId)
      if (level === null || levels[level] === undefined) return

      if (levels[level].roles.length > 9) return

      const newLevels = [...levels]
      let role: Role

      if (source.droppableId === 'roles') {
        const newRoles = [...roles]
        role = removeIndex(newRoles, source.index)
        setRoles(newRoles)
      } else {
        const sourceLevel = getLevelFromId(source.droppableId)
        if (sourceLevel === null || levels[sourceLevel] === undefined) return

        newLevels[sourceLevel].roles = [...newLevels[sourceLevel].roles]
        role = removeIndex(newLevels[sourceLevel].roles, source.index)
      }

      newLevels[level].roles = addIndex(
        newLevels[level].roles,
        destination.index,
        role,
      )
      setLevels(newLevels)
    },
    [levels, roles],
  )
  const [modal, setModal] = useState<ModalState>(null)

  const isInvalid = () => {
    if (schedule) {
      return schedule.structure.some((value) =>
        value.roles_hierarchies.some(({ role }) => role.status !== undefined),
      )
    }
    return false
  }

  return (
    <S.ManagerContainer>
      <S.DragDropContainer
        {...(schedule !== null
          ? {
              onClickCapture: () =>
                setModal({
                  title: 'Notificação',
                  content:
                    'Não é possível editar ou criar uma estrutura enquanto houver programação para o Pilar. Delete a programação caso deseje criar uma nova estrutura.',
                  buttonType: 'MwButton',
                  actions: [
                    {
                      type: 'button',
                      onClick: () => setModal(null),
                      children: 'Ok',
                    },
                  ],
                }),
            }
          : {})}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Component.Left roles={roles} />
          <Component.Right levels={levels} />
        </DragDropContext>
      </S.DragDropContainer>

      <S.ButtonContainer
        $isLastModifier={
          schedule === null &&
          !lastModify.at &&
          !lastModify.id &&
          !lastModify.name
        }
      >
        {schedule !== null ? (
          <Component.FooterMessage
            onTrashClick={() =>
              setModal(<DeletePrograming setModal={setModal} />)
            }
            type={isInvalid() ? 'invalid' : 'valid'}
            onClick={() =>
              setModal(<ProgramingHierarchy onClose={() => setModal(null)} />)
            }
          />
        ) : !lastModify.at && !lastModify.id && !lastModify.name ? null : (
          <S.LastModify>
            <div>Ultima modificação realizada:</div>
            <div>
              <React.Fragment>
                {dateOrDefault(
                  lastModify.at,
                  '-',
                  'dddd[,] DD/MM/YYYY HH:mm:ss',
                )}
                , por{' '}
                {[lastModify.id, lastModify.name].filter(Boolean).join(' - ')}
              </React.Fragment>
            </div>
          </S.LastModify>
        )}

        <MwButton
          content='Programar'
          onClick={() => {
            const invalid = levels.some((level) => level.roles.length < 1)
            if (!invalid) {
              setModal(<NotificationModal onClose={() => setModal(null)} />)
              return
            }

            setModal({
              title: 'Notificação',
              content:
                'Só é possível programar hierarquia se cada nível contiver ao menos 1 função.',
              actions: [
                {
                  content: 'Ok',
                  onClick: () => setModal(null),
                },
              ],
              buttonType: 'MwButton',
            })
          }}
          disabled={schedule !== null}
        />
      </S.ButtonContainer>

      <Modal modal={modal} />
      <Toaster position='bottom-right' />
    </S.ManagerContainer>
  )
}

export default Manager
