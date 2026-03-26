import styled from 'styled-components'

export const ProfileContainer = styled.div`
  width: 100%;
  padding: 25px;
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

  svg {
    cursor: pointer;
  }
`

export const ProfileMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;
`

export const ProfileNewGroup = styled.div`
  cursor: pointer;
`
