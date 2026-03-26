import { useHistory } from 'react-router-dom'

import img from '../../../../../NewDashboard/assets/img/Icones_Expandir.svg'
import { Card } from '../../../../interfaces'

import { HeaderContainer, HeaderContent, Label } from './styles'

interface CardProps {
  data: Card
}

export const CardHeader = ({ data }: CardProps): JSX.Element => {
  const history = useHistory()

  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <strong> {data.title}</strong>

          <img
            src={img}
            alt='img'
            onClick={() => {
              const url = `/main/dev/task-manager/5` // TODO: Alterar para ID dinâmico quando tiver endpoint
              const title = data.title
              const subtitle = `Vigência ${data.validity.start.replaceAll(
                '-',
                '/',
              )} a ${data.validity.end.replaceAll('-', '/')} (${
                data.validity.duration
              } dias)`

              history.push(`${url}?title=${title}&description=${subtitle}`)
            }}
          />
        </div>
        <strong>
          {' '}
          Vigencia: {data.validity.start.replaceAll('-', '/')} a{' '}
          {data.validity.end.replaceAll('-', '/')} ({data.validity.duration}{' '}
          dias) <Label type='Não Iniciada'>{data.validity.type || ''}</Label>
        </strong>
      </HeaderContent>
    </HeaderContainer>
  )
}
