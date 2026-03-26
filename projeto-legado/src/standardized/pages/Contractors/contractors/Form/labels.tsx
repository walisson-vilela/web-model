import { Mask } from '@mw-kit/mw-ui/dist/components/Input/interfaces'
import { Popup } from 'semantic-ui-react'

import * as S from './styled'

interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
  info?: JSX.Element
  mask?: Mask
}

interface Labels {
  // status
  active: Label

  // basic data
  document: Label
  name: Label
  subdomain: Label
  occupationArea: Label
  sharedModel: Label

  // address
  postal_code: Label
  street_type: Label
  street_address: Label
  street_number: Label
  complement: Label
  sublocality: Label
  city: Label
  state: Label

  allocated_users: Label

  privacyName: Label
  term: Label
}

const labels: Labels = {
  active: {
    label: 'Status da Conta',
  },

  // basic data
  document: {
    label: 'CNPJ',
    placeholder: '00.000.000/0000-00',
    required: true,
  },
  name: {
    label: 'Nome da Conta',
    placeholder: 'Nome da Conta',
    required: true,
  },
  subdomain: {
    label: 'Nome do Subdomínio',
    placeholder: 'Nome do Subdomínio',
    required: true,
    info: (
      <Popup
        pinned
        hideOnScroll
        on='click'
        className='popup-field'
        content={
          <S.InfoMessage>
            O termo escolhido esta sujeito a revisão.
          </S.InfoMessage>
        }
        position='left center'
        trigger={
          <img
            style={{
              width: '12px',
              height: '12px',
              marginTop: '4px',
              cursor: 'pointer',
            }}
            src={'/assets/images/info.svg'}
          />
        }
      />
    ),
  },
  occupationArea: {
    label: 'País de Atuação',
    placeholder: 'Selecione',
    required: true,
  },

  sharedModel: {
    label: 'Opera Modelo Compartilhado',
    placeholder: 'Selecione',
    required: true,
  },

  // address
  postal_code: {
    label: 'CEP',
    placeholder: '00000-000',
    required: true,
  },
  street_type: {
    label: 'Tipo de Logradouro',
    placeholder: 'Selecione',
    required: true,
  },
  street_address: {
    label: 'Endereço',
    placeholder: 'Endereço',
    required: true,
  },
  street_number: {
    label: 'Número',
    placeholder: 'Nº',
    required: true,
  },
  complement: {
    label: 'Complemento',
    placeholder: 'Ex: Casa B',
  },
  sublocality: {
    label: 'Bairro',
    placeholder: 'Bairro',
    required: true,
  },
  city: {
    label: 'Cidade',
    placeholder: 'Cidade',
    required: true,
  },
  state: {
    label: 'UF',
    placeholder: 'UF',
    required: true,
  },

  allocated_users: {
    label: <b>Defina a quantidade de usuários</b>,
    placeholder: '0',

    mask: (value) => {
      // Remove todos os caracteres que não são números
      const numeric = value.replace(/\D/g, '')

      // Verifica se a string é vazia
      if (!numeric) return '0'

      if (numeric.length > 1) {
        // Remove o zero no início da string, se houver
        return numeric.replace(/^0+/, '')
      }

      return numeric
    },
  },

  privacyName: {
    label: 'Insira um nome da Política',
    placeholder: '',
  },

  term: {
    label: 'Insira um nome do Termo de Uso',
    placeholder: '',
  },
}

export default labels
