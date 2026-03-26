import * as React from 'react'

const SvgDropdown = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={4}
    height={17}
    viewBox='14 14 5 6'
    {...props}
  >
    <defs>
      <clipPath id='dropdown_svg__a'>
        <path d='M0 0h32.5v34.3H0z' />
      </clipPath>
    </defs>
    <g clipPath='url(#dropdown_svg__a)' data-name='Icones Menu'>
      <g data-name='Grupo 1'>
        <path fill='none' d='M1 1h24v24H1Z' data-name='Caminho 3277' />
      </g>
      <path
        fill='rgba(38,48,70,0.5)'
        d='M18.496 17.129a2.248 2.248 0 1 1-.171-.861 2.3 2.3 0 0 1 .171.861m0 7.877a2.248 2.248 0 1 1-.171-.861 2.3 2.3 0 0 1 .171.861m0-15.755a2.248 2.248 0 1 1-.171-.861 2.3 2.3 0 0 1 .171.861'
      />
    </g>
  </svg>
)

export default SvgDropdown
