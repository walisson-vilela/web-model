import styled from 'styled-components'

export const Map = styled.div`
  width: 100%;
  height: 100%;
`
export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  > div {
    width: 50%;
    overflow-y: auto;
  }
`
