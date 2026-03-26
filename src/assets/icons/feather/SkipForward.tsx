import * as React from 'react'

const SvgSkipForward = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='skip-forward_svg__feather skip-forward_svg__feather-skip-forward'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m5 4 10 8-10 8zM19 5v14' />
  </svg>
)

export default SvgSkipForward
