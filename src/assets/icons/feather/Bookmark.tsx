import * as React from 'react'

const SvgBookmark = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='bookmark_svg__feather bookmark_svg__feather-bookmark'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
  </svg>
)

export default SvgBookmark
