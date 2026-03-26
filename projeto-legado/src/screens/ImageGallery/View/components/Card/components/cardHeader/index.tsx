import { useContext } from 'react'

import { MwEllipsisContainer, MwIcon, MwInput } from '@mw-kit/mw-ui'

import { GalleryViewContext } from '../../../../context'
import { CardContext } from '../../context'

import * as S from './styles'

export const CardHeader = () => {
  const { cardProps, flipCard } = useContext(CardContext)
  const { checkedImage, handleCheckImage } = useContext(GalleryViewContext)
  const { card, accordionId } = cardProps

  const attendences = card.tags.find(
    (item) => item.name === 'attendance_out_radius',
  )

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Info>
          <S.Description>
            <MwInput
              type='checkbox'
              checked={
                checkedImage.find(
                  (item) =>
                    item.accordionId == accordionId && item.card.id == card.id,
                ) != undefined
              }
              onChange={() => handleCheckImage(cardProps)}
            />

            {attendences.value === 1 ? (
              <img src={`/assets/icons/image-gallery-tour/GPS Fora.svg`} />
            ) : (
              <img src={`/assets/icons/image-gallery-tour/GPS Dentro.svg`} />
            )}
            <S.DescriptionText>
              <MwEllipsisContainer
                style={{
                  width: '80%',
                  font: 'normal normal bold 14px/17px Lato',
                }}
                children={
                  card && card.store && card.store.name ? card.store.name : ''
                }
              />
            </S.DescriptionText>
          </S.Description>

          <S.Icon>
            <MwIcon
              type='feather'
              icon='credit_card'
              color='silver'
              height='18px'
              width='18px'
              onClick={() => flipCard()}
            />
            {/* <img
              src={`/assets/icons/image-gallery-tour/Girar.svg`}
              onClick={() => flipCard()}
            /> */}
          </S.Icon>
        </S.Info>

        <S.AddressContainer>
          <MwEllipsisContainer
            style={{ width: '80%' }}
            children={card.store.formatted_address || ''}
          />
        </S.AddressContainer>
      </S.HeaderContainer>
    </S.Container>
  )
}
