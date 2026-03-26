import * as React from 'react'

const SvgAward = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='award_svg__feather award_svg__feather-award'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={8} r={7} />
    <path d='M8.21 13.89 7 23l5-3 5 3-1.21-9.12' />
  </svg>
)

export default SvgAward
