import React from 'react'

import { FaUsers } from 'react-icons/fa'
import { Checkbox } from 'semantic-ui-react'

import * as S from './styles'

const Aside = () => {
  const [name, setName] = React.useState('Grupo Sistema GIV')
  return (
    <S.Container>
      <S.Content>
        <img
          src='https://avatars.githubusercontent.com/u/32338670?s=280&v=4'
          alt='mundowap'
        />

        <S.Form>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Informe o nome do grupo'
          />
        </S.Form>
      </S.Content>
      <S.GroupInfo>
        <div>
          <FaUsers color='#c8c8c8' />
          <span> Você + 30 participantes </span>
        </div>
        <button> Adicionar Membros </button>
      </S.GroupInfo>

      <S.Footer>
        <span> Enviar Mensagens:</span>
        <div>
          <span> ADM</span>
          <Checkbox toggle name='status' />

          <span> TODOS </span>
        </div>
      </S.Footer>
    </S.Container>
  )
}

export default Aside
