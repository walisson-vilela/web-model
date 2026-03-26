import * as React from 'react'

const SvgCornerLeftUp = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='corner-left-up_svg__feather corner-left-up_svg__feather-corner-left-up'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M14 9 9 4 4 9' />
    <path d='M20 20h-7a4 4 0 0 1-4-4V4' />
  </svg>
)

export default SvgCornerLeftUp
