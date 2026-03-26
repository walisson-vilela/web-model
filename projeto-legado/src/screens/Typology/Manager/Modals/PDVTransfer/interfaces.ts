export type PDV = {
  id: number
  name: string
  formatted_address: string
}

export type Typology = {
  id: number
  default_id: number | null
  name: string
}

export interface ITransferPDV {
  left: [PDV[], React.Dispatch<React.SetStateAction<PDV[]>>]
  right: [
    Typology | null,
    React.Dispatch<React.SetStateAction<Typology | null>>,
  ]
  typology: Typology
}

export interface IPDVTransfer {
  onClose: () => void
  reload: () => void
  typology: Typology
}
