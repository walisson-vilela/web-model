import * as GlobalStyles from '../../../styled'
import Tooltip from '../../Tooltip'
import * as S from '../styled'

import RefreshIcon from '../../../../../assets/icons/feather/RotateCw'

interface RefreshProps {
  /** callback que ira ser chamada quando o botao for clicado */
  reloader: () => void
  /** indicador de loading ativo */
  loading?: boolean
}

const Refresh = (props: RefreshProps) => {
  const { reloader, loading } = { ...props }

  return (
    <GlobalStyles.ThemeContainer>
      <Tooltip on='hover' message='Atualizar' position='bottom'>
        <S.Button onClick={reloader} disabled={loading}>
          <RefreshIcon />
        </S.Button>
      </Tooltip>
    </GlobalStyles.ThemeContainer>
  )
}

export default Refresh
