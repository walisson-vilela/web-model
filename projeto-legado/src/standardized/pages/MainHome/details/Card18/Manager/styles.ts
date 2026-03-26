import styled from 'styled-components'

export const InteractionOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1001;
  pointer-events: none;

`

export const InteractionPanel = styled.div`
  && {
    position: fixed;
    top: 34%;
    right: 20px;
    bottom: 30px;
    width: 360px;
    max-width: calc(100vw - 40px);
    max-height: none;
    z-index: 1002;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: auto;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: none;
  }
`

export const PanelHeader = styled.div`
  && {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    border: 0 !important;
    border-bottom: 0 !important;
    box-shadow: none !important;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background: #7087c3;
    color: #ffffff;
  }
`

export const PanelTitle = styled.div`
  font-weight: 600;
`

export const PanelBody = styled.div`
  padding: 12px;
  overflow: auto;
  flex: 1;
  background: rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const MetaBox = styled.div`
  border: 0;
  background: transparent;
  border-radius: 0;
  padding: 0;
`

export const MetaLines = styled.div`
  display: grid;
  row-gap: 4px;
  font-size: 13px;
`

export const NoteRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const NoteBubble = styled.div`
  flex: 1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.25;

`

export const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  object-fit: cover;
  flex: 0 0 auto;
  border: 0;
`

export const Divider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 12px 0;
`

export const ComposeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const MessageRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
  width: 100%;
  flex: 1;
  min-height: 0;
`

export const MessageHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`

export const MessageAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
`

export const MessageCard = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-height: 0;
`

export const MessageDivider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 0;
`

export const TextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;

  textarea {
    width: 100%;
    height: 100% !important;
    min-height: 0 !important;
    overflow: hidden;
  }
`

export const Counter = styled.div`
  font-size: 12px;
  opacity: 0.7;
  text-align: right;
  margin-top: 4px;
`

export const CounterFloating = styled.div``

export const PanelFooter = styled.div`
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: rgba(0, 0, 0, 0.02);
`

export const ActionIconButton = styled.button`
  border: 0;
  background: transparent;
  padding: 6px;
  cursor: pointer;
  color: inherit;
`
