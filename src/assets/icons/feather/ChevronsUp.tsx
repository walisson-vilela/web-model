import * as React from 'react'

const SvgChevronsUp = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='chevrons-up_svg__feather chevrons-up_svg__feather-chevrons-up'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m17 11-5-5-5 5M17 18l-5-5-5 5' />
  </svg>
)

export default SvgChevronsUp
