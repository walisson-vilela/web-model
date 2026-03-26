export type Licenses = {
  [AccessLevelId: number]: {
    [HierarchyId: number]: {
      reserved: number
      consumed: number
    }
  }
}
