import type { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree'

export type HierarchyType = {
  id: number
  name: string
  user_count: number
}

export type CardNodeDatum = Omit<TreeNodeDatum, 'attributes'> & {
  attributes: Omit<NodeType, 'children'>
}

export type CardsProps = {
  nodeDatum: CardNodeDatum
} & Pick<CustomNodeElementProps, 'toggleNode'>

export type NodeUserType = {
  /* ID */
  id: number
  /* Nome */
  name: string
  /* Função */
  role: {
    /* ID */
    id: number
    /* Nome */
    name: string
  }
  /* Função */
  person: {
    /* ID */
    id: number
    /* Matrícula */
    registration: string | null
  }
  /* Foto */
  avatar: {
    /* Link da foto */
    url: string
    /* Nome do arquivo */
    name: string
  } | null
}

export type NodeType = {
  /* ID */
  id: number | null
  /* ID do nó pai */
  parent_id: number | null
  /* Nome da equipe */
  name: string | null
  /* Quantidade de Áreas de Atuação abaixo deste nó */
  region_count: number
  /* Quantidade de Equipes abaixo deste nó */
  team_count: number
  /* Quantidade de nós imediatamente abaixo deste nó */
  child_count: number
  /* Responsável direto atual */
  superior_name: string | null
  /* Usuário */
  hierarchies_user: {
    /* Tipo da atribuição do superior direto */
    manual: boolean
    /* Label do tipo da atribuição do superior direto (Manual ou Automática) */
    manual_label: string
    /* Quantidade de Áreas de Atuação do Usuário */
    region_count: number
    /* Quantidade de Espelhamentos deste Usuário */
    mirroring_count: number
    /* Quantidade de Aprovações/Reprovações */
    approval_count: number
    /* Usuário */
    user: NodeUserType
  } | null
  /* Nível da Hierarquia da Função */
  structure: {
    /* ID */
    id: number
    /* Nível */
    level: number
    /* Label do Nível */
    level_label: string
    /* Nome */
    name: string | null
  }
  /* Nós abaixo deste nó */
  children: NodeType[]
}

export type HierarchyUser = {
  /* ID da associação entre Usuário e Pilar */
  id: number | null
  /* Usuário */
  user: {
    /* ID */
    id: number
    /* Nome */
    name: string
    /* Função */
    role: {
      /* ID */
      id: number
      /* Nome */
      name: string
    }
    /* Pessoa */
    person: {
      /* Matrícula */
      registration: string
    }
    /* Foto */
    avatar: {
      /* Nome do arquivo */
      name: string
      /* Link da foto */
      url: string
    } | null
  }
}

export type SuperiorType = {
  region_count: number
  user: {
    id: number
    name: string
    role: {
      id: number
      name: string
    }
    person: {
      id: number
      registration: string | null
    }
    enrollment: {
      name: string
    }
  }
}
