// src/pages/RoleHierarchy/Right.tsx
import React from 'react'

import { Droppable } from 'react-beautiful-dnd'

import { formatNumber } from '../../../../../utils/formatters/numbers'
import useHierarchyContext from '../../../context'
import { addIndex, removeIndex } from '../../../functions'
import { Level } from '../../../types'
import RoleList from '../Roles'

import NameLevelCard from './components/CardName'
import PopupAssociation from './components/PopupAssociation'
import * as S from './styled'

const Right = (props: { levels: Level[] }) => {
  const {
    levels: [, setLevels],
    schedule: [schedule],
    reloadRoles,
  } = useHierarchyContext()

  const titles = [
    ...Array.from(
      { length: props.levels.length - 1 },
      (_, i) => `${i + 1}° Nível`,
    ),
    'Último Nível',
  ]

  const addLevel = (index: number) => {
    setLevels((prev) =>
      prev.length > 9
        ? prev
        : addIndex(prev, index + 1, { name: '', roles: [] }),
    )
  }

  const removeLevel = (index: number) => {
    setLevels((prev) => {
      if (prev.length < 3) return prev
      const levels = [...prev]
      removeIndex(levels, index)
      return levels
    })
    reloadRoles()
  }

  return (
    <S.RightContainer>
      <S.HeaderContainer>
        <S.Header>
          <S.HeaderTitle>
            Hierarquia: | Tipo de Associação:
            <PopupAssociation disabled={schedule !== null} />
          </S.HeaderTitle>

          <span>
            Arraste e ordene as funções para definir a Hierarquia, sendo do mais
            alto para o mais baixo nível.
          </span>
        </S.Header>

        <S.Level>Nível {`(${formatNumber(props.levels.length)}/10)`}</S.Level>
      </S.HeaderContainer>

      {props.levels.map((level, index) => {
        const isFirst = index === 0
        const isLast = index === props.levels.length - 1
        return (
          <S.RightRow key={index}>
            <NameLevelCard title={titles[index]} level={level} index={index} />

            <Droppable
              key={index}
              droppableId={`levels-${index}`}
              direction='horizontal'
              isDropDisabled={level.roles.length > 9 || schedule !== null}
            >
              {(provided) => (
                <S.RightColumn
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <RoleList roles={level.roles} />
                  <div style={{ width: '0', height: '47px' }}></div>
                  {provided.placeholder}
                </S.RightColumn>
              )}
            </Droppable>

            <S.IconButtonContainer>
              {!isLast && (
                <React.Fragment>
                  <S.IconButton
                    type='feather'
                    $plus={true}
                    icon='plus'
                    color='white'
                    width={20}
                    height={20}
                    {...(schedule !== null
                      ? { disabled: true }
                      : {
                          onClick: () => addLevel(index),
                        })}
                  />
                  {!isFirst && (
                    <S.IconButton
                      $plus={false}
                      type='feather'
                      icon='minus'
                      color='white'
                      width={20}
                      height={20}
                      {...(schedule !== null
                        ? { disabled: true }
                        : {
                            onClick: () => removeLevel(index),
                          })}
                    />
                  )}
                </React.Fragment>
              )}
            </S.IconButtonContainer>
          </S.RightRow>
        )
      })}
    </S.RightContainer>
  )
}

export default Right
