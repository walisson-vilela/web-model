import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { GenericMenu } from '../../../../../../../../components/global/GenericMenu'
import useTeamsContext from '../../../../../../context'
import type { CardsProps } from '../../../../../../types'
import AreaPopup from '../AreaPopup'
import ExecutorsPopup from '../ExecutorsPopup'

export const LastCard: React.FC<CardsProps> = ({ nodeDatum }) => {
  const { attributes } = nodeDatum

  const {
    hierarchy: [hierarchy],
    byUser,
    resetDecisions,
  } = useTeamsContext()

  return (
    <React.Fragment>
      <div className='user-hierarchy'>
        <div>
          <MwEllipsisContainer>
            <span>
              {attributes.structure.name || attributes.structure.level_label}
            </span>
          </MwEllipsisContainer>
        </div>
      </div>
      <div className='last-level'>
        <div className='middle-section'>
          <div className='area-team'>
            <AreaPopup
              nodeDatum={nodeDatum}
              hierarchyId={hierarchy?.id}
              hierarchyElementId={
                (attributes.id || attributes.parent_id) as number
              }
            />
            <span>|</span>
            <ExecutorsPopup nodeDatum={nodeDatum} />
          </div>
        </div>
      </div>
      {!byUser && (
        <div className='menu'>
          <GenericMenu
            position='top left'
            width='142px'
            scrollSpacing={{
              top: 's1',
              left: '0',
              bottom: 's1',
            }}
            itemSpacing={{
              top: 's1',
              left: 's3',
              bottom: 's1',
              right: '0',
            }}
            options={[
              {
                label: (
                  <MwEllipsisContainer>
                    Resetar Decisões <br /> Manuais
                  </MwEllipsisContainer>
                ),
                data: {},
                onClick: () => {
                  resetDecisions({
                    hierarchy_element_id: attributes.parent_id as number,
                  })
                },
                rules: [],
              },
            ]}
          />
        </div>
      )}
    </React.Fragment>
  )
}
