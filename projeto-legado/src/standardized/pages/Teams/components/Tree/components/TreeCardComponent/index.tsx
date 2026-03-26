import type { CustomNodeElementProps } from 'react-d3-tree'

import useTeamsContext from '../../../../context'
import type { CardNodeDatum } from '../../../../types'

import { DefaultCard } from './components/DefaultCard'
import { LastCard } from './components/LastCard'
import { TreeCardWrapper } from './styles'

export const TreeCardComponent = ({
  nodeDatum,
  toggleNode,
  onNodeClick,
  onNodeMouseOver,
  onNodeMouseOut,
  width,
  height,
}: CustomNodeElementProps & { width: number; height: number }) => {
  const attributes =
    nodeDatum.attributes as never as CardNodeDatum['attributes']
  const { lastLevel } = useTeamsContext()
  return (
    <foreignObject
      width={width}
      height={height}
      x={(width / 2) * -1}
      y={(height / 2) * -1}
      style={{ cursor: 'default' }}
    >
      <TreeCardWrapper
        onClick={onNodeClick}
        onMouseOver={onNodeMouseOver}
        onMouseOut={onNodeMouseOut}
        style={{ marginBlockStart: 10 }}
      >
        {attributes.structure.level === lastLevel && attributes.id === null ? (
          <LastCard
            nodeDatum={nodeDatum as never as CardNodeDatum}
            toggleNode={toggleNode}
          />
        ) : (
          <DefaultCard
            nodeDatum={nodeDatum as never as CardNodeDatum}
            toggleNode={toggleNode}
          />
        )}
      </TreeCardWrapper>
    </foreignObject>
  )
}
