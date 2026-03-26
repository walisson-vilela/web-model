export const selectOptions = [
  {
    type: 'behavior',
    title: 'Comportamento',
    options: [
      { key: 'D', value: 'D', text: 'Unificar' },
      { key: 'P', value: 'P', text: 'Prioritária' },
      { key: 'E', value: 'E', text: 'Exclusão' },
    ],
  },
  {
    type: 'status',
    title: 'Status',
    options: [
      { key: 'A', value: 'A', text: 'Ativo' },
      { key: 'I', value: 'I', text: 'Inativo' },
    ],
  },
  {
    type: 'mandatory',
    title: 'Obrigatório',
    options: [
      { key: 'R', value: 'R', text: 'Sim' },
      { key: 'O', value: 'O', text: 'Não' },
    ],
  },
  {
    type: 'frequency',
    title: 'Frequência',
    options: [
      { key: 'U', value: 'U', text: 'Uma vez' },
      { key: 'D', value: 'D', text: 'Diário' },
      { key: 'S', value: 'S', text: 'Semanal' },
      { key: 'Q', value: 'Q', text: 'Quinzenal' },
      { key: 'M', value: 'M', text: 'Mensal' },
      { key: 'R', value: 'R', text: 'Repetição' },
    ],
  },
]
