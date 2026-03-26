import * as React from 'react'

const SvgShare = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='share_svg__feather share_svg__feather-share'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13' />
  </svg>
)

export default SvgShare
