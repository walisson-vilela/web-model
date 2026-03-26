import React, { useCallback, useContext, useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Loader } from 'semantic-ui-react'

import Tabs from '../../../../../../components/Tabs'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { GalleryViewContext } from '../../../context'
import {
  AccordionImagesBodyInterface,
  DataInterface,
  DetailsProps,
} from '../../../interface'
import { cardDetails, getImage } from '../../../service'
import ZoomImage from '../ZoomImage'

import Collect from './components/Collect'
import Footer from './components/Footer'
import Register from './components/Register'
import FooterContext from './context'
import * as S from './style'

interface ZoomProps {
  card: AccordionImagesBodyInterface
  accordionId: number
}

interface TabOptionsInterface {
  label: string
  component: JSX.Element
}

interface StatusInterface {
  name: string
  value: number
}

const ZoomModal = (props: ZoomProps) => {
  const { card, accordionId } = props
  const { setOpenZoomModal, setOpenImageZoom, imagesData } =
    useContext(GalleryViewContext)

  const [loading, setLoading] = useState({
    details: false,
    thumb: false,
    rotate: false,
  })
  const [activeTab, setActiveTab] = useState<number>(0)
  const [data, setData] = useState<DataInterface[]>(imagesData)
  const [details, setDetails] = useState<DetailsProps>({} as DetailsProps)
  const [allCardsInfo, setAllCardsInfo] = useState<
    AccordionImagesBodyInterface[]
  >([])
  const [actualCard, setActualCard] = useState<AccordionImagesBodyInterface>()
  const [actualCardIndex, setActualCardIndex] = useState<number>()
  const [tabOptions, setTabOptions] = useState<TabOptionsInterface[]>([])
  const [isFirst, setIsFirst] = useState<boolean>(false)
  const [isLast, setIsLast] = useState<boolean>(false)
  const [status, setStatus] = useState<StatusInterface>()
  const [thumbnail, setThumbnail] = useState<string>('')

  const loadDetails = async () => {
    setLoading((prev) => ({ ...prev, details: true }))
    try {
      const response = await cardDetails(actualCard.id)
      setDetails(response)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, details: false }))
    }
  }

  const getAllCards = () => {
    const allCards = data.map(
      (section) =>
        section.accordionId == accordionId &&
        section.images.filter((cards) => {
          const hidden = cards.tags.find((item) => item.name == 'hidden')
          if (hidden.value == 0) {
            return cards
          }
        }),
    )
    const allCardsArray = allCards.flat(1).filter(Boolean)
    setAllCardsInfo(allCardsArray)
  }

  const getActualCard = () => {
    const cardActual = allCardsInfo.find((item) => item.id == card.id)
    setActualCard(cardActual)
  }

  const isFirtsCard = () => {
    const verify = allCardsInfo[0].id == actualCard.id
    if (verify) {
      setIsFirst(true)
    } else {
      setIsFirst(false)
    }
  }

  const isLastCard = () => {
    const index = allCardsInfo.findIndex((card) => card.id == actualCard.id)
    const verify = allCardsInfo.length - 1 == index
    if (verify) {
      setIsLast(true)
    } else {
      setIsLast(false)
    }
  }

  const image = actualCard
    ? {
        id: actualCard.id,
        hash: actualCard.hash,
      }
    : {
        id: card.id,
        hash: '',
      }

  const handleGetImage = useCallback(async () => {
    setLoading((prev) => ({ ...prev, thumb: true }))

    try {
      const base64 = await getImage(image.id, image.hash, 560)
      setThumbnail(base64)
    } catch (error) {
      console.error(error)
    }

    setLoading((prev) => ({ ...prev, thumb: false }))
    setThumbnail(actualCard.url)
  }, [image.id, image.hash])

  const handleNextImage = async () => {
    let cardIndex = allCardsInfo.findIndex((card) => card.id == actualCard.id)
    const nextCard = allCardsInfo[++cardIndex]

    setActualCard(nextCard)
  }

  const handlePreviousImage = async () => {
    let cardIndex = allCardsInfo.findIndex((card) => card.id == actualCard.id)
    const nextCard = allCardsInfo[--cardIndex]
    setActualCard(nextCard)
  }

  useEffect(() => {
    getAllCards()
  }, [data])

  useEffect(() => {
    if (actualCard != undefined) {
      loadDetails()
      isFirtsCard()
      isLastCard()
      let cardIndex = allCardsInfo.findIndex((card) => card.id == actualCard.id)
      setActualCardIndex(++cardIndex)
      const status = actualCard.tags.find((item) => item.name == 'status')
      setStatus(status)
    }
  }, [actualCard])

  useEffect(() => {
    if (actualCard && actualCard.id) {
      handleGetImage()
    }
  }, [handleGetImage, actualCard])

  useEffect(() => {
    if (actualCard != undefined) {
      setTabOptions([
        { label: 'Dados da Coleta', component: <Collect {...actualCard} /> },
        {
          label: 'Dados do Registro',
          component: (
            <Register
              name={actualCard.store.name}
              formatted_address={actualCard.store.formatted_address}
              details={details}
            />
          ),
        },
      ])
    }
  }, [details])

  useEffect(() => {
    getActualCard()
  }, [allCardsInfo])

  return (
    <FooterContext.Provider
      value={{
        loading,
        setLoading,
        handleGetImage,
        loadDetails,
      }}
    >
      <S.Container>
        <S.Header>{`Zoom (${actualCardIndex || ''} / ${
          allCardsInfo.length != 0 ? allCardsInfo.length : ''
        })`}</S.Header>
        <S.Main>
          {actualCard == undefined || tabOptions.length == 0 ? (
            <Loader />
          ) : (
            <S.Content>
              {!isFirst && (
                <S.Arrows className='left' onClick={handlePreviousImage}>
                  <MdKeyboardArrowLeft />
                </S.Arrows>
              )}

              <S.MainContent>
                <S.ContentImage>
                  {loading.thumb ? (
                    <S.Loader>
                      <Loader />
                    </S.Loader>
                  ) : (
                    <S.Image src={thumbnail} type={status && status.value} />
                  )}
                  <S.ImageFullScreen>
                    <img
                      src={`/assets/icons/image-gallery-tour/Zoom maximo.svg`}
                      onClick={() =>
                        setOpenImageZoom(
                          <S.GalleryModal
                            open
                            size='fullscreen'
                            children={
                              <ZoomImage
                                dateImage={[
                                  { url: thumbnail, id: actualCard.id },
                                ]}
                                imageId={actualCard.id}
                                storeName={actualCard.store.name}
                                cardHash={actualCard.hash}
                              />
                            }
                          />,
                        )
                      }
                    />
                  </S.ImageFullScreen>
                  <S.ImageOptions>
                    <Footer card={actualCard} accordionId={accordionId} />
                  </S.ImageOptions>
                </S.ContentImage>

                <S.ContentData>
                  <Tabs
                    options={tabOptions}
                    active={{
                      active: activeTab,
                      setActive: setActiveTab,
                    }}
                  />
                  {tabOptions[activeTab].component}
                </S.ContentData>
              </S.MainContent>

              {!isLast && (
                <S.Arrows className='right' onClick={handleNextImage}>
                  <MdKeyboardArrowRight />
                </S.Arrows>
              )}
            </S.Content>
          )}
        </S.Main>
        <S.Footer>
          <MwButton
            appearance='solid'
            content='OK'
            onClick={() => {
              setOpenZoomModal(<React.Fragment />)
            }}
          />
        </S.Footer>
      </S.Container>
    </FooterContext.Provider>
  )
}

export default ZoomModal
