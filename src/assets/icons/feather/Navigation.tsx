import * as React from 'react'

const SvgNavigation = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='navigation_svg__feather navigation_svg__feather-navigation'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m3 11 19-9-9 19-2-8z' />
  </svg>
)

export default SvgNavigation
