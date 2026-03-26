import * as React from 'react'

const SvgUser = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={18}
    height={18}
    fill='none'
    viewBox='0 0 18 18'
    {...props}
  >
    <g>
      <path
        d='M13,6.25A2.25,2.25,0,1,1,10.75,8.5,2.257,2.257,0,0,1,13,6.25m0,10.125c3.038,0,6.525,1.451,6.75,2.25V19.75H6.25V18.636c.225-.81,3.713-2.261,6.75-2.261M13,4a4.5,4.5,0,1,0,4.5,4.5A4.5,4.5,0,0,0,13,4Zm0,10.125c-3,0-9,1.507-9,4.5V22H22V18.625C22,15.632,16,14.125,13,14.125Z'
        transform='translate(-4 -4)'
        fill='currentColor'
      />
    </g>
  </svg>
)

export default SvgUser
