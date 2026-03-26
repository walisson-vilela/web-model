import * as React from 'react'

const SvgPlus = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='plus_svg__feather plus_svg__feather-plus'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M12 5v14M5 12h14' />
  </svg>
)

export default SvgPlus
