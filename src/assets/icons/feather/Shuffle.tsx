import * as React from 'react'

const SvgShuffle = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='shuffle_svg__feather shuffle_svg__feather-shuffle'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5' />
  </svg>
)

export default SvgShuffle
