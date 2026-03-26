import * as React from 'react'

const SvgDollarSign = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='dollar-sign_svg__feather dollar-sign_svg__feather-dollar-sign'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
  </svg>
)

export default SvgDollarSign
