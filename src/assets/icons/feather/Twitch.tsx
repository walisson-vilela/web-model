import * as React from 'react'

const SvgTwitch = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='twitch_svg__feather twitch_svg__feather-twitch'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M21 2H3v16h5v4l4-4h5l4-4zm-10 9V7m5 4V7' />
  </svg>
)

export default SvgTwitch
