type TermsData = {
  id: number
  accountName: string
  title: string
  created_at: string
}

export interface ComponentProps {
  tabId: number
  onClose: () => void
  data: TermsData
}
