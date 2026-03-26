import * as React from 'react'

const SvgBluetooth = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='bluetooth_svg__feather bluetooth_svg__feather-bluetooth'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11' />
  </svg>
)

export default SvgBluetooth
