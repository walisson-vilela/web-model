import styled from 'styled-components'

export const Close = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: var(--bgColor);
  color: var(--color);
  padding: 4px 8px;

  transition: --color 0.5s, --bgColor 0.5s;

  svg {
    width: 14px;
    height: 14px;

    * {
      transition: --color 0.5s;
      stroke: var(--color);
    }
  }
`
