export interface LevelOneGroup {
  id: number
  name: string
  parent_id: number
  parent_name: string
}

export interface LevelZeroGroup {
  id: number
  name: string
  opened?: boolean
  children: LevelOneGroup[]
}
