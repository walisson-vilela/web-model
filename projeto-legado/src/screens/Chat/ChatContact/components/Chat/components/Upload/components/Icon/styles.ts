import styled, { css } from 'styled-components'

interface SelectedItemProps {
  active: boolean
}

export const Container = styled.div<SelectedItemProps>`
  position: relative;
  border: 3px solid transparent;
  width: 55px;
  height: 55px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;

  div {
    position: absolute;
    top: 0;
    right: 0px;
    padding: 1px 2px;
    background: #3455ab;
    border-radius: 0 0 0 4px;
    cursor: pointer;

    svg {
      width: 14px;
      height: 14px;
      color: #fff;
    }
  }
  ${(props) =>
    props.active &&
    css`
      border: 3px solid #3455ab;
      border-radius: 8px;
    `}
`

export const IconFile = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`

export const ImageIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`
