import * as React from 'react'

const SvgSearchSemantic = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='6 6 16 16'
    {...props}
  >
    <defs>
      <clipPath id='search_semantic_svg__a'>
        <path d='M0 0h28v28H0z' />
      </clipPath>
    </defs>
    <g clipPath='url(#search_semantic_svg__a)' data-name='Icones Lupa'>
      <g data-name='Grupo 1'>
        <path fill='none' d='M1 1h24v24H1Z' data-name='Caminho 3277' />
      </g>
      <path
        fill='rgba(0,0,0,0.4)'
        d='m20.75 19.054-2.714-2.715a.65.65 0 0 0-.463-.191h-.444a5.661 5.661 0 1 0-.98.98v.444a.65.65 0 0 0 .191.463l2.715 2.715a.65.65 0 0 0 .923 0l.771-.771a.657.657 0 0 0 .001-.925m-8.087-2.905a3.485 3.485 0 1 1 3.486-3.486 3.483 3.483 0 0 1-3.486 3.486'
      />
    </g>
  </svg>
)

export default SvgSearchSemantic
