import * as React from 'react'

const SvgSave = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='save_svg__feather save_svg__feather-save'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2' />
    <path d='M17 21v-8H7v8M7 3v5h8' />
  </svg>
)

export default SvgSave
