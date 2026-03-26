import React from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { roles } from '../../../../services/options'

import { statusLabels } from './labels'

// TODO: Alterar filtro de Motivos

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Função',
    name: 'Peoples__role_id',
    options: roles,
  },
  {
    label: 'Status',
    name: 'Users__active',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key, index) => {
        return {
          label: (
            <Bullet
              content={statusLabels[key].name}
              color={statusLabels[key].color}
            />
          ),
          value: key,
        }
      }),
  },
  {
    label: 'Classificação',
    name: 'feeling_id',
    options: [
      { label: <Bullet content={'Motivado'} color='#129105' />, value: 2 },
      {
        label: <Bullet content={'Feliz'} color='#66BB6A' />,
        value: 3,
      },
      {
        label: <Bullet content={'Não Valorizado'} color='#FBCB01' />,
        value: 5,
      },
      { label: <Bullet content={'Cansado'} color='#FB8702' />, value: 1 },
      { label: <Bullet content={'Estressado'} color='#FB8702' />, value: 6 },
      {
        label: <Bullet content={'Sobrecarregado'} color='#FB8702' />,
        value: 7,
      },
      { label: <Bullet content={'Doente'} color='#E23851' />, value: 4 },
      { label: <Bullet content={'Triste'} color='#E23851' />, value: 8 },
    ],
  },
]

export default filters
