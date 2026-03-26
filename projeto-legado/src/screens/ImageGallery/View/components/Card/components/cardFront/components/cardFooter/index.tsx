import React, { useContext, useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import fileDownload from 'js-file-download'
import toast from 'react-hot-toast'
import { Popup } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import axios from '../../../../../../../../../services/Axios'
import { GalleryViewContext } from '../../../../../../context'
import {
  approvationImage,
  blockImageAccess,
  rotateImage,
} from '../../../../../../service'
import Confirmation from '../../../../../Popup/Confirmation'
import Favorite from '../../../../../Popup/Favorite'
import { StatusData } from '../../../../../Popup/Favorite/interface'
import PopUpSelectConfirmation from '../../../../../Popup/SelectConfirmation'
import { CardContext } from '../../../../context'

import * as S from './styles'

export const CardFooter = () => {
  const { columnsPerRow, handleToogleHidden, handleToogleStatus } =
    useContext(GalleryViewContext)
  const { cardProps, setLoadingImage, handleGetImage } = useContext(CardContext)
  const { card, accordionId } = cardProps

  const [loading, setLoading] = useState({
    download: false,
    blockImage: false,
    rotateImage: false,
  })

  const [popUpOpen, setPopUpOpen] = useState({
    thumbsUp: false,
    thumbsDown: false,
    favorite: false,
  })

  const thumbs = card.tags.find((item) => item.name === 'status')
  const cardFavorited = card.tags.find((item) => item.name === 'favorited')
  const cardIsHidden = card.tags.find((item) => item.name === 'hidden')
  const isHidden = cardIsHidden && cardIsHidden.value === 0 ? false : true

  const handleClose = (key: 'thumbsUp' | 'thumbsDown') => {
    setPopUpOpen((prev) => ({ ...prev, [key]: false }))
  }

  const exportFile = async () => {
    setLoading((prev) => ({ ...prev, download: true }))
    setLoadingImage(true)
    try {
      const request = await axios.get(`/v1/files/download/${card.id}`, {
        responseType: 'blob',
      })
      fileDownload(request.data, `${card.name}`)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, download: false }))
      setLoadingImage(false)
    }
  }

  const blockAccess = async (hidden: number) => {
    setLoading((prev) => ({ ...prev, blockImage: true }))
    setLoadingImage(true)
    try {
      await blockImageAccess(card.id, hidden).then(() => {
        handleToogleHidden(hidden, card.id, accordionId)
      })
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, blockImage: false }))
      setLoadingImage(false)
    }
  }

  const handleRemoveConfirmation = async (id: number) => {
    try {
      const parsed = {
        ids: [id],
        status: 0,
      }

      await approvationImage(parsed).then(() => {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        setPopUpOpen((prev) => ({
          ...prev,
          thumbsUp: false,
          thumbsDown: false,
        }))
        handleToogleStatus(id, parsed.status, accordionId)
        return true
      })
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      return false
    }
  }

  const handleConfirmation = async (id: number, status: StatusData) => {
    try {
      await approvationImage(status).then(() => {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        setPopUpOpen((prev) => ({
          ...prev,
          thumbsUp: false,
          thumbsDown: false,
        }))
        handleToogleStatus(id, status.status, accordionId)
      })
      return true
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      return false
    }
  }

  const handleRotateImage = async (direction: string) => {
    setLoading((prev) => ({ ...prev, rotateImage: true }))
    setLoadingImage(true)
    try {
      const { data } = await rotateImage(card.id, direction)
      card.hash = data.hash
      await handleGetImage()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading((prev) => ({ ...prev, rotateImage: false }))
      setLoadingImage(false)
    }
  }

  return (
    <S.Container
      direction={columnsPerRow === 3 ? 'row' : 'column'}
      isHidden={isHidden}
    >
      <S.StatusContainer>
        {isHidden ? (
          <>
            <MwIcon
              type='feather'
              icon='thumbs_up'
              color='silver'
              height='18px'
              width='18px'
            />
            <MwIcon
              type='feather'
              icon='thumbs_down'
              color='silver'
              height='18px'
              width='18px'
            />
          </>
        ) : (
          <>
            <Popup
              on='click'
              pinned
              open={popUpOpen.thumbsUp}
              onClose={() => handleClose('thumbsUp')}
              position={columnsPerRow === 3 ? 'top left' : 'left center'}
              offset={columnsPerRow === 3 ? [-12, 14] : [0, 14]}
              content={
                <div>
                  {thumbs && thumbs.value === 1 ? (
                    <Confirmation
                      status={thumbs.value === 1 ? 'A' : 'I'}
                      id={card.id}
                      closePopUp={() =>
                        setPopUpOpen((prev) => ({ ...prev, thumbsUp: false }))
                      }
                      handleRemoveConfirmation={handleRemoveConfirmation}
                    />
                  ) : (
                    <PopUpSelectConfirmation
                      type={1}
                      image_id={card.id}
                      closePopUp={() =>
                        setPopUpOpen((prev) => ({ ...prev, thumbsUp: false }))
                      }
                      handleConfirmation={handleConfirmation}
                    />
                  )}
                </div>
              }
              trigger={
                thumbs && thumbs.value === 1 ? (
                  <MwIcon
                    type='feather'
                    icon='thumbs_up'
                    color='green'
                    onClick={() =>
                      setPopUpOpen((prev) => ({ ...prev, thumbsUp: true }))
                    }
                    height='18px'
                    width='18px'
                  />
                ) : (
                  <MwIcon
                    type='feather'
                    icon='thumbs_up'
                    color='silver'
                    onClick={() =>
                      setPopUpOpen((prev) => ({ ...prev, thumbsUp: true }))
                    }
                    height='18px'
                    width='18px'
                  />
                )
              }
              style={{ padding: 0, margin: 0 }}
            />

            <Popup
              on='click'
              pinned
              open={popUpOpen.thumbsDown}
              onClose={() => handleClose('thumbsDown')}
              position={columnsPerRow === 3 ? 'top left' : 'left center'}
              offset={columnsPerRow === 3 ? [-12, 14] : [0, 14]}
              content={
                <div>
                  {thumbs && thumbs.value === 2 ? (
                    <Confirmation
                      status={thumbs.value === 2 ? 'I' : 'A'}
                      id={card.id}
                      closePopUp={() =>
                        setPopUpOpen((prev) => ({ ...prev, thumbsDown: false }))
                      }
                      handleRemoveConfirmation={handleRemoveConfirmation}
                    />
                  ) : (
                    <PopUpSelectConfirmation
                      type={2}
                      image_id={card.id}
                      closePopUp={() =>
                        setPopUpOpen((prev) => ({ ...prev, thumbsDown: false }))
                      }
                      handleConfirmation={handleConfirmation}
                    />
                  )}
                </div>
              }
              trigger={
                thumbs && thumbs.value === 2 ? (
                  <MwIcon
                    type='feather'
                    icon='thumbs_down'
                    color='pink'
                    onClick={() =>
                      setPopUpOpen((prev) => ({ ...prev, thumbsDown: true }))
                    }
                    height='18px'
                    width='18px'
                  />
                ) : (
                  <MwIcon
                    type='feather'
                    icon='thumbs_down'
                    color='silver'
                    onClick={() =>
                      setPopUpOpen((prev) => ({ ...prev, thumbsDown: true }))
                    }
                    height='18px'
                    width='18px'
                  />
                )
              }
              style={{ padding: 0, margin: 0 }}
            />
          </>
        )}
      </S.StatusContainer>

      <S.OthersContainer>
        <S.Rotate isBlocked={isHidden}>
          <MwIcon
            type='semantic'
            icon='sync alternate'
            color='silver'
            height='18px'
            width='18px'
          />

          <S.RotateOpened
            direction={columnsPerRow === 3 ? 'row' : 'column'}
            className='rotateOpened'
            style={{ cursor: isHidden ? 'not-allowed' : 'default' }}
          >
            <MwIcon
              type='semantic'
              icon='sync alternate'
              color='silver'
              height='18px'
              width='18px'
            />
            <MwIcon
              type='semantic'
              icon='undo alternate'
              color='silver'
              onClick={() => handleRotateImage('left')}
              height='18px'
              width='18px'
            />
            <MwIcon
              type='semantic'
              icon='redo alternate'
              color='silver'
              onClick={() => handleRotateImage('right')}
              height='18px'
              width='18px'
            />
          </S.RotateOpened>
        </S.Rotate>

        <Popup
          on='click'
          pinned
          position={columnsPerRow === 3 ? 'top center' : 'left center'}
          offset={columnsPerRow === 3 ? [0, 0] : [0, 0]}
          open={popUpOpen.favorite}
          onClose={() => setPopUpOpen((prev) => ({ ...prev, favorite: false }))}
          content={
            <div>
              <Favorite
                image_id={card.id}
                closePopUp={() =>
                  setPopUpOpen((prev) => ({ ...prev, favorite: false }))
                }
              />
            </div>
          }
          trigger={
            cardFavorited && cardFavorited.value ? (
              <button
                disabled={isHidden}
                onClick={() =>
                  setPopUpOpen((prev) => ({ ...prev, favorite: true }))
                }
              >
                <MwIcon
                  type='semantic'
                  icon='star outline'
                  color='purple'
                  height='18px'
                  width='18px'
                />
              </button>
            ) : (
              <button
                disabled={isHidden}
                onClick={() =>
                  setPopUpOpen((prev) => ({ ...prev, favorite: true }))
                }
              >
                <MwIcon
                  type='semantic'
                  icon='star outline'
                  color='silver'
                  height='18px'
                  width='18px'
                />
              </button>
            )
          }
          style={{ padding: 0, margin: 0 }}
        />

        <>
          <button disabled={loading.download || isHidden} onClick={exportFile}>
            <MwIcon
              type='feather'
              icon='download'
              color='silver'
              height='18px'
              width='18px'
            />
          </button>
        </>

        {isHidden ? (
          <button disabled={loading.blockImage} onClick={() => blockAccess(0)}>
            <MwIcon
              type='feather'
              icon='eye_off'
              color='warningYellow'
              height='18px'
              width='18px'
            />
          </button>
        ) : (
          <button disabled={loading.blockImage} onClick={() => blockAccess(1)}>
            <MwIcon
              type='feather'
              icon='eye'
              color='silver'
              height='18px'
              width='18px'
            />
          </button>
        )}
      </S.OthersContainer>
    </S.Container>
  )
}
