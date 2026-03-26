import { arrayEquals } from '../../../../utils/Validators'
import { Comparators } from '../../../../utils/hooks/useDirty'

import { Form, Labels } from './interfaces'

export const comparators: Comparators<Form> = {
  role: (current, original) => current?.id !== original?.id,
  hierarchies: (current, original) => {
    return !arrayEquals(
      current,
      original,
      (x, y) =>
        x.hierarchy_id === y.hierarchy_id &&
        x.superior?.id === y.superior?.id &&
        arrayEquals(
          x.regions,
          y.regions,
          (x, y) => x.region_id === y.region_id,
        ),
    )
  },
  route_contractor: (current, original) => current?.id !== original?.id,
  host_city: (current, original) => current?.id !== original?.id,
}

export const labels: Labels = {
  role: {
    label: 'Função',
    placeholder: 'Selecione',
    required: true,
  },
  password: {
    label: 'Senha',
  },
  route_contractor: {
    label: 'Para qual Conta/Grupo irá executar Rota?',
    placeholder: 'Selecione',
  },
  personal_mobile: {
    label: 'Tipo Dispositivo Móvel',
    placeholder: 'Selecione',
    required: true,
  },
  imei: {
    label: 'N° de Série',
    placeholder: 'Digite',
  },
  travel_mode: {
    label:
      'Defina a forma de deslocamento a ser utilizada pelo usuário no atendimento às rotas',
    placeholder: 'Selecione',
  },
  less_walking: {
    label:
      'Limite máximo permitido para o deslocamento realizado à pé (Metros)',
    required: true,
  },
}
