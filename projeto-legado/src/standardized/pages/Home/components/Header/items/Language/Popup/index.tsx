import React from 'react'

import * as S from './styles'

type PopupProps = { open: boolean }

const languages = {
  'pt-BR': 'Português (Brasil)',
  es: 'Espanhol',
  'en-US': 'Inglês',
}

const active = 'pt-BR'

const Content = () => {
  return (
    <React.Fragment>
      <S.Header>Alterar Idioma</S.Header>

      <S.ItemsContainer>
        {Object.entries(languages).map(([key, name]) => (
          <S.Item key={key} active={active === key} children={name} />
        ))}
      </S.ItemsContainer>
    </React.Fragment>
  )
}

const Popup = (props: PopupProps) => {
  return (
    <S.Container
      open={props.open}
      height='141px'
      position='right bottom'
      references={{ left: '53px' }}
      content={Content}
    />
  )
}

export default Popup
