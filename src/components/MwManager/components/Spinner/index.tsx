import * as S from './styled'

export interface SpinnerProps {
  size?: number
  thickness?: number
  color?: string
  trackColor?: string
  /** acessibilidade (ex.: 'Carregando') */
  label?: string
}

const Spinner = (props: SpinnerProps) => {
  const {
    size = 32,
    thickness = 3,
    color = '#5e78bd',
    trackColor = '#e6e6e6',
    label = 'Carregando',
  } = { ...props }

  return (
    <S.Spinner
      role='status'
      aria-label={label}
      $size={size}
      $thickness={thickness}
      $color={color}
      $trackColor={trackColor}
    />
  )
}

export default Spinner
