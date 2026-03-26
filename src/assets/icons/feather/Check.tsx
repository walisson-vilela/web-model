import * as React from 'react'

const SvgCheck = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='check_svg__feather check_svg__feather-check'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M20 6 9 17l-5-5' />
  </svg>
)

export default SvgCheck
