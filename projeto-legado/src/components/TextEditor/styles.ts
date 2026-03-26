import styled, { css } from 'styled-components'

export const Container = styled.div<{
  $disabled: boolean
  $borderless?: boolean
  $progress: number
}>`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  #toolbar,
  .quill {
    border-color: #d3d3d3;
    border-style: solid;
  }
  .quill > .ql-container.ql-snow {
    border: none;
  }

  ${({ $borderless: borderless }) => {
    if (borderless) {
      return css`
        #toolbar {
          border-width: 0;
        }
        .quill {
          border-width: 1px 0 0 0;
        }
      `
    }
    return css`
      #toolbar {
        border-width: 1px 1px 0 1px;
      }
      .quill {
        border-width: 1px;
      }
    `
  }}

  :after {
    content: '';
    width: ${({ $progress: progress }) => progress}%;
    height: 2px;
    border-radius: 0 2px 2px 0;
    background-color: ${({ theme }) => theme.colors.blue};
    transition-property: width;
    transition-timing-function: ease-in-out;
    transition-duration: 0.5s;
  }

  .ql-indent-1 {
    padding-left: 3em;
  }

  .ql-indent-2 {
    padding-left: 6em;
  }

  .ql-indent-3 {
    padding-left: 9em;
  }

  .ql-indent-4 {
    padding-left: 12em;
  }

  .ql-indent-5 {
    padding-left: 15em;
  }

  .ql-indent-6 {
    padding-left: 18em;
  }

  .ql-indent-7 {
    padding-left: 21em;
  }

  .ql-indent-8 {
    padding-left: 24em;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-justify {
    text-align: justify;
  }

  .quill {
    display: flex;
    flex: 1;
    overflow: hidden;

    > pre {
      display: flex;
      flex: 1;
      margin: 0;

      > div.ql-editor {
        flex: 1;
        overflow: auto;
      }
    }
  }

  .ql-editor {
    padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};

    ${({ $disabled: disabled }) =>
      disabled &&
      css`
        opacity: 0.5;
      `}

    &:focus-visible {
      outline: 0;
    }

    font-family: 'Lato', sans-serif;
  }

  .ql-clipboard,
  .ql-tooltip:not(.ql-editing),
  .ql-tooltip.ql-hidden,
  .ql-tooltip .ql-preview {
    display: none;
  }

  .ql-tooltip {
    padding: ${({ theme }) => theme.spacings.s1};
    display: flex;
    gap: ${({ theme }) => theme.spacings.s1};
    align-items: center;

    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 3px 6px ${({ theme }) => theme.getColor('black', 15)};
    border: 1px solid ${({ theme }) => theme.colors.lightestGrey};

    margin: ${({ theme }) => `0 ${theme.spacings.s3}`};
    width: 400px;
  }

  .ql-tooltip[data-mode='link']::before,
  .ql-tooltip.ql-editing a.ql-action::after,
  .ql-tooltip.ql-editing a.ql-action,
  .ql-tooltip.ql-editing input[type='text'] {
    ${({ theme }) => theme.useTypography('p')}
    line-height: 17px;
  }

  .ql-tooltip[data-mode='link']::before {
    content: 'URL:';
    margin-right: 0;
  }

  .ql-tooltip.ql-editing a.ql-action::after {
    content: 'OK';
    margin-left: 0;
  }

  .ql-tooltip.ql-editing a.ql-action {
    padding: ${({ theme }) => `0 ${theme.spacings.s3}`};
    font-weight: bold;
    border-radius: 4px;
    position: relative;
    user-select: none;
    background-color: ${({ theme }) => theme.colors.blue};
    border: 1px solid ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    min-height: 35px;
    cursor: pointer;
    display: flex;
    align-items: center;
    :hover {
      background-color: ${({ theme }) => theme.getColor('blue', 70)};
      border-color: ${({ theme }) => theme.getColor('blue', 70)};
    }
  }

  .ql-tooltip.ql-editing input[type='text'] {
    flex: 1;

    color: ${({ theme }) => theme.colors.darkBlue};

    ::placeholder {
      ${({ theme }) => theme.useTypography('p')}
      color: ${({ theme }) => theme.colors.darkGrey};
      line-height: 17px;

      opacity: 0.5;
      letter-spacing: 0px;
    }

    display: block;
    box-sizing: border-box;

    padding: ${({ theme }) => `${theme.spacings.s2} ${theme.spacings.s3}`};

    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 4px;

    background-color: ${({ theme }) => theme.colors.white};
    /** google chrome blue background */
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.white}
      inset !important;
    box-shadow: none;
    outline: none;
    height: unset;
  }
`
