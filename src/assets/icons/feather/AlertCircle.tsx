import * as React from 'react'

const SvgAlertCircle = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='alert-circle_svg__feather alert-circle_svg__feather-alert-circle'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d='M12 8v4M12 16h.01' />
  </svg>
)

export default SvgAlertCircle
