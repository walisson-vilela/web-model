import * as React from 'react'

const SvgMoreHorizontal = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='more-horizontal_svg__feather more-horizontal_svg__feather-more-horizontal'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={12} r={1} />
    <circle cx={19} cy={12} r={1} />
    <circle cx={5} cy={12} r={1} />
  </svg>
)

export default SvgMoreHorizontal
