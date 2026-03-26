import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 1px;
  color: #000000cc;
`

export const HeaderItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s3} / 2);

  background: #ecedef 0% 0% no-repeat padding-box;
  ${({ theme }) => theme.useTypography('h5')}
  padding: ${({ theme }) => theme.spacings.s1};
`

export const HeaderSubItemWrapper = styled.div`
  ${({ theme }) => theme.useTypography('h6')}
  padding: calc(${({ theme }) => theme.spacings.s1} / 2)
      ${({ theme }) => theme.spacings.s1};

  background: #cecece 0% 0% no-repeat padding-box;
  border: 1px solid #e6e6e7;
`

export const HeaderColWrapper = styled.div`
  position: relative;
  flex: 1;
  > div:has(svg) {
    position: absolute;
    top: 0;
    right: 0;
    color: ${({ theme }) => theme.getColor('black')};
    margin: calc(${({ theme }) => theme.spacings.s1} / 2);
  }
`
