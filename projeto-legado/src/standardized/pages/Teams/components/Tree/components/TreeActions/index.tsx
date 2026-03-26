import { MwIcon } from '@mw-kit/mw-ui'

import TargetIcon from '../../../../../../../assets/icons/centralizar.svg?react'
import CaretUpSvg from '../../../../../../../assets/icons/expandir-recolher.svg?react'
import BinaryTreeSvg from '../../../../../../../assets/icons/icon-neighbor-node.svg?react'
import Refresh from '../../../../../../../assets/icons/refresh.svg?react'
import useTeamsContext from '../../../../context'

import {
  CollapseExpand,
  CollapseNeighbor,
  Reload,
  ResetPosition,
  TreeActionsWrapper,
} from './styles'

export const TreeActions = ({
  options: [options, setOptions],
  resetTree,
}: {
  options: [
    {
      depth: number | undefined
      collapseNeighbor: boolean
    },
    React.Dispatch<
      React.SetStateAction<{
        depth: number | undefined
        collapseNeighbor: boolean
      }>
    >,
  ]
  resetTree: () => void
}) => {
  const {
    loadingNodes,
    loading: [loading],
  } = useTeamsContext()

  return (
    <TreeActionsWrapper>
      <Reload
        type='button'
        {...(loading
          ? {}
          : {
              onClick: loadingNodes,
            })}
      >
        <MwIcon type='svg' icon={Refresh} />
      </Reload>

      <ResetPosition type='button' onClick={resetTree} title='Centralizar'>
        <MwIcon type='svg' icon={TargetIcon} />
      </ResetPosition>

      <CollapseExpand
        type='button'
        {...(options.depth !== undefined
          ? {
              className: 'active',
              title: 'Expandir tudo',
            }
          : {
              title: 'Recolher tudo',
            })}
        onClick={() => {
          setOptions((prev) => ({
            depth: prev.depth === undefined ? 1 : undefined,
            collapseNeighbor: false,
          }))
          resetTree()
        }}
      >
        <MwIcon type='svg' icon={CaretUpSvg} />
      </CollapseExpand>

      <CollapseNeighbor
        type='button'
        {...(options.collapseNeighbor ? { className: 'active' } : {})}
        onClick={() => {
          setOptions((prev) => ({
            depth: !prev.collapseNeighbor ? 1 : 3,
            collapseNeighbor: !prev.collapseNeighbor,
          }))
          resetTree()
        }}
        title='Recolher pares'
      >
        <MwIcon type='svg' icon={BinaryTreeSvg} />
      </CollapseNeighbor>
    </TreeActionsWrapper>
  )
}
