type TabsNames = 'Usuário' | 'Função' | 'Equipe'

export const getLabel: {
  [name in TabsNames]: {
    name: string
    payloadName: string
    endPointReturnName: string
  }
} = {
  Usuário: {
    name: 'Peoples',
    endPointReturnName: 'peoples',
    payloadName: 'people_id',
  },
  Função: {
    name: 'Roles',
    endPointReturnName: 'roles',
    payloadName: 'role_id',
  },
  Equipe: {
    name: 'HierarchyElements',
    endPointReturnName: 'hierarchy_elements',
    payloadName: 'hierarchy_element_id',
  },
}
