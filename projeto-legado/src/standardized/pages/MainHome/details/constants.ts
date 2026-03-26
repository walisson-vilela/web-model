export type MainHomeDetailConfig = {
  id: string
  title: string
  description: string
}

const DEFAULT_DESCRIPTION =
  'Esta página de detalhamento será implementada em breve.'

export const MAIN_HOME_DETAIL_CONFIGS: MainHomeDetailConfig[] = [
  {
    id: 'card-1',
    title: 'Cobertura Roteiro',
    description:
      'Utilize a lista abaixo para identificar o status dos colaboradores.',
  },
  {
    id: 'card-2',
    title: 'Não Iniciaram Atendimento',
    description: 'Utilize a lista abaixo para identificar os colaboradores.',
  },
  {
    id: 'card-3',
    title: 'Usuários Ativos Desconectados',
    description:
      'Visão detalhada dos usuários desconectados e o tempo desde a última sincronização.',
  },
  {
    id: 'card-4',
    title: "Atendimentos (PDV's)",
    description:
      'Resumo dos atendimentos previstos, executados e justificativas por dia.',
  },
  {
    id: 'card-5',
    title: 'Nível da Bateria',
    description: 'Monitoramento do nível de bateria dos dispositivos no campo.',
  },
  {
    id: 'card-6',
    title: 'Nível de Conexão',
    description: 'Utilize a lista abaixo para identificar os usuários nesta condição',
  },
  {
    id: 'card-7',
    title: 'Tempo de Atendimento',
    description:
      'Utilize a lista abaixo para identificar o tempo de atendimento dos colaboradores',
  },
  {
    id: 'card-8',
    title: 'Velocidade Média',
    description:
      'Resumo dos deslocamentos e velocidade média coletada por dia.',
  },
  {
    id: 'card-9',
    title: 'Humor',
    description:
      'Consolidação dos registros de humor enviados pelos usuários no dia.',
  },
  {
    id: 'card-10',
    title: 'Avaliação de Desempenho',
    description:
      'Utilize a lista abaixo para identificar as avaliações de desempenho',
  },
  {
    id: 'card-11',
    title: 'Distância Média',
    description:
      'Utilize a lista abaixo para identificar as avaliações de desempenho',
  },
  {
    id: 'card-12',
    title: 'TMO X Raio',
    description: 'Distribuição do TMO positivo e negativo dentro do ciclo.',
  },
  {
    id: 'card-13',
    title: 'TMO X Performance',
    description:
      'Comparativo diário entre o TMO registrado e a performance alcançada.',
  },
  {
    id: 'card-14',
    title: 'Tarefas por ciclo de execuções',
    description:
      'Percentuais de tarefas realizadas e alcance sobre o planejado.',
  },
  {
    id: 'card-15',
    title: 'Loja modelo',
    description:
      'Utilize a lista abaixo para identificar a nota de Loja Modelo por PDV.',
  },
  {
    id: 'card-16',
    title: 'Justificativa de Não Atendimento',
    description:
      'Utilize a lista abaixo para identificar as justificativas de não atendimento',
  },
  {
    id: 'card-17',
    title: 'Justificativas de Inativação Usuários',
    description:
      'Utilize a lista abaixo para identificar as justificativas de inativação de usuários',
  },
  {
    id: 'card-18',
    title: 'Ocorrência no PDV',
    description: 'Utilize a lista abaixo para identificar as ocorrências no PDV',
  },
  {
    id: 'card-19',
    title: 'Atendimento GPS Fora do raio',
    description:
      'Utilize a lista abaixo para identificar problemas com o GPS fora do raio',
  },
  {
    id: 'card-20',
    title: 'Check-in/out por foto',
    description:
      'Utilize a lista abaixo para identificar os colaboradores que fizeram check-in/out por foto',
  },
  {
    id: 'card-21',
    title: 'Controle Device',
    description:
      'Utilize a lista abaixo para identificar o status dos devices e versões de app.',
  },
]
