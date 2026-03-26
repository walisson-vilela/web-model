import * as React from 'react'

const SvgThermometer = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='thermometer_svg__feather thermometer_svg__feather-thermometer'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0' />
  </svg>
)

export default SvgThermometer
