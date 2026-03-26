import * as React from 'react'

const SvgCheckCircle = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='check-circle_svg__feather check-circle_svg__feather-check-circle'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
    <path d='M22 4 12 14.01l-3-3' />
  </svg>
)

export default SvgCheckCircle
