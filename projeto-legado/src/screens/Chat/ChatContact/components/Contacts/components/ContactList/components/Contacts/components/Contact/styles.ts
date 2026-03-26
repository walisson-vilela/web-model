import styled from 'styled-components'

interface ContactContainerProps {
  isSelected: boolean
}

export const ContactContainer = styled.div<ContactContainerProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #d6d6d6;
  padding: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#f4f4f5' : '')};
`

export const ContactInfo = styled.div`
  display: flex;
  gap: 14px;
`

export const ContactInfoImage = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const ContactInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  strong {
    font: normal normal bold 14px/15px Lato;
    color: #192338;
  }

  span {
    font: normal normal normal 14px/15px Lato;
    color: #192338;
  }
`

export const ContactMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font: normal normal normal 13px/15px Lato;
    color: #192338;
  }
  .ui.dropdown > .left.menu {
    width: 164px !important;
    position: absolute !important;
  }
  .ui.dropdown .menu > .item:hover {
    background: #fff !important;
  }
`

export const ArrowDown = styled.div`
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
