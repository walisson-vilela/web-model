import * as React from 'react'

const SvgContract = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={14.4}
    height={18}
    fill='none'
    viewBox='0 0 14.4 18'
    {...props}
  >
    <path
      d='M163.6-865.6h7.2v-1.8h-7.2Zm0-3.6h7.2V-871h-7.2Zm-1.8,7.2a1.733,1.733,0,0,1-1.271-.529A1.733,1.733,0,0,1,160-863.8v-14.4a1.733,1.733,0,0,1,.529-1.271A1.733,1.733,0,0,1,161.8-880H169l5.4,5.4v10.8a1.733,1.733,0,0,1-.529,1.271A1.733,1.733,0,0,1,172.6-862Zm6.3-11.7v-4.5h-6.3v14.4h10.8v-9.9Zm-6.3-4.5v0Z'
      transform='translate(-160 880)'
      fill='currentColor'
    />
  </svg>
)

export default SvgContract
