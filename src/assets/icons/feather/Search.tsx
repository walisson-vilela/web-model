import * as React from 'react'

const SvgSearch = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='search_svg__feather search_svg__feather-search'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={11} cy={11} r={8} />
    <path d='m21 21-4.35-4.35' />
  </svg>
)

export default SvgSearch
