import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { MwButton, MwIcon, MwInput, MwScrollContainer } from '@mw-kit/mw-ui'

import { fetchHierarchiesTree } from '../../redux/actions/HierarchiesTreeActions'
import PeopleTooltip from './PeopleTooltip'

type HierarchyPersonLink = {
  id: number
  name: string
  // quando vier do backend, usamos sempre people.name para exibir
  people?: {
    id: number
    name: string
    people_id_name?: string
  }
}

type HierarchyNode = {
  id: number
  name: string
  last_level: 'S' | 'N'
  children?: HierarchyNode[]
  links?: HierarchyPersonLink[]
}

type ApiHierarchy = {
  hierarchy_elements: HierarchyNode[]
}

type HierarchyTreeFilterProps = {
  value: number[]
  onChange: (ids: number[]) => void
  onApply?: (ids: number[]) => void
  onClose?: () => void
}

const collectPeopleIdsFromNode = (node: HierarchyNode): number[] => {
  // usa o people_id (id da pessoa) de cada link
  const own = (node.links || []).map((l: any) => l.people_id || l.people?.id || l.id)
  const children = (node.children || []).flatMap(collectPeopleIdsFromNode)
  return [...own, ...children]
}

const collectPeopleIdsFromTree = (nodes: HierarchyNode[]): number[] => {
  return nodes.flatMap(collectPeopleIdsFromNode)
}

const HierarchyTreeFilter: React.FC<HierarchyTreeFilterProps> = ({ value, onChange, onApply, onClose }) => {
  // removido isOpen para não quebrar a ordem dos hooks
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [tree, setTree] = useState<HierarchyNode[]>([])
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<number>>(new Set())
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<number>>(new Set())
  const [modeByNodeId, setModeByNodeId] = useState<Record<number, 'down' | 'upDown'>>({})
  const [lastSearchExpandedFor, setLastSearchExpandedFor] = useState<string>('')
  const dispatch = useDispatch()

  const nodeIndex = useMemo(() => {
    const index = new Map<number, HierarchyNode>()
    const walk = (n: HierarchyNode) => {
      index.set(n.id, n)
      n.children?.forEach(walk)
    }
    tree.forEach((n) => walk(n))
    return index
  }, [tree])

  const syncPeopleIds = useCallback(
    (nodesIds: Set<number>) => {
      const peopleIds = Array.from(nodesIds).flatMap((id) => {
        const node = nodeIndex.get(id)
        if (!node) return []
        return collectPeopleIdsFromNode(node)
      })
      const unique = Array.from(new Set(peopleIds))
      onChange(unique)
    },
    [nodeIndex, onChange],
  )

  const collectDescendantNodeIds = useCallback((n: HierarchyNode): number[] => {
    return (n.children || []).flatMap((child) => [child.id, ...collectDescendantNodeIds(child)])
  }, [])

  // helper que retorna pai + descendentes (usado pelo checkbox)
  const collectNodeAndDescendants = useCallback(
    (node: HierarchyNode): number[] => {
      return [node.id, ...collectDescendantNodeIds(node)]
    },
    [collectDescendantNodeIds],
  )

  // checkbox: seleciona pai + todos descendentes
  const toggleNode = useCallback(
    (node: HierarchyNode) => {
      const newSet = new Set(selectedNodeIds)
      const ids = collectNodeAndDescendants(node)
      const allSelected = ids.every((id) => newSet.has(id))

      if (allSelected) ids.forEach((id) => newSet.delete(id))
      else ids.forEach((id) => newSet.add(id))

      setSelectedNodeIds(newSet)
      syncPeopleIds(newSet)
    },
    [collectNodeAndDescendants, selectedNodeIds, syncPeopleIds],
  )

  // ícone users: somente descendentes (sem o pai)
  const handleSelectDescendants = useCallback(
    (node: HierarchyNode) => {
      const newSet = new Set(selectedNodeIds)
      const ids = collectDescendantNodeIds(node)
      const allSelected = ids.length > 0 && ids.every((id) => newSet.has(id))

      if (allSelected) ids.forEach((id) => newSet.delete(id))
      else ids.forEach((id) => newSet.add(id))

      setSelectedNodeIds(newSet)
      syncPeopleIds(newSet)
    },
    [collectDescendantNodeIds, selectedNodeIds, syncPeopleIds],
  )

  // ícone user_plus: somente o pai
  const handleSelectLeader = useCallback(
    (node: HierarchyNode) => {
      const newSet = new Set(selectedNodeIds)
      if (newSet.has(node.id)) newSet.delete(node.id)
      else newSet.add(node.id)

      setSelectedNodeIds(newSet)
      syncPeopleIds(newSet)
    },
    [selectedNodeIds, syncPeopleIds],
  )

  // dado um id de nó, abre todos os ancestrais até a raiz
  const expandPathToNode = useCallback(
    (targetId: number) => {
      if (!tree.length) return

      const path: number[] = []

      const dfs = (node: HierarchyNode, ancestors: number[]): boolean => {
        const currentAncestors = [...ancestors, node.id]
        if (node.id === targetId) {
          path.push(...currentAncestors)
          return true
        }
        return (node.children || []).some((child) => dfs(child, currentAncestors))
      }

      tree.forEach((root) => {
        if (!path.length) dfs(root, [])
      })

      if (path.length) {
        setExpandedNodeIds((prev) => {
          const next = new Set(prev)
          path.forEach((id) => next.add(id))
          return next
        })
      }
    },
    [tree],
  )

  const handleClear = () => {
    const empty = new Set<number>()
    setSelectedNodeIds(empty)
    onChange([])
    // limpar busca e recarregar toda a árvore
    setSearch('')
    fetchTree()
    setExpandedNodeIds(new Set())
    setLastSearchExpandedFor('')
  }

  const handleApply = () => {
    // recalcula os people_id a partir dos nós selecionados
    const peopleIds = Array.from(selectedNodeIds).flatMap((id) => {
      const node = nodeIndex.get(id)
      // fecha o popup, se fornecido
      onClose?.()
      if (!node) return []
      return collectPeopleIdsFromNode(node)
    })
    const unique = Array.from(new Set(peopleIds))

    // garante que o valor externo seja atualizado
    onChange(unique)

    // dispara callback de aplicação com os people_id corretos
    onApply?.(unique)

    // fecha o popup, se fornecido
    onClose?.()
  }

  const fetchTree = useCallback(async () => {
    try {
      setLoading(true)

      const params: Record<string, unknown> = { limit: 99999 }
      if (search) params.q = search

      const json: { success: boolean; data?: ApiHierarchy[] } = await (dispatch as any)(
        fetchHierarchiesTree(params),
      )

      if (json && json.success) {
        const data: ApiHierarchy[] = json.data || []
        const elements = data.flatMap((h) => h.hierarchy_elements || [])
        setTree(elements)

        const allPeople = collectPeopleIdsFromTree(elements)
        if (allPeople.length && value.length === 0 && selectedNodeIds.size === 0) {
          onChange(allPeople)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [dispatch, onChange, search, value.length, selectedNodeIds.size])

  useEffect(() => {
    fetchTree()
  }, [fetchTree])

  // após carregar a árvore com um termo de busca, expande apenas uma vez os caminhos até os nós encontrados
  useEffect(() => {
    if (!search || !tree.length) return
    if (lastSearchExpandedFor === search) return

    const term = search.toLowerCase()
    const nodesToExpand = new Set<number>()

    const walk = (node: HierarchyNode) => {
      const matchesName = node.name.toLowerCase().includes(term)
      const matchesLeader = (node.links || []).some((l) => {
        const nm = (l.people?.name || l.name || '').toLowerCase()
        return nm.includes(term)
      })
      if (matchesName || matchesLeader) {
        expandPathToNode(node.id)
        nodesToExpand.add(node.id)
      }
      ; (node.children || []).forEach(walk)
    }

    tree.forEach((root) => walk(root))

    if (nodesToExpand.size) {
      setLastSearchExpandedFor(search)
    }
  }, [search, tree, expandPathToNode, lastSearchExpandedFor])

  const toggleExpand = (nodeId: number) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev)
      if (next.has(nodeId)) next.delete(nodeId)
      else next.add(nodeId)
      return next
    })
  }

  const renderHighlightedName = (name: string, hasMatchInNode: boolean) => {
    if (!search) return <>{name}</>
    if (!hasMatchInNode) return <>{name}</>
    return <span style={{ color: '#21ba45', fontWeight: 'bold' }}>{name}</span>
  }

  const renderNode = (node: HierarchyNode, level = 0) => {
    const isSelected = selectedNodeIds.has(node.id)
    const hasChildren = !!node.children?.length
    const isExpanded = expandedNodeIds.has(node.id)

    const hasLinks = !!node.links?.length
    const firstLink = hasLinks ? node.links![0] : undefined
    const leaderName = firstLink ? firstLink.people?.name || firstLink.name : ''
    const extraCount = hasLinks && node.links!.length > 1 ? node.links!.length - 1 : 0

    const term = search.toLowerCase()
    const matchesHierarchyName = term && node.name.toLowerCase().includes(term)
    const matchesAnyPerson = term
      ? (node.links || []).some((l) => {
        const nm = (l.people?.name || l.name || '').toLowerCase()
        return nm.includes(term)
      })
      : false
    const hasMatchInNode = !!term && (matchesHierarchyName || matchesAnyPerson)

    return (

      <div key={node.id} style={{ paddingLeft: level * 16, marginBottom: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {hasChildren ? (
            <button
              type='button'
              onClick={() => toggleExpand(node.id)}
              style={{
                width: 16,
                height: 16,
                marginRight: 4,
                border: '1px solid #ccc',
                background: '#fff',
                cursor: 'pointer',
                padding: 0,
                fontSize: 10,
                lineHeight: '14px',
              }}
            >
              {isExpanded ? '-' : '+'}
            </button>
          ) : (
            <span style={{ display: 'inline-block', width: 16, marginRight: 4 }} />
          )}

          {/* Checkbox usando MwInput, mesma estrutura visual do GridSelector */}
          <MwInput
            type='checkbox'
            checked={isSelected}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleNode(node)}
            disabled={false}
            label={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {/* espaço reservado para alinhar com os ícones ao lado */}
              </span>
            }
            style={{ marginRight: 6 }}
          />

          {hasChildren && (
            <span style={{ display: 'inline-flex', marginRight: 6, gap: 4 }}>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectDescendants(node)
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  color: '#555',
                }}
                title='Selecionar somente abaixo'
              >
                <MwIcon type='feather' icon='users' />
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectLeader(node)
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  color: '#555',
                }}
                title='Selecionar líder da hierarquia'
              >
                <MwIcon type='feather' icon='user_plus' />
              </button>
            </span>
          )}

          <span style={{ fontWeight: 'bold', marginRight: 4 }}>
            {renderHighlightedName(node.name, hasMatchInNode)}
          </span>
          {hasLinks && (
            <PeopleTooltip links={node.links || []}>
              <span
                style={{
                  marginLeft: 4,
                  fontWeight: 400,
                  cursor: 'pointer',
                  // removido sublinhado tracejado abaixo do nome das pessoas
                  textDecoration: 'none',
                }}
              >
                {' - '}
                {renderHighlightedName(leaderName, !!(term && leaderName.toLowerCase().includes(term)))}
                {extraCount > 0 ? ` +${extraCount}` : ''}
              </span>
            </PeopleTooltip>
          )}
        </div>
        {hasChildren && isExpanded && node.children!.map((child) => renderNode(child, level + 1))}
      </div>
    )
  }

  const selectedCount = selectedNodeIds.size
  const selectedLabel =
    selectedCount === 0
      ? 'Nenhum item selecionado'
      : selectedCount === 1
        ? '1 item selecionado'
        : `${selectedCount} itens selecionados`

  return (

    <div
      style={{
        width: 580,
        minWidth: 580,
        maxWidth: 580,
        borderRadius: 0,
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: 450,
      }}
    >
      {/* Cabeçalho: linha ocupando toda a largura do popup */}
      <div
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
          margin: '0 -12px',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid transparent',
            borderRadius: 0,
            backgroundColor: '#ffffff',
          }}
        >
          <MwInput
            placeholder='Pesquisar...'
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') fetchTree()
            }}
            style={{
              flex: 1,
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              height: 28,
              fontSize: 13,
            }}
          />
          <button
            type='button'
            onClick={() => fetchTree()}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 2,
              marginLeft: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MwIcon type='feather' icon='search' />
          </button>
        </div>
      </div>
      <MwScrollContainer
        loading={loading}
        style={{ flex: 1, padding: '8px 12px', backgroundColor: '#ffffff', overflowY: 'auto' }}
      >
        {tree.length === 0 ? <span>Nenhuma hierarquia encontrada</span> : tree.map((n) => renderNode(n))}
      </MwScrollContainer>
      {/* Rodapé: linha superior ocupando toda a largura, fundo branco */}
      <div
        style={{
          borderTop: '1px solid #e0e0e0',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          margin: '0 -12px',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <span style={{ fontSize: 13, color: '#555', whiteSpace: 'nowrap' }}>{selectedLabel}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <MwButton
            size='small'
            onClick={handleApply}
            style={{ minWidth: 90, padding: '8px 16px' }}
          >
            Aplicar
          </MwButton>
          <MwButton
            size='small'
            onClick={handleClear}
            style={{
              minWidth: 90,
              padding: '8px 16px',
              backgroundColor: '#f2f2f2',
              border: 'none',
              color: '#000',
            }}
          >
            Limpar
          </MwButton>
        </div>
      </div>
    </div>
  )
}

export default HierarchyTreeFilter
