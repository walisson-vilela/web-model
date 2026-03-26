import type { RouteComponentProps } from 'react-router'

import { MAIN_HOME_DETAIL_CONFIGS } from '../../standardized/pages/MainHome/details/constants'
import type { RouteTabProps } from '../TabsProvider/types'

export type RouteListItem = RouteTabProps<string> & {
  path: string
  /**
   * route (default): will be matched by the route main/contractors/?:tab
   *
   * pathname: will be matched by the pathname main/contractors/groups
   *
   * url: will be matched by the pathname and its params main/contractors/groups?a=1&b=2
   */
  by?: 'route' | 'pathname' | 'url'
}

const RouteList: {
  [K: string]: RouteListItem[]
} = {
  downloads: [
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Downloads',
      component: 'DownloadsManager',
    },
  ],
  home: [
    {
      path: '',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'home/main',
      label: 'Painel de Controle',
      component: 'MainHome',
    },
    {
      path: 'dashboard-home',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'home/dashboard',
      label: 'Dashboard Home',
      component: 'DashboardHome',
    },
    ...MAIN_HOME_DETAIL_CONFIGS.map((detail) => ({
      path: `dashboard-home/${detail.id}`,
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/dashboard',
      label: detail.title,
      component: `MainHomeDetail.${detail.id}`,
    })),
    // #region control-panel
    {
      path: 'control-panel',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'home/control-panel',
      label: 'Painel de Controle',
      component: 'ControlPanel.Home',
    },
    {
      path: 'control-panel/attendances-not-started',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Não Iniciaram Atendimento',
      component: 'ControlPanel.NotStartedAttendances',
    },
    {
      path: 'control-panel/average-distance',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Distância Média',
      component: 'ControlPanel.AverageDistance',
    },
    {
      path: 'control-panel/average-speed',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Velocidade Média',
      component: 'ControlPanel.AverageSpeed',
    },
    {
      path: 'control-panel/battery-level',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Nível de Bateria',
      component: 'ControlPanel.BatteryLevel',
    },
    {
      path: 'control-panel/disconnected-users',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Desconectados',
      component: 'ControlPanel.DisconnectedUsers',
    },
    {
      path: 'control-panel/humor',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Humor',
      component: 'ControlPanel.Humor',
    },
    {
      path: 'control-panel/justification-details',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Justificativas',
      component: 'ControlPanel.Justifications',
    },
    {
      path: 'control-panel/pending-data',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Dados Pendentes de Transmissão',
      component: 'ControlPanel.PendingData',
    },
    {
      path: 'control-panel/predicted-attendances',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Atendimentos Previstos',
      component: 'ControlPanel.PredictedAttendances',
    },
    {
      path: 'control-panel/range-quality',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Range Quality',
      component: 'ControlPanel.RangeQuality',
    },
    {
      path: 'control-panel/roadmap-coverage',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'Cobertura do Roteiro',
      component: 'ControlPanel.RoadmapCoverage',
    },
    {
      path: 'control-panel/xray-tmo',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'home/control-panel',
      label: 'RAIO X TMO (S0)',
      component: 'ControlPanel.XRayTMO',
    },
    // #endregion
  ],
  accounts: [
    // #region contractors
    {
      path: 'contractors/create',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'accounts/contractors',
      label: 'Nova Conta',
      component: 'ContractorsForm',
    },
    {
      by: 'pathname',
      path: 'contractors/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'accounts/contractors',
      label: 'Editar Conta (:id)',
      component: 'ContractorsForm',
    },
    {
      path: 'contractors/:tab?',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'accounts/contractors',
      label: 'Conta e Agrupamento',
      component: 'Contractors',
    },
    {
      path: 'contractors/groups/create',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'accounts/contractors',
      label: 'Novo Agrupamento',
      component: 'GroupsForms',
    },
    {
      by: 'pathname',
      path: 'contractors/groups/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'accounts/contractors',
      label: 'Editar Agrupamento (:id)',
      component: 'GroupsForms',
    },
    // #endregion

    {
      path: 'client',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Contratante',
      component: 'ContractorClient',
    },
  ],
  users: [
    // #region people
    {
      path: 'people',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'users/people',
      label: 'Pessoa',
      component: 'Peoples',
    },
    {
      path: 'people/create',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'users/people',
      label: 'Criar Pessoa',
      component: 'PeoplesForm',
    },
    {
      by: 'pathname',
      path: 'people/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'users/people',
      label: 'Editar Pessoa (:id)',
      component: 'PeoplesForm',
    },
    // #endregion

    // #region home
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'users/home',
      label: 'Usuário',
      component: 'Users.Grid',
    },
    {
      by: 'pathname',
      path: 'home/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'users/home',
      label: 'Editar Usuário (:id)',
      component: 'Users.Form',
    },
    // #endregion

    {
      path: 'roles',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Funções',
      component: 'Roles',
    },

    {
      path: 'roles-hierarchies',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Hierarquia da Função',
      component: 'RoleHierarchy',
    },

    // #region teams
    {
      path: 'teams',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'users/teams',
      label: 'Gerenciar Equipe',
      component: 'Teams',
    },

    // #endregion

    {
      path: 'calendars',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'users/calendars',
      label: 'Calendário',
      component: 'Calendar.Details',
    },

    {
      path: 'justifications',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Justificativas',
      component: 'Justifications',
    },
    {
      path: 'work-shifts',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Turno de Trabalho',
      component: 'WorkShifts',
    },
  ],
  products: [
    {
      path: 'categories',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Categoria',
      component: 'Categories',
    },

    // #region home
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'products/home',
      label: 'Produto',
      component: 'Products',
    },
    {
      path: 'home/create',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'products/home',
      label: 'Criar Produto',
      component: 'ProductsForm',
    },
    {
      by: 'pathname',
      path: 'home/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'products/home',
      label: 'Editar Produto (:id)',
      component: 'ProductsForm',
    },
    // #endregion

    // #region suppliers
    {
      path: 'suppliers/:tab?',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'products/suppliers',
      label: 'Fabricante e Marca',
      component: 'SupplierAndBrand',
    },
    {
      path: 'suppliers/brands/create',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'products/suppliers',
      label: 'Criar Marca',
      component: 'BrandForm',
    },
    {
      by: 'pathname',
      path: 'suppliers/brands/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'products/suppliers',
      label: 'Editar Marca (:id)',
      component: 'BrandForm',
    },
    // #endregion
  ],
  stores: [
    {
      path: 'regions',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Área de Atuação',
      component: 'Areas',
    },
    {
      path: 'grouping-areas',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Agrupamento de Área',
      component: 'GroupingAreas',
    },
    {
      path: 'segments',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Canal de Venda',
      component: 'Segments',
    },
    {
      path: 'markets',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Grupo, Rede e Bandeira',
      component: 'FlagNetwork',
    },
    {
      path: 'typologies',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Tipologia',
      component: 'Typology',
    },

    // #region home
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'stores/home',
      label: 'Ponto de Venda (PDV)',
      component: 'Stores.Home',
    },
    {
      path: 'home/create',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'stores/home',
      label: 'Criar Novo PDV',
      component: 'Stores.HomeForm',
    },
    {
      by: 'pathname',
      path: 'home/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'stores/home',
      component: 'Stores.HomeForm',
      label: 'Editar PDV (:id)',
    },
    // #endregion

    {
      path: 'audits',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Auditoria de PDV',
      component: 'Stores.Audits',
    },

    // #region base
    {
      path: 'base',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'stores/base',
      label: 'Base Unificada de PDV',
      component: 'Stores.BaseStores',
    },
    {
      by: 'pathname',
      path: 'base/edit/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'stores/base',
      component: 'Stores.HomeForm',
      label: 'Editar PDV (:id)',
    },
    // #endregion
  ],
  routes: [
    // #region routes
    {
      label: 'Roteiro',
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'routes/home',
      component: 'RoutesScreen',
    },
    {
      label: '...',
      path: 'home/:route_id/versions/:route_version_id/:window_id?',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'routes/home',
      component: 'EventsManager',
    },
    {
      label: '...',
      path: 'home/:route_id/versions/:route_version_id/new',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'routes/home',
      component: 'RoutesEventsManager',
    },
    // #endregion
  ],
  surveys: [
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Pesquisas',
      component: 'NewSurveys',
    },
  ],
  messages: [
    {
      path: 'inbox/:tab?/:id?',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Inbox',
      component: 'Inbox',
    },
  ],
  images: [
    // #region gallery
    {
      path: 'gallery',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'images/gallery',
      label: 'Galeria de Imagens',
      component: 'ImageGallery.Home',
    },
    {
      path: 'gallery/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'images/gallery',
      label: 'Imagens',
      component: 'ImageGallery.ImageGalleryView',
    },
    // #endregion
  ],
  dashboard: [
    // #region home
    {
      path: 'home-test-test',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Relatórios Atendimento',
      component: 'NewDashboard',
    },
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      primary: true,
      group: 'dashboard/home',
      label: 'Relatórios Atendimento',
      component: 'DashboardTest',
    },
    {
      path: 'home/attendance-details',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Atendimento',
      component: 'NewDashboard.Attendance',
    },
    {
      path: 'home/average-distance',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Distância Média',
      component: 'NewDashboard.AverageDistance',
    },
    {
      path: 'home/average-speed',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Velocidade Média',
      component: 'NewDashboard.AverageSpeed',
    },
    {
      path: 'home/justification-details',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Justificativa',
      component: 'NewDashboard.JustificationDetails',
    },
    {
      path: 'home/punctuality',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Pontualidade',
      component: 'NewDashboard.Punctuality',
    },
    {
      path: 'home/range-quality',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Range Quality',
      component: 'NewDashboard.RangeQuality',
    },
    {
      path: 'home/segmentation',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Segmentação Canal',
      component: 'NewDashboard.Segmentation',
    },
    {
      path: 'home/service-performance',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Performance',
      component: 'NewDashboard.ServicePerformance',
    },
    {
      path: 'home/top-flag',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Bandeira',
      component: 'NewDashboard.Flag',
    },
    {
      path: 'home/top-network',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Rede',
      component: 'NewDashboard.Network',
    },
    {
      path: 'home/top-typology',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'Tipologia',
      component: 'NewDashboard.Typology',
    },
    {
      path: 'home/xray-tmo',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'dashboard/home',
      label: 'RAIO X TMO (S0)',
      component: 'XRayTMO',
    },
    // #endregion
  ],
  io: [
    {
      path: 'exports',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Exportar Dados',
      component: 'ExportData',
    },

    {
      path: 'imports',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Importar Dados',
      component: 'ImportData',
    },

    {
      path: 'afd',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'AFD',
      component: 'AFD',
    },
  ],
  settings: [
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Configurações Gerais',
      component: 'Settings',
    },

    {
      path: 'classifications',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Motivos e Classificações',
      component: 'Classification',
    },
  ],
  terms: [
    {
      path: 'home',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Gestão  de Políticas e Termos',
      component: 'Terms.Home',
    },
    {
      path: 'pendings',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Políticas e Termos',
      component: 'Terms.Pendings',
    },
  ],
  user: [
    {
      path: 'data',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Meus Dados',
      component: 'MyData',
    },
    {
      path: 'password',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Troca de Senha',
      component: 'PasswordUpdate',
    },
  ],
  docs: [
    {
      path: 'api',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'API',
      component: 'ApiDocs',
    },
  ],
  dev: [
    {
      label: '...',
      path: 'auditing',
      data: {
        route: {} as RouteComponentProps,
      },
      component: 'Auditings',
    },
    {
      label: 'Planejanemnto/Auditoria',
      path: 'auditing/:auditing_id',
      data: {
        route: {} as RouteComponentProps,
      },
      component: 'AuditingsView',
    },
    {
      path: 'chat',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Chat',
      component: 'Chat',
    },
    {
      path: 'client/authorizations/historic',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Histórico de Aprovação',
      component: 'HistoricAuthorizations',
    },
    {
      label: 'Configurações',
      path: 'configure',
      data: {
        route: {} as RouteComponentProps,
      },
      component: 'Configures',
    },
    {
      label: 'Gerenciador de Grupos',
      path: 'groups',
      data: {
        route: {} as RouteComponentProps,
      },
      component: 'Groups',
    },
    {
      path: 'internaluser',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Novo Usuário',
      component: 'CreateInternalUser',
    },
    {
      path: 'internaluser/edit/1',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Editar Usuário',
      component: 'UpdateInternalUser',
    },
    {
      path: 'internalusers',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Usuário Interno',
      component: 'InternalUsers',
    },
    {
      path: 'perfect-store',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Loja Perfeita',
      component: 'PerfectStore',
    },
    {
      path: 'task-manager',
      data: {
        route: {} as RouteComponentProps,
      },
      label: 'Gestão de Tarefas',
      component: 'TaskManager',
    },
    {
      path: 'task-manager/:id',
      data: {
        route: {} as RouteComponentProps,
      },
      label: '-',
      component: 'TaskDetails',
    },
  ],
  epi: [
    {
      path: 'epi-warehouse/:tab?',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'epi/epi-warehouse',
      label: "EPI's Almoxarifado",
      component: 'EPIWarehouse',
    },
    {
      path: 'epi-management/:tab?',
      data: {
        route: {} as RouteComponentProps,
      },
      group: 'epi/epi-management',
      label: "Gestão de EPI's",
      component: 'EPIManagement',
    },
  ]
}

export default RouteList
