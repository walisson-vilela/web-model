import { MwGrid, MwIcon } from '@mw-kit/mw-ui'

import Popup from '../../../../../components/Popup'
import useFormContext from '../../context'
import { TitleWrapper } from '../DayConfig/style'

import EletronicPoint from './Inputs/EletronicPoint'
import Tolerances from './Inputs/Tolerance'
import { PopupContentWrapper, PopupTriggerWrapper } from './style'

const DefinitionFields = () => {
  const { form } = useFormContext()

  return (
    <MwGrid
      borderless
      rows={{
        spacing: { left: '0', right: '0' },
        verticalAlign: 'center',
        borderless: true,
      }}
      cols={{ spacing: { top: '0', bottom: '0', left: 's3', right: 's4' } }}
      style={{ borderBottom: '1px solid #E6E6E7', paddingBottom: 14 }}
    >
      <MwGrid.Row>
        <TitleWrapper>
          <Popup
            inverted
            position='right center'
            on='click'
            style={{ minWidth: 572 }}
            trigger={
              <PopupTriggerWrapper>
                De acordo com a operação, faça a definição
                <MwIcon type='feather' icon='info' color='darkBlue' />
              </PopupTriggerWrapper>
            }
            content={
              <PopupContentWrapper>
                <h3>Notificação</h3>
                <ul>
                  <li>
                    Horário de Acesso ao Sistema
                    <p>
                      A operação controlar apenas o acesso do usuário ao sistema
                      através de uma janela de inicio e fim.
                    </p>
                  </li>
                  <li>
                    Ponto Eletrônico
                    <p>
                      Para este tipo de operação o Ideal é que o mesmo esteja
                      alinhado ao seu respectivo sindicato. O Usuário será
                      controlado pela sua jornada de trabalho e intervalo
                      através do Ponto Eletrônico.
                    </p>
                  </li>
                </ul>
              </PopupContentWrapper>
            }
          />
        </TitleWrapper>
      </MwGrid.Row>
      <MwGrid.Row>
        <EletronicPoint />
        {!form.getValues('electronic_point') && <Tolerances />}
      </MwGrid.Row>
    </MwGrid>
  )
}

export default DefinitionFields
