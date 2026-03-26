interface CounterPropsWithData {
  partial: number | string
  total: number | string
  children?: never
}

interface CounterPropsWithChildren {
  partial?: never
  total?: never
  children: number | string
}

export type CounterProps = CounterPropsWithData | CounterPropsWithChildren
