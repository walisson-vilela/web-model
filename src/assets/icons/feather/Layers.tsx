import * as React from 'react'

const SvgLayers = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='layers_svg__feather layers_svg__feather-layers'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
  </svg>
)

export default SvgLayers
