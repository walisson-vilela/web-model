import { ReactNode } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'
import { Popup } from 'semantic-ui-react'

import ExternalLink from '../../../../../assets/img/svgs/external_link.svg?react'
import { ButtonContainer } from '../../styles'

import * as S from './styles'

interface Props {
  action: () => void
  color: ColorOptions | string
  popup: {
    title: ReactNode
    content: ReactNode
  }
  content: {
    top: ReactNode
    bottom: ReactNode
  }
}

const BorderedCard = ({ color, action, content, popup }: Props) => {
  return (
    <S.Container>
      <Popup
        on='hover'
        trigger={<S.Border color={color} />}
        inverted
        style={{ width: 250 }}
        position='left center'
        className='popup-field'
        content={popup.content}
        header={popup.title}
      />

      <S.Content>
        <S.ContentTop children={content.top} />
        <S.ContentBottom children={content.bottom} />
      </S.Content>

      <ButtonContainer>
        <MwIcon
          type='svg'
          icon={ExternalLink}
          color='unset'
          width='14px'
          onClick={action}
        />
      </ButtonContainer>
    </S.Container>
  )
}

export default BorderedCard
