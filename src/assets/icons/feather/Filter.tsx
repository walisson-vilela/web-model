import * as React from 'react'

const SvgFilter = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='filter_svg__feather filter_svg__feather-filter'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M22 3H2l8 9.46V19l4 2v-8.54z' />
  </svg>
)

export default SvgFilter
