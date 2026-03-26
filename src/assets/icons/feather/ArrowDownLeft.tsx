import * as React from 'react'

const SvgArrowDownLeft = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='arrow-down-left_svg__feather arrow-down-left_svg__feather-arrow-down-left'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M17 7 7 17M17 17H7V7' />
  </svg>
)

export default SvgArrowDownLeft
