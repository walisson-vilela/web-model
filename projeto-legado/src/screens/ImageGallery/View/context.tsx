import React, { createContext } from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { ModalState } from '../../../components/MwModal'

import { CardInterface } from './components/Card/interface'
import { AccordionBodyInterface, DataInterface } from './interface'

interface GalleryViewContextProps {
  totalImages: number
  dateInterval: string
  pageName: string
  accordionData: AccordionBodyInterface[]
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  setAppliedFilters: React.Dispatch<
    React.SetStateAction<FiltersInterfaces.AppliedFilter[]>
  >
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  columnsPerRow: number
  setColumnsPerRow: React.Dispatch<React.SetStateAction<number>>
  reloadData: () => void
  openedAccordions: number[]
  handleToggleOppenedAccordion: (id: number) => void
  handleOpenAllAcordion: () => void
  handleCloseAllAcordion: () => void
  handleToogleHidden: (
    hidden: number,
    cardId: number,
    accordionId: number,
  ) => void
  handleToogleStatus: (id: number, status: number, accordionId: number) => void
  handleCheckImage: (card: CardInterface) => void
  checkedImage: CardInterface[]
  handleCheckAllImages: () => void
  handleUnCheckAll: () => void
  checkedAccordion: number[]
  setOpenZoomModal: React.Dispatch<React.SetStateAction<JSX.Element>>
  setOpenImageZoom: React.Dispatch<React.SetStateAction<JSX.Element>>
  handleRotateImage: (
    cardId: number,
    accordionId: number,
    direction: string,
  ) => Promise<void>
  handleToggleCheckAllAccordionImages: (accordionId: number) => void
  setStatusModal: React.Dispatch<React.SetStateAction<ModalState>>
  setImagesData: React.Dispatch<React.SetStateAction<DataInterface[]>>
  imagesData: DataInterface[]
  loadImagesData: (
    accordionId: number,
    allIds: string,
    pageName: string,
    imagePage: number,
    filters: FiltersInterfaces.AppliedFilter[],
    search: string,
    dateInterval: string,
  ) => Promise<void>
  imagesLoading: boolean
  accordionCanLoad: number[]
  ids: string
}

export const GalleryViewContext = createContext({} as GalleryViewContextProps)
