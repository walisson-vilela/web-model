import * as React from 'react'

const SvgGitPullRequest = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='git-pull-request_svg__feather git-pull-request_svg__feather-git-pull-request'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={18} cy={18} r={3} />
    <circle cx={6} cy={6} r={3} />
    <path d='M13 6h3a2 2 0 0 1 2 2v7M6 9v12' />
  </svg>
)

export default SvgGitPullRequest
