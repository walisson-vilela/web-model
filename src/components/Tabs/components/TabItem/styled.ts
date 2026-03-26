import styled from 'styled-components'

export const Container = styled.div`
  @property --bgColor {
    syntax: '<color>';
    initial-value: #ffffff;
    inherits: false;
  }

  @property --color {
    syntax: '<color>';
    initial-value: #000000;
    inherits: false;
  }

  @property --colorBefore {
    syntax: '<color>';
    initial-value: #3455ab;
    inherits: false;
  }

  &.active *,
  &.active ::before,
  &.active ::after {
    --bgColor: #3455ab;
    --color: #ffffff;
    --colorBefore: #ffffff;
  }

  &.active {
    z-index: 2;
  }

  display: flex;

  max-width: 184px;
  position: relative;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
`
