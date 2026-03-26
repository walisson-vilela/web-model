import * as React from 'react'

const SvgChevronLeft = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='chevron-left_svg__feather chevron-left_svg__feather-chevron-left'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m15 18-6-6 6-6' />
  </svg>
)

export default SvgChevronLeft
