import React from 'react'

import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'

import useTeamsContext from '../../../../../../context'
import type { CardsProps } from '../../../../../../types'
import MirroringPopup from '../../../../../Hierarchies/components/MirroringPopup'
import AreaPopup from '../AreaPopup'
import ManualLabel from '../ManualLabel'
import { TreeCardMenu } from '../TreeCardMenu'
import { UserImg } from '../UserImg'

import { TeamsPopup } from './components/TeamsPopup'

export const DefaultCard: React.FC<CardsProps> = ({
  nodeDatum,
  toggleNode,
}) => {
  const {
    lastLevel,

    hierarchy: [hierarchy],
    byUser,
  } = useTeamsContext()

  const attributes = nodeDatum.attributes

  const TeamString = () => {
    if (attributes.structure.level >= lastLevel) {
      return ''
    }

    return (
      <React.Fragment>
        <span>|</span>
        <span> Equipe: </span>
        {attributes.structure.level === lastLevel - 1 ? (
          byUser ? (
            <MwEllipsisContainer>
              <span className='bold'>{attributes.name || '-'} </span>
            </MwEllipsisContainer>
          ) : (
            <TeamsPopup nodeDatum={nodeDatum} />
          )
        ) : (
          <span className='bold'>{attributes.team_count}</span>
        )}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className='user-hierarchy'>
        <div>
          <MwEllipsisContainer>
            <span>
              {attributes.structure.name || attributes.structure.level_label}
            </span>
          </MwEllipsisContainer>
          {(() => {
            if (
              attributes.hierarchies_user?.mirroring_count &&
              hierarchy &&
              !byUser
            ) {
              return (
                <MirroringPopup
                  hierarchyId={hierarchy.id}
                  structure={attributes.structure}
                  hierarchiesUser={attributes.hierarchies_user}
                />
              )
            }

            return null
          })()}
        </div>
      </div>
      <div className='user-picture'>
        <UserImg user={attributes.hierarchies_user?.user} />
        <ManualLabel attributes={attributes} />
      </div>
      <div className='middle-section'>
        <MwEllipsisContainer className='user-name'>
          <span>{nodeDatum.name}</span>
        </MwEllipsisContainer>
        <MwEllipsisContainer className='role-name'>
          <span>
            Função:{' '}
            <span className='bold'>
              {attributes.hierarchies_user?.user.role.name || '-'}
            </span>
          </span>
        </MwEllipsisContainer>

        <div className='area-team'>
          <AreaPopup
            nodeDatum={nodeDatum}
            hierarchyId={hierarchy?.id}
            hierarchyElementId={
              (attributes.id || attributes.parent_id) as number
            }
          />
          {TeamString()}
        </div>
      </div>
      {!byUser && <TreeCardMenu nodeDatum={nodeDatum} />}
      {!nodeDatum.children?.length ? (
        ''
      ) : (
        <div className='toggle-noode'>
          <MwIcon
            type='feather'
            icon={nodeDatum.__rd3t.collapsed ? 'plus_square' : 'minus_square'}
            color='blue'
            onClick={toggleNode}
            width='16px'
            height='16px'
          />
        </div>
      )}
    </React.Fragment>
  )
}
