import { MwInput } from '@mw-kit/mw-ui'
import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import Modal from '../../../../../../../components/MwModal'

export type SimpleEpi = { id: number; name: string }

type MassQuantityProps = {
  close: () => void
  epis: SimpleEpi[]
  selected: [SimpleEpi[], React.Dispatch<React.SetStateAction<SimpleEpi[]>>]
  search: [string, React.Dispatch<React.SetStateAction<string>>]
  qtyByEpi: [Record<number, number>, React.Dispatch<React.SetStateAction<Record<number, number>>>]
  onSave: () => void
  filterIds?: number[] // ids selecionados no passo anterior
}

const MassQuantity: React.FC<MassQuantityProps> = (props) => {
  const {
    close,
    epis,
    selected: [selected, setSelected],
    search: [search, setSearch],
    qtyByEpi: [qtyByEpi, setQtyByEpi],
    onSave,
  } = props

  const [open, setOpen] = React.useState(false)
  const [tempSelected, setTempSelected] = React.useState<Set<number>>(new Set())

  React.useEffect(() => {
    if (open) setTempSelected(new Set(selected.map((e) => e.id)))
  }, [open, selected])

  // Base lista limitada aos EPIs selecionados no passo anterior
  const baseList = React.useMemo(() => {
    return props.filterIds && props.filterIds.length
      ? epis.filter((e) => props.filterIds!.includes(e.id))
      : epis
  }, [epis, props.filterIds])

  const filtered = React.useMemo(
    () => baseList.filter((e) => e.name.toLowerCase().includes(search.toLowerCase())),
    [baseList, search],
  )

  const toggleTemp = (id: number) =>
    setTempSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const applySelection = () => {
    const ids = new Set(tempSelected)
    const newSelected = epis.filter((e) => ids.has(e.id))
    setSelected(newSelected)
    setQtyByEpi((prev) => {
      const copy = { ...prev }
      Object.keys(copy).forEach((k) => {
        const id = Number(k)
        if (!ids.has(id)) delete copy[id]
      })
      return copy
    })
    setOpen(false)
  }

  const setQty = (id: number, value: number) =>
    setQtyByEpi((prev) => ({ ...prev, [id]: value }))

  const canSave =
    selected.length > 0 && selected.every((e) => (qtyByEpi[e.id] || 0) > 0)

  return (
    <Modal.Modal size='small' open style={{ height: '537px' }}>
      <Modal.Header content="EPI's Quantidade" color='blue' />
      <Modal.Body style={{ justifyContent: 'flex-start' }}$gap='s4'>
        <p>Selecione aqui os epi's e informe a quantidade para adicionar em massa.</p>
        <div style={{ maxWidth: 460 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Selecione o EPI*</label>
          <Dropdown
            fluid
            open={open}
            icon={null}
            closeOnChange={false}
            closeOnBlur={false}
            closeOnEscape={false}
            onOpen={() => setOpen(true)}
            trigger={
              <div
                onClick={() => setOpen((o) => !o)}
                style={{
                  position: 'relative',
                  border: '1px solid #d9d9d9',
                  padding: '10px 40px 10px 12px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 38,
                  fontSize: 13,
                }}
              >
                <span style={{ color: selected.length ? '#000' : '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selected.length
                    ? selected.map((e) => e.name).join('; ')
                    : 'Selecione'}
                </span>
                <i
                  className='dropdown icon'
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', margin: 0, opacity: 0.6 }}
                />
              </div>
            }
          >
            <Dropdown.Menu style={{ width: '100%' }}>
              <div style={{ padding: '8px 12px' }} onClick={(e) => e.stopPropagation()}>
                <div
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                  }}
                >
                  <MwInput
                    type='search'
                    placeholder='Pesquisa'
                    value={search}
                    setValue={setSearch}
                    onPressEnter={() => {}}
                    icon={{ icon: { type: 'feather', icon: 'search' } }}
                    paddingless
                    borderless
                    style={{ paddingTop: 0, paddingBottom: 0, border: 'none', width: '100%' }}
                  />
                </div>
              </div>
              <div style={{ maxHeight: 240, overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                {filtered.map((e) => (
                  <div
                    key={e.id}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '6px 12px', borderTop: '1px solid #f2f2f2' }}
                  >
                    <MwInput
                      type='checkbox'
                      label={e.name}
                      checked={tempSelected.has(e.id)}
                      onChange={() => toggleTemp(e.id)}
                    />
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: '12px', opacity: 0.6 }}>Nenhum EPI encontrado.</div>
                )}
              </div>
              <div style={{ padding: 0, marginTop: 8 }} onClick={(e) => e.stopPropagation()}>
                <Button primary fluid disabled={tempSelected.size === 0} onClick={applySelection} content='Aplicar' />
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {selected.length > 0 && (
          <div style={{ marginTop: 20, overflowY: 'auto'}}>
            {selected.map((e) => (
              <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{e.name}</div>
                <label style={{ marginRight: 12 }}>Informe a quantidade*</label>
                <MwInput
                  type='number'
                  min={0}
                  step={1}
                  value={String(qtyByEpi[e.id] ?? '')}
                  placeholder='Digite aqui'
                  onChange={(evt) => {
                    const val = parseInt(evt.currentTarget.value || '0', 10) || 0
                    setQty(e.id, val)
                  }}
                  style={{ width: 120 }}
                />
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer
        buttonType='SemanticButton'
        actions={[
          <Button key='cancel' content='Cancelar' onClick={close} />,
          <Button key='apply' primary content='Salvar' onClick={onSave} disabled={!canSave} />,
        ]}
      />
    </Modal.Modal>
  )
}

export default MassQuantity
