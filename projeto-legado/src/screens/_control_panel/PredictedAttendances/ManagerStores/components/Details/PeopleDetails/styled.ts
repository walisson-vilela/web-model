import styled from 'styled-components'

export const MarginXAuto = styled.div`
  margin-left: auto;
  margin-right: 28px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

interface RoundedImageProps {
  src: string
}

export const RoundedImage = styled.div<RoundedImageProps>`
  width: 64px;
  height: 64px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: 100%;
`

export const NormalH5 = styled.h5`
  font-weight: normal;
`
