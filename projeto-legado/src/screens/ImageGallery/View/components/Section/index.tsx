import React, { useContext, useEffect, useRef, useState } from 'react'

import { Grid, Loader } from 'semantic-ui-react'

import MwManagerContainer from '../../../../../components/ManagerContainer'
import { GalleryViewContext } from '../../context'
import { DataInterface } from '../../interface'
import { Card } from '../Card'

import { SectionProps } from './interfaces'
import * as S from './styles'

const Section = (props: SectionProps) => {
  const imageListRef = useRef()

  const { accordionId } = props
  const {
    columnsPerRow,
    imagesData,
    imagesLoading,
    loadImagesData,
    pageName,
    accordionCanLoad,
    ids,
    accordionData,
    appliedFilters,
    search,
    dateInterval,
  } = useContext(GalleryViewContext)

  const [currentImage, setCurrentImage] = useState<DataInterface>()
  const [dataIsLoaded, setIsDataLoaded] = useState<boolean>(false)

  const onScroll = () => {
    if (imageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = imageListRef.current
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        if (
          currentImage &&
          !currentImage.isLastPage &&
          accordionCanLoad.includes(Number(accordionId))
        ) {
          loadImagesData(
            accordionId,
            ids,
            pageName,
            ++currentImage.pagination,
            appliedFilters,
            search,
            dateInterval,
          )
        }
      }
    }
  }

  useEffect(() => {
    if (accordionCanLoad.includes(Number(accordionId)) && ids !== undefined) {
      setIsDataLoaded(true)
      loadImagesData(
        accordionId,
        ids,
        pageName,
        1,
        appliedFilters,
        search,
        dateInterval,
      )
    }
  }, [pageName, appliedFilters, search])

  useEffect(() => {
    const getImages = imagesData.find((item) => item.accordionId == accordionId)
    if (
      accordionCanLoad.includes(Number(accordionId)) &&
      dataIsLoaded === false &&
      getImages === undefined &&
      ids
    ) {
      setIsDataLoaded(true)
      loadImagesData(
        accordionId,
        ids,
        pageName,
        1,
        appliedFilters,
        search,
        dateInterval,
      )
    }
  }, [accordionCanLoad, ids])

  useEffect(() => {
    setCurrentImage(imagesData.find((item) => item.accordionId == accordionId))
  }, [imagesData])

  return (
    <MwManagerContainer>
      {imagesLoading && (
        <S.LoaderContainer>
          <Loader active />
        </S.LoaderContainer>
      )}
      <S.Counter>
        Exibindo{' '}
        {(currentImage && currentImage.images && currentImage.images.length) ||
          0}{' '}
        de um total de {(currentImage && currentImage.total_registries) || 0}{' '}
        imagens
      </S.Counter>
      <S.Container
        onScroll={onScroll}
        ref={imageListRef}
        qntAccordion={accordionData.map((item) => item.category.id).length}
      >
        <Grid columns={columnsPerRow === 3 ? 3 : 2} relaxed>
          <Grid.Row>
            {currentImage &&
            currentImage.images &&
            currentImage.images.length > 0
              ? currentImage.images.map((card) => {
                  return (
                    <Grid.Column key={card.id}>
                      <Card card={card} accordionId={accordionId} />
                    </Grid.Column>
                  )
                })
              : (appliedFilters.length > 0 || search.length > 0) && (
                  <S.EmptyMessage>
                    <span>
                      Nenhuma imagem encontrada com os filtros aplicados
                    </span>
                  </S.EmptyMessage>
                )}
          </Grid.Row>
        </Grid>
      </S.Container>
    </MwManagerContainer>
  )
}

export default Section
