export type Frequency = 'D' | 'W' | 'M' | ''

export interface BodyInterface {
  frequency: Frequency
  days: number[]
}
