export const qualities = async () => {
  const options = [
    { label: 'Original', value: 'original', data: {} },
    { label: 'Média', value: 'medium', data: {} },
    { label: 'Baixa', value: 'low', data: {} },
  ]

  return { options, lastPage: true }
}

export const extractionTypes = async () => {
  const options = [
    { label: 'Visão Simples', value: 'simple-vision', data: {} },
    {
      label: 'Visão Comparativa (Antes e Depois)',
      value: 'comparative-vision',
      data: {},
    },
  ]

  return { options, lastPage: true }
}

export const grouping = async () => {
  const options = [
    { label: 'Sem Agrupamento', value: 'without-group', data: {} },
    { label: 'Executor', value: 'executor', data: {} },
    { label: 'PDV', value: 'store', data: {} },
    { label: 'Bandeira', value: 'market-flag', data: {} },
    { label: 'Canal', value: 'segment', data: {} },
    { label: 'Categoria', value: 'category', data: {} },
  ]

  return { options, lastPage: true }
}
