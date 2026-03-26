import styled from 'styled-components'

export const DateUl = styled.ul`
  border-left: 1px solid ${({ theme }) => theme.getColor('darkBlue', 10)};
  padding-left: 2ch;
  padding-block: ${({ theme }) => theme.spacings.s1};
  margin: 0;
  li {
    line-height: ${({ theme }) => theme.spacings.s3};
    margin-bottom: ${({ theme }) => theme.spacings.s1};

    &[data-event='-1'] {
      color: ${({ theme }) => theme.getColor('darkBlue', 30)};
    }

    &[data-event='0'] {
      font-weight: bolder;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &::marker {
      content: '- ';
    }
  }
`

export const DateContainer = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  align-items: center;
  cursor: pointer;
`
