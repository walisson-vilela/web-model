import * as React from 'react'

const SvgBold = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='bold_svg__feather bold_svg__feather-bold'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z' />
  </svg>
)

export default SvgBold
