import * as React from 'react'

const SvgList = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='list_svg__feather list_svg__feather-list'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' />
  </svg>
)

export default SvgList
