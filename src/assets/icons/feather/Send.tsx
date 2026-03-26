import * as React from 'react'

const SvgSend = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='send_svg__feather send_svg__feather-send'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M22 2 11 13M22 2l-7 20-4-9-9-4z' />
  </svg>
)

export default SvgSend
