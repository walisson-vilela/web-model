import * as React from 'react'

const SvgChevronDown = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='chevron-down_svg__feather chevron-down_svg__feather-chevron-down'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m6 9 6 6 6-6' />
  </svg>
)

export default SvgChevronDown
