import { FiltersInterfaces } from '@mw-kit/mw-manager'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Situação',
    name: 'status',
    options: [
      { label: 'Pendente', value: 'P' },
      { label: 'Em Processamento', value: 'E' },
      { label: 'Concluído com Erros', value: 'CE' },
      { label: 'Concluído com Sucesso', value: 'CS' },
      { label: 'Aguardando Aprovação', value: 'AA' },
      { label: 'Aprovado', value: 'A' },
      { label: 'Reprovado', value: 'R' },
    ],
  },
]

export default filters
