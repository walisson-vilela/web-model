import { MwIcon } from '@mw-kit/mw-ui'

import Popup from '../../../../../../../../components/Popup'

import * as S from './styles'

const Trigger: React.FunctionComponent = (props) => {
  return <MwIcon {...props} type='feather' icon='info' color='greyishBlue' />
}

const Content = () => {
  return (
    <S.Container>
      <div>Controle de Licenças</div>

      <div>
        <div>
          <div>
            <b>Disponibilidade</b>: Indica a qtd. de licenças que ainda é
            possível distribuir entre os pilares.
          </div>
        </div>

        <div>
          <div>
            <b>Total Distribuído</b>: Indica a qtd. de licenças total já
            distribuída entre os pilares.
          </div>
        </div>

        <div>
          <div>
            <b>Total Utilizado</b>: Indica a qtd. de licenças total já utilizada
            entre os pilares.
          </div>

          <ul>
            <li>
              <div>
                <div>Observação no Slider em relação ao total utilizado:</div>

                <ol>
                  <li>
                    <div>
                      <div>
                        O mínimo e o máximo são dinâmicos. Se houver por exemplo
                        50 licenças em uso por um pilar, 50 será o mínimo, pois
                        não será possível remover licenças em uso. Já o máximo
                        exibirá o total de licenças que podem sem alcançadas
                        naquele pilar.
                      </div>

                      <S.RangeContainer>
                        <div></div>

                        <div>
                          <S.MinMax $color='red' children='50' />
                          <S.Bullet $color='blue' />
                          <S.MinMax $color='red' children='100' />
                        </div>

                        <div></div>
                      </S.RangeContainer>
                    </div>
                  </li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </S.Container>
  )
}

const Info = () => {
  return (
    <Popup
      on='click'
      trigger={<Trigger />}
      content={Content}
      position='right center'
      offset={({ placement }) =>
        ['top-start', 'bottom-start'].includes(placement) ? [-7, 0] : []
      }
      hideOnScroll
      inverted
    />
  )
}

export default Info
