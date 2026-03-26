export type Rule = 'ONLY' | 'EXCEPT' | ''

export type ActionTypeProps = {
  rule: [Rule, React.Dispatch<React.SetStateAction<Rule>>]
  count: number
  label: string
}
