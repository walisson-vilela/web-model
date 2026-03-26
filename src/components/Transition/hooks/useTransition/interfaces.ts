type TransitionFunction =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end'
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`
  | `frames(${number})`
  | `steps(${number})`
  | `steps(${number}, ${
      | 'jump-start'
      | 'jump-end'
      | 'jump-none'
      | 'jump-both'
      | 'start'
      | 'end'})`

export interface Transition<P extends string> {
  active: boolean
  mountDuration: number
  properties: Partial<{
    [key in P]: {
      /**
       * Note: equals or less than mountDuration
       * Default: value of mountDuration
       */
      duration?: number
      /**
       * Default: ease-in-out
       */
      function?: TransitionFunction
    }
  }>
}

export type MappedTransitions<P extends string> = {
  [key in P]: {
    enabled?: string
    disabled?: string
  }
}
