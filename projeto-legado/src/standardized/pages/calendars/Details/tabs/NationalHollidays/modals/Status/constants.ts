import { CARD_STATUS } from '../../../../constants'

import { Labels } from './types'

export const LABELS: Labels = {
  ACTIVE: {
    target: CARD_STATUS.INACTIVATED.value,
    name: 'Ativar',
    title: 'Ativar Evento',
    message:
      'Ao ativar um evento ele retornará ao estado original, impactando todos os usuários relacionados.',
    value: CARD_STATUS.ACTIVE.value,
    errors: {
      ONLY: 'Apenas eventos inativos podem ser ativados.',
      AT_LEAST_ONE:
        'É necessário ter ao menos um evento selecionado para ser ativado.',
    },
    color: 'blue',
  },
  INACTIVATED: {
    target: CARD_STATUS.ACTIVE.value,
    name: 'Inativar',
    title: 'Inativar Evento',
    message:
      'Ao inativar o evento os usuários relacionados não serão mais impactados.',
    value: CARD_STATUS.INACTIVATED.value,
    errors: {
      ONLY: 'Apenas eventos ativos podem ser inativados.',
      AT_LEAST_ONE:
        'É necessário ter ao menos um evento selecionado para ser inativado.',
    },
    color: 'warningRed',
  },
}
