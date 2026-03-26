import { MwIcon } from '@mw-kit/mw-ui'

import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'
import Popup from '../../components/Popup'

import Manager from './Grid'
import useContext, { Provider } from './provider'
import * as S from './styled'

const WorkShifts = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const { managerProps } = useContext()

  return (
    <MwManagerContainer>
      <Header
        description={
          <S.MessageHeader>
            Utilize os campos para definir de acordo com a operação do Horário
            de acesso ou Ponto Eletrônicico{' '}
            <Popup
              on='click'
              trigger={
                <MwIcon type='feather' icon='info' color='greyishBlue' />
              }
              inverted
            />
          </S.MessageHeader>
        }
      />
      <Manager {...managerProps} route={route} />
    </MwManagerContainer>
  )
}, Provider)

export default WorkShifts
