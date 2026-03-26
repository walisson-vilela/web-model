import * as React from 'react'

const SvgEye = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='eye_svg__feather eye_svg__feather-eye'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8' />
    <circle cx={12} cy={12} r={3} />
  </svg>
)

export default SvgEye
