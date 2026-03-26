import type { ComponentType, SVGAttributes } from 'react'
import type { RouteObject } from 'react-router-dom'

import featherIcons from '../../../assets/icons/feather'

import DashboardScreen from './Dashboard'
import ScreenPlaceholder from './ScreenPlaceholder'

const {
  classification: Classification,
  contract: Contract,
  dashboard: Dashboard,
  doc_checked: DocChecked,
  global: Global,
  group: Group,
  import_export: ImportExport,
  invoice: Invoice,
  invoice_management: InvoiceManagement,
  management: Management,
  settings: Settings,
  table: Table,
  user: User,
} = featherIcons

export type HomeScreenNode = {
  path: string
  label: string
  description: string
  icon: ComponentType<SVGAttributes<SVGSVGElement>>
  element: JSX.Element
  children?: HomeScreenNode[]
}

const buildPlaceholder = (title: string, description: string) => (
  <ScreenPlaceholder title={title} description={description} />
)

export const HOME_SCREEN_DEFAULT_PATH = 'home'

export const HOME_SCREEN_NODES: HomeScreenNode[] = [
  {
    path: 'home',
    label: 'Home',
    description: 'Painel inicial da área autenticada.',
    icon: Dashboard,
    element: <DashboardScreen />,
  },
  {
    path: 'usuarios',
    label: 'Usuários',
    description: 'Gerencie usuários e permissões do sistema.',
    icon: Group,
    element: buildPlaceholder('Usuários', 'Gerencie usuários e permissões do sistema.'),
  },
  {
    path: 'clientes',
    label: 'Clientes',
    description: 'Consulte e organize os cadastros de clientes.',
    icon: User,
    element: buildPlaceholder('Clientes', 'Consulte e organize os cadastros de clientes.'),
  },
  {
    path: 'classificacao',
    label: 'Classificação',
    description: 'Utilize essa tela para gerenciar as classificações.',
    icon: Classification,
    element: buildPlaceholder('Classificação', 'Utilize essa tela para gerenciar as classificações.'),
  },
  {
    path: 'tabela-de-vendas',
    label: 'Tabela de Vendas',
    description: 'Acompanhe e mantenha as tabelas comerciais.',
    icon: Table,
    element: buildPlaceholder('Tabela de Vendas', 'Acompanhe e mantenha as tabelas comerciais.'),
  },
  {
    path: 'contrato',
    label: 'Contrato',
    description: 'Centralize o fluxo de contratos da operação.',
    icon: Contract,
    element: buildPlaceholder('Contrato', 'Centralize o fluxo de contratos da operação.'),
    children: [
      {
        path: 'gerar-contrato',
        label: 'Gerar Contrato',
        description: 'Inicie a geração de um contrato novo.',
        icon: Contract,
        element: buildPlaceholder('Gerar Contrato', 'Inicie a geração de um contrato novo.'),
      },
      {
        path: 'criar-modelo-de-contrato',
        label: 'Criar Modelo de Contrato',
        description: 'Monte modelos reutilizáveis para contratos.',
        icon: Contract,
        element: buildPlaceholder('Criar Modelo de Contrato', 'Monte modelos reutilizáveis para contratos.'),
      },
    ],
  },
  {
    path: 'autorizacoes',
    label: 'Autorizações',
    description: 'Gerencie as autorizações do fluxo operacional.',
    icon: DocChecked,
    element: buildPlaceholder('Autorizações', 'Gerencie as autorizações do fluxo operacional.'),
  },
  {
    path: 'pais-de-atuacao',
    label: 'País de Atuação',
    description: 'Defina os países e áreas de atuação.',
    icon: Global,
    element: buildPlaceholder('País de Atuação', 'Defina os países e áreas de atuação.'),
  },
  {
    path: 'gestao-de-recebiveis',
    label: 'Gestão de Recebíveis',
    description: 'Acompanhe recebíveis, boletos e inadimplência.',
    icon: Management,
    element: buildPlaceholder('Gestão de Recebíveis', 'Acompanhe recebíveis, boletos e inadimplência.'),
    children: [
      {
        path: 'contas-a-receber',
        label: 'Contas a Receber',
        description: 'Consulte as contas em aberto.',
        icon: InvoiceManagement,
        element: buildPlaceholder('Contas a Receber', 'Consulte as contas em aberto.'),
      },
      {
        path: 'inadimplencia',
        label: 'Inadimplência',
        description: 'Analise os indicadores de atraso.',
        icon: Invoice,
        element: buildPlaceholder('Inadimplência', 'Analise os indicadores de atraso.'),
      },
      {
        path: 'historico-de-pagamento',
        label: 'Histórico de Pagamento',
        description: 'Veja o histórico dos pagamentos realizados.',
        icon: DocChecked,
        element: buildPlaceholder('Histórico de Pagamento', 'Veja o histórico dos pagamentos realizados.'),
      },
      {
        path: 'gerenciar-boletos',
        label: 'Gerenciar Boletos',
        description: 'Emita e acompanhe boletos gerados.',
        icon: InvoiceManagement,
        element: buildPlaceholder('Gerenciar Boletos', 'Emita e acompanhe boletos gerados.'),
      },
      {
        path: 'gerenciar-notas-fiscais-invoice',
        label: 'Gerenciar Notas Fiscais/Invoice',
        description: 'Administre notas fiscais e invoices.',
        icon: Invoice,
        element: buildPlaceholder('Gerenciar Notas Fiscais/Invoice', 'Administre notas fiscais e invoices.'),
      },
    ],
  },
  {
    path: 'configuracao-da-fatura',
    label: 'Configuração da Fatura',
    description: 'Ajuste parâmetros e regras da fatura.',
    icon: Settings,
    element: buildPlaceholder('Configuração da Fatura', 'Ajuste parâmetros e regras da fatura.'),
  },
  {
    path: 'gestao-de-faturamento',
    label: 'Gestão de Faturamento',
    description: 'Controle o faturamento da operação.',
    icon: InvoiceManagement,
    element: buildPlaceholder('Gestão de Faturamento', 'Controle o faturamento da operação.'),
  },
  {
    path: 'importar-exportar',
    label: 'Importar / Exportar',
    description: 'Importe ou exporte dados conforme a demanda.',
    icon: ImportExport,
    element: buildPlaceholder('Importar / Exportar', 'Importe ou exporte dados conforme a demanda.'),
  },
]

export const flattenHomeScreenNodes = (
  nodes: HomeScreenNode[],
): HomeScreenNode[] => {
  return nodes.flatMap((node) => [node, ...(node.children ? flattenHomeScreenNodes(node.children) : [])])
}

export const findHomeScreenNodeByPath = (
  path: string,
  nodes: HomeScreenNode[] = HOME_SCREEN_NODES,
): HomeScreenNode | undefined => {
  for (const node of nodes) {
    if (node.path === path) return node

    const foundChild = node.children
      ? findHomeScreenNodeByPath(path, node.children)
      : undefined

    if (foundChild) return foundChild
  }

  return undefined
}

export const flattenHomeScreenRoutes = (
  nodes: HomeScreenNode[],
): RouteObject[] => {
  return nodes.flatMap(({ path, element, children }) => [
    {
      path,
      element,
    },
    ...(children ? flattenHomeScreenRoutes(children) : []),
  ])
}
