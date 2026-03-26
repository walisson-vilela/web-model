import styled from 'styled-components'

export const Container = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px !important;
`

interface BulletProps {
  active?: boolean
}

export const Item = styled.div<BulletProps>`
  margin: 7px 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  strong {
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-left: 6px;
      background-color: ${(props) => (props.active ? '#66BB6A' : '#F2245C')};
    }
    span {
      display: inline-block;
      margin-left: 3px;
      font-weight: normal;
    }
  }
`
