import styled, { css } from 'styled-components'

export const Card = styled.div<{ $disabled?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;

  gap:  ${({ theme }) => theme.spacings.s1};

  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s1}`};
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white}

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);

  color:${({ theme }) => theme.colors.greyishBlue}
  ${({ theme }) => theme.useTypography('p')};


  text-align: center;

  width: fit-content;
  line-height: 17px;

  ${({ $disabled: disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}

`

export const DotsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2px);
  grid-template-rows: repeat(4, 2px);
  gap: 4px;
  margin: -2px 0;
`

export const Dot = styled.div`
  width: 2px;
  height: 2px;
  background-color: #bdbdbd;
  border-radius: 50%;
`
