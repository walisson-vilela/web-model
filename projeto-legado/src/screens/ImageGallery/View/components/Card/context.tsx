import React, { createContext, useCallback, useState } from 'react'

import { getImage } from '../../service'

import { CardInterface } from './interface'

interface CardContextProps {
  cardProps: CardInterface
  flip: boolean
  rotate: number
  setRotate: React.Dispatch<React.SetStateAction<number>>
  flipCard: () => void
  loadingImage: boolean
  setLoadingImage: React.Dispatch<React.SetStateAction<boolean>>
  thumbnail: string
  handleGetImage: () => Promise<void>
}

interface CardProviderProps {
  cardProps: CardInterface
  children: React.ReactNode
}

export const CardContext = createContext({} as CardContextProps)

export const CardContextProvider = (props: CardProviderProps) => {
  const cardProps = props.cardProps
  const [flip, setFlip] = useState<boolean>(false)
  const [rotate, setRotate] = useState<number>()
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  const [thumbnail, setThumbnail] = useState<string>()

  const handleGetImage = useCallback(async () => {
    setLoadingImage(true)

    try {
      const base64 = await getImage(
        cardProps.card.id,
        cardProps.card.hash || '',
        560,
      )
      setThumbnail(base64)
    } catch (error) {
      console.error(error)
      setThumbnail(cardProps.card.url)
    }

    setLoadingImage(false)
  }, [cardProps.card.id, cardProps.card.hash, cardProps.card.url])

  const flipCard = () => {
    setFlip((prev) => !prev)
  }

  return (
    <CardContext.Provider
      value={{
        cardProps,
        flip,
        rotate,
        flipCard,
        setRotate,
        loadingImage,
        setLoadingImage,
        handleGetImage,
        thumbnail,
      }}
    >
      {props.children}
    </CardContext.Provider>
  )
}
