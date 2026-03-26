import React, { useContext, useEffect, useState } from 'react'

import { Loader } from 'semantic-ui-react'

import { DetailsProps } from '../../../../interface'
import { cardDetails } from '../../../../service'
import { ImageDetails } from '../../../Details'
import { CardContext } from '../../context'

import * as S from './styles'

export const CardBack = () => {
  const { cardProps, flip } = useContext(CardContext)
  const { card } = cardProps

  const [loadingDetails, setLoadingDetails] = useState<boolean>(true)
  const [data, setData] = useState<DetailsProps>({} as DetailsProps)

  const loadDetails = async () => {
    setLoadingDetails(true)
    try {
      const response = await cardDetails(card.id)
      setData(response)
    } catch (error) {
    } finally {
      setLoadingDetails(false)
    }
  }

  useEffect(() => {
    if (flip) {
      loadDetails()
    }
  }, [flip])

  return (
    <S.Container>
      {loadingDetails ? (
        <S.LoaderContainer>
          <Loader active />
        </S.LoaderContainer>
      ) : (
        <ImageDetails data={data} />
      )}
    </S.Container>
  )
}
