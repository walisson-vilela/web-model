import { useCallback, useEffect, useState } from 'react'

import type { RawNodeDatum, TreeProps } from 'react-d3-tree'

import type { NodeType } from '../../types'

export const convertNodeTypeToRawNodeDatum = (
  nodeType: NodeType[],
): RawNodeDatum[] => {
  const resp = nodeType.map<RawNodeDatum>((item) => {
    const { children, ...attributes } = item

    return {
      name: item.hierarchies_user?.user.name ?? 'Indefinido',
      attributes: attributes as never,
      children: convertNodeTypeToRawNodeDatum(item.children),
    }
  })

  return resp
}

export const useTreeDimensions = (
  wrapper: HTMLDivElement | null,
  nodeHeight: number,
) => {
  const [dimensions, setDimensions] =
    useState<TreeProps['dimensions']>(undefined)
  const [translate, setTranslate] = useState<TreeProps['translate']>(undefined)
  const [center, setCenter] = useState<TreeProps['translate']>(undefined)

  const updateDimensions = useCallback(() => {
    if (!wrapper) {
      setDimensions(undefined)
      setTranslate(undefined)
      return
    }

    const { width, height } = wrapper.getBoundingClientRect()
    setDimensions({ width, height })
    setTranslate({
      x: width / 2, // horizontal center
      y: nodeHeight * -0.5, // half node height, and consider the root empty node
    })
    setCenter({
      x: 0, // horizontal center
      y: 0.5 * (height + nodeHeight), // vertical center
    })
  }, [wrapper, nodeHeight])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [updateDimensions])

  return {
    dimensions,
    translate,
    center,
  }
}

export const usePopupTimeout = (
  timeout: number,
  open?: [
    NodeJS.Timeout | boolean,
    React.Dispatch<React.SetStateAction<NodeJS.Timeout | boolean>>,
  ],
) => {
  const [openPopup, setOpenPopup] =
    open || useState<NodeJS.Timeout | boolean>(false)

  useEffect(() => {
    if (typeof openPopup === 'boolean') return
    return () => clearTimeout(openPopup)
  }, [openPopup])

  return {
    open: openPopup === true,
    onOpen: () => setOpenPopup(setTimeout(() => setOpenPopup(true), timeout)),
    onClose: () => setOpenPopup(false),
  }
}
