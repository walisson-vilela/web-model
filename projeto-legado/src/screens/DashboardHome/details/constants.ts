export type CardDetailConfig = {
  id: string
  title: string
  description: string
}

export const CARD_DETAIL_CONFIGS: CardDetailConfig[] = [
  {
    id: 'card-1',
    title: 'Usuários Ativos',
    description: 'Utilize a lista abaixo para identificar o status dos colaboradores.',
  },
  {
    id: 'card-2',
    title: 'Iniciaram Atendimento',
    description: 'Listagem dos usuários com atendimento iniciado e sua aderência diária.',
  },
  {
    id: 'card-3',
    title: 'Usuários Ativos Desconectados',
    description: 'Visão detalhada dos usuários desconectados e o tempo desde a última sincronização.',
  },
  {
    id: 'card-4',
    title: "Atendimentos (PDV's)",
    description: 'Resumo dos atendimentos previstos, executados e justificativas por dia.',
  },
  {
    id: 'card-5',
    title: 'Nível da Bateria',
    description: 'Monitoramento do nível de bateria dos dispositivos no campo.',
  },
  {
    id: 'card-6',
    title: 'Dados Pendentes de Transmissão',
    description: 'Usuários com pesquisas e imagens ainda não transmitidas.',
  },
  {
    id: 'card-7',
    title: 'Range Quality',
    description: 'Detalhamento dos atendimentos dentro e fora do range de qualidade.',
  },
  {
    id: 'card-8',
    title: 'Velocidade Média',
    description: 'Resumo dos deslocamentos e velocidade média coletada por dia.',
  },
  {
    id: 'card-9',
    title: 'Distância Média (km)',
    description: 'Distâncias médias previstas e realizadas por ciclo.',
  },
  {
    id: 'card-10',
    title: 'Humor',
    description: 'Consolidação dos registros de humor enviados pelos usuários no dia.',
  },
  {
    id: 'card-11',
    title: 'Justificativa de não Atendimento (S)',
    description: 'Mapa dos atendimentos justificados e não justificados.',
  },
  {
    id: 'card-12',
    title: 'TMO X Performance',
    description: 'Comparativo diário entre o TMO registrado e a performance alcançada.',
  },
  {
    id: 'card-13',
    title: 'TMO Raio X S0',
    description: 'Distribuição do TMO positivo e negativo dentro do ciclo.',
  },
  {
    id: 'card-14',
    title: 'Tarefas por ciclo de execuções',
    description: 'Percentuais de tarefas realizadas e alcance sobre o planejado.',
  },
]
