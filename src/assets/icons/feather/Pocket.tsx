import * as React from 'react'

const SvgPocket = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='pocket_svg__feather pocket_svg__feather-pocket'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2' />
    <path d='m8 10 4 4 4-4' />
  </svg>
)

export default SvgPocket
