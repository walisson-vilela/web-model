import { PopupWrapper } from './styles'

export const ContentPopup = () => {
  return (
    <PopupWrapper>
      <div>
        <b>Alerta de Monitoramento GPS</b>
      </div>
      <ul>
        <li>
          <div>
            <b>Tipo de Alerta</b>
          </div>
          <div>
            <b>Qtd</b>
          </div>
        </li>
        <li>
          <div>Fora do Raio</div>
          <div>0</div>
        </li>
        <li>
          <div>GPS Desligado</div>
          <div>0</div>
        </li>
      </ul>
    </PopupWrapper>
  )
}
