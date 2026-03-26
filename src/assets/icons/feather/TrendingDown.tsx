import * as React from 'react'

const SvgTrendingDown = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='trending-down_svg__feather trending-down_svg__feather-trending-down'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m23 18-9.5-9.5-5 5L1 6' />
    <path d='M17 18h6v-6' />
  </svg>
)

export default SvgTrendingDown
