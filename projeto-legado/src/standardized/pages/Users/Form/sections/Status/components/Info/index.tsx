import React from 'react'

import { MwEllipsisContainer, MwGrid } from '@mw-kit/mw-ui'

import useFormContext from '../../../../context'

import * as S from './styles'

const Info = (props: React.PropsWithChildren) => {
  const { data } = useFormContext()

  return (
    <MwGrid.Row>
      <S.Col width='1'>ID: {data.id}</S.Col>

      <S.Col>
        Nome: <MwEllipsisContainer children={data.name || '-'} />
      </S.Col>

      <S.Col width='2'>
        CNPJ: <MwEllipsisContainer children={data.document || '-'} />
      </S.Col>

      <S.Col width='2'>
        Matrícula: <MwEllipsisContainer children={data.registration || '-'} />
      </S.Col>

      {props.children && <MwGrid.Col width='auto' children={props.children} />}
    </MwGrid.Row>
  )
}

export default Info
