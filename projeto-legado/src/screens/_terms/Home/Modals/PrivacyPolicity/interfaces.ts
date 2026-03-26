type Data = {
  id: number
  accountName: string
  createdAt: string
}

export interface ComponentProps {
  tabId: number
  onClose: () => void
  data: Data
}
