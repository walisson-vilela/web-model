interface ConflictsProps {
  id: number | null
  code: number | null
  message: string | null
}

export interface PeopleProps extends ConflictsProps {
  peoples: {
    id: number
    name: string
    people_id_name: string
  }[]
}

export interface PeopleData {
  id: number
  name: string
  supervisor: {
    name: string
  }
}

export interface PeopleBody {
  code: number
  user: string
  supervisor: string
}

export interface ProductsProps extends ConflictsProps {
  products: {
    id: number | null
    name: string | null
    Categories: {
      name: string | null
    }
    ProductLines: {
      name: string | null
    }
  }[]
}

export interface ProductsData {
  id: number | null
  name: string | null
  Categories: {
    name: string | null
  }
  ProductLines: {
    name: string | null
  }
}

export interface ProductsBody {
  code: number
  products: string
  category: string
  product_line: string
}

export interface StoresProps extends ConflictsProps {
  stores?: {
    id: number
    name: string
    Segments: {
      name: string
    }
    Markets: {
      name: string
    }
  }[]
}

export interface StoresData {
  id: number
  name: string
  Segments: {
    name: string
  }
  Markets: {
    name: string
  }
}

export interface StoresBody {
  code: number
  pdv: string
  channel: string
  flag: string
}

export type ModalsNames =
  | 'Form'
  | 'Local'
  | 'Channel'
  | 'PDVHierarchy'
  | 'Products'
  | 'User'
