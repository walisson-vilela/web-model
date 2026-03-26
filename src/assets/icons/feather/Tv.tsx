import * as React from 'react'

const SvgTv = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='tv_svg__feather tv_svg__feather-tv'
    viewBox='0 0 24 24'
    {...props}
  >
    <rect width={20} height={15} x={2} y={7} rx={2} ry={2} />
    <path d='m17 2-5 5-5-5' />
  </svg>
)

export default SvgTv
