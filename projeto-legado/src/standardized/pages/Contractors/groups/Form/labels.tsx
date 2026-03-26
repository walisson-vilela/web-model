import React from 'react'

import { Mask } from '@mw-kit/mw-ui/dist/components/Input/interfaces'

interface Label {
  label: string | JSX.Element | (string | JSX.Element)[]
  placeholder?: string
  required?: boolean
  mask?: Mask
}

interface Labels {
  // status
  active: Label

  name: Label

  allocated_users: Label
}

const labels: Labels = {
  active: {
    label: 'Status do Agrupamento',
  },

  // baisc data
  name: {
    label: 'Nome do Agrupamento',
    placeholder: 'Nome do Agrupamento',
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
}

export default labels
