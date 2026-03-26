import { ModalState } from '../../../../components/MwModal'
import { SetState } from '../../../interfaces'

export interface DownloadIMGProps {
  ids: number[]
  setModal: SetState<ModalState>
  reload?: () => void
  numberOfImages: number
}

interface Fields {
  datetime: string //: Data / Hora,
  id: number //: ID Imagem,
  token: string //: Token,
  status: string //: Status (Aprovada / Reprovada),
  reason_name: string //: Motivos do Status,
  store_id: number //: Código PDV,
  store_name: string //: PDV,
  store_segment_name: string //: Canal,
  store_market_flag_name: string //: Bandeira,
  store_document: string //: CNPJ,
  store_street: string //: Logradouro,
  store_sublocality: string //: Bairro,
  store_city: string //: Cidade,
  store_state: string //: Estado,
  store_postal_code: string //: CEP,
  executor_id: string //: Matricula Executor,
  executor_name: string //: Executor,
  executor_supervisor_name: string //: Superior Direto,
  product_category_name: string //: Categoria,
  product_type: string //: Tipo do Produto,
  product_id: number // Código do Produto,
  product_name: string // Produto,
}
