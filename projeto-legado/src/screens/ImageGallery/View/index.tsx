import React, { useCallback, useEffect, useRef, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { Loader } from 'semantic-ui-react'

import MwManagerContainer from '../../../components/ManagerContainer'
import { ModalState } from '../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import { createRouteTab } from '../../../routes'

import { Accordion } from './components/Accordion'
import { CardInterface } from './components/Card/interface'
import Footer from './components/Footer'
import Header from './components/Header'
import { GalleryViewContext } from './context'
import { AccordionBodyInterface, DataInterface, ParamsProps } from './interface'
import { parserAccordion } from './parser'
import useImageGalleryContext, { ImageGalleryProvider } from './provider'
import { getAllAccordionImages, getAllTour, rotateImage } from './service'
import * as S from './styles'

export const ImageView = createRouteTab<{ id: string }>((props) => {
  const {
    data: { route },
  } = props

  const accordionListRef = useRef()
  const accordionPosition = useRef()

  const { id } = route.match.params

  const [ids, setIds] = useState<string>('')
  const [dateInterval, setDateInterval] = useState<string>('')
  const [pageName, setPageName] = useState<string>('')

  const [accordionPage, setAccordionPage] = useState<number>(1)
  const [isAccordionsLastPage, setIsAccordionsLastPage] = useState(false)

  const [accordionLoading, setAccordionLoading] = useState(true)

  const [accordionData, setAccordionData] = useState<AccordionBodyInterface[]>(
    [],
  )
  const [imagesData, setImagesData] = useState<DataInterface[]>([])

  const [totalImages, setTotalImages] = useState(0)

  const [checkedImage, setCheckedImage] = useState<CardInterface[]>([])

  const [checkedAccordion, setCheckedAccordion] = useState<number[]>([])
  const [accordionCanLoad, setAccordionCanLoad] = useState<number[]>([])

  const [openedAccordions, setOpenedAccordions] = useState<number[]>([])

  const [openZoomModal, setOpenZoomModal] = useState<JSX.Element>(
    <React.Fragment />,
  )
  const [openImageZoom, setOpenImageZoom] = useState<JSX.Element>(
    <React.Fragment />,
  )

  const [statusModal, setStatusModal] = useState<ModalState | JSX.Element>(
    <React.Fragment />,
  )

  const [imagesLoading, setImagesLoading] = useState(false)

  const {
    appliedFilters: [appliedFilters, setAppliedFilters],
    columnsPerRow: [columnsPerRow, setColumnsPerRow],
    search: [search, setSearch],
    closeTab,
  } = useImageGalleryContext()

  const handleToggleOppenedAccordion = (id: number) => {
    if (openedAccordions.includes(id)) {
      setOpenedAccordions((prev) =>
        prev.filter((accordionId) => accordionId != id),
      )
    } else {
      setOpenedAccordions((prev) => [...prev, id])
    }
  }

  const handleOpenAllAcordion = () => {
    accordionData.map((accordion) => {
      setOpenedAccordions((prev) => [...prev, accordion.category.id])
    })
  }

  const handleCloseAllAcordion = () => {
    setOpenedAccordions([])
  }

  const handleCheckImage = (card: CardInterface) => {
    const image = checkedImage.find(
      (item) =>
        item.accordionId == card.accordionId && item.card.id == card.card.id,
    )
    if (image !== undefined) {
      setCheckedImage((prev) =>
        prev.filter((item) => item.card.id != image.card.id),
      )
    } else {
      setCheckedImage((prev) => [...prev, card])
    }
  }

  const handleCheckAllImages = () => {
    imagesData.map((item) => {
      setCheckedAccordion((prev) => [...prev, item.accordionId])
      item.images.map((image) => {
        const card: CardInterface = {
          accordionId: item.accordionId,
          card: image,
        }
        setCheckedImage((prev) => [
          ...prev.filter((image) => image.card.id != card.card.id),
          card,
        ])
      })
    })
  }

  const handleToggleCheckAllAccordionImages = (accordionId: number) => {
    const allImages = imagesData.filter(
      (image) => image.accordionId == accordionId && image.images,
    )

    if (checkedAccordion.find((item) => item == accordionId)) {
      imagesData.map((item) => {
        item.accordionId == accordionId &&
          setCheckedAccordion((prev) => [
            ...prev.filter((item) => item != accordionId),
          ])
      })

      allImages.map((image) =>
        image.images.map((image) => {
          const card: CardInterface = {
            accordionId: accordionId,
            card: image,
          }
          setCheckedImage((prev) => [
            ...prev.filter((image) => image.card.id != card.card.id),
          ])
        }),
      )
    } else {
      imagesData.map((item) => {
        item.accordionId == accordionId &&
          setCheckedAccordion((prev) => [...prev, item.accordionId])
      })

      allImages.map((image) => {
        image.images.map((image) => {
          const card: CardInterface = {
            accordionId: accordionId,
            card: image,
          }
          setCheckedImage((prev) => [
            ...prev.filter((image) => image.card.id != card.card.id),
            card,
          ])
        })
      })
    }
  }

  const handleUnCheckAll = () => {
    setCheckedAccordion([])
    setCheckedImage([])
  }

  const handleToogleHidden = (
    hidden: number,
    cardId: number,
    accordionId: number,
  ) => {
    const accordion = imagesData.find((item) => item.accordionId == accordionId)
    const imageIndex = accordion.images.findIndex((image) => image.id == cardId)
    const image = accordion.images.find((image) => image.id == cardId)
    image.tags.find((item) => item.name == 'hidden').value = hidden

    accordion.images.splice(imageIndex, 1, image)

    setImagesData((prev) => [
      ...prev.filter((item) => item.accordionId != accordionId),
      accordion,
    ])
  }

  const handleToogleStatus = (
    id: number,
    status: number,
    accordionId: number,
  ) => {
    const accordion = imagesData.find((item) => item.accordionId == accordionId)
    const imageIndex = accordion.images.findIndex((image) => image.id == id)
    const image = accordion.images.find((image) => image.id == id)
    image.tags.find((item) => item.name == 'status').value = status

    accordion.images.splice(imageIndex, 1, image)

    setImagesData((prev) => [
      ...prev.filter((item) => item.accordionId != accordionId),
      accordion,
    ])
  }

  const handleRotateImage = async (
    cardId: number,
    accordionId: number,
    direction: string,
  ) => {
    const { data } = await rotateImage(cardId, direction)

    const accordion = imagesData.find((item) => item.accordionId == accordionId)
    const imageIndex = accordion.images.findIndex(
      (image) => image.id == parseFloat(id),
    )
    const image = accordion.images.find((image) => image.id == parseFloat(id))
    image.hash = data.hash

    accordion.images.splice(imageIndex, 1, image)

    setImagesData((prev) => [
      ...prev.filter((item) => item.accordionId != accordionId),
      accordion,
    ])
  }

  const reloadData = () => {
    setAccordionData([])
    setImagesData([])
    accordionPage === 1 ? loadAccordionData() : setAccordionPage(1)
  }

  const onScroll = () => {
    if (accordionListRef.current) {
      getscroll()
      const { scrollTop, scrollHeight, clientHeight } = accordionListRef.current
      if (scrollTop + clientHeight + 1 === scrollHeight) {
        if (!isAccordionsLastPage) setAccordionPage((prev) => (prev += 1))
      }
    }
  }

  const loadImagesData = useCallback(
    async (
      accordionId,
      allIds,
      pageName,
      imagePage,
      filters,
      search,
      dateInterval,
    ) => {
      if (pageName) {
        setImagesLoading(true)
        try {
          const response = await getAllAccordionImages(
            accordionId,
            allIds,
            filters,
            search,
            dateInterval,
            pageName,
            imagePage,
          )

          const { has_next_page = false, count: total_registries = 0 } =
            response.pagination || {}

          const results = response.data || []

          setImagesData((prev) =>
            imagePage === 1
              ? [
                  ...prev.filter((item) => item.accordionId != accordionId),
                  parserAccordion(
                    Number(accordionId),
                    results,
                    imagePage,
                    !has_next_page,
                    total_registries,
                  ),
                ]
              : [
                  ...prev.filter((item) => item.accordionId != accordionId),
                  parserAccordion(
                    Number(accordionId),
                    prev
                      .find((item) => item.accordionId == accordionId)
                      .images.concat(results),
                    imagePage,
                    !has_next_page,
                    total_registries,
                  ),
                ],
          )
        } catch (error) {
          console.log(error)
        } finally {
          setImagesLoading(false)
        }
      }
    },
    [],
  )

  const loadAccordionData = useCallback(async () => {
    setAccordionLoading(true)
    try {
      await getAllTour(
        ids.split(','),
        dateInterval,
        pageName,
        accordionPage,
      ).then((response) => {
        const { has_next_page = false } = response.pagination || {}
        setIsAccordionsLastPage(!has_next_page)
        const results = response.data || []

        const ids = response.data.map((item) => item.category.id)

        ids.map((id) => handleToggleOppenedAccordion(Number(id)))
        setAccordionCanLoad([ids[0]])
        setAccordionData((prev) => prev.concat(results))
      })
    } catch (error) {
      console.log(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setAccordionLoading(false)
    }
  }, [ids, accordionPage])

  useEffect(() => {
    imagesData.map((item) =>
      checkedImage.filter((image) => image.accordionId == item.accordionId)
        .length == item.images.length
        ? setCheckedAccordion((prev) => [...prev, item.accordionId])
        : setCheckedAccordion((prev) => [
            ...prev.filter((i) => i !== item.accordionId),
          ]),
    )
  }, [checkedImage])

  useEffect(() => {
    setTotalImages(
      accordionData.reduce((acc, item) => acc + item.file_count, 0),
    )
  }, [accordionData])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`image-gallery-tour/${id}`))

    setAppliedFilters([])
    setSearch('')
    setColumnsPerRow(3)

    if (!data) {
      closeTab(`/main/stores/home`)

      return
    }

    const { appliedFilters, finalDate, ids, initialDate, name }: ParamsProps =
      data

    setIds(ids)
    setDateInterval(
      `created_at[]=${initialDate.trim()}&created_at[]=${finalDate.trim()}`,
    )
    setPageName(name)
    setAccordionData([])
    setImagesData([])
  }, [id])

  useEffect(() => {
    setImagesData([])
  }, [appliedFilters])

  useEffect(() => {
    if (pageName.length > 1 && ids.length > 1) {
      loadAccordionData()
    }
  }, [loadAccordionData])

  const getscroll = () => {
    if (accordionPosition && accordionPosition.current) {
      const scroll = Math.abs(
        //@ts-ignore
        accordionPosition.current.getBoundingClientRect().top -
          //@ts-ignore
          accordionPosition.current.offsetTop,
      )

      if (scroll <= 234) {
        setAccordionCanLoad((prev) => [
          ...prev.filter(
            //@ts-ignore
            (item) => item !== Number(accordionPosition.current.id),
          ),
          //@ts-ignore
          Number(accordionPosition.current.id),
        ])
      }
    }
  }

  return (
    <GalleryViewContext.Provider
      value={{
        accordionData,
        totalImages,
        appliedFilters,
        columnsPerRow,
        reloadData,
        search,
        setAppliedFilters,
        setColumnsPerRow,
        setSearch,
        handleOpenAllAcordion,
        handleToggleOppenedAccordion,
        openedAccordions,
        handleCloseAllAcordion,
        handleToogleHidden,
        handleToogleStatus,
        checkedImage,
        handleCheckImage,
        handleCheckAllImages,
        handleUnCheckAll,
        checkedAccordion,
        setOpenZoomModal,
        setOpenImageZoom,
        handleRotateImage,
        handleToggleCheckAllAccordionImages,
        setStatusModal,
        dateInterval,
        pageName,
        setImagesData,
        imagesData,
        imagesLoading,
        loadImagesData,
        accordionCanLoad,
        ids,
      }}
    >
      {openImageZoom}
      <MwManagerContainer>
        <Header />
        <S.Main onScroll={onScroll} ref={accordionListRef}>
          {accordionLoading && accordionCanLoad.length === 0 && (
            <S.LoaderContainer>
              <Loader active />
            </S.LoaderContainer>
          )}
          <div>
            {accordionData.map((item) => (
              <div
                ref={accordionPosition}
                key={item.category.id}
                id={item.category.id.toString()}
              >
                <Accordion accordionData={item} />
              </div>
            ))}
          </div>
        </S.Main>
        {statusModal as JSX.Element}
        {checkedImage.length > 0 && <Footer />}
        {openZoomModal}
        <Toaster position='bottom-right' />
      </MwManagerContainer>
    </GalleryViewContext.Provider>
  )
}, ImageGalleryProvider)
