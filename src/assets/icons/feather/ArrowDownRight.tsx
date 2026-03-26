import * as React from 'react'

const SvgArrowDownRight = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='arrow-down-right_svg__feather arrow-down-right_svg__feather-arrow-down-right'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m7 7 10 10M17 7v10H7' />
  </svg>
)

export default SvgArrowDownRight
