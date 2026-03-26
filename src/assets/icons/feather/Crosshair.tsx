import * as React from 'react'

const SvgCrosshair = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='crosshair_svg__feather crosshair_svg__feather-crosshair'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d='M22 12h-4M6 12H2M12 6V2M12 22v-4' />
  </svg>
)

export default SvgCrosshair
