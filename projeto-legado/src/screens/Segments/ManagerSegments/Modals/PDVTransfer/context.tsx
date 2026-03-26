import React, { SetStateAction, createContext } from 'react'

import { ModalState } from '../../../../../components/MwModal'
import { BodyInterface } from '../../interfaces'

import { Segment, Store } from './interfaces'

interface TransferProducsData {
  selectedSegment: Segment | null
  setSelectedSegment: React.Dispatch<SetStateAction<Segment | null>>
  selectedStore: Store[]
  setSelectedStore: React.Dispatch<SetStateAction<Store[]>>
  item: BodyInterface
}

export interface ComponentProps {
  setOpenedModal?: React.Dispatch<SetStateAction<ModalState>>
  item: BodyInterface
  handleLoadData: () => Promise<void>
}

const Context = createContext({} as TransferProducsData)

export default Context
