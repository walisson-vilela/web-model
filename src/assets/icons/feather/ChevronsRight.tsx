import * as React from 'react'

const SvgChevronsRight = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='chevrons-right_svg__feather chevrons-right_svg__feather-chevrons-right'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m13 17 5-5-5-5M6 17l5-5-5-5' />
  </svg>
)

export default SvgChevronsRight
