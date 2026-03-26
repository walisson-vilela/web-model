import styled from 'styled-components'

type SectionTitleProps = {
  children: React.ReactNode
  variant?: 'default' | 'small'
}

const StyledTitle = styled.h4<{ $variant: 'default' | 'small' }>`
  margin: 0 0 12px;
  font-size: ${({ $variant }) => ($variant === 'small' ? '13px' : '14px')};
  font-weight: 600;
  color: ${({ $variant }) =>
    $variant === 'small' ? '#111827' : '#000000CC'};
`

const SectionTitle = ({ children, variant = 'default' }: SectionTitleProps) => {
  return <StyledTitle $variant={variant}>{children}</StyledTitle>
}

export default SectionTitle
