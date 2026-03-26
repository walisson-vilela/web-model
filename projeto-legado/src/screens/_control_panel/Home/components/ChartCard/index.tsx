import { ReactNode } from 'react'

import { MwButton, MwIcon } from '@mw-kit/mw-ui'

import ExternalLink from '../../../../../assets/img/svgs/external_link.svg?react'
import { ButtonContainer } from '../../styles'

import * as S from './styles'

interface Props {
  title: string
  subtitle?: string
  half?: boolean
  paddingless?: boolean
  back?: {
    condition: boolean
    action: () => void
  }
  action?: () => void
  chart: ReactNode
}

const ChartCard = ({
  title,
  subtitle,
  action,
  back,
  chart,
  half,
  paddingless,
}: Props) => {
  return (
    <S.Container half={half}>
      <S.Header paddingless={paddingless}>
        <S.Title children={title} />

        {subtitle && <S.Subtitle children={subtitle} />}
      </S.Header>

      <S.Content children={chart} />

      <ButtonContainer>
        {back && back.condition && (
          <MwButton size='mini' onClick={back.action}>
            <MwIcon type='feather' icon='corner_up_left' color='white' />
          </MwButton>
        )}

        {action && (
          <MwIcon
            type='svg'
            icon={ExternalLink}
            color='unset'
            width='14px'
            onClick={action}
          />
        )}
      </ButtonContainer>
    </S.Container>
  )
}

export default ChartCard
