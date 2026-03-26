import { useContext, useEffect, useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'

import { DownloadIMG, DownloadPPT } from '../../../../../Modals'
import { GalleryViewContext } from '../../../../context'
import FavoriteShared from '../../Modals/Favorites'
import Status from '../../Modals/Status'

import * as S from './style'

const Icons = () => {
  const { setStatusModal, checkedImage } = useContext(GalleryViewContext)
  const [allNonBlockImages, setAllNonBlockImages] = useState([])
  const [allApprovedAndPendingImages, setAllApprovedAndPendingImages] =
    useState([])
  const [allReprovedAndPendingImages, setAllReprovedAndPendingImages] =
    useState([])

  useEffect(() => {
    setAllNonBlockImages(
      checkedImage.filter(
        (image) =>
          image.card.tags.find((item) => item.name === 'hidden') &&
          image.card.tags.find((item) => item.name === 'hidden').value === 0,
      ),
    )
  }, [checkedImage])

  useEffect(() => {
    setAllApprovedAndPendingImages(() =>
      allNonBlockImages.filter(
        (image) =>
          image.card.tags.find((item) => item.name === 'status') &&
          image.card.tags.find((item) => item.name === 'status').value !== 1,
      ),
    )

    setAllReprovedAndPendingImages(() =>
      allNonBlockImages.filter(
        (image) =>
          image.card.tags.find((item) => item.name === 'status') &&
          image.card.tags.find((item) => item.name === 'status').value !== 2,
      ),
    )
  }, [allNonBlockImages])

  return (
    <S.Main>
      <S.Options>
        {allApprovedAndPendingImages.length > 0 ? (
          <MwIcon
            type='feather'
            icon='thumbs_up'
            color='silver'
            onClick={() =>
              setStatusModal(
                <Status approved='A' images={allApprovedAndPendingImages} />,
              )
            }
            height='18px'
            width='18px'
          />
        ) : (
          <div style={{ cursor: 'not-allowed' }}>
            <MwIcon
              type='feather'
              icon='thumbs_up'
              color='silver'
              height='18px'
              width='18px'
            />
          </div>
        )}
        {allReprovedAndPendingImages.length > 0 ? (
          <MwIcon
            type='feather'
            icon='thumbs_down'
            color='silver'
            onClick={() =>
              setStatusModal(
                <Status approved='R' images={allReprovedAndPendingImages} />,
              )
            }
            height='18px'
            width='18px'
          />
        ) : (
          <div style={{ cursor: 'not-allowed' }}>
            <MwIcon
              type='feather'
              icon='thumbs_down'
              color='silver'
              height='18px'
              width='18px'
            />
          </div>
        )}
      </S.Options>
      <S.Options>
        <MwIcon
          type='semantic'
          icon='star outline'
          color='purple'
          height='18px'
          width='18px'
          onClick={() => {
            setStatusModal(<FavoriteShared images={allNonBlockImages} />)
          }}
        />

        <img
          src={`/assets/icons/image-gallery-tour/Zip.svg`}
          style={{ width: 31, height: 30 }}
          onClick={() =>
            setStatusModal(
              <DownloadIMG
                ids={allNonBlockImages.map((images) => images.card.id)}
                numberOfImages={
                  allNonBlockImages.map((images) => images.card.id).length
                }
                setModal={setStatusModal}
              />,
            )
          }
        />
        <img
          src={`/assets/icons/image-gallery-tour/PPT.svg`}
          style={{ width: 31, height: 30 }}
          onClick={() =>
            setStatusModal(
              <DownloadPPT
                ids={allNonBlockImages.map((images) => images.card.id)}
                numberOfImages={
                  allNonBlockImages.map((images) => images.card.id).length
                }
                setModal={setStatusModal}
              />,
            )
          }
        />
      </S.Options>
    </S.Main>
  )
}

export default Icons
