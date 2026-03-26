import * as React from 'react'

const SvgTable = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={18}
    height={18}
    fill='none'
    viewBox='0 0 18 18'
    {...props}
  >
    <path
      d='M136-822H122a1.926,1.926,0,0,1-1.412-.588A1.926,1.926,0,0,1,120-824v-14a1.926,1.926,0,0,1,.588-1.412A1.926,1.926,0,0,1,122-840h14a1.926,1.926,0,0,1,1.413.588A1.926,1.926,0,0,1,138-838v14a1.926,1.926,0,0,1-.587,1.412A1.926,1.926,0,0,1,136-822Zm-14-13h14v-3H122Zm2.5,2H122v9h2.5Zm9,0v9H136v-9Zm-2,0h-5v9h5Z'
      transform='translate(-120 840)'
      fill='currentColor'
    />
  </svg>
)

export default SvgTable
