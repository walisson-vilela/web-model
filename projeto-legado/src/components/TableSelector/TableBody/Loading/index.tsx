import React from 'react'

import { Loader } from '@mw-kit/mw-ui'

import * as S from './styled'

const Loading = () => {
  return (
    <tr>
      <S.LoaderColumn>
        <S.LoaderContainer>
          <Loader size='large' active />
        </S.LoaderContainer>
      </S.LoaderColumn>
    </tr>
  )
}

export default Loading
