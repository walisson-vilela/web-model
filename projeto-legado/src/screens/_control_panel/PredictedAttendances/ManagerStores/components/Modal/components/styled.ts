import styled from 'styled-components'

interface MapProps {
  height?: string | number
}

export const Map = styled.div<MapProps>`
  width: 100%;
  height: ${(props) => props.height || '200px'};
`
export const LoaderContainer = styled.div`
  height: 273px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
