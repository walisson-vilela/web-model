import styled, { css } from 'styled-components'

export const Container = styled.div<{ $title?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  > div {
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
    ${({ theme, $title: title }) => {
      const config: {
        weight: 'normal' | 'bold'
        rows: [
          {
            typography: Parameters<typeof theme.useTypography>
            lineHeight: number
            opacity: number
          },
          {
            typography: Parameters<typeof theme.useTypography>
            lineHeight: number
            opacity: number
          },
        ]
      } = title
        ? {
            weight: 'bold',
            rows: [
              {
                typography: ['h3', { fontWeight: 'normal' }],
                lineHeight: 19,
                opacity: 1,
              },
              {
                typography: ['h3', { fontWeight: 'normal' }],
                lineHeight: 19,
                opacity: 1,
              },
            ],
          }
        : {
            weight: 'normal',
            rows: [
              {
                typography: ['p', { fontWeight: 'normal' }],
                lineHeight: 17,
                opacity: 1,
              },
              {
                typography: ['h6', { fontWeight: 'normal' }],
                lineHeight: 16,
                opacity: 0.5,
              },
            ],
          }

      return css`
        .bold {
          font-weight: ${config.weight};
        }

        :nth-child(1) {
          ${theme.useTypography(...config.rows[0].typography)}
          line-height: ${config.rows[0].lineHeight}px;
          opacity: ${config.rows[0].opacity};

          > div {
            display: flex;
          }
        }
        :nth-child(2) {
          ${theme.useTypography(...config.rows[1].typography)}
          line-height: ${config.rows[1].lineHeight}px;
          opacity: ${config.rows[1].opacity};
        }
      `
    }}
  }
`
