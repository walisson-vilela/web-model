import { Toolbar } from '@mw-kit/mw-manager'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dropdown, Loader as SemanticLoader } from 'semantic-ui-react'
import * as Modals from '..'
import { viewEpiDraftDistribution } from '../../../../../../../redux/actions/EpiDistribuitonsActions'
import { fetchEPITypes } from '../../../../../../../redux/actions/EPIWarehouseActions'
import type { DistributionTypeValue } from '../DistributionType'
import type { SimpleEpi } from '../MassQuantity'
import EpiDistributionList, { type DistType } from './EpiDistributionList'

// Types replicating parent context
interface StepTwoProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  filters: any[]
  appliedFilters: any[]
  setAppliedFilters: React.Dispatch<React.SetStateAction<any[]>>
  distTypeModal: boolean
  setDistTypeModal: React.Dispatch<React.SetStateAction<boolean>>
  massQtyModal: boolean
  setMassQtyModal: React.Dispatch<React.SetStateAction<boolean>>
  simpleEpis: SimpleEpi[]
  massEpiChecked: { id: number; name: string }[]
  setMassEpiChecked: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>
  massEpiSearch: string
  setMassEpiSearch: React.Dispatch<React.SetStateAction<string>>
  massQtyByEpi: Record<number, number>
  setMassQtyByEpi: React.Dispatch<React.SetStateAction<Record<number, number>>>
  applyMassQty: () => void
  massDistType: DistributionTypeValue
  setMassDistType: React.Dispatch<React.SetStateAction<DistributionTypeValue>>
  applyMassDistType: () => void
  details: Record<number, { epiId: number; epiName: string; size: string; distType: DistType; qty: number }[]>
  checkedCollabs: { id: number; name: string; role: string; area: string }[]
  mockEpis: { id: number; name: string; sizes: string[] }[]
  setDetail: (collabId: number, epiId: number, patch: Partial<{ epiId: number; epiName: string; size: string; distType: DistType; qty: number }>) => void
  sizeValidationTriggered: boolean
  sizeValidationAttempt: number
  draftId?: number
}

const StepTwo: React.FC<StepTwoProps> = ({
  search,
  setSearch,
  distTypeModal,
  setDistTypeModal,
  massQtyModal,
  setMassQtyModal,
  simpleEpis,
  massEpiChecked,
  setMassEpiChecked,
  massEpiSearch,
  setMassEpiSearch,
  massQtyByEpi,
  setMassQtyByEpi,
  applyMassQty,
  massDistType,
  setMassDistType,
  applyMassDistType,
  details,
  checkedCollabs,
  mockEpis,
  setDetail,
  sizeValidationTriggered,
  sizeValidationAttempt,
  draftId,
}) => {
  // local state to hold sizes map fetched from backend
  const [sizesByEpiId, setSizesByEpiId] = useState<Record<number, string[]>>({})
  const [loadingSizes, setLoadingSizes] = useState(false)
  const [draftDistribution, setDraftDistribution] = useState<any>(null)
  const dispatch = useDispatch()
  const autoFillAppliedRef = useRef(false)

  // Fetch sizes from backend (epi-types with contain Epis) once
  useEffect(() => {
    let ignore = false
    const loadSizes = async () => {
      setLoadingSizes(true)
      try {
        const resp: any = await dispatch<any>(fetchEPITypes({ contain: 'Epis', limit: 99999 }))
        const raw = Array.isArray(resp?.data) ? resp.data : (resp?.results || [])
        const map: Record<number, string[]> = {}
        raw.forEach((t: any) => {
          const id = t.id
          const sizes = Array.isArray(t?.Epis)
            ? t.Epis.map((x: any) => x.size).filter(Boolean)
            : Array.isArray(t?.epis)
              ? t.epis.map((x: any) => x.size).filter(Boolean)
              : Array.isArray(t?.epi_type?.epis)
                ? t.epi_type.epis.map((x: any) => x.size).filter(Boolean)
                : ( [])
          map[id] = sizes
        })
        if (!ignore) setSizesByEpiId(map)
      } catch (e) {
        console.error('Erro ao buscar tamanhos dos EPIs', e)
        if (!ignore) {
          const fallback: Record<number, string[]> = Object.fromEntries(
            mockEpis.map((e) => [e.id,[] ]),
          )
          setSizesByEpiId(fallback)
        }
      } finally {
        if (!ignore) setLoadingSizes(false)
      }
    }
    loadSizes()
    return () => {
      ignore = true
    }
  }, [dispatch, mockEpis])

  // Dispara view da distribuição ao montar se houver draftId
  useEffect(() => {
    if (!draftId) return
    let ignore = false
    const load = async () => {
      try {
        const resp: any = await dispatch<any>(viewEpiDraftDistribution(draftId))
        if (!ignore) setDraftDistribution(resp?.data || resp)
      } catch (e) {
        console.error('Erro ao buscar draft distribution (view)', e)
      }
    }
    load()
    return () => { ignore = true }
  }, [dispatch, draftId])

  // Preenche tamanhos faltantes usando epi_people_default_sizes
  useEffect(() => {
    if (autoFillAppliedRef.current) return
    if (!draftDistribution) return
    // Estrutura de peoples dentro do draft
    const peoples = draftDistribution?.data?.epi_draft_distribution_peoples || draftDistribution?.epi_draft_distribution_peoples || []
    if (!Array.isArray(peoples) || peoples.length === 0) return

    let anyFilled = false

    peoples.forEach((p: any) => {
      const personId = p?.people_id || p?.person?.id
      if (!personId) return
      // Mapa defaultSizes por epi_type_id
      const defaultSizesArr = p?.person?.epi_people_default_sizes || []
      const epiTypeToSize: Record<number, string> = {}
      if (Array.isArray(defaultSizesArr)) {
        defaultSizesArr.forEach((ds: any) => {
          const epiTypeId = ds?.epi?.epi_type?.id || ds?.epi_type_id || ds?.epi_type?.id
          const sizeVal = ds?.epi?.size || ds?.size
          if (epiTypeId && sizeVal && !epiTypeToSize[epiTypeId]) {
            epiTypeToSize[epiTypeId] = String(sizeVal)
          }
        })
      }
      const rows = details[personId]
      if (!rows) return
      rows.forEach((r) => {
        if (!r.size) {
          const fillSize = epiTypeToSize[r.epiId]
          if (fillSize) {
            setDetail(personId, r.epiId, { size: fillSize })
            anyFilled = true
          }
        }
      })
    })

    if (anyFilled) autoFillAppliedRef.current = true
  }, [draftDistribution, details, setDetail])

  // distType options unchanged
  const distTypeOptions: { key: DistType; text: DistType; value: DistType }[] = React.useMemo(
    () => [
      { key: 'Substituição', text: 'Substituição', value: 'Substituição' },
      { key: 'Nova Distribuição', text: 'Nova Distribuição', value: 'Nova Distribuição' },
    ],
    [],
  )

  const selectedEpiIds = React.useMemo(() => {
    const ids = new Set<number>()
    Object.values(details).forEach((arr) => {
      arr.forEach((d) => d.epiId && ids.add(d.epiId))
    })
    return Array.from(ids)
  }, [details])

  return (
    <div style={{ paddingTop: 0 }}>
      <Toolbar
        search={{ search, setSearch }}
        loading={loadingSizes}
      >
        <Dropdown icon='ellipsis vertical' pointing='top left' className='link item'>
          <Dropdown.Menu>
            <Dropdown.Item text='Tipo de Distribuição' onClick={() => setDistTypeModal(true)} />
            <Dropdown.Item text='Qtde. em Massa' onClick={() => setMassQtyModal(true)} />
          </Dropdown.Menu>
        </Dropdown>
      </Toolbar>
      {loadingSizes ? (
          <SemanticLoader active inline='centered' />
      ) : (
          <EpiDistributionList
            collabs={checkedCollabs}
            search={search}
            details={details}
            sizesByEpiId={sizesByEpiId}
            distTypeOptions={distTypeOptions}
            onSetDetail={setDetail}
            sizeValidationTriggered={sizeValidationTriggered}
            sizeValidationAttempt={sizeValidationAttempt}
          />
      )}
      {massQtyModal && (
        <Modals.MassQuantity
          close={() => setMassQtyModal(false)}
          epis={simpleEpis}
          selected={[massEpiChecked, setMassEpiChecked]}
          search={[massEpiSearch, setMassEpiSearch]}
          qtyByEpi={[massQtyByEpi, setMassQtyByEpi]}
          onSave={applyMassQty}
          filterIds={selectedEpiIds}
        />
      )}
      {distTypeModal && (
        <Modals.DistributionType
          close={() => setDistTypeModal(false)}
          value={[massDistType, setMassDistType]}
          onSave={applyMassDistType}
        />
      )}
    </div>
  )
}

export default StepTwo
