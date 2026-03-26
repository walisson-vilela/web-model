import { useCallback } from 'react'

import { MwEllipsisContainer, MwInput } from '@mw-kit/mw-ui'

import type { NodeType } from '../../../../../../../types'
import { PopupItem } from '../../../../../../PopupHeader/styles'
import { TreeCardWrapper } from '../../../styles'
import ManualLabel from '../../ManualLabel'
import { UserImg } from '../../UserImg'

const CardContentItem = ({
  node,
  checked: [checked, setChecked],
}: {
  node: NodeType
  checked: [NodeType[], React.Dispatch<React.SetStateAction<NodeType[]>>]
}) => {
  const userId = node.hierarchies_user?.user.id

  const isChecked = userId
    ? checked.some((e) => e.hierarchies_user?.user.id === userId)
    : false

  const setIsChecked: React.Dispatch<React.SetStateAction<boolean>> =
    useCallback(
      (value) => {
        const userId = node.hierarchies_user?.user.id
        if (!userId) return

        setChecked((prev) => {
          const i = prev.findIndex(
            (e) => e.hierarchies_user?.user.id === userId,
          )
          const current = i >= 0
          const s = typeof value === 'function' ? value(current) : value
          if (s === current) return prev

          if (s) {
            const news = [...prev, node]
            return news
          }

          const news = [...prev]
          news.splice(i)

          return news
        })
      },
      [checked, node],
    )

  return (
    <PopupItem>
      <TreeCardWrapper key={node.id} $borderless $paddingless $withoutHeight>
        <MwInput
          type='checkbox'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />

        <div className='user-picture'>
          <UserImg user={node.hierarchies_user?.user} />
        </div>

        <div className='middle-section'>
          <MwEllipsisContainer className='user-name'>
            <span>{node.hierarchies_user?.user.name || 'Indefinido'}</span>
          </MwEllipsisContainer>

          <div className='area-team'>
            <span>Função: </span>
            <MwEllipsisContainer>
              <span className='bold'>
                {node.hierarchies_user?.user.role.name || '-'}
              </span>
            </MwEllipsisContainer>

            <span>|</span>
            <span>Área:</span>
            <span className='bold'>
              {node.hierarchies_user
                ? node.hierarchies_user.region_count
                : node.region_count}
            </span>
          </div>

          <div className='area-team'>
            <span>Associação: </span>
            <ManualLabel attributes={node} />
          </div>
        </div>
      </TreeCardWrapper>
    </PopupItem>
  )
}

export default CardContentItem
