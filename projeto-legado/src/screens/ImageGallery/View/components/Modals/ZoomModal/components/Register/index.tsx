import React, { useContext } from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import { Loader } from 'semantic-ui-react'

import { DetailsProps } from '../../../../../interface'
import { ImageDetails } from '../../../../Details'
import FooterContext from '../../context'

import * as S from './style'

interface RegisterProps {
  name: string
  formatted_address: string
  details: DetailsProps
}

const Register = (props: RegisterProps) => {
  const { name, formatted_address, details } = props
  const { loading } = useContext(FooterContext)

  return (
    <S.Content>
      <S.Header>
        <S.HeaderInfo>
          <MwEllipsisContainer children={<strong>{name}</strong>} />
          <MwEllipsisContainer children={<span>{formatted_address}</span>} />
        </S.HeaderInfo>
      </S.Header>
      <S.Container>
        {loading.details ? (
          <S.Loading>
            <Loader active />
          </S.Loading>
        ) : (
          <ImageDetails data={details} />
        )}
      </S.Container>
    </S.Content>
  )
}

export default Register
