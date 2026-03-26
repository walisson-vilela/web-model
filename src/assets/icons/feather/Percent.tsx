import * as React from 'react'

const SvgPercent = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='percent_svg__feather percent_svg__feather-percent'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M19 5 5 19' />
    <circle cx={6.5} cy={6.5} r={2.5} />
    <circle cx={17.5} cy={17.5} r={2.5} />
  </svg>
)

export default SvgPercent
