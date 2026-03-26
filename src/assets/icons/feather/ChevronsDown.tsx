import * as React from 'react'

const SvgChevronsDown = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='chevrons-down_svg__feather chevrons-down_svg__feather-chevrons-down'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m7 13 5 5 5-5M7 6l5 5 5-5' />
  </svg>
)

export default SvgChevronsDown
