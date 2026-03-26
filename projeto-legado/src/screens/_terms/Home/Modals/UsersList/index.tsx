import React from 'react'

import { Button } from 'semantic-ui-react'

import { useManagerProps } from '../../../../../utils/hooks'

import Manager from './Manager'
import { ComponentProps } from './interfaces'
import * as S from './styles'

export function UsersList(props: ComponentProps) {
  const { onClose, data, tabId } = props

  const { getManagerProps } = useManagerProps(1)
  return (
    <S.Container>
      <S.Header> Lista de Usuários</S.Header>
      <S.UserInfo>
        <strong> Usuários Ativos </strong>
        <span>
          Conta: <b> {data.accountName || '-'}</b> | Documento:
          <b> {data.title || '-'} </b>
        </span>
        <span>
          {tabId === 1 ? (
            <React.Fragment>
              {' '}
              Publicação:<b> {data.created_at || '-'}</b>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {' '}
              Vigência: <b> {data.created_at || '-'}</b>{' '}
            </React.Fragment>
          )}
        </span>
      </S.UserInfo>
      <S.Main>
        <Manager {...getManagerProps(0)} recordId={data.id} />
      </S.Main>
      <S.Footer>
        <Button size='tiny' content='Ok' primary onClick={onClose} />
      </S.Footer>
    </S.Container>
  )
}
