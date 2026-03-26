interface TabsProps {
  label: string
  component: JSX.Element
}

export interface ComponentProps {
  data: {
    title: string
    options: TabsProps[]
    onClose: () => void
  }
}

export interface DataProps {
  company_name: string
  formatted_address: string
}
