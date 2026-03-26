import React from 'react'

import { MwEllipsisContainer, MwIcon, MwScrollContainer } from '@mw-kit/mw-ui'

import { BodyInterface, Recipient } from '../../../../interfaces'

import * as S from './styles'

const recipientParser = (recipient: Recipient, index: number) => {
  return (
    <S.Item key={index}>
      <MwEllipsisContainer children={recipient.name} />

      <div>
        <MwIcon
          type='semantic'
          icon='check circle'
          width='17px'
          height='17px'
          color={recipient.visualized_at ? 'green' : 'lightestGrey'}
        />

        <MwEllipsisContainer children={recipient.visualized_at_formatted} />
      </div>
    </S.Item>
  )
}

const Grid = (props: {
  open: boolean
  recipients: BodyInterface['recipients']
}) => {
  const { open, recipients } = props

  return (
    <S.AbsoluteContainer
      open={open}
      maxHeight='268px'
      width='438px'
      transition={{
        properties: {
          'max-height': {},
        },
      }}
    >
      <div>
        <div children='Leitura' />
        <div>
          {recipients.visualized}/{recipients.total} (
          {recipients.visualized_percent}%)
        </div>
      </div>

      <MwScrollContainer>
        <div>
          <S.Title>Para ({recipients.main.length})</S.Title>

          {recipients.main.map(recipientParser)}
        </div>

        <S.Delimiter />

        <div>
          <S.Title>Cc ({recipients.copy.length})</S.Title>

          {recipients.copy.map(recipientParser)}
        </div>
      </MwScrollContainer>
    </S.AbsoluteContainer>
  )
}

export default Grid
