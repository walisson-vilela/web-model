import * as React from 'react'

const SvgArrowDownCircle = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='arrow-down-circle_svg__feather arrow-down-circle_svg__feather-arrow-down-circle'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d='m8 12 4 4 4-4M12 8v8' />
  </svg>
)

export default SvgArrowDownCircle
