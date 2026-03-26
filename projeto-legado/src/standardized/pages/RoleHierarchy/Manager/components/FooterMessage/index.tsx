import { MwIcon } from '@mw-kit/mw-ui'

import Popup from '../../../../../components/Popup'
import useHierarchyContext from '../../../context'

import Visualitate from './components/Visualitate'
import * as S from './styled'

interface IFooterMessage {
  type: 'valid' | 'invalid'
  onClick: () => void
  onTrashClick: () => void
}

const FooterMessage = (props: IFooterMessage) => {
  const { type, onClick, onTrashClick } = props

  const {
    schedule: [schedule],
  } = useHierarchyContext()

  if (!schedule) return null

  const date = new Date(schedule.schedule)

  const dateSchedule = date.toLocaleDateString('pt-BR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })

  const weekday = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
  })

  const hour = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const modifier = schedule.modifier.name

  return (
    <S.Container $type={type}>
      <S.Message>
        {' '}
        Uma versão de hierarquia foi programada para {weekday}, dia{' '}
        {dateSchedule} às {hour} por {modifier} | &nbsp;
        <Visualitate onClick={onClick}>Visualizar</Visualitate>
      </S.Message>
      <MwIcon
        type='feather'
        icon='trash'
        width={15}
        height={15}
        onClick={onTrashClick}
      />
      {type === 'invalid' && (
        <Popup
          on={'click'}
          inverted
          position='right center'
          style={{ padding: '0px' }}
          offset={[-2, 0]}
          trigger={
            <MwIcon
              type='semantic'
              icon='exclamation triangle'
              width={22}
              height={22}
              color='red'
            />
          }
          content={
            <S.PopupContent>
              Houve um conflito na programação da estrutura, pois uma ou mais
              funções sofreram alterações.
            </S.PopupContent>
          }
        />
      )}
    </S.Container>
  )
}

export default FooterMessage
