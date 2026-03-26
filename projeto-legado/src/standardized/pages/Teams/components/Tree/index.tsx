import React, { useCallback, useState } from 'react'

import Tree, { type RenderCustomNodeElementFn } from 'react-d3-tree'

import Modal from '../../../../../components/MwModal'
import { centeringTransitionDuration } from '../../constants'
import useTeamsContext from '../../context'

import { TreeActions } from './components/TreeActions'
import { TreeCardComponent } from './components/TreeCardComponent'
import { convertNodeTypeToRawNodeDatum, useTreeDimensions } from './functions'
import { TreeWrapper } from './styles'

const width = 224
const height = 164
const padding = 14

const renderCustomNodeElement: RenderCustomNodeElementFn = (props) => {
  // root empty node will have no attributes
  if (!props.nodeDatum.attributes) return <React.Fragment />
  return <TreeCardComponent width={width} height={height} {...props} />
}

const TreeCards = () => {
  const {
    nodes: [nodes],
    transferUserModal: [transferUserModal],
  } = useTeamsContext()

  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)
  const { center, ...treeDimensions } = useTreeDimensions(
    wrapper,
    height + padding,
  )
  const [options, setOptions] = useState({
    depth: 3 as number | undefined,
    collapseNeighbor: false,
  })

  const [tree, setTree] = useState<Tree | null>(null)

  const resetPosition = useCallback(() => {
    if (!tree || !center) return
    tree.centerNode(center as never)
  }, [tree, center])

  // adds the root empty node to handle multiple root nodes
  const data = React.useMemo(
    () => ({ name: '', children: convertNodeTypeToRawNodeDatum(nodes) }),
    [nodes, options.collapseNeighbor, options.depth],
  )

  return (
    <React.Fragment>
      <TreeWrapper ref={setWrapper} $rootCount={nodes.length}>
        <Tree
          ref={setTree}
          data={data}
          initialDepth={options.depth}
          orientation='vertical'
          pathFunc={'step'}
          collapsible={true}
          zoomable={true}
          draggable={true}
          scaleExtent={{
            min: 0.5,
            max: 2,
          }}
          {...treeDimensions}
          renderCustomNodeElement={renderCustomNodeElement}
          nodeSize={{ x: width, y: height + padding }}
          separation={{ siblings: 1.5, nonSiblings: 1.5 }}
          hasInteractiveNodes={true}
          centeringTransitionDuration={centeringTransitionDuration}
          shouldCollapseNeighborNodes={options.collapseNeighbor}
        />
      </TreeWrapper>

      <TreeActions options={[options, setOptions]} resetTree={resetPosition} />

      <Modal modal={transferUserModal} />
    </React.Fragment>
  )
}

export default TreeCards
