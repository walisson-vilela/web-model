import * as React from 'react'

const SvgUnderline = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='underline_svg__feather underline_svg__feather-underline'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16' />
  </svg>
)

export default SvgUnderline
