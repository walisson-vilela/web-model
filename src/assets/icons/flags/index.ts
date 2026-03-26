import styled, { css } from 'styled-components'

import flags from './flags'

interface Coordinate {
  s1: string
  s2: string
  s3: string
  s4: string
  s5: string
  s6: string
}

interface Coordinates {
  ar: Coordinate
  br: Coordinate
  cl: Coordinate
  es: Coordinate
  us: Coordinate
  mx: Coordinate
  py: Coordinate
  pt: Coordinate
  uy: Coordinate
}

export const coordinates: Coordinates = {
  ar: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '3607px 1px',
    s4: '5410px 1px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  br: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '3300.3px 0px',
    s4: '4950px 0px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  cl: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '3084px 0px',
    s4: '4625px 0px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  es: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '2717px 0px',
    s4: '4075px 0px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  us: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '274.3px 1px',
    s4: '389px 2px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  mx: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '1383px 1px',
    s4: '2074px 1px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  py: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '963.5px 1.4px',
    s4: '1445px 2px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  pt: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '993px 0px',
    s4: '1489px 0px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
  uy: {
    s1: '0px 0px',
    s2: '0px 0px',
    s3: '3998px 0.3px',
    s4: '367px 0px',
    s5: '0px 0px',
    s6: '0px 0px',
  },
}

interface FlagProps {
  $iso: keyof typeof coordinates
  $width?: keyof Coordinate
}

const Flag = styled.div<FlagProps>`
  background-image: url(${flags});
  background-size: auto 100%;

  ${({ $iso: iso, $width: width, theme }) => {
    width = width || 's4'

    return css`
      background-position: ${coordinates[iso][width]};
      width: ${theme.spacings[width]};
      height: calc(${theme.spacings[width]} / 1.4);
    `
  }}
`

export default Flag
