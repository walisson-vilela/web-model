import * as React from 'react'

const SvgInfo = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='info_svg__feather info_svg__feather-info'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d='M12 16v-4M12 8h.01' />
  </svg>
)

export default SvgInfo
