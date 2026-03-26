import * as React from 'react'

const SvgZap = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='zap_svg__feather zap_svg__feather-zap'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M13 2 3 14h9l-1 8 10-12h-9z' />
  </svg>
)

export default SvgZap
