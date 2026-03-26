import { MwIcon } from '@mw-kit/mw-ui'

import * as S from './styled'

const WarningTemplate = () => {
  return (
    <S.WarningContainer>
      <div children='Importante' />

      <div>
        É importante criar o seu template dentro das regras contidas no manual
        para que não haja erros de visualização e dificuldade de leitura.
      </div>

      <S.Link
        onClick={() =>
          window.open(
            'https://s3.amazonaws.com/images.traderesult.app/PersonalizarPPT_book-1.pdf',
          )
        }
      >
        <MwIcon
          type='feather'
          icon='file_text'
          width='14px'
          height='14px'
          color='bronze'
        />
        Baixar manual e template de base
      </S.Link>
    </S.WarningContainer>
  )
}

export default WarningTemplate
