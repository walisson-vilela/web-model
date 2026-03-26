export interface HomePageContent {
  eyebrow: string
  title: string
  copy: string
  actionLabel: string
}

export interface HomeCardProps {
  content: HomePageContent
  onBackToLogin: () => void
}
