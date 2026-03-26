import * as React from 'react'

const SvgPause = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='pause_svg__feather pause_svg__feather-pause'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M6 4h4v16H6zM14 4h4v16h-4z' />
  </svg>
)

export default SvgPause
