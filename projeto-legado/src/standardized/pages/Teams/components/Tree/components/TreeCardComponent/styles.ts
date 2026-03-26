import styled, { css } from 'styled-components'

export const TreeCardWrapper = styled.div<{
  $borderless?: boolean
  $paddingless?: boolean
  $withoutHeight?: boolean
}>`
  background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat padding-box;

  ${({ $borderless: borderless }) =>
    !borderless &&
    css`
      border: 1px solid #d4d4d5;
      border-radius: 4px;
    `}

  ${({ $paddingless: paddingless }) =>
    !paddingless &&
    css`
      padding: ${({ theme }) => theme.spacings.s3};
    `}

    display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} * 1.5);
  align-items: center;

  ${({ $withoutHeight: withoutHeight }) =>
    !withoutHeight &&
    css`
      height: 80px;
    `}

  position: relative;

  .last-level {
    flex: 1;
    grid-column: span 2;
    display: grid;
    place-items: center;
    margin-left: ${({ theme }) => theme.spacings.s1}; /* menu width */
  }

  .user-hierarchy {
    position: absolute;
    top: calc(${({ theme }) => theme.spacings.s4} / -2);
    width: calc(100% - ${({ theme }) => theme.spacings.s5});
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      height: ${({ theme }) => theme.spacings.s4};

      background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat
        padding-box;
      border: 1px solid #d4d4d5;
      border-radius: 5px;
      max-width: 100px;
      display: flex;
      gap: calc(${({ theme }) => theme.spacings.s1} / 2);
      padding: 0px ${({ theme }) => theme.spacings.s3};

      div:has(span) {
        ${({ theme }) => theme.useTypography('p')}
        font-size: 10px;
        line-height: 12px;
      }
    }
  }

  .toggle-noode {
    position: absolute;
    bottom: -8px;
    width: calc(100% - ${({ theme }) => theme.spacings.s5});
    display: grid;
    place-items: center;
    svg {
      background: ${({ theme }) => theme.colors.white};
    }
  }

  .user-picture {
    display: grid;
    place-items: center;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  }

  .middle-section {
    flex: 1;
    display: grid;
    overflow: clip;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);

    .user-name,
    .user-name span {
      ${({ theme }) => theme.useTypography('h6')}
      line-height: 16px;
    }

    .area-team,
    .area-team span,
    .role-name,
    .role-name span {
      font-size: 10px;
      line-height: 12px;
    }

    .bold {
      font-weight: bold;
    }

    .area-team {
      display: flex;
      align-items: baseline;
      gap: calc(${({ theme }) => theme.spacings.s1} / 2);
      overflow: hidden;
      white-space: nowrap;
    }
  }
`
