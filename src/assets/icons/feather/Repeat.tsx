import * as React from 'react'

const SvgRepeat = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='repeat_svg__feather repeat_svg__feather-repeat'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m17 1 4 4-4 4' />
    <path d='M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4' />
    <path d='M21 13v2a4 4 0 0 1-4 4H3' />
  </svg>
)

export default SvgRepeat
