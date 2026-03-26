import React from 'react'
import { useDispatch } from 'react-redux'
import Popup from '../../../../../../../components/ManagerColumnPopup'
import { fetchDraftMissingEpis } from '../../../../../../../redux/actions/EpiDistribuitonsActions'

interface DistributionSummaryProps {
  tipoCount: number
  totalQty: number
  collabCount: number
  responsibleCollab: { id: number; name: string; role?: string } | null
  details?: Record<number, { epiId: number; epiName: string; size: string; distType: string; qty: number }[]>
  epiMissingCount?: number
  draftId?: number
}

const DistributionSummary: React.FC<DistributionSummaryProps> = ({
  tipoCount,
  totalQty,
  collabCount,
  responsibleCollab,
  details,
  epiMissingCount = 0,
  draftId,
}) => {
  const dispatch = useDispatch()

  // Somente EPIs faltantes vindos da API; sempre recarregar ao abrir o popup
  const [popupSearch, setPopupSearch] = React.useState('')

  const getPopupContent = async () => {
    // buscar dados ao abrir e retornar conteúdo com base nos dados locais
    let mapped: { epiName: string; size: string; qty: number }[] = []

    if (draftId) {
      try {
        const resp: any = await dispatch<any>(fetchDraftMissingEpis(draftId))
        const arr = Array.isArray(resp?.data) ? resp.data : []
        mapped = arr.map((x: any) => ({
          epiName: x.epi || 'EPI',
          size: x.size || '',
          qty: Number(x.total_missing ?? 0),
        }))
      } catch {
        mapped = []
      }
    }

    const filtered = mapped.filter(
      (d) =>
        d.epiName.toLowerCase().includes(popupSearch.toLowerCase()) ||
        d.size.toLowerCase().includes(popupSearch.toLowerCase())
    )

    return (
      <div style={{ width: 520 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 18px 12px' }}>
          <h4 style={{ margin: 0, flex: 1 }}>Lista de EPI's em falta</h4>
        </div>

        <PopupEpiList data={filtered} loading={false} />
      </div>
    )
  }

  return (
    <div style={{ color: '#000000CC', marginTop: 24, borderTop: '1px solid #e5e5e5', paddingTop: 24, marginLeft: '-20px', marginRight: '-20px', paddingLeft: '24px', paddingRight: '24px' }}>
      <h4 style={{ margin: '0 0 12px' }}>Resumo</h4>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div style={{ border: '2px solid #e5e5e5', borderRadius: 4, padding: 16, width: 132, minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Tipo de EPI's</div>
          <div style={{ marginTop: 12, fontSize: 22, fontWeight: 600, textAlign: 'center' }}>{tipoCount}</div>
        </div>
        <div style={{ border: '2px solid #e5e5e5', borderRadius: 4, padding: 16, width: 132, minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>EPI's</div>
          <div style={{ marginTop: 12, fontSize: 22, fontWeight: 600, textAlign: 'center' }}>{totalQty}</div>
        </div>
        <div style={{ border: '2px solid #e5e5e5', borderRadius: 4, padding: 16, width: 132, minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Colaboradores</div>
          <div style={{ marginTop: 12, fontSize: 22, fontWeight: 600, textAlign: 'center' }}>{collabCount}</div>
        </div>
        <div style={{ border: '2px solid #e5e5e5', borderRadius: 4, padding: 16, width: 'auto', minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            Distribuído por
          </div>
          <div style={{ marginTop: 12, fontSize: 15, fontWeight: 600 }}>
            {responsibleCollab ? responsibleCollab.name : '----'}
          </div>
        </div>
        <div style={{ border: '2px solid #e5e5e5', borderRadius: 4, padding: 16, width: 152, minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignContent: 'center', alignItems:  'center' }}>EPI's em falta
            {epiMissingCount > 0 && (
              <Popup
                on='click'
                position='left center'
                offset={[0, 8]}
                style={{ padding: 0 }}
                trigger={<span style={{ marginLeft: 8, cursor: 'pointer', display: 'inline-flex', width: 16, height: 16, borderRadius: '50%', border: '2px solid #000', background: '#fff', color: '#000', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 600 }}>i</span>}
                getContent={getPopupContent}
              />
            )}
          </div>
          <div style={{ marginTop: 12, fontSize: 22, fontWeight: 600, textAlign: 'center' }}>{epiMissingCount}</div>
        </div>
      </div>
    </div>
  )
}

// Popup content component
const PopupEpiList: React.FC<{ data: { epiName: string; size: string; qty: number }[]; loading: boolean }> = ({ data, loading }) => {
  return (
    <div style={{ padding: '0' }}>
      <div style={{ maxHeight: 260, overflowY: 'auto', border: '1px solid #e5e5e5'}}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '14px 12px', fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>EPI</th>
              <th style={{ textAlign: 'left', padding: '14px 12px', width: 110, fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>Tamanho</th>
              <th style={{ textAlign: 'right', padding: '14px 12px', width: 120, fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>Qtde. faltante</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={3} style={{ padding: '16px 12px', textAlign: 'center' }}>Carregando...</td></tr>
            )}
            {data.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>{r.epiName}</td>
                <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>{r.size || '-'}</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', verticalAlign: 'middle' }}>
                  <span style={{ display: 'inline-flex', minWidth: 42, justifyContent: 'center', background: '#F5F5F5', color: '#333', fontWeight: 600, padding: '0px 6px', borderRadius: 16, fontSize: 12, letterSpacing: '.5px', boxShadow: '0 4px 5px rgba(0,0,0,0.12)' }}>{r.qty}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DistributionSummary
