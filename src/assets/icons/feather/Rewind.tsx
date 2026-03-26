import * as React from 'react'

const SvgRewind = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='rewind_svg__feather rewind_svg__feather-rewind'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m11 19-9-7 9-7zM22 19l-9-7 9-7z' />
  </svg>
)

export default SvgRewind
