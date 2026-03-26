import { MwGrid } from '@mw-kit/mw-ui'
import React from 'react'
import { Button, Checkbox, Dropdown, Input } from 'semantic-ui-react'

// Tipos locais mínimos para desacoplar do pai
export type DistType = 'Substituição' | 'Nova Distribuição'
export type DetailRow = {
  epiId: number
  epiName: string
  size: string
  distType: DistType
  qty: number
  active?: boolean // novo campo para habilitado
}
export type DetailsState = Record<number, DetailRow[]>

type DistTypeOption = { key: DistType; text: DistType; value: DistType }

type Props = {
  collabs: { id: number; name: string }[]
  search: string
  details: DetailsState
  sizesByEpiId: Record<number, string[]>
  distTypeOptions: DistTypeOption[]
  onSetDetail: (collabId: number, epiId: number, patch: Partial<DetailRow>) => void
  sizeValidationTriggered?: boolean
  sizeValidationAttempt?: number
}

const EpiDistributionList: React.FC<Props> = ({
  collabs,
  search,
  details,
  sizesByEpiId,
  distTypeOptions,
  onSetDetail,
  sizeValidationTriggered = false,
  sizeValidationAttempt = 0,
}) => {
  const [editingMap, setEditingMap] = React.useState<Record<string, boolean>>({})
  const keyFor = (collabId: number, epiId: number) => `${collabId}-${epiId}`
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (sizeValidationTriggered && containerRef.current) {
      const invalid = containerRef.current.querySelector('.invalid-size .ui.selection.dropdown') as HTMLElement | null
      const rowEl = invalid?.closest('.invalid-size') as HTMLElement | null
      if (rowEl) {
        containerRef.current.scrollTo({ top: Math.max(rowEl.offsetTop - 8, 0), behavior: 'smooth' })
        // tenta focar dropdown
        setTimeout(() => {
          const input = rowEl.querySelector('.ui.selection.dropdown') as HTMLElement | null
          input?.focus()
        }, 250)
      }
    }
  }, [sizeValidationTriggered, sizeValidationAttempt])

  return (
    <div ref={containerRef} style={{ maxHeight: 430, overflowY: 'auto', border: '1px solid #e6e6e6', borderRadius: 0 }}>
      {/* header apenas no topo */}
      <MwGrid.Row style={{ padding: '0px', height: 0, fontWeight: 600}}>
        <MwGrid.Col width='1'></MwGrid.Col>
        <MwGrid.Col width='1'></MwGrid.Col>
        <MwGrid.Col width='4'></MwGrid.Col>
        <MwGrid.Col width='2'></MwGrid.Col>
        <MwGrid.Col width='3'></MwGrid.Col>
        <MwGrid.Col width='1' style={{display: 'flex', justifyContent: 'flex-end',right: '16px',  top: '4px', color: '#fff', }}>Habilitado</MwGrid.Col>
      </MwGrid.Row>
      {collabs
        .filter(
          (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.id.toString().includes(search),
        )
        .map((c) => (
          <div key={c.id}>
            <div
              style={{
                background: '#5d6a8a',
                color: 'white',
                padding: '8px 12px',
                fontWeight: 600,
              }}
            >
              {c.name}
            </div>
            {(details[c.id] || []).map((row) => {
              const sizeOptions = (sizesByEpiId[row.epiId] || []).map((s) => ({ key: s, text: s, value: s }))
              const rowKey = keyFor(c.id, row.epiId)
              const isEditing = !!editingMap[rowKey]

              return (
                <MwGrid.Row
                  key={`${c.id}-${row.epiId}`}
                  style={{ padding: '2px 16px 2px 12px', alignItems: 'center'}}
                  className={sizeValidationTriggered && !row.size ? 'invalid-size' : ''}
                  data-collab-id={c.id}
                  data-epi-id={row.epiId}
                >
                  <MwGrid.Col width='1'>
                    <span style={{ fontWeight: 500, color: row.qty === 0 ? '#C2C5CA' : '#2F3440' }}>{row.epiName}</span>
                  </MwGrid.Col>
                  <MwGrid.Col width='1'>
                    <Dropdown
                      fluid
                      selection
                      options={sizeOptions}
                      value={row.size}
                      style={{ width: '120px', ...(sizeValidationTriggered && !row.size ? { border: '1px solid #d93025', background: 'rgba(217,48,37,0.08)', borderRadius: 4 } : {}) }}
                      disabled={!isEditing}
                      placeholder='Tamanho'
                      onChange={(e, d) => onSetDetail(c.id, row.epiId, { size: String(d.value) })}
                    />
                  </MwGrid.Col>
                  <MwGrid.Col width='4'>
                    <a
                      href='#'
                      onClick={(e) => {
                        e.preventDefault()
                        setEditingMap((prev) => ({ ...prev, [rowKey]: true }))
                      }}
                      style={{ color: '#1F3E8A', fontWeight: 600 }}
                    >
                      Editar
                    </a>
                  </MwGrid.Col>
                  <MwGrid.Col width='2'>
                    <Dropdown
                      selection
                      options={distTypeOptions}
                      value={row.distType}
                      onChange={(e, d) => onSetDetail(c.id, row.epiId, { distType: d.value as DistType })}
                      fluid
                    />
                  </MwGrid.Col>

                  <MwGrid.Col width='3'>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Button
                          circular
                          onClick={() => {
                            const newQty = Math.max(0, row.qty - 1)
                            onSetDetail(c.id, row.epiId, { qty: newQty, active: newQty > 0 })
                          }}
                          style={{
                            width: 24,
                            height: 24,
                            background: '#fff',
                            border: '2px solid #C2C5CA',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#5D6A8A',
                            padding: 0,
                          }}
                        >
                          <svg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                            <line x1='2' y1='6' x2='10' y2='6' stroke='#5D6A8A' strokeWidth='1' strokeLinecap='round' />
                          </svg>
                        </Button>
                        <Input
                          value={String(row.qty).padStart(2, '0')}
                          onChange={(e) => {
                            const v = parseInt(e.currentTarget.value.replace(/\D/g, '') || '0', 10)
                            const newQty = Math.max(0, Math.min(99, isNaN(v) ? 0 : v))
                            onSetDetail(c.id, row.epiId, { qty: newQty, active: newQty > 0 })
                          }}
                          style={{ width: 35}}
                          input={{ style: { textAlign: 'center', height: 36, lineHeight: '36px', padding: 0, fontSize: 14, border: '1px #3455AB solid'  } }}
                        />
                        <Button
                          circular
                          onClick={() => {
                            const newQty = Math.min(99, row.qty + 1)
                            onSetDetail(c.id, row.epiId, { qty: newQty, active: newQty > 0 })
                          }}
                          style={{
                            width: 24,
                            height: 24,
                            background: '#fff',
                            border: '2px solid #C2C5CA',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#5D6A8A',
                            padding: 0,
                          }}
                        >
                          <svg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                            <line x1='6' y1='2' x2='6' y2='10' stroke='#5D6A8A' strokeWidth='1' strokeLinecap='round' />
                            <line x1='2' y1='6' x2='10' y2='6' stroke='#5D6A8A' strokeWidth='1' strokeLinecap='round' />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </MwGrid.Col>
                  <MwGrid.Col width='1'>
                    <div style={{ textAlign: 'right', fontWeight: 500, width: '100%' }}>
                    <Checkbox
                      toggle
                      className='blue-toggle'
                      style={{ marginRight: 8 }}
                      checked={row.active}
                      onChange={(e, data) => {
                        const enabled = Boolean(data.checked);

                        if (enabled) {
                          // Ao ativar o toggle
                          const qty = row.qty === 0 ? 1 : row.qty;
                          onSetDetail(c.id, row.epiId, { active: true, qty });
                        } else {
                          // Ao desativar o toggle
                          onSetDetail(c.id, row.epiId, { active: false, qty: 0 });
                        }
                      }}
                    />
                    </div>
                  </MwGrid.Col>
                </MwGrid.Row>
              )
            })}
          </div>
        ))}
    </div>
  )
}

export default EpiDistributionList
