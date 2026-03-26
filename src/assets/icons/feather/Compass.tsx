import * as React from 'react'

const SvgCompass = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='compass_svg__feather compass_svg__feather-compass'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d='m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z' />
  </svg>
)

export default SvgCompass
