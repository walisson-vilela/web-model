import * as React from 'react'

const SvgCoffee = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='coffee_svg__feather coffee_svg__feather-coffee'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4zM6 1v3M10 1v3M14 1v3' />
  </svg>
)

export default SvgCoffee
