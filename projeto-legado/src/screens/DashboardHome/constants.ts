import type { DashboardHomeCard } from './types'

export const DASHBOARD_HOME_CARDS: DashboardHomeCard[] = [
  {
    id: 'service-overview',
    title: 'Panorama de Atendimento',
    description:
      'Visão geral dos principais indicadores de atendimento, com evolução diária e destaques das últimas ações.',
    path: 'service-overview',
    ctaLabel: 'Explorar panorama',
    status: 'soon',
    highlight: {
      label: 'TMO Atual',
      value: '03m 17s',
    },
    meta: {
      label: 'Atualizado em',
      value: 'Hoje, 09:20',
    },
  },
  {
    id: 'coverage',
    title: 'Cobertura & Execução',
    description:
      'Analise a execução do roteiro e acompanhe os gaps de cobertura por região, canal e time.',
    path: 'coverage',
    ctaLabel: 'Ver cobertura',
    status: 'soon',
    highlight: {
      label: 'Cobertura média',
      value: '92%',
    },
    meta: {
      label: 'Pendências críticas',
      value: '08',
    },
  },
  {
    id: 'quality',
    title: 'Qualidade do Serviço',
    description:
      'KPIs de qualidade, auditorias e percepções coletadas em campo, alinhados ao padrão definido no XD.',
    path: 'quality',
    ctaLabel: 'Detalhar qualidade',
    status: 'soon',
    highlight: {
      label: 'Índice de qualidade',
      value: '87%',
    },
    meta: {
      label: 'Alertas ativos',
      value: '03',
    },
  },
  {
    id: 'alerts',
    title: 'Alertas & Pendências',
    description:
      'Centralize as pendências prioritárias, riscos e ações recomendadas para dar visibilidade rápida ao time.',
    path: 'alerts',
    ctaLabel: 'Consultar alertas',
    status: 'soon',
    highlight: {
      label: 'Alertas novos',
      value: '12',
    },
    meta: {
      label: 'Itens resolvidos',
      value: '05',
    },
  },
]
