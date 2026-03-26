import * as React from 'react'

const SvgDashboard = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={18}
    height={18}
    fill='none'
    viewBox='0 0 18 18'
    {...props}
  >
    <g transform='translate(937 4314)'>
      <path
        d='M19,5V7H15V5h4M9,5v6H5V5H9m10,8v6H15V13h4M9,17v2H5V17H9M21,3H13V9h8ZM11,3H3V13h8Zm10,8H13V21h8ZM11,15H3v6h8Z'
        transform='translate(-940 -4317)'
        fill='currentColor'
      />
    </g>
  </svg>
)

export default SvgDashboard
