import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  min-height: 273px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  span {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 4px;
    color: #000000cc;
    .camera-icon {
      width: 13px;
      height: 13px;
    }
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const ImgWrapper = styled.div`
  width: 100%;
  height: 238px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
  }
`
export const Bullet = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ef5350;
`

export const EmptyImage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font: 19px font font bold;
  p {
    text-align: center;
    color: #c8c8c8;
  }
`
