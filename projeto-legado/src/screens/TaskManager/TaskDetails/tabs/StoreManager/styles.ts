import styled from 'styled-components'

export const StorePopup = styled.div`
  width: 540px;
  padding: 12px 0;
`

export const StorePopupTop = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  column-gap: 16px;
  padding: 0 16px 10px;
`

export const StorePopupId = styled.div`
  font-size: 13px;
  color: #5c6b7a;

  strong {
    font-weight: 700;
    margin-right: 4px;
  }
`

export const StorePopupTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2d3d;
  line-height: 18px;
`

export const StorePopupSubtitle = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #6b7785;
`

export const StorePopupRows = styled.div`
  border-top: 1px solid #e5e5e5;
`

export const StorePopupRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  column-gap: 16px;
  padding: 10px 16px;
  border-bottom: 1px solid #e5e5e5;
`

export const StorePopupLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #5c6b7a;
`

export const StorePopupValue = styled.div`
  font-size: 13px;
  color: #1f2d3d;
  line-height: 18px;

  b {
    font-weight: 700;
  }
`

export const ExecutorPopup = styled.div`
  width: 640px;
  padding: 0;
`

export const ExecutorTop = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr 120px;
  column-gap: 14px;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e5e5;
`

export const ExecutorAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: #f2f2f2;
`

export const ExecutorName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2d3d;
  line-height: 18px;
`

export const ExecutorMeta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #6b7785;
  line-height: 16px;
`

export const ExecutorIpa = styled.div`
  text-align: right;
`

export const ExecutorIpaLabel = styled.div`
  font-size: 12px;
  color: #6b7785;
`

export const ExecutorIpaValue = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #1f2d3d;
  line-height: 26px;
`

export const ExecutorRows = styled.div`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`

export const ExecutorRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  column-gap: 16px;
  padding: 10px 16px;
  border-bottom: 1px solid #e5e5e5;
`

export const ExecutorLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #5c6b7a;
`

export const ExecutorValue = styled.div`
  font-size: 13px;
  color: #1f2d3d;
  line-height: 18px;
`

export const VisitsPopup = styled.div`
  width: 440px;
  padding: 0;
`

export const VisitsPopupHeader = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid #e5e5e5;
`

export const VisitsPopupHeaderTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px;
  column-gap: 12px;
  align-items: center;
`

export const VisitsPopupTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2d3d;
  line-height: 18px;
`

export const VisitsPopupSubtitle = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #6b7785;
  line-height: 16px;

  strong {
    font-weight: 700;
    color: #1f2d3d;
  }
`

export const VisitsPopupSearch = styled.div`
  position: relative;
`

export const VisitsPopupSearchInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 30px 0 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 12px;
  color: #1f2d3d;
  outline: none;

  ::placeholder {
    color: #9aa5b1;
  }
`

export const VisitsPopupSearchIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa5b1;
`

export const VisitsPopupList = styled.div``

export const VisitsPopupItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 26px;
  column-gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
`

export const VisitsPopupDate = styled.div`
  font-size: 13px;
  color: #1f2d3d;
  line-height: 18px;

  strong {
    font-weight: 700;
  }
`

export const VisitsPopupTimes = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #6b7785;
  line-height: 16px;
`

export const VisitsPopupStatus = styled.div`
  text-align: right;
`
