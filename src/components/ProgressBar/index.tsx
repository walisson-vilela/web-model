import type { ProgressBarProps } from './interfaces'
import * as S from './styles'

const ProgressBar = ({ type, value, ...props }: ProgressBarProps) => {
  return (
    <S.Container $disabled={value === null}>
      <S.Progress {...props} $type={type}>
        <span style={{ width: `${value || 0}%` }} />
      </S.Progress>

      <span> {value === null ? '-' : value}%</span>
    </S.Container>
  )
}

export default ProgressBar
