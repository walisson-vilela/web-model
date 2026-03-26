import * as React from 'react'

const SvgGrid = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='grid_svg__feather grid_svg__feather-grid'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' />
  </svg>
)

export default SvgGrid
