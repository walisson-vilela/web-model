import styled, { css } from 'styled-components'

export const ErrorMessage = styled.span`
  margin-top: 3.5px;
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;

  ${({ children }) => {
    if (children) return
    return css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `
  }}
`

export const IconContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const getButtonStyle = (isSelected: boolean) => ({
  padding: "0.5rem 1.4rem",
  borderRadius: "1rem",
  border: "none",
  background: isSelected ? "#7087C3" : "#F6F6F6 0% 0% no-repeat padding-box",
  color: isSelected ? "#fff" : "#707070",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0px 2px 3px #DEDEDEF2",
  opacity: 1,
})
