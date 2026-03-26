import * as React from 'react'

const SvgFastForward = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='fast-forward_svg__feather fast-forward_svg__feather-fast-forward'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m13 19 9-7-9-7zM2 19l9-7-9-7z' />
  </svg>
)

export default SvgFastForward
