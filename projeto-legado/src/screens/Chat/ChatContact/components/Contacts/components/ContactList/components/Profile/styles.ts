import styled from 'styled-components'

export const ProfileContainer = styled.div`
  width: 100%;
  padding: 14px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #d6d6d6;
  background: #2630461a 0% 0% no-repeat padding-box;
`

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  strong {
    font: normal normal bold 18px/15px Lato;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`

export const ProfileMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .ui.floating.dropdown > .menu {
    width: 160px !important;
    height: 45px !important;
    display: flex !important;
    align-items: center !important;
    position: absolute !important;
    top: 13px !important;
    span {
      font-weight: bold !important;
    }
  }
  .ui.dropdown .menu > .item:hover {
    background: #fff !important;
  }
`
