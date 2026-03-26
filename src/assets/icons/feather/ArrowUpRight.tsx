import * as React from 'react'

const SvgArrowUpRight = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='arrow-up-right_svg__feather arrow-up-right_svg__feather-arrow-up-right'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M7 17 17 7M7 7h10v10' />
  </svg>
)

export default SvgArrowUpRight
