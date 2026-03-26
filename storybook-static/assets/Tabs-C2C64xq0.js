import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{c as s,o as c,t as l}from"./formatters-C0aJpNv6.js";import{n as u,t as d}from"./Icon-7EFkF0Ko.js";import{n as f,t as p}from"./functions-CWGwIwOJ.js";var m,ee=t((()=>{i(),m=a.div`
  position: absolute;
  top: 0;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ecedef;
  opacity: 0.8;

  cursor: pointer;
  color: ${({theme:e})=>e.colors.darkBlue};

  transition-property: left, right;
  transition-timing-function: linear;
  transition-duration: 0.25s;

  z-index: 3;
`})),h,g,_,te=t((()=>{h=e(n(),1),u(),ee(),g=o(),_=e=>{let{mode:t,visible:n,scrollRef:r}=e,i=`chevron_${t}`,a=(0,h.useCallback)(()=>{r&&r.scrollBy({left:t===`left`?-(r.scrollWidth+1):r.scrollWidth,behavior:`smooth`})},[r,t]);return(0,g.jsx)(m,{className:[`scroll-arrow`,...n?[`visible`]:[]].join(` `),onClick:a,children:(0,g.jsx)(d,{type:`feather`,icon:i,width:16,height:16,color:`black`})})},_.__docgenInfo={description:``,methods:[],displayName:`ScrollButton`,props:{mode:{required:!0,tsType:{name:`union`,raw:`'left' | 'right'`,elements:[{name:`literal`,value:`'left'`},{name:`literal`,value:`'right'`}]},description:``},visible:{required:!0,tsType:{name:`boolean`},description:``},scrollRef:{required:!0,tsType:{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}]},description:``}}}})),v,y=t((()=>{i(),v=a.div`
  overflow-x: auto;
  scrollbar-width: thin;
  scroll-behavior: smooth;
  display: flex;
  width: 100%;

  scrollbar-gutter: stable;

  -ms-overflow-style: none; /* IE / Edge antigos */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  ${({theme:e,$internal:t})=>t&&r`
      gap: ${e.spacings.s6};
    `}
`})),b,x,S,ne=t((()=>{b=e(n(),1),te(),y(),x=o(),S=e=>{let{activeTabIndex:t,tabsLength:n}=e,[r,i]=(0,b.useState)(null),[a,o]=(0,b.useState)(!1),[s,c]=(0,b.useState)(!1),l=(0,b.useCallback)(()=>{if(r)if(r.scrollWidth>r.offsetWidth){let{scrollLeft:e,scrollWidth:t,clientWidth:n}=r;o(e>10),c(t-n-e>10)}else o(!1),c(!1)},[r]);return(0,b.useEffect)(()=>(l(),window.addEventListener(`resize`,l),()=>window.removeEventListener(`resize`,l)),[l,n]),(0,b.useEffect)(()=>{if(!r||r.scrollWidth<=r.offsetWidth)return;let e=r.children[t];e&&e.scrollIntoView({behavior:`smooth`,inline:`nearest`})},[t,r]),(0,x.jsxs)(b.Fragment,{children:[(0,x.jsx)(_,{scrollRef:r,mode:`left`,visible:a}),(0,x.jsx)(v,{ref:i,onWheel:e=>{if(!r)return;let t=r.offsetWidth*100/r.scrollWidth;r.scrollLeft+=t*(e.deltaY>0?1:-1)*2,e.preventDefault()},onScroll:l,$internal:e.internal,children:e.children}),(0,x.jsx)(_,{scrollRef:r,mode:`right`,visible:s})]})},S.__docgenInfo={description:``,methods:[],displayName:`ScrollButtons`}})),C,w,T,E,D=t((()=>{C=(e,t=[])=>{if(e.length<1)return t;let n=e[0],{group:r}=n;if(!r)return C(e.slice(1),[...t,n]);let i=e.reduce(({tabs:e,sorted:t},n)=>n.group===r?n.primary?{tabs:e,sorted:[n,...t]}:{tabs:e,sorted:[...t,n]}:{tabs:[...e,n],sorted:t},{tabs:[],sorted:[]});return C(i.tabs,[...t,...i.sorted])},w=(e,t)=>t?e.some(e=>e.group===t&&!e.primary):!1,T=e=>e,E=(e,t)=>t?Object.assign(e,{provider:t}):e})),O,k=t((()=>{i(),O=a.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: var(--bgColor);
  color: var(--color);
  padding: 4px 8px;

  transition: --color 0.5s, --bgColor 0.5s;

  svg {
    width: 14px;
    height: 14px;

    * {
      transition: --color 0.5s;
      stroke: var(--color);
    }
  }
`})),A,j,M,N=t((()=>{A=e(n(),1),u(),k(),j=o(),M=e=>{let{index:t,active:[n,r],options:[i,a]}=e,o=e.onClose||(()=>!0),s=(0,A.useCallback)(async e=>{if(i.length===1)return;let s=[...i];if(s.splice(t,1),!await o(t,i[t],e))return;let c=t<n||!s[n]?n-1:n;r(c,s[c].data),a(s)},[i,n,t,o]);return(0,j.jsx)(O,{children:(0,j.jsx)(d,{type:`feather`,icon:`x`,onClick:s,width:`14px`,height:`14px`,strokeWidth:`3px`})})},M.__docgenInfo={description:``,methods:[],displayName:`Close`,props:{index:{required:!0,tsType:{name:`number`},description:``},active:{required:!0,tsType:{name:`Exclude`,elements:[{name:`TabsProps['active']`,raw:`TabsProps['active']`},{name:`number`}],raw:`Exclude<TabsProps['active'], number>`},description:``},options:{required:!0,tsType:{name:`tuple`,raw:`[TabProps[], React.Dispatch<React.SetStateAction<TabProps[]>>]`,elements:[{name:`Array`,elements:[{name:`intersection`,raw:`Tab<T> & {
  /**
   * Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED
   */
  component?: C
}`,elements:[{name:`signature`,type:`object`,raw:`{
  /**
   * Define the tab label.
   */
  label: string

  /**
   * Define the tab data.
   */
  data: T

  /**
   * Providing a unique and static key will prevent remount the component when closing a previous tab
   */
  key?: React.Key | null
  group?: string
  primary?: boolean
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0},description:`Define the tab label.`},{key:`data`,value:{name:`T`,required:!0},description:`Define the tab data.`},{key:`key`,value:{name:`union`,raw:`React.Key | null`,elements:[{name:`ReactKey`,raw:`React.Key`},{name:`null`}],required:!1},description:`Providing a unique and static key will prevent remount the component when closing a previous tab`},{key:`group`,value:{name:`string`,required:!1}},{key:`primary`,value:{name:`boolean`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{
  /**
   * Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED
   */
  component?: C
}`,signature:{properties:[{key:`component`,value:{name:`C`,required:!1},description:`Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED`}]}}]}],raw:`TabProps[]`},{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<TabProps[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<TabProps[]>`,elements:[{name:`Array`,elements:[{name:`intersection`,raw:`Tab<T> & {
  /**
   * Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED
   */
  component?: C
}`,elements:[{name:`signature`,type:`object`,raw:`{
  /**
   * Define the tab label.
   */
  label: string

  /**
   * Define the tab data.
   */
  data: T

  /**
   * Providing a unique and static key will prevent remount the component when closing a previous tab
   */
  key?: React.Key | null
  group?: string
  primary?: boolean
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0},description:`Define the tab label.`},{key:`data`,value:{name:`T`,required:!0},description:`Define the tab data.`},{key:`key`,value:{name:`union`,raw:`React.Key | null`,elements:[{name:`ReactKey`,raw:`React.Key`},{name:`null`}],required:!1},description:`Providing a unique and static key will prevent remount the component when closing a previous tab`},{key:`group`,value:{name:`string`,required:!1}},{key:`primary`,value:{name:`boolean`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{
  /**
   * Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED
   */
  component?: C
}`,signature:{properties:[{key:`component`,value:{name:`C`,required:!1},description:`Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED`}]}}]}],raw:`TabProps[]`}]}]}]},description:``}}}})),P,F=t((()=>{i(),P=a.div`
  position: relative;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  cursor: ${({onClick:e})=>e?`pointer`:`default`};

  background-color: var(--bgColor);
  color: var(--color);

  padding: ${({theme:e})=>`${e.spacings.s3} ${e.spacings.s3} ${e.spacings.s3}`};
  box-shadow: ${({$internal:e,theme:t})=>e?`none`:`0px 2px 8px ${t.getColor(`black`,16)}`};
  transition: --color 0.5s, --bgColor 0.5s;

  border-radius: ${({$internal:e})=>e?`3px 3px 0 0`:`0`};

  /* Pseudo-element para o degradê */
  &.overflow::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 34px;
    height: 100%;

    background-image: linear-gradient(
      to right,
      transparent,
      var(--bgColor) 80%
    );
    transition: --color 0.5s, --bgColor 0.5s;
  }

  ${({$primary:e,$hasSiblings:t,$internal:n})=>e&&t&&!n&&r`
      &::before {
        content: '';
        position: absolute;
        left: 4px;
        top: 4px;
        bottom: 4px;
        width: 3px;
        background-color: var(--colorBefore);
        transition: --colorBefore 0.5s;
        border-radius: 2px;
      }
    `}
`})),I,L,R,re=t((()=>{I=e(n(),1),p(),F(),L=o(),R=e=>{let{children:t,onClick:n,primary:r,hasSiblings:i,internal:a}=e,[o,s]=(0,I.useState)(null);return(0,L.jsx)(P,{ref:s,$primary:r,$hasSiblings:i,$internal:a,onClick:n,...f(),...o&&o.scrollWidth>o.offsetWidth?{className:`overflow`}:{},children:t})},R.__docgenInfo={description:``,methods:[],displayName:`LabelItem`}})),ie=t((()=>{N(),re()})),z,ae=t((()=>{i(),z=a.div`
  @property --bgColor {
    syntax: '<color>';
    initial-value: #ffffff;
    inherits: false;
  }

  @property --color {
    syntax: '<color>';
    initial-value: #000000;
    inherits: false;
  }

  @property --colorBefore {
    syntax: '<color>';
    initial-value: #3455ab;
    inherits: false;
  }

  &.active *,
  &.active ::before,
  &.active ::after {
    --bgColor: #3455ab;
    --color: #ffffff;
    --colorBefore: #ffffff;
  }

  &.active {
    z-index: 2;
  }

  display: flex;

  max-width: 184px;
  position: relative;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
`})),B,V,H,U,oe=t((()=>{B=e(n(),1),D(),ie(),ae(),V=o(),H=()=>(0,V.jsx)(B.Fragment,{}),U=e=>{let{active:[t,n],tabs:[r,i],sortedTabs:a,onClose:o,alwaysOpen:s}=e,c=s||r.length<2?H:M;return(0,V.jsx)(B.Fragment,{children:a.map(({index:a,...s})=>{let l=a===t,u=w(r,s.group),d=!e.internal&&(!s.primary||!u);return(0,V.jsxs)(z,{...l?{className:`active`}:{},children:[(0,V.jsx)(R,{children:s.label,primary:s.primary,hasSiblings:u,onClick:l?void 0:()=>n(a,s.data),internal:e.internal}),d&&(0,V.jsx)(c,{index:a,active:[t,n],options:[r,i],onClose:o})]},a)})})},U.__docgenInfo={description:``,methods:[],displayName:`TabItem`,props:{active:{required:!0,tsType:{name:`Exclude`,elements:[{name:`TabsProps['active']`,raw:`TabsProps['active']`},{name:`number`}],raw:`Exclude<TabsProps['active'], number>`},description:``},tabs:{required:!0,tsType:{name:`tuple`,raw:`[Tab[], React.Dispatch<React.SetStateAction<TabProps[]>>]`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  /**
   * Define the tab label.
   */
  label: string

  /**
   * Define the tab data.
   */
  data: T

  /**
   * Providing a unique and static key will prevent remount the component when closing a previous tab
   */
  key?: React.Key | null
  group?: string
  primary?: boolean
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0},description:`Define the tab label.`},{key:`data`,value:{name:`T`,required:!0},description:`Define the tab data.`},{key:`key`,value:{name:`union`,raw:`React.Key | null`,elements:[{name:`ReactKey`,raw:`React.Key`},{name:`null`}],required:!1},description:`Providing a unique and static key will prevent remount the component when closing a previous tab`},{key:`group`,value:{name:`string`,required:!1}},{key:`primary`,value:{name:`boolean`,required:!1}}]}}],raw:`Tab[]`},{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<TabProps[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<TabProps[]>`,elements:[{name:`Array`,elements:[{name:`intersection`,raw:`Tab<T> & {
  /**
   * Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED
   */
  component?: C
}`,elements:[{name:`signature`,type:`object`,raw:`{
  /**
   * Define the tab label.
   */
  label: string

  /**
   * Define the tab data.
   */
  data: T

  /**
   * Providing a unique and static key will prevent remount the component when closing a previous tab
   */
  key?: React.Key | null
  group?: string
  primary?: boolean
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0},description:`Define the tab label.`},{key:`data`,value:{name:`T`,required:!0},description:`Define the tab data.`},{key:`key`,value:{name:`union`,raw:`React.Key | null`,elements:[{name:`ReactKey`,raw:`React.Key`},{name:`null`}],required:!1},description:`Providing a unique and static key will prevent remount the component when closing a previous tab`},{key:`group`,value:{name:`string`,required:!1}},{key:`primary`,value:{name:`boolean`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{
  /**
   * Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED
   */
  component?: C
}`,signature:{properties:[{key:`component`,value:{name:`C`,required:!1},description:`Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED`}]}}]}],raw:`TabProps[]`}]}]}]},description:``},sortedTabs:{required:!0,tsType:{name:`Array`,elements:[{name:`unknown`}],raw:`(Tab & { index: number })[]`},description:``}}}})),se=t((()=>{ne(),oe()})),W,G,K,q,J,ce=t((()=>{i(),s(),W={blue:[`blue`],grey:[`warningGray`]},G=a.div`
  display: flex;
  flex-direction: column;
`,K=a.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacings.s1};
  padding: ${({theme:e})=>`${e.spacings.s4} 0 ${e.spacings.s4}`};
  border-bottom: 2px solid ${({theme:e})=>e.colors.lightestGrey};
`,q=a.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`,J=a.div`
  position: relative;
  overflow: hidden;

  display: flex;
  width: 100%;
  white-space: nowrap;

  ${({$spacing:e})=>{let[t,n,i,a]=c(e||{},{top:`0`,right:`0`,bottom:`s4`,left:`0`}).split(` `);return r`
      margin: ${t} 0 ${i} 0;
      padding: 0 ${n} 0 ${a};
    `}}

  ${({theme:e,$internal:t,$delimiter:n})=>r`
      border-bottom: ${n===`none`?`none`:t?`1px solid ${e.getColor(...W[n||`grey`])}`:`2px solid ${e.getColor(...W[n||`blue`])}`};
      + ${G} {
        border: 0;
      }
    `}


  /* exibe as setas de navegação visíveis ao passar o mouse sobre o container */
  &:hover .scroll-arrow.visible:nth-child(1) {
    left: 0;
  }
  & .scroll-arrow:nth-child(1) {
    left: -16px;
  }

  &:hover .scroll-arrow.visible:nth-last-child(1) {
    right: 0;
  }
  & .scroll-arrow:nth-last-child(1) {
    right: -16px;
  }
`})),Y,X,Z,Q,$,le=t((()=>{Y=e(n(),1),s(),se(),D(),ce(),X=o(),Z=e=>(0,X.jsx)(Y.Fragment,{children:e.children}),Q=e=>{let t=e.components||{},[n,r]=(0,Y.useState)(Array.isArray(e.options[1])?e.options[0]:e.options),[i,a]=typeof e.options[1]==`function`?e.options:[n,r],[o,s]=(0,Y.useState)(Array.isArray(e.active)?e.active[0]:e.active),[c,u]=Array.isArray(e.active)?e.active:[o,s],d=C(i.map((e,t)=>({...e,index:t}))),f=d.findIndex(e=>e.index===c),p=e.header,m=l(e,[`options`,`active`,`header`,`internal`,`maxTabs`,`onMaxTabsExceeded`,`onClose`,`alwaysOpen`,`delimiter`,`spacing`]);return(0,X.jsxs)(Y.Fragment,{children:[(0,X.jsx)(J,{...m,$internal:e.internal,$delimiter:e.delimiter,$spacing:e.spacing,children:(0,X.jsx)(S,{activeTabIndex:f,tabsLength:i.length,internal:e.internal,children:(0,X.jsx)(U,{active:[c,u],tabs:[i,a],sortedTabs:d,onClose:e.onClose,alwaysOpen:e.alwaysOpen,internal:e.internal})})}),i.map((e,n)=>{if(e.component===void 0)return(0,X.jsx)(Y.Fragment,{},n);let r=t[e.component],i=r.provider||Z,o=t=>{a(r=>{if(r[n]!==e)return r;let i=typeof t==`function`?t(r[n]):t;if(r[n]===i)return r;let a=[...r];return a[n]={...r[n],...i},a})},s=e=>{o(t=>{let n=typeof e==`function`?e(t.label):e;return e===n?t:{...t,label:n}})};return(0,X.jsx)(i,{label:e.label,data:e.data,setTab:o,setLabel:s,...n===c?{active:!0,children:(0,X.jsxs)(G,{children:[p&&(0,X.jsx)(K,{children:(0,X.jsx)(p,{active:!0,data:e.data,label:e.label,setTab:o,setLabel:s})}),(0,X.jsx)(q,{children:(0,X.jsx)(r,{data:e.data,label:e.label,setLabel:s})})]})}:{active:!1}},e.key===void 0?n:e.key)})]})},$=Object.assign(Q,{mapComponents:T,buildComponent:E}),Q.__docgenInfo={description:``,methods:[],displayName:`Component`}}));export{le as n,$ as t};