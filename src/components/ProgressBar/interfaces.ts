export interface ProgressBarProps {
  type: 'default' | 'info' | 'danger' | 'success' | 'warning'
  value: number | null
}

export interface StyledProgressBarProps {
  $type: ProgressBarProps['type']
}
