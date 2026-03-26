import * as React from 'react'

const SvgCornerLeftDown = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='corner-left-down_svg__feather corner-left-down_svg__feather-corner-left-down'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m14 15-5 5-5-5' />
    <path d='M20 4h-7a4 4 0 0 0-4 4v12' />
  </svg>
)

export default SvgCornerLeftDown
