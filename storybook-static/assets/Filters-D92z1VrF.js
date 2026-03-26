import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";import{n as o,s,u as c}from"./validators-Chja94ks.js";import{c as l,t as u}from"./formatters-C0aJpNv6.js";import{n as d,t as f}from"./Menu-TRSAQrSQ.js";import{n as p,t as m}from"./EllipsisContainer-CYb-gjAK.js";import{n as h,t as g}from"./Button-DGWWJ_kv.js";import{n as _,t as v}from"./Input-CNfwAAHR.js";var y,b=t((()=>{r(),y=i.div`
  ${({theme:e})=>e.useTypography(`p`)}

  font-size: 14px;
  padding: ${({theme:{spacings:{s1:e}}})=>`0 0 ${e} ${e}`};

  display: flex;
  flex-direction: column;
  gap: ${({theme:{spacings:{s3:e}}})=>e};

  > div:nth-child(1) {
    ${({theme:{useTypography:e}})=>e(`p`)}
    font-size: 14px;
    color: ${({theme:{getColor:e}})=>e(`greyishBlue`,50)};
  }
`})),x,S,C,w=t((()=>{x=e(n(),1),o(),p(),_(),b(),S=a(),C=e=>{let{title:t,search:[n,r],allowEmptySearch:i,withSearch:a}=e,[o,c]=(0,x.useState)(``),l=i?r:e=>{e!==``&&r(e)};(0,x.useEffect)(()=>{c(n)},[n]);let u=()=>{l(o)};return(0,S.jsxs)(y,{children:[(0,S.jsx)(m,{children:s(t)?t:t.element}),a&&(0,S.jsx)(v,{type:`search`,placeholder:`Pesquisa`,setValue:c,value:o,onPressEnter:u,clearable:o!==``&&o===n?()=>{c(``),l(``)}:void 0,icon:{icon:{type:`feather`,icon:`search`,onClick:u}}})]})},C.__docgenInfo={description:``,methods:[],displayName:`Header`,props:{search:{required:!0,tsType:{name:`tuple`,raw:`[string, (value: string) => void]`,elements:[{name:`string`},{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}}]},description:``},title:{required:!0,tsType:{name:`union`,raw:`| string
| {
    text: string
    element: ReactNode
  }`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  text: string
  element: ReactNode
}`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`element`,value:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!0}}]}}]},description:``},allowEmptySearch:{required:!1,tsType:{name:`boolean`},description:`se o filtro for do tipo callback, podera ser enviado este parametro para indicar se o filtro permite busca com string vazia`},withSearch:{required:!0,tsType:{name:`boolean`},description:``}}}})),T,E=t((()=>{r(),T=i.div`
  ${({theme:e})=>e.useTypography(`p`)}

  padding: 0 20px;
  color: ${({theme:{colors:{lightGrey:e}}})=>e};
  text-align: center;
  margin: auto;
  width: 100%;
`})),D,O,k,A,j=t((()=>{D=e(n(),1),o(),d(),w(),E(),O=a(),k=e=>{let{item:t}=e;if(!t)return{open:!1,isDynamic:!1,itemSpacing:`s3`,label:{element:``,text:``},getOptions:async()=>({options:[],lastPage:!0})};let n=t.allowEmptySearch,r=s(t.label)?{element:t.label,text:t.label}:t.label;if(Array.isArray(t.options)){let e=[...t.options];return{open:!0,isDynamic:!1,itemSpacing:t.optionSpacing||`s1`,label:r,allowEmptySearch:n,getOptions:async t=>({options:e.filter(e=>c(s(e.label)?e.label:e.label.text,t,{contain:!0})),lastPage:!0})}}let i=t.options;return{open:!0,isDynamic:!0,itemSpacing:t.optionSpacing||`s3`,label:r,allowEmptySearch:n,getOptions:async(e,t)=>{let n=await i(e,t);return Array.isArray(n)?{options:n,lastPage:!0}:n}}},A=e=>{let{item:t,close:n,setAppliedFilters:r,closeParent:i}=e,{open:a,isDynamic:o,itemSpacing:c,label:l,allowEmptySearch:u,getOptions:d}=k(e),[p,m]=(0,D.useState)([]),[h,g]=(0,D.useState)(1),[_,v]=(0,D.useState)(``),[y,b]=(0,D.useState)(!1),[x,S]=(0,D.useState)(!1),[,w]=(0,D.useState)(!0),E=(0,D.useCallback)(async()=>{let{options:e,lastPage:t}=await d(_,h);b(t),m([...e]),S(!1)},[t,_,h]),A=(e,t=!0)=>{let n=_!==e||h!==1;v(e),g(1),t&&n===!1&&(S(!0),E())};(0,D.useEffect)(()=>{m([]),A(``,!1),w(!0)},[t]),(0,D.useEffect)(()=>{w(e=>(!t||o&&e?S(!1):(S(!0),E()),!1))},[E]);let j=t?e=>{let n=p[e];r(e=>{let r=[...e],i=r.findIndex(e=>e.name===t.name);if(i!==-1){if(r[i].value===n.value)return e;r.splice(i,1)}return r.push({name:t.name,labels:{filter:l,option:s(n.label)?{text:n.label,element:n.label}:n.label},value:n.value}),r}),!t.keepOpen&&i()}:void 0;return(0,O.jsx)(f,{open:a,axis:`x`,options:p.map(e=>({label:typeof e.label==`string`?e.label:e.label.element,onClick:j,data:{}})),close:n,width:o?`275px`:`160px`,height:`261px`,containerSpacing:{top:`s3`,left:`s1`,bottom:o?`s3`:`s1`},onScrollEnd:()=>{y||g(e=>e+1)},itemSpacing:{top:c,left:`s1`,bottom:c},bordered:o,before:(0,O.jsx)(C,{title:l,search:[_,A],allowEmptySearch:u,withSearch:o}),loading:x,emptyContent:o&&p.length===0?(0,O.jsx)(T,{children:_===``?(0,O.jsxs)(D.Fragment,{children:[`Utilize a busca para pesquisar por `,(0,O.jsx)(`br`,{}),l.text]}):(0,O.jsx)(D.Fragment,{children:`Nenhum resultado foi encontrado`})}):void 0,transition:{properties:{width:{}}},...e.containerProps||{}})},A.__docgenInfo={description:``,methods:[],displayName:`Submenu`,props:{item:{required:!1,tsType:{name:`Filter`},description:``},close:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},closeParent:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},setAppliedFilters:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]},description:``},containerProps:{required:!1,tsType:{name:`Common['subContainerProps']`,raw:`Common['subContainerProps']`},description:``}}}})),M,N,P,F=t((()=>{M=e(n(),1),d(),j(),N=a(),P=e=>{let{open:t,close:n}=e,[r,i]=(0,M.useState)(-1),a=e.items.map(e=>({label:typeof e.label==`string`?e.label:e.label.element,delimiter:e.delimiter,keepOpen:!0,caret:!0,onClick:e=>{i(t=>t===e?-1:e)},data:{}})),o=r>=0&&r<e.items.length?e.items[r]:void 0;return(0,M.useEffect)(()=>{t||i(-1)},[t]),(0,N.jsx)(f,{open:t,options:a,close:n,width:`160px`,maxHeight:`261px`,containerSpacing:{top:`s1`,left:`s1`,bottom:`s1`},itemSpacing:{top:`s1`,left:`s1`,bottom:`s1`},transition:{properties:{width:{}}},...e.containerProps||{},children:(0,N.jsx)(A,{item:o,close:()=>i(-1),closeParent:n,setAppliedFilters:e.setAppliedFilters,containerProps:e.subContainerProps})})},P.__docgenInfo={description:``,methods:[],displayName:`FiltersMenu`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`Filter`}],raw:`Filter[]`},description:``},setAppliedFilters:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]},description:``},containerProps:{required:!1,tsType:{name:`Omit`,elements:[{name:`intersection`,raw:`CommonProps & {
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
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'open'`}],raw:`Omit<AbsoluteContainerProps, 'open'>`},description:``},subContainerProps:{required:!1,tsType:{name:`Pick`,elements:[{name:`intersection`,raw:`CommonProps & {
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
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'center'`}],raw:`Pick<AbsoluteContainerProps, 'center'>`},description:``},open:{required:!0,tsType:{name:`boolean`},description:``},close:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),I,L,R=t((()=>{n(),l(),h(),F(),I=a(),L=Object.assign(e=>{let{items:t,setAppliedFilters:n,containerProps:r,subContainerProps:i}=e;return(0,I.jsx)(g,{...u(e,[`items`,`setAppliedFilters`]),gap:`s4`,getContent:(e,a)=>(0,I.jsx)(P,{open:e,close:a,setAppliedFilters:n,items:t,containerProps:r,subContainerProps:i}),children:`Filtros`})},{Menu:P}),L.__docgenInfo={description:``,methods:[],displayName:`Filters`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`Filter`}],raw:`Filter[]`},description:``},setAppliedFilters:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]},description:``},containerProps:{required:!1,tsType:{name:`Omit`,elements:[{name:`intersection`,raw:`CommonProps & {
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
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'open'`}],raw:`Omit<AbsoluteContainerProps, 'open'>`},description:``},subContainerProps:{required:!1,tsType:{name:`Pick`,elements:[{name:`intersection`,raw:`CommonProps & {
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
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'center'`}],raw:`Pick<AbsoluteContainerProps, 'center'>`},description:``}}}}));export{R as n,L as t};