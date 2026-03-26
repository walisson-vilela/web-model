import { MwButton } from '@mw-kit/mw-ui'
import type { AppliedFilter, Filter } from '@mw-kit/mw-ui/types'
import React, { useEffect, useMemo, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'
import Modal from '../../../../../../../components/MwModal'
import { ErrorStyle, SuccessStyle, ToasterContent } from '../../../../../../../components/Toaster'
import * as EpiDistribuitonsActions from '../../../../../../../redux/actions/EpiDistribuitonsActions'
import { fetchEPITypes } from '../../../../../../../redux/actions/EPIWarehouseActions'
import { fetchPeoples } from '../../../../../../../redux/actions/PeoplesActions'
import StepIndicators from '../../StepIndicators'
import type { DistributionTypeValue } from '../DistributionType'
import type { SimpleEpi } from '../MassQuantity'
import { type DistType } from './EpiDistributionList'
import StepOne from './StepOne'
import StepThree from './StepThree'
import StepTwo from './StepTwo'
import { profiles as profilesOptions } from '../../../../../../../services/options'

interface CreateDistributionModalProps {
  close: () => void
  draftId?: number
}

type Detail = {
  epiId: number
  epiName: string
  size: string
  distType: DistType
  qty: number
  active?: boolean
  itemId?: number // id real do item retornado pela API
}
type DetailsState = Record<number, Detail[]>

const CreateDistributionModal: React.FC<CreateDistributionModalProps> = ({ close, draftId }) => {
  const [step, setStep] = useState(1)

  // EPIs selection
  const [episSearch, setEpisSearch] = useState('')
  const [checkedEpis, setCheckedEpis] = useState<{ id: number; name: string }[]>([])

  // Collaborators selection
  const [collabSearch, setCollabSearch] = useState('')
  const [checkedCollabs, setCheckedCollabs] = useState<{ id: number; name: string; role: string; area: string }[]>([])
  const [collabAppliedFilters, setCollabAppliedFilters] = useState<AppliedFilter[]>([])
  const collabFiltersItems: Filter[] = [
    {
      label: 'Perfil',
      name: 'profile_id',
      options: profilesOptions,
      allowEmptySearch: true,
    },
  ]

  // Step 2 data
  const [details, setDetails] = useState<DetailsState>({})
  const [search, setSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<any[]>([])
  const filters: any[] = []
  const [massQtyModal, setMassQtyModal] = useState(false)
  const [distTypeModal, setDistTypeModal] = useState(false)
  const [massEpiChecked, setMassEpiChecked] = useState<{ id: number; name: string }[]>([])
  const [massEpiSearch, setMassEpiSearch] = useState('')
  const [massDistType, setMassDistType] = useState<DistributionTypeValue>('Substituição')
  const [massQtyByEpi, setMassQtyByEpi] = useState<Record<number, number>>({})
  const [epis, setEpis] = useState<{ id: number; name: string; sizes: string[] }[]>([])
  const [collaborators, setCollaborators] = useState<{ id: number; name: string; role: string; area: string }[]>([])
  const [loadingEpis, setLoadingEpis] = useState(false)
  const [loadingCollabs, setLoadingCollabs] = useState(false)
  const [hierarchySelectedPeopleIds, setHierarchySelectedPeopleIds] = useState<number[] | { q: string }>([])
  const dispatch = useDispatch()
  const [collabsFullLoaded, setCollabsFullLoaded] = useState(false)
  const [sizeValidationTriggered, setSizeValidationTriggered] = useState(false)
  const [sizeValidationAttempt, setSizeValidationAttempt] = useState(0)
  const [currentDraftId, setCurrentDraftId] = useState<number | undefined>(draftId)
  const [peopleDraftIds, setPeopleDraftIds] = useState<Record<number, number>>({})
  const [profileFilter, setProfileFilter] = useState<string | number>('')

  const extractDraftId = (resp: any): number | undefined => {
    return (
      resp?.id ??
      resp?.data?.id ??
      resp?.data?.data?.id ??
      resp?.result?.id ??
      resp?.data?.result?.id
    )
  }

  const upsertDraft = async (payload: any) => {
    try {
      if (currentDraftId) {
        await dispatch<any>(EpiDistribuitonsActions.updateEpiDraftDistribution(currentDraftId, payload))
        return currentDraftId
      }
      const created: any = await dispatch<any>(EpiDistribuitonsActions.addEpiDraftDistribution(payload))
      const newId = extractDraftId(created)
      if (newId) setCurrentDraftId(newId)
      return newId
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || ''
      const code = err?.data?.code || err?.status
      const notFound = code === 404 || /n.o encontrado|record not found/i.test(String(msg))
      if (notFound) {
        const created: any = await dispatch<any>(EpiDistribuitonsActions.addEpiDraftDistribution(payload))
        const newId = extractDraftId(created)
        if (newId) setCurrentDraftId(newId)
        return newId
      }
      throw err
    }
  }

  useEffect(() => {
    const loadEpis = async () => {
      setLoadingEpis(true)
      try {
        const resp: any = await dispatch<any>(fetchEPITypes({ contain: 'Epis', limit: 99999 }))
        const raw = Array.isArray(resp?.data) ? resp.data : (resp?.results || [])
        const formatted = raw.map((e: any) => {
          // Extrai tamanhos considerando diferentes estruturas retornadas pela API
          const sizes = Array.isArray(e?.Epis)
            ? e.Epis.map((x: any) => x.size).filter(Boolean)
            : Array.isArray(e?.epis)
              ? e.epis.map((x: any) => x.size).filter(Boolean)
              : Array.isArray(e?.epi_type?.epis)
                ? e.epi_type.epis.map((x: any) => x.size).filter(Boolean)
                : (e?.sizes || [])

          return {
            id: e.id,
            name: e.name || e.title || e?.epi_type?.name || 'EPI',
            sizes,
          }
        })
        setEpis(formatted)
      } catch (err) {
        console.error('Erro ao carregar EPIs', err)
        setEpis([])
      } finally {
        setLoadingEpis(false)
      }
    }
    loadEpis()
  }, [dispatch])

  useEffect(() => {
    const loadCollabs = async () => {
      setLoadingCollabs(true)
      try {
        const baseParams: any = { limit: 99999, 'no-paginate': 1, contain: 'Profiles' }
        if (Array.isArray(hierarchySelectedPeopleIds) && hierarchySelectedPeopleIds.length) {
          baseParams.id = hierarchySelectedPeopleIds
        }
        if (profileFilter) {
          baseParams.profile_id = profileFilter
        }
        const resp: any = await dispatch<any>(fetchPeoples(baseParams))
        const raw = Array.isArray(resp?.data) ? resp.data : resp?.results || []
        const formatted = raw.map((p: any) => {
          const profileNames = Array.isArray(p?.profiles)
            ? p.profiles.map((x: any) => x?.name || x?.nome || x?.title).filter(Boolean)
            : []
          const roleFromProfiles = profileNames[0] || ''
          return {
            id: p.id ?? p.enrollment ?? p.codigo ?? 0,
            name: p.name ?? p.full_name ?? p.nome ?? 'Sem nome',
            role: roleFromProfiles || p.role?.name || p.role || p.cargo || '',
            area: p.area?.name ?? p.area ?? p.regional ?? '',
            _debugProfiles: profileNames,
          }
        })
        setCollaborators(formatted.map(({ _debugProfiles, ...rest }) => rest))
      } catch (err) {
        console.error('Erro ao carregar colaboradores', err)
        setCollaborators([])
      } finally {
        setLoadingCollabs(false)
      }
    }
    loadCollabs()
  }, [dispatch, hierarchySelectedPeopleIds, profileFilter])

  const simpleEpis: SimpleEpi[] = React.useMemo(
    () => epis.map((e) => ({ id: e.id, name: e.name })),
    [epis],
  )

  const [responsibleCollab, setResponsibleCollab] = useState<typeof collaborators[0] | null>(null)
  const [allowSignalMissing, setAllowSignalMissing] = useState<'Sim' | 'Não' | ''>('Não')
  const [respDropdownOpen, setRespDropdownOpen] = useState(false)
  const [permDropdownOpen, setPermDropdownOpen] = useState(false)
  const [respSearch, setRespSearch] = useState('')
  const [tempRespId, setTempRespId] = useState<number | null>(null)
  const [tempPerm, setTempPerm] = useState<'Sim' | 'Não' | ''>('')

  const epiRows: Rows<{ id: number; name: string }> = useMemo(
    () =>
      epis
        .filter((e) => e.name.toLowerCase().includes(episSearch.toLowerCase()))
        .map((e) => ({
          data: { id: e.id, name: e.name },
          content: <span>{e.name}</span>,
        })),
    [epis, episSearch],
  )

  const collabRows: Rows<typeof collaborators[0]> = useMemo(
    () => {
      const searchLower = collabSearch.toLowerCase()
      const filtered = collaborators.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.id.toString().includes(collabSearch),
      )
      const selectedExtras = checkedCollabs.filter(
        (sel) => !filtered.some((f) => f.id === sel.id),
      )
      const finalList = [...filtered, ...selectedExtras]
      return finalList.map((c) => ({
        data: c,
        content: (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>
              {c.id} - {c.name}
            </span>
            <small style={{ opacity: 0.7 }}>{c.role}</small>
          </div>
        ),
      }))
    },
    [collaborators, collabSearch, checkedCollabs],
  )

  useEffect(() => {
    if (
      !collabsFullLoaded &&
      collabRows.length > 0 &&
      checkedCollabs.length === collabRows.length &&
      !loadingCollabs
    ) {
      const fetchAll = async () => {
        try {
          setLoadingCollabs(true)
          const resp: any = await dispatch<any>(fetchPeoples({ limit: 999999, 'no-paginate': 1, contain: 'Profiles' }))
          const raw = Array.isArray(resp?.data) ? resp.data : (resp?.results || [])
          const formatted = raw.map((p: any) => {
            const profileNames = Array.isArray(p?.profiles)
              ? p.profiles.map((x: any) => x?.name || x?.nome || x?.title).filter(Boolean)
              : []
            const roleFromProfiles = profileNames[0] || ''
            return {
              id: p.id ?? p.enrollment ?? p.codigo ?? 0,
              name: p.name ?? p.full_name ?? p.nome ?? 'Sem nome',
              role: roleFromProfiles || p.role?.name || p.role || p.cargo || '',
              area: p.area?.name ?? p.area ?? p.regional ?? '',
            }
          })
          setCollaborators(formatted)
          setCollabsFullLoaded(true)
        } catch (e) {
          console.error('Erro ao carregar todos colaboradores', e)
        } finally {
          setLoadingCollabs(false)
        }
      }
      fetchAll()
    }
  }, [checkedCollabs, collabRows, collabsFullLoaded, dispatch, loadingCollabs])

  const canAdvance = (() => {
    if (step === 1) {
      return checkedEpis.length > 0 && checkedCollabs.length > 0
    }
    if (step === 2) {
      return true
    }
    if (step === 3) {
      return !!responsibleCollab && !!allowSignalMissing
    }
    return false
  })()

  const onAdvance = async () => {
    try {
      if (step === 1) {
        // Payload mínimo com colaboradores e tipos de EPI selecionados
        const peoplesPayload = checkedCollabs.map(c => ({
          people_id: c.id,
          epi_draft_distribution_items: checkedEpis.map(e => ({ epi_type_id: e.id }))
        }))
        const payloadStep1: any = {
          epi_draft_distribution_peoples: peoplesPayload,
        }
        const draftIdResult = await upsertDraft(payloadStep1)
        if (draftIdResult) {
          await dispatch<any>(EpiDistribuitonsActions.viewEpiDraftDistribution(draftIdResult))
        }
        // Preenche detalhes imediatamente para exibição no passo 2 se ainda não existir
        setDetails(prev => {
          if (Object.keys(prev).length > 0) return prev
          const next: DetailsState = {}
          checkedCollabs.forEach(c => {
            next[c.id] = checkedEpis.map(e => {
              const epiMeta = epis.find(x => x.id === e.id)
              const defaultSize = epiMeta && epiMeta.sizes && epiMeta.sizes.length ? epiMeta.sizes[0] : ''
              return {
                epiId: e.id,
                epiName: e.name,
                size: defaultSize,
                distType: 'Substituição',
                qty: 0,
                active: false,
              }
            })
          })
          return next
        })
        setStep(2)
        return
      }
      if (step === 2) {
        // Validação de tamanho obrigatório
        const hasEmptySizes = Object.values(details).some(rows => rows.some(r => !r.size))
        if (hasEmptySizes) {
          setSizeValidationTriggered(true)
          setSizeValidationAttempt(a => a + 1)
          return
        }
        if (!currentDraftId) {
          console.error('Draft não definido ao avançar para passo 3')
          return
        }
        const peoplesPayload = Object.entries(details).map(([collabId, rows]) => ({
          id: peopleDraftIds[Number(collabId)], // id real se existir
          people_id: Number(collabId),
          epi_draft_distribution_items: rows.map(r => ({
            id: r.itemId, // id real do item se existir
            epi_id: r.epiId,
            type: r.distType === 'Substituição' ? 'REPLACEMENT' : 'NEW',
            total: r.qty,
            epi_type_id: r.epiId,
            active: r.qty > 0,
          }))
        }))
        const payloadStep2 = {
          epi_draft_distribution_peoples: peoplesPayload,
        }
        await upsertDraft(payloadStep2)
        await dispatch<any>(EpiDistribuitonsActions.viewEpiDraftDistribution(currentDraftId))
        setStep(3)
        return
      }
      if (step === 3) {
        if (!currentDraftId) {
          console.error('Draft não definido ao salvar passo 3')
          return
        }
        const payloadStep3 = {
          owned_by: responsibleCollab?.id,
          editable: Number(allowSignalMissing === 'Sim'),
        }
        try {
          await upsertDraft(payloadStep3)
          await dispatch<any>(EpiDistribuitonsActions.viewEpiDraftDistribution(currentDraftId))
          // Distribui após salvar (componente/action anterior restaurada)
          await dispatch<any>(EpiDistribuitonsActions.distributeEpiDistribution({ epi_draft_distribution_id: currentDraftId }))
          toast(<ToasterContent color='normal' />, SuccessStyle)
        } catch (e) {
          console.error('Erro ao salvar/distribuir', e)
          toast(<ToasterContent color='error' />, ErrorStyle)
        }
        close()
        return
      }
    } catch (e) {
      console.error('Erro em onAdvance', e)
    }
  }

  // Initialize step 2 structure when entering step 2
  React.useEffect(() => {
    if (step !== 2) return

    const hydrateFromDraft = async () => {
      if (currentDraftId) {
        try {
          const resp: any = await dispatch<any>(EpiDistribuitonsActions.viewEpiDraftDistribution(currentDraftId))
          const peoples = resp?.data?.epi_draft_distribution_peoples || resp?.epi_draft_distribution_peoples || []
          const restored: DetailsState = {}
          const peopleIdsMap: Record<number, number> = {}
          peoples.forEach((p: any) => {
            peopleIdsMap[p.people_id] = p.id // guarda id real do relacionamento
            const rows = (p.epi_draft_distribution_items || []).map((it: any) => {
              const epiTypeId = it.epi_type_id || it.epi_id || it.id
              const epiMeta = epis.find(x => x.id === epiTypeId)
              const nameFallback = it.epi_name || epiMeta?.name || 'EPI'
              return {
                epiId: epiTypeId,
                epiName: nameFallback,
                size: it.size || (epiMeta?.sizes?.[0] || ''),
                distType: it.type === 'REPLACEMENT' ? 'Substituição' : 'Substituição',
                qty: it.total || it.qty || 0,
                active: (it.total || it.qty || 0) > 0,
                itemId: it.id,
              }
            })
            restored[p.people_id] = rows
          })
          // Merge com já selecionados (garante EPIs que estavam escolhidos mas não retornaram do draft ainda)
          setDetails(prev => {
            const merged: DetailsState = { ...restored }
            checkedCollabs.forEach(c => {
              const existing = merged[c.id] || []
              const existingIds = new Set(existing.map(r => r.epiId))
              const extra = checkedEpis.filter(e => !existingIds.has(e.id)).map(e => {
                const epiMeta = epis.find(x => x.id === e.id)
                const defaultSize = epiMeta?.sizes?.[0] || ''
                return {
                  epiId: e.id,
                  epiName: e.name,
                  size: defaultSize,
                  distType: 'Substituição',
                  qty: 0,
                  active: false,
                }
              })
              merged[c.id] = [...existing, ...extra.map(e => ({ ...e, distType: e.distType as DistType }))]
            })
            return merged
          })
          setPeopleDraftIds(peopleIdsMap)
        } catch (e) {
          console.warn('Não foi possível hidratar draft existente antes de defaults', e)
        }
      }

      // Defaults para EPIs selecionados
      setDetails((prev) => {
        const next: DetailsState = {}
        checkedCollabs.forEach((c) => {
          const existingRows = prev[c.id] || []
          const existingMap = new Map(existingRows.map((r) => [r.epiId, r]))
          const rows = checkedEpis.map((e) => {
            const existing = existingMap.get(e.id)
            if (existing) {
              if ((!existing.size || existing.size === '') && Array.isArray(epis)) {
                const epiMeta = epis.find(x => x.id === e.id)
                if (epiMeta && epiMeta.sizes && epiMeta.sizes.length) {
                  return { ...existing, size: epiMeta.sizes[0] }
                }
              }
              return existing
            }
            const epiMeta = epis.find(x => x.id === e.id)
            const defaultSize = epiMeta && epiMeta.sizes && epiMeta.sizes.length ? epiMeta.sizes[0] : ''
            return {
              epiId: e.id,
              epiName: e.name,
              size: defaultSize,
              distType: 'Substituição' as DistType,
              qty: 0,
              active: false,
            }
          })
          next[c.id] = rows
        })
        return next
      })
    }

    hydrateFromDraft()
  }, [step, checkedCollabs, checkedEpis, epis, currentDraftId, dispatch])

  const setDetail = (
    collabId: number,
    epiId: number,
    patch: Partial<Detail>,
  ) => {
    setDetails((prev) => {
      const rows = prev[collabId] || []
      const idx = rows.findIndex((r) => r.epiId === epiId)
      if (idx < 0) return prev
      const nextRows = [...rows]
      const current = nextRows[idx]
      const merged = { ...current, ...patch }
      if (patch.qty !== undefined) {
        merged.active = patch.qty > 0
      }
      nextRows[idx] = merged
      const newDetails = { ...prev, [collabId]: nextRows }
      // Removido auto-update; requisição somente em Avançar/Salvar
      return newDetails
    })
  }

  const applyMassQty = () => {
    const ids = new Set(massEpiChecked.map((e) => e.id))
    setDetails((prev) => {
      const copy: DetailsState = {}
      Object.entries(prev).forEach(([cid, rows]) => {
        copy[Number(cid)] = rows.map((r) => {
          if (!ids.has(r.epiId)) return r
          const q = massQtyByEpi[r.epiId]
          if (typeof q === 'number' && q > 0) {
            return { ...r, qty: q, active: true }
          }
          return { ...r, qty: q || 0, active: false }
        })
      })
      return copy
    })
    setMassQtyModal(false)
    setMassEpiChecked([])
    setMassQtyByEpi({})
  }

  const applyMassDistType = () => {
    setDetails((prev) => {
      const copy: DetailsState = {}
      Object.entries(prev).forEach(([cid, rows]) => {
        copy[Number(cid)] = rows.map((r) => ({ ...r, distType: massDistType as DistType }))
      })
      return copy
    })
    setDistTypeModal(false)
  }

  const renderStepContent = () => {
    if (step === 1)
      return (
        <StepOne
          epiRows={epiRows}
          checkedEpis={[checkedEpis, setCheckedEpis]}
          collabRows={collabRows as any}
          checkedCollabs={[checkedCollabs, setCheckedCollabs] as any}
          collabAppliedFilters={[collabAppliedFilters, setCollabAppliedFilters]}
          collabFiltersItems={collabFiltersItems}
          episSearch={episSearch}
          setEpisSearch={setEpisSearch}
          collabSearch={collabSearch}
          setCollabSearch={setCollabSearch}
          onApplyHierarchyPeople={(payload: any) => {
            // pode vir array de ids (árvore) ou objeto { q }
            if (Array.isArray(payload)) {
              setHierarchySelectedPeopleIds(payload)
            } else if (payload && typeof payload === 'object') {
              setHierarchySelectedPeopleIds(payload as any)
            } else {
              setHierarchySelectedPeopleIds([])
            }
          }}
          perfilFiltro={profileFilter}
          setPerfilFiltro={setProfileFilter}
        />
      )
    if (step === 2)
      return (
        <StepTwo
          search={search}
          setSearch={setSearch}
          filters={filters}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          distTypeModal={distTypeModal}
          setDistTypeModal={setDistTypeModal}
          massQtyModal={massQtyModal}
          setMassQtyModal={setMassQtyModal}
          simpleEpis={simpleEpis}
          massEpiChecked={massEpiChecked}
          setMassEpiChecked={setMassEpiChecked}
          massEpiSearch={massEpiSearch}
          setMassEpiSearch={setMassEpiSearch}
          massQtyByEpi={massQtyByEpi}
          setMassQtyByEpi={setMassQtyByEpi}
          applyMassQty={applyMassQty}
          massDistType={massDistType}
          setMassDistType={setMassDistType}
          applyMassDistType={applyMassDistType}
          details={details}
          checkedCollabs={checkedCollabs as any}
          mockEpis={epis}
          setDetail={setDetail}
          sizeValidationTriggered={sizeValidationTriggered}
          sizeValidationAttempt={sizeValidationAttempt}
          draftId={draftId}
        />
      )
    if (step === 3) {
      return (
        <StepThree
          details={details}
          checkedEpis={checkedEpis}
          checkedCollabs={checkedCollabs as any}
          mockCollaborators={collaborators as any}
          responsibleCollab={responsibleCollab as any}
          setResponsibleCollab={setResponsibleCollab as any}
          allowSignalMissing={allowSignalMissing}
          setAllowSignalMissing={setAllowSignalMissing}
          respDropdownOpen={respDropdownOpen}
          setRespDropdownOpen={setRespDropdownOpen}
          permDropdownOpen={permDropdownOpen}
          setPermDropdownOpen={setPermDropdownOpen}
          respSearch={respSearch}
          setRespSearch={setRespSearch}
          tempRespId={tempRespId}
          setTempRespId={setTempRespId}
          tempPerm={tempPerm}
          setTempPerm={setTempPerm}
          draftId={draftId}
          currentDraftId={currentDraftId}
          onUpsertDraft={upsertDraft}
        />
      )
    }
    return null
  }

  return (
    <Modal.Modal size='large' open style={{height: '720px', minWidth: '1400px'}}>
      <Modal.Header content='Nova Distribuição' color='blue' />
      {/* Toaster para notificações */}
      <Toaster position='bottom-right' />
      <Modal.Body>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Barra superior fixa com título e steps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              background: '#fff',
              zIndex: 2,
              padding: '0 0 12px 0',
              marginBottom: 12,
            }}
          >
            <p style={{ margin: 0 }}>
              {step === 2
                ? "Selecione a quantidade de EPI's para cada colaborador."
                : step === 3
                  ? "Seleciona o responsável pela distribuição dos EPI's aos colaboradores."
                  : "Selecione aqui os EPI's e os colaboradores da distribuição."}
            </p>
            <StepIndicators step={step} onStepClick={(target) => setStep(target)} />
          </div>

          {/* Conteúdo rolável abaixo da barra fixa */}
          <div style={{ flex: 1, minHeight: 0 }}>
            {renderStepContent()}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        buttonType='SemanticButton'
        actions={[
          <MwButton
            appearance='borderless'
            content='Cancelar'
            onClick={close}
          />,
          <Button
            key='advance'
            primary
            content={step < 3 ? 'Avançar' : 'Salvar'}
            onClick={onAdvance}
            disabled={!canAdvance}
          />,
        ]}
      />
    </Modal.Modal>
  )
}

export default CreateDistributionModal
