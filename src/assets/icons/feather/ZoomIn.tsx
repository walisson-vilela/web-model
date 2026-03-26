import * as React from 'react'

const SvgZoomIn = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='zoom-in_svg__feather zoom-in_svg__feather-zoom-in'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={11} cy={11} r={8} />
    <path d='m21 21-4.35-4.35M11 8v6M8 11h6' />
  </svg>
)

export default SvgZoomIn
