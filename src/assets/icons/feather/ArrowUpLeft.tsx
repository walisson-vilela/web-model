import * as React from 'react'

const SvgArrowUpLeft = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='arrow-up-left_svg__feather arrow-up-left_svg__feather-arrow-up-left'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M17 17 7 7M7 17V7h10' />
  </svg>
)

export default SvgArrowUpLeft
