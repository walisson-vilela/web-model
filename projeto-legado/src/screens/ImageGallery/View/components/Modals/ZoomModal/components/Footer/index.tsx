import { useContext, useEffect, useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import fileDownload from 'js-file-download'
import { toast } from 'react-hot-toast'
import { Popup } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../../components/Toaster'
import axios from '../../../../../../../../services/Axios/instance'
import { GalleryViewContext } from '../../../../../context'
import { approvationImage } from '../../../../../service'
import Confirmation from '../../../../Popup/Confirmation'
import Favorite from '../../../../Popup/Favorite'
import { StatusData } from '../../../../Popup/Favorite/interface'
import PopUpSelectConfirmation from '../../../../Popup/SelectConfirmation'
import FooterContext from '../../context'

import { FooterProps } from './interfaces'
import * as S from './styles'

const Footer = (props: FooterProps) => {
  const { loading, setLoading, handleGetImage, loadDetails } =
    useContext(FooterContext)
  const { handleToogleStatus, handleRotateImage } =
    useContext(GalleryViewContext)
  const [isRotateImage, setIsRotateImage] = useState<boolean>(false)
  const [isDownloadingImage, setIsDownloadingImage] = useState<boolean>(false)
  const { card, accordionId } = props

  const [popUpOpen, setPopUpOpen] = useState({
    thumbsUp: false,
    thumbsDown: false,
    favorite: false,
  })

  const thumbs = card.tags.find((item) => item.name === 'status')
  const cardFavorited = card.tags.find((item) => item.name === 'favorited')

  const exportFile = async () => {
    setIsDownloadingImage(true)
    try {
      const request = await axios.get(`/v1/files/download/${card.id}`, {
        responseType: 'blob',
      })

      fileDownload(request.data, `${card.url}`)

      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setIsDownloadingImage(false)
    }
  }

  const rotateImage = async (direction: string) => {
    setIsRotateImage(true)
    try {
      await handleRotateImage(card.id, accordionId, direction).then(
        async () => {
          await handleGetImage()
        },
      )
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setIsRotateImage(false)
    }
  }

  const handleClose = (key: 'thumbsUp' | 'thumbsDown') => {
    setPopUpOpen((prev) => ({ ...prev, [key]: false }))
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
        loadDetails()
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
        loadDetails()
      })
      return true
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      return false
    }
  }

  useEffect(() => {
    if (isRotateImage || isDownloadingImage) {
      setLoading((prev) => ({ ...prev, rotate: true }))
    } else {
      setLoading((prev) => ({ ...prev, rotate: false }))
    }
  }, [isRotateImage, isDownloadingImage])

  return (
    <S.Container>
      <S.Approvation>
        <Popup
          on='click'
          pinned
          open={popUpOpen.thumbsUp}
          onClose={() => handleClose('thumbsUp')}
          offset={[-12, 14]}
          position='top left'
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
          position='top left'
          offset={[-12, 14]}
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
      </S.Approvation>

      <S.Others>
        <S.Rotate isLoading={loading.rotate}>
          <MwIcon
            type='semantic'
            icon='sync alternate'
            color='silver'
            height='18px'
            width='18px'
          />

          <S.RotateOpened className='rotateOpened'>
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
              onClick={() => rotateImage('left')}
              height='18px'
              width='18px'
            />
            <MwIcon
              type='semantic'
              icon='redo alternate'
              color='silver'
              onClick={() => rotateImage('right')}
              height='18px'
              width='18px'
            />
          </S.RotateOpened>
        </S.Rotate>

        <Popup
          on='click'
          pinned
          position='top center'
          offset={[0, 0]}
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
            cardFavorited && cardFavorited.value && cardFavorited.value ? (
              <button
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
        />

        <button disabled={isDownloadingImage} onClick={exportFile}>
          <MwIcon
            type='feather'
            icon='download'
            color='silver'
            height='18px'
            width='18px'
          />
        </button>
      </S.Others>
    </S.Container>
  )
}

export default Footer
