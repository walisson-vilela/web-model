import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Checkbox, Dropdown } from 'semantic-ui-react'
import { viewEpiDraftDistribution } from '../../../../../../../redux/actions/EpiDistribuitonsActions'
import DistributionSummary from './DistributionSummary'

interface Collaborator {
  id: number
  name: string
  role: string
  area: string
}

interface Detail {
  epiId: number
  epiName: string
  size: string
  distType: string
  qty: number
}

interface StepThreeProps {
  details: Record<number, Detail[]>
  checkedEpis: { id: number; name: string }[]
  checkedCollabs: Collaborator[]
  mockCollaborators: Collaborator[]
  responsibleCollab: Collaborator | null
  setResponsibleCollab: React.Dispatch<React.SetStateAction<Collaborator | null>>
  allowSignalMissing: 'Sim' | 'Não' | ''
  setAllowSignalMissing: React.Dispatch<React.SetStateAction<'Sim' | 'Não' | ''>>
  respDropdownOpen: boolean
  setRespDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  permDropdownOpen: boolean
  setPermDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  respSearch: string
  setRespSearch: React.Dispatch<React.SetStateAction<string>>
  tempRespId: number | null
  setTempRespId: React.Dispatch<React.SetStateAction<number | null>>
  tempPerm: 'Sim' | 'Não' | ''
  setTempPerm: React.Dispatch<React.SetStateAction<'Sim' | 'Não' | ''>>
  draftId?: number
  currentDraftId?: number
  onUpsertDraft?: (payload: any) => Promise<number | undefined>
}

const StepThree: React.FC<StepThreeProps> = ({
  details,
  checkedEpis,
  checkedCollabs,
  mockCollaborators,
  responsibleCollab,
  setResponsibleCollab,
  allowSignalMissing,
  setAllowSignalMissing,
  respDropdownOpen,
  setRespDropdownOpen,
  respSearch,
  setRespSearch,
  tempRespId,
  setTempRespId,
  draftId,
  currentDraftId,
  onUpsertDraft,
}) => {
  const dispatch = useDispatch()
  const [epiMissingCount, setEpiMissingCount] = React.useState(0)
  const [epiTypeCount, setEpiTypeCount] = React.useState(0)
  const [epiCount, setEpiCount] = React.useState(0)
  const [peopleCount, setPeopleCount] = React.useState(0)

  React.useEffect(() => {
    const idToView = currentDraftId || draftId
    if (!idToView) return
    ;(async () => {
      try {
        const data: any = await dispatch<any>(viewEpiDraftDistribution(idToView))
        const root = data?.data ?? data
        const missing = Number(root?.epi_missing_count ?? 0)
        const typeCount = Number(root?.epi_type_count ?? 0)
        const totalEpiCount = Number(root?.epi_count ?? 0)
        const pplCount = Number(root?.people_count ?? 0)
        setEpiMissingCount(isNaN(missing) ? 0 : missing)
        setEpiTypeCount(isNaN(typeCount) ? 0 : typeCount)
        setEpiCount(isNaN(totalEpiCount) ? 0 : totalEpiCount)
        setPeopleCount(isNaN(pplCount) ? 0 : pplCount)
      } catch {}
    })()
  }, [draftId, currentDraftId, dispatch])

  const tipoCount = epiTypeCount
  const totalQty = epiCount
  const collabCount = peopleCount

  const respOptions = mockCollaborators.filter(
    c => c.name.toLowerCase().includes(respSearch.toLowerCase()) || c.id.toString().includes(respSearch)
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Responsável */}
        <div style={{ marginTop: 8, gap: 6, display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 500 }}>Selecione o Colaborador*</label>
          <Dropdown
            fluid
            open={respDropdownOpen}
            closeOnChange={false}
            closeOnBlur={false}
            closeOnEscape={false}
            icon={null}
            onOpen={() => setRespDropdownOpen(true)}
            trigger={
              <div
                onClick={() => setRespDropdownOpen(o => !o)}
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
                <span style={{ color: responsibleCollab ? '#000' : '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {responsibleCollab ? `${responsibleCollab.name} | ${responsibleCollab.role}` : 'Selecione'}
                </span>
                <i
                  className='dropdown icon'
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', margin: 0, opacity: 0.6 }}
                />
              </div>
            }
          >
            <Dropdown.Menu style={{ width: '100%' }}>
              <div style={{ padding: '8px 12px' }}>
                <input
                  autoFocus
                  value={respSearch}
                  onChange={(e) => setRespSearch(e.target.value)}
                  placeholder='Pesquisa'
                  style={{ width: '100%', border: '1px solid #ddd', borderRadius: 4, padding: '6px 8px' }}
                />
              </div>
              <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                {respOptions.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setTempRespId(c.id)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '6px 12px', borderTop: '1px solid #f2f2f2' }}
                  >
                    <input
                      type='radio'
                      checked={tempRespId === c.id}
                      onChange={() => setTempRespId(c.id)}
                      style={{ marginRight: 8 }}
                    />
                    <span style={{ flex: 1 }}>{c.name} | {c.role}</span>
                  </div>
                ))}
                {respOptions.length === 0 && (
                  <div style={{ padding: '12px', opacity: 0.6 }}>Nenhum colaborador encontrado.</div>
                )}
              </div>
              <div style={{ padding: 0, marginTop: 8 }}>
                <Button
                  primary
                  fluid
                  disabled={tempRespId == null}
                  onClick={async () => {
                    if (tempRespId != null) {
                      const c = mockCollaborators.find(m => m.id === tempRespId) || null
                      setResponsibleCollab(c)
                      setRespDropdownOpen(false)
                      setTempRespId(null)
                      setRespSearch('')
                    }
                  }}
                  content='Aplicar'
                />
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* Permissão - replaced dropdown with toggle */}
        <div style={{ marginTop: 8, gap: 6, display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 500 }}>Permitir Sinalização de Falta de EPI na Entrega*</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              toggle
              checked={allowSignalMissing === 'Sim'}
              onChange={async (_, data) => {
                const value = data.checked ? 'Sim' : 'Não'
                setAllowSignalMissing(value)
              }}
              label={allowSignalMissing === 'Sim' ? 'Sim' : 'Não'}
              style={{ marginRight: 8 }}
            />
          </div>
        </div>
      </div>
      <DistributionSummary
        tipoCount={tipoCount}
        totalQty={totalQty}
        collabCount={collabCount}
        responsibleCollab={responsibleCollab}
        details={details}
        epiMissingCount={epiMissingCount}
        draftId={draftId}
      />
    </div>
  )
}

export default StepThree
