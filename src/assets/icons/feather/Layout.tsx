import * as React from 'react'

const SvgLayout = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='layout_svg__feather layout_svg__feather-layout'
    viewBox='0 0 24 24'
    {...props}
  >
    <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
    <path d='M3 9h18M9 21V9' />
  </svg>
)

export default SvgLayout
