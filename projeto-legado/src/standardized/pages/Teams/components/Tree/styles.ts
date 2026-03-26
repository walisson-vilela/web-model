import styled from 'styled-components'

export const TreeWrapper = styled.div<{ $rootCount: number }>`
  flex: 1;
  position: relative;

  .rd3t-link {
    stroke: ${({ theme }) => theme.colors.blue};

    /* hides links with the empty root node */
    :nth-child(-n + ${({ $rootCount: rootCount }) => rootCount}) {
      opacity: 0 !important;
    }
  }
`
