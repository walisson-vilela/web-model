import styled from 'styled-components'

const SelectedArea = styled.div`
  background-color: ${({ theme }) => theme.getColor('greyishBlue', 10)};

  height: 3px;
  width: 100%;
  position: absolute;
  bottom: calc(50% - 2px);
  left: 0;
  display: flex;
  z-index: 1;

  > span {
    background-color: ${({ theme }) => theme.colors.blue};
    height: 100%;
  }
`

export default SelectedArea
