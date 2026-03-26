import * as React from 'react'

const SvgMinusCircle = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='minus-circle_svg__feather minus-circle_svg__feather-minus-circle'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d='M8 12h8' />
  </svg>
)

export default SvgMinusCircle
