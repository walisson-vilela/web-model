import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";import{n as o,u as s}from"./validators-Chja94ks.js";import{c,t as l}from"./formatters-C0aJpNv6.js";import{_ as u,g as d,i as f,r as p}from"./Menu-TRSAQrSQ.js";import{n as m,t as h}from"./Icon-7EFkF0Ko.js";import{n as g,t as _}from"./Button-DGWWJ_kv.js";import{n as v,t as y}from"./Input-CNfwAAHR.js";import{n as b,t as x}from"./Link-BDf88lME.js";var S,C,w,T,E=t((()=>{r(),u(),S=i(d)`
  ${({theme:e})=>e.useTypography(`p`)}

  background-color: ${({theme:e})=>e.colors.white};
  font-size: 14px;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    > div {
      padding: ${({theme:{spacings:{s3:e}}})=>`${e} 0 ${e} ${e}`};
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`,C=i.div`
  ${({theme:e})=>e.useTypography(`p`)}

  display: flex;
  flex-direction: column;
  gap: ${({theme:{spacings:{s3:e}}})=>e};
  padding: ${({theme:{spacings:{s3:e}}})=>`0 ${e} ${e} 0`};
  > div {
    display: flex;
    justify-content: space-between;
  }
`,w=i.div`
  ${({theme:{useTypography:e}})=>e(`p`,{fontWeight:`bold`})}
  font-size: 14px;
  color: ${({theme:{getColor:e}})=>e(`greyishBlue`,50)};
`,T=i.div`
  ${({theme:e})=>e.useTypography(`p`)}

  padding: ${({theme:{spacings:{s1:e}}})=>`${e} ${e} ${e} 0`};
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid
      ${({theme:{getColor:e}})=>e(`greyishBlue`,25)};
  }

  > div:nth-child(1) {
    flex: 1;

    > div:nth-child(1) {
      ${({theme:{useTypography:e}})=>e(`p`)}
      font-size: 14px;
      color: ${({theme:{getColor:e}})=>e(`greyishBlue`,50)};
    }
    > div:nth-child(2) {
      ${({theme:{useTypography:e}})=>e(`p`)}
      font-size: 14px;
    }
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`})),D,O,k,A=t((()=>{D=e(n(),1),o(),m(),v(),b(),f(),E(),O=a(),k=e=>{let{open:t,close:n,appliedFilters:[r,i]}=e,[a,o]=(0,D.useState)(``),[c,l]=(0,D.useState)(``);(0,D.useEffect)(()=>{o(``),l(``)},[t]);let u=()=>{i([]),n()},d=()=>{l(a)},f=()=>{o(``),l(``)},m=e=>{i(t=>t.filter(t=>t.name!==e))};return(0,O.jsx)(S,{open:t,width:`275px`,height:`261px`,transition:{properties:{height:{}}},...e.containerProps||{},children:(0,O.jsxs)(`div`,{children:[(0,O.jsxs)(C,{children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(w,{children:`Filtros Aplicados`}),(0,O.jsx)(x,{onClick:u,children:`Limpar Todos`})]}),(0,O.jsx)(y,{type:`search`,placeholder:`Pesquisar`,setValue:o,value:a,onPressEnter:d,icon:{icon:{type:`feather`,icon:`search`,onClick:d}},clearable:a!==``&&a===c?f:void 0})]}),(0,O.jsx)(p,{children:r.filter(({labels:{filter:{text:e},option:{text:t}}})=>s(e,c,{contain:!0})||s(t,c,{contain:!0})).map(({labels:{filter:{element:e},option:{element:t}},name:n},r)=>(0,O.jsxs)(T,{children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{children:e}),(0,O.jsx)(`div`,{children:t})]}),(0,O.jsx)(`div`,{children:(0,O.jsx)(h,{type:`feather`,icon:`minus_circle`,width:`12px`,height:`12px`,color:`darkSilver`,onClick:()=>m(n)})})]},r))})]})})},k.__docgenInfo={description:``,methods:[],displayName:`AppliedFiltersMenu`,props:{appliedFilters:{required:!0,tsType:{name:`tuple`,raw:`[
  AppliedFilter[],
  React.Dispatch<React.SetStateAction<AppliedFilter[]>>,
]`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`},{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]}]},description:``},containerProps:{required:!1,tsType:{name:`Omit`,elements:[{name:`intersection`,raw:`CommonProps & {
  open: boolean
  position?: Position
  axis?: 'x' | 'y'
  center?: {
    x: number
    y: number
  }
  ref?: React.Ref<HTMLDivElement>
  /**
   * defines an element to be the bound reference when calculating auto position,
   * the window will be used by default
   * */
  boundRef?: HTMLDivElement | null
  transition?: Partial<Omit<TransitionArguments, 'active'>>
}`,elements:[{name:`intersection`,raw:`Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
> & {
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  references?: References
  zIndex?: number
  pointer?:
    | {
        color?: ColorOptions | string | ((theme: ThemeInterface) => string)
        size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
        distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
      }
    | true
  bgColor?: ColorOptions | string | ((theme: ThemeInterface) => string)
} & (React.PropsWithChildren | { content: React.FunctionComponent })`,elements:[{name:`Omit`,elements:[{name:`ReactHTMLAttributes`,raw:`React.HTMLAttributes<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},{name:`union`,raw:`'children' | 'content'`,elements:[{name:`literal`,value:`'children'`},{name:`literal`,value:`'content'`}]}],raw:`Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
>`},{name:`signature`,type:`object`,raw:`{
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  references?: References
  zIndex?: number
  pointer?:
    | {
        color?: ColorOptions | string | ((theme: ThemeInterface) => string)
        size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
        distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
      }
    | true
  bgColor?: ColorOptions | string | ((theme: ThemeInterface) => string)
}`,signature:{properties:[{key:`width`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`height`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`maxWidth`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`maxHeight`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`references`,value:{name:`References`,required:!1}},{key:`zIndex`,value:{name:`number`,required:!1}},{key:`pointer`,value:{name:`union`,raw:`| {
    color?: ColorOptions | string | ((theme: ThemeInterface) => string)
    size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
    distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  }
| true`,elements:[{name:`signature`,type:`object`,raw:`{
  color?: ColorOptions | string | ((theme: ThemeInterface) => string)
  size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
}`,signature:{properties:[{key:`color`,value:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`size`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`distance`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}}]}},{name:`literal`,value:`true`}],required:!1}},{key:`bgColor`,value:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}],required:!1}}]}},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{
  open: boolean
  position?: Position
  axis?: 'x' | 'y'
  center?: {
    x: number
    y: number
  }
  ref?: React.Ref<HTMLDivElement>
  /**
   * defines an element to be the bound reference when calculating auto position,
   * the window will be used by default
   * */
  boundRef?: HTMLDivElement | null
  transition?: Partial<Omit<TransitionArguments, 'active'>>
}`,signature:{properties:[{key:`open`,value:{name:`boolean`,required:!0}},{key:`position`,value:{name:`union`,raw:`| 'top right'
| 'top left'
| 'bottom right'
| 'bottom left'
| 'right top'
| 'right bottom'
| 'left top'
| 'left bottom'`,elements:[{name:`literal`,value:`'top right'`},{name:`literal`,value:`'top left'`},{name:`literal`,value:`'bottom right'`},{name:`literal`,value:`'bottom left'`},{name:`literal`,value:`'right top'`},{name:`literal`,value:`'right bottom'`},{name:`literal`,value:`'left top'`},{name:`literal`,value:`'left bottom'`}],required:!1}},{key:`axis`,value:{name:`union`,raw:`'x' | 'y'`,elements:[{name:`literal`,value:`'x'`},{name:`literal`,value:`'y'`}],required:!1}},{key:`center`,value:{name:`signature`,type:`object`,raw:`{
  x: number
  y: number
}`,signature:{properties:[{key:`x`,value:{name:`number`,required:!0}},{key:`y`,value:{name:`number`,required:!0}}]},required:!1}},{key:`ref`,value:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}],required:!1}},{key:`boundRef`,value:{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}],required:!1},description:`defines an element to be the bound reference when calculating auto position,
the window will be used by default`},{key:`transition`,value:{name:`Partial`,elements:[{name:`Omit`,elements:[{name:`Transition`,elements:[{name:`union`,raw:`'width' | 'max-width' | 'height' | 'max-height'`,elements:[{name:`literal`,value:`'width'`},{name:`literal`,value:`'max-width'`},{name:`literal`,value:`'height'`},{name:`literal`,value:`'max-height'`}]}],raw:`Transition<
  'width' | 'max-width' | 'height' | 'max-height'
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'open'`}],raw:`Omit<AbsoluteContainerProps, 'open'>`},description:``},open:{required:!0,tsType:{name:`boolean`},description:``},close:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),j,M,N=t((()=>{n(),c(),g(),A(),j=a(),M=Object.assign(e=>{let{appliedFilters:t,containerProps:n}=e;return(0,j.jsxs)(_,{...l(e,[`appliedFilters`]),gap:`s1`,getContent:(e,r)=>(0,j.jsx)(k,{open:e,close:r,appliedFilters:t,containerProps:n}),children:[`Filtros Aplicados (`,t[0].length,`)`]})},{Menu:k}),M.__docgenInfo={description:``,methods:[],displayName:`AppliedFilters`,props:{appliedFilters:{required:!0,tsType:{name:`tuple`,raw:`[
  AppliedFilter[],
  React.Dispatch<React.SetStateAction<AppliedFilter[]>>,
]`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`},{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]}]},description:``},containerProps:{required:!1,tsType:{name:`Omit`,elements:[{name:`intersection`,raw:`CommonProps & {
  open: boolean
  position?: Position
  axis?: 'x' | 'y'
  center?: {
    x: number
    y: number
  }
  ref?: React.Ref<HTMLDivElement>
  /**
   * defines an element to be the bound reference when calculating auto position,
   * the window will be used by default
   * */
  boundRef?: HTMLDivElement | null
  transition?: Partial<Omit<TransitionArguments, 'active'>>
}`,elements:[{name:`intersection`,raw:`Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
> & {
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  references?: References
  zIndex?: number
  pointer?:
    | {
        color?: ColorOptions | string | ((theme: ThemeInterface) => string)
        size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
        distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
      }
    | true
  bgColor?: ColorOptions | string | ((theme: ThemeInterface) => string)
} & (React.PropsWithChildren | { content: React.FunctionComponent })`,elements:[{name:`Omit`,elements:[{name:`ReactHTMLAttributes`,raw:`React.HTMLAttributes<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},{name:`union`,raw:`'children' | 'content'`,elements:[{name:`literal`,value:`'children'`},{name:`literal`,value:`'content'`}]}],raw:`Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
>`},{name:`signature`,type:`object`,raw:`{
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  references?: References
  zIndex?: number
  pointer?:
    | {
        color?: ColorOptions | string | ((theme: ThemeInterface) => string)
        size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
        distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
      }
    | true
  bgColor?: ColorOptions | string | ((theme: ThemeInterface) => string)
}`,signature:{properties:[{key:`width`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`height`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`maxWidth`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`maxHeight`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`references`,value:{name:`References`,required:!1}},{key:`zIndex`,value:{name:`number`,required:!1}},{key:`pointer`,value:{name:`union`,raw:`| {
    color?: ColorOptions | string | ((theme: ThemeInterface) => string)
    size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
    distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  }
| true`,elements:[{name:`signature`,type:`object`,raw:`{
  color?: ColorOptions | string | ((theme: ThemeInterface) => string)
  size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
}`,signature:{properties:[{key:`color`,value:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`size`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`distance`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}}]}},{name:`literal`,value:`true`}],required:!1}},{key:`bgColor`,value:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}],required:!1}}]}},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{
  open: boolean
  position?: Position
  axis?: 'x' | 'y'
  center?: {
    x: number
    y: number
  }
  ref?: React.Ref<HTMLDivElement>
  /**
   * defines an element to be the bound reference when calculating auto position,
   * the window will be used by default
   * */
  boundRef?: HTMLDivElement | null
  transition?: Partial<Omit<TransitionArguments, 'active'>>
}`,signature:{properties:[{key:`open`,value:{name:`boolean`,required:!0}},{key:`position`,value:{name:`union`,raw:`| 'top right'
| 'top left'
| 'bottom right'
| 'bottom left'
| 'right top'
| 'right bottom'
| 'left top'
| 'left bottom'`,elements:[{name:`literal`,value:`'top right'`},{name:`literal`,value:`'top left'`},{name:`literal`,value:`'bottom right'`},{name:`literal`,value:`'bottom left'`},{name:`literal`,value:`'right top'`},{name:`literal`,value:`'right bottom'`},{name:`literal`,value:`'left top'`},{name:`literal`,value:`'left bottom'`}],required:!1}},{key:`axis`,value:{name:`union`,raw:`'x' | 'y'`,elements:[{name:`literal`,value:`'x'`},{name:`literal`,value:`'y'`}],required:!1}},{key:`center`,value:{name:`signature`,type:`object`,raw:`{
  x: number
  y: number
}`,signature:{properties:[{key:`x`,value:{name:`number`,required:!0}},{key:`y`,value:{name:`number`,required:!0}}]},required:!1}},{key:`ref`,value:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}],required:!1}},{key:`boundRef`,value:{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}],required:!1},description:`defines an element to be the bound reference when calculating auto position,
the window will be used by default`},{key:`transition`,value:{name:`Partial`,elements:[{name:`Omit`,elements:[{name:`Transition`,elements:[{name:`union`,raw:`'width' | 'max-width' | 'height' | 'max-height'`,elements:[{name:`literal`,value:`'width'`},{name:`literal`,value:`'max-width'`},{name:`literal`,value:`'height'`},{name:`literal`,value:`'max-height'`}]}],raw:`Transition<
  'width' | 'max-width' | 'height' | 'max-height'
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'open'`}],raw:`Omit<AbsoluteContainerProps, 'open'>`},description:``}}}}));export{N as n,M as t};