import * as React from 'react'

const SvgPlay = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='play_svg__feather play_svg__feather-play'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m5 3 14 9-14 9z' />
  </svg>
)

export default SvgPlay
