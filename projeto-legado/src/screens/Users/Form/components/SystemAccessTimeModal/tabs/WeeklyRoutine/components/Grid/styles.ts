import styled from 'styled-components'

export { Link } from '../../../../../../../../../standardized/pages/Users/Form/styled'

type XMarkProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  content?: string
}

export const XMark = styled.span<XMarkProps>`
  :before {
    content: ${({ content }) => {
      return `"${content !== undefined ? content : '\\00D7'}"` // multiplication sign (&times;)
    }};

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-weight: bold;
  }
  :after {
    content: 'X';
    visibility: hidden;
    font-weight: bold;
  }
`
