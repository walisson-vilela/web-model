export type ContractorLicenses = {
  hierarchies: {
    id: number
    name: string
  }[]
  licenses: {
    id: number
    name: string
    available: number
    consumed: number
    reserved: number
  }[]
  values: {
    [key: `${number}|${number}`]: {
      hierarchy_id: number
      license_id: number
      value: number
      min: number
    }
  }
}

export type Hierarchies = ContractorLicenses['hierarchies']
export type Hierarchy = Hierarchies[keyof Hierarchies]

export type Licenses = ContractorLicenses['licenses']
export type License = Licenses[keyof Licenses]

export type Values = ContractorLicenses['values']
