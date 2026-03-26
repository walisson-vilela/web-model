import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";import{d as o}from"./validators-Chja94ks.js";import{c as s,l as c,t as l}from"./formatters-C0aJpNv6.js";import{n as u,t as d}from"./Calendar-X3vNC0iC.js";import{n as f,t as p}from"./hooks-MVq9czon.js";import{n as m,t as h}from"./Input-CZLJcecz.js";var g,_=t((()=>{g=Date})),v,y=t((()=>{r(),v=i.div`
  position: relative;
`})),b,x,S,C,w,T=t((()=>{b=e(n(),1),s(),p(),u(),m(),_(),y(),x=a(),S=e=>e%4==0?e%100==0?e%400==0:!0:!1,C=e=>{for(e=e.replace(/[^0-9\s]/g,``);e.length>0&&parseInt(e[0])>3;)e=e.substring(1);if(e.length>1&&e[0]===`3`)for(;e.length>1&&parseInt(e[1])>1;)e=e[0]+e.substring(2);if(e.length>2)for(;e.length>2&&parseInt(e[2])>1;)e=e.substring(0,2)+e.substring(3);if(e.length>3&&e[2]===`1`)for(;e.length>3&&parseInt(e[3])>2;)e=e.substring(0,3)+e.substring(4);e=e.substring(0,8);let t=[e.substring(0,2),e.substring(2,4),e.substring(4)];if(t[1]===`02`){let e=parseInt(t[0]);t[2].length<4||S(parseInt(t[2]))?e>29&&(t[0]=`29`):e>28&&(t[0]=`28`)}else [`04`,`06`,`09`,`11`].includes(t[1])&&t[0]===`31`&&(t[0]=`30`);return e=t.join(``),e.length<3?e:e.length<5?e.substring(0,2)+`/`+e.substring(2):e.substring(0,2)+`/`+e.substring(2,4)+`/`+e.substring(4)},w=b.forwardRef((e,t)=>{let{picker:n,value:r,min:i,max:a}=e,s=e.setValue||(()=>{}),[u,p]=(0,b.useState)(!1),m=e.onKeyDown||(()=>{}),_=e=>{let t=e.target,n=new g,r=n.getDate(),c=n.getMonth()+1,l=n.getFullYear(),u=t.value.replace(/[^0-9\s]/g,``),d=u.substring(0,2),f=d.length===0?r:parseInt(d.padEnd(2,`0`));d=u.substring(2,4);let p=d.length===0?c:parseInt(d.padEnd(2,`0`));d=u.substring(4,8);let h=d.length===0?l:parseInt(d.padEnd(2,`0`));if(e.key===`ArrowUp`){let e=new g(`${h}-${p}-${f} 00:00:00`);e.setDate(e.getDate()+1),(!a||e<=a)&&s(o(e))}else if(e.key===`ArrowDown`){let e=new g(`${h}-${p}-${f} 00:00:00`);e.setDate(e.getDate()-1),(!i||e>=i)&&s(o(e))}m(e)},y=e.placeholder===void 0?`dd/mm/aaaa`:e.placeholder,S=n?{icon:{type:`feather`,icon:`calendar`,onClick:()=>p(e=>!e)},position:`right`}:void 0,w=l(e,[`picker`,`min`,`max`]);return(0,x.jsxs)(v,{ref:f(()=>p(!1)),children:[(0,x.jsx)(h,{...w,type:`text`,placeholder:y,mask:C,onKeyDown:_,icon:S,ref:t}),(0,x.jsx)(d,{...typeof n==`object`?n:{},type:`single`,absolute:!0,open:u,initialValue:r?c(r):void 0,onSubmit:{onClick:e=>{e&&(s(o(e)),p(!1))}},min:i,max:a,references:{bottom:`35px`}})]})}),w.displayName=`Date`,w.__docgenInfo={description:``,methods:[],displayName:`Date`,props:{type:{required:!0,tsType:{name:`literal`,value:`'date'`},description:``},picker:{required:!1,tsType:{name:`union`,raw:`| true
| Omit<
    AbsoluteSingleCalendarProps,
    'initialValue' | 'onSubmit' | 'invalid' | 'open'
  >`,elements:[{name:`literal`,value:`true`},{name:`Omit`,elements:[{name:`intersection`,raw:`Common &
Omit<AbsoluteContainerProps, 'onSubmit'>`,elements:[{name:`Common`},{name:`Omit`,elements:[{name:`intersection`,raw:`CommonProps & {
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
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'onSubmit'`}],raw:`Omit<AbsoluteContainerProps, 'onSubmit'>`}]},{name:`union`,raw:`'initialValue' | 'onSubmit' | 'invalid' | 'open'`,elements:[{name:`literal`,value:`'initialValue'`},{name:`literal`,value:`'onSubmit'`},{name:`literal`,value:`'invalid'`},{name:`literal`,value:`'open'`}]}],raw:`Omit<
  AbsoluteSingleCalendarProps,
  'initialValue' | 'onSubmit' | 'invalid' | 'open'
>`}]},description:``},value:{required:!1,tsType:{name:`string`},description:``},max:{required:!1,tsType:{name:`Date`},description:``},min:{required:!1,tsType:{name:`Date`},description:``}},composes:[`Omit`]}}));export{T as n,w as t};