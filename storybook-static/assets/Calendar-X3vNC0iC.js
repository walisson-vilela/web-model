import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{n as o,r as s,t as c}from"./iframe-fSyR9o4x.js";import{c as l,d as u,n as d,t as f}from"./validators-Chja94ks.js";import{c as p,t as m}from"./formatters-C0aJpNv6.js";import{_ as h,g,n as _,t as v}from"./Menu-TRSAQrSQ.js";import{n as ee,t as y}from"./Loader-CzH8aMET.js";import{n as b,t as x}from"./Button-BLRRkxhG.js";import{n as te,t as ne}from"./hooks-MVq9czon.js";import{n as S,t as C}from"./Icon-7EFkF0Ko.js";import{i as re,n as w,r as ie,t as ae}from"./Indicator-DcmOLqNJ.js";import{n as oe,t as se}from"./Time-DauZdfUC.js";var T,E,ce,D=t((()=>{T=[`Janeiro`,`Fevereiro`,`Março`,`Abril`,`Maio`,`Junho`,`Julho`,`Agosto`,`Setembro`,`Outubro`,`Novembro`,`Dezembro`],E=`378px`,ce={withSeconds:`86px`,withoutSeconds:`66px`}})),O,le,k,A,ue,de,j,M=t((()=>{d(),O=e=>{let t=new Date(e.getTime());t.setHours(0,0,0,0);let n=t.getMonth(),r=t.getFullYear(),i=[];for(t.setDate(1),t.setDate(t.getDate()-1);t.getDay()!==6||i.length===0;){let e=new Date(t.getTime());i.unshift(e),t.setDate(t.getDate()-1)}for(t.setDate(t.getDate()+i.length+1);n===t.getMonth();){let e=new Date(t.getTime());i.push(e),t.setDate(t.getDate()+1)}for(;i.length<42;){let e=new Date(t.getTime());i.push(e),t.setDate(t.getDate()+1)}let a=[],o=[i[0]];for(let e=1;e<i.length;e++)o.length===7&&(a.push(o),o=[]),o.push(i[e]);return a.push(o),{month:n,year:r,weeks:a}},le=(e,t)=>{let n=new Date;if(!t)return e?f(n,e,`gte`,!1)?n:e:n;if(!e)return t?f(n,t,`lte`,!1)?n:t:n;if(f(n,e,`gte`,!1)&&f(n,t,`lte`,!1))return n;let r=Math.ceil(Math.abs(t.getTime()-e.getTime())/(1e3*60*60*24)/2),i=new Date(e);return i.setDate(i.getDate()+r),i},k=(e,t,n)=>{let r=new Date(e),i=n?[23,59,59,999]:[0,0,0,0];return t.split(`:`).forEach((e,t)=>{let n=parseInt(e);isNaN(n)||(i[t]=n)}),r.setHours(...i),r},A=(e,t,n)=>n?t?f(e,t,`gte`)&&f(e,n,`lte`):n?f(e,n,`lte`):!0:t?f(e,t,`gte`):!0,ue=e=>e?[e.getHours(),e.getMinutes(),e.getSeconds()].map(e=>e.toString().padStart(2,`0`)).join(`:`):``,de=(e,t,n,r,i)=>{if(!e)return!1;if(n){if(t.length===0){if(n.required)return!0}else if(!l(t,{h:`required`,m:`required`,s:n.seconds?`required`:`optional`}))return!0}let a=k(e,t);return r!==void 0&&f(a,r,`lt`)||i!==void 0&&f(a,i,`gt`)},j=(e,t,n)=>O(e&&!isNaN(e.getTime())&&A(e,t,n)?e:le(t,n))})),fe,pe,me,he,ge,_e,ve,N,ye=t((()=>{i(),h(),fe=a.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacings.s3};
  background-color: ${({theme:e})=>e.colors.white};
  position: relative;

  ${({theme:e,$paddingless:t})=>{if(t)return;let{s3:n}=e.spacings;return r`
      padding-top: ${n};
      padding-bottom: ${n};
      &:first-child {
        padding-left: ${n};
      }
      &:last-child {
        padding-right: ${n};
      }
    `}};
`,pe=a.div`
  ${({theme:e})=>e.useTypography(`p`,{lineHeight:e.spacings.s3})}
`,me=a.div`
  border: 1px solid ${({theme:e})=>e.colors.lightestGrey};
`,he=a(g)`
  > ${fe} {
    padding: ${({theme:e})=>`${e.spacings.s3} ${e.spacings.s3} ${e.spacings.s1} ${e.spacings.s3}`};
  }
`,ge=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacings.s1};
  > div {
    margin: ${({theme:e})=>e.spacings.s1} 0;
    flex: 1;
    position: relative;
  }
`,_e=a.div`
  ${({theme:e})=>e.useTypography(`h6`,{lineHeight:e.spacings.s3})}
  color: ${({theme:e})=>e.colors.darkBlue};
  text-align: center;
`,ve=a.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(${({theme:e})=>e.spacings.s1} / 2);

  ${({onClick:e})=>{if(e)return r`
      cursor: pointer;
    `}}
`,N=a.button`
  ${({theme:e})=>e.useTypography(`p`,{lineHeight:e.spacings.s3})}
  width: 21px;
  height: 32px;
  box-shadow: none;
  border: none;
  background-color: transparent;

  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    visibility: hidden;
  }
  &:not(:disabled) {
    cursor: pointer;
    &:hover {
      background-color: ${({theme:e})=>e.getColor(`blue`,35)};
    }
  }

  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.25s;
`})),be,P,xe,Se=t((()=>{be=e(n(),1),S(),_(),D(),ye(),P=s(),xe=e=>{let{setValue:t,close:n,min:r,max:i,year:a,...o}=e,[s,c]=(0,be.useState)(a);return(0,be.useEffect)(()=>{c(a)},[e.open,a]),(0,P.jsx)(v,{close:n,...o,before:{fluid:!0,children:(0,P.jsxs)(ge,{children:[(0,P.jsx)(N,{type:`button`,onClick:()=>c(e=>e-1),disabled:r!==void 0&&r.getFullYear()>=s,children:(0,P.jsx)(C,{type:`feather`,icon:`chevron_left`,color:`darkBlue`,strokeWidth:`3px`})}),(0,P.jsx)(`div`,{children:(0,P.jsx)(ve,{children:s})}),(0,P.jsx)(N,{type:`button`,onClick:()=>c(e=>e+1),disabled:i!==void 0&&i.getFullYear()<=s,children:(0,P.jsx)(C,{type:`feather`,icon:`chevron_right`,color:`darkBlue`,strokeWidth:`3px`})})]})},options:T.map((e,a)=>({label:e,onClick:()=>{t(s,a),n()},rules:[()=>!(r!==void 0&&(r.getFullYear()>s||r.getFullYear()===s&&r.getMonth()>a)||i!==void 0&&(i.getFullYear()<s||i.getFullYear()===s&&i.getMonth()<a))],data:{}}))})},xe.__docgenInfo={description:``,methods:[],displayName:`MonthPicker`,props:{year:{required:!0,tsType:{name:`number`},description:``},setValue:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(year: number, month: number) => void`,signature:{arguments:[{type:{name:`number`},name:`year`},{type:{name:`number`},name:`month`}],return:{name:`void`}}},description:``},min:{required:!1,tsType:{name:`Date`},description:``},max:{required:!1,tsType:{name:`Date`},description:``}}}})),Ce,F,we,Te,Ee,De=t((()=>{i(),w(),ie(),ye(),Ce=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button:last-child {
    margin-left: auto;
  }
`,F=a.div`
  width: 100%;
  display: flex;

  &:not(:first-child) {
    border-top: 1px solid ${({theme:e})=>e.colors.lightestGrey};
  }

  > * {
    ${({theme:e})=>e.useTypography(`h6`,{lineHeight:e.spacings.s3})}
    width: 25px;
    height: 25px;

    color: ${({theme:e})=>e.colors.darkBlue};
    box-shadow: none;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    border: 1px solid transparent;
    &:not(:last-child) {
      border-right-color: ${({theme:e})=>e.colors.lightestGrey};
    }
  }
`,we=a.div`
  width: 100%;

  background-color: ${({theme:e})=>e.getColor(`lightestGrey`,40)};
  font-weight: bolder;

  > ${F} {
    border-top: none;
    > * {
      border-right-color: transparent;
    }
  }
`,Te=a.button`
  position: relative;
  overflow: hidden;

  ${({theme:e,$appearance:t,$activeColor:n,onClick:i})=>{let a=i?t=>r`
          &:not(:disabled):hover {
            border-color: ${e.colors[t]};
            color: ${e.colors[t]};
            cursor: pointer;
          }
        `:()=>null;return t===`disabled`?r`
        background-color: ${e.getColor(`greyishBlue`,10)};
      `:t===`highlight`?r`
        background-color: ${e.getColor(`blue`,30)};
        ${a(`blue`)}
      `:t===`active`?r`
        background-color: ${e.colors[n]};
        color: ${e.colors.white};
        &:not(:last-child) {
          border-right-color: ${({theme:e})=>e.colors[n]};
        }
        ${a(`white`)}
      `:r`
      background-color: ${e.colors.white};
      ${a(`blue`)}
    `}};

  &:disabled {
    color: ${({theme:e})=>e.colors.silver};
  }

  &,
  &:after {
    transition-property: background-color, color, border-color;
    transition-timing-function: ease-in-out;
    transition-duration: 0.25s;
  }

  ${({$appearance:e,$today:t,theme:n})=>{if(t===1)return r`
      &:after {
        content: '';
        position: absolute;
        top: -60%;
        right: -60%;
        width: 100%;
        height: 100%;
        background-color: ${n.colors[e===`active`?`white`:`blue`]};
        transform: rotate(45deg);
      }
    `}}
`,Ee=a(ae).attrs({size:`mini`})`
  position: absolute;
  bottom: 1px;
  left: calc(50% - (${re.mini} / 2) + 1px);
`})),I,L,R,Oe=t((()=>{I=e(n(),1),d(),ne(),c(),S(),ee(),D(),M(),Se(),De(),L=s(),R=I.forwardRef((e,t)=>{let{getDay:n,initialMonth:r}=e,[i,a]=(0,I.useState)(!1),[s,c]=(0,I.useState)(!1),l=(()=>{let{onChangeMonth:t}=e;return t?(async(...e)=>{c(!0),await t(...e),c(!1)}):async()=>{}})(),u=e.min?(()=>{let t=new Date(e.min);return t.setHours(0,0,0,0),t})():void 0,d=e.max?(()=>{let t=new Date(e.max);return t.setHours(0,0,0,0),t})():void 0,[p,m]=e.calendar||(0,I.useState)(j(r,u,d)),h=e=>{m(t=>{let n=typeof e==`function`?e(t):e;return n.month===t.month&&n.year===t.year?t:n})},g=e.calendar!==void 0;(0,I.useEffect)(()=>{g||h(j(r,u,d))},[g,r?.toISOString(),u?.toISOString(),d?.toISOString()]),(0,I.useEffect)(()=>{let[e,t]=[p.weeks[0],p.weeks[p.weeks.length-1]];l({...p,firstDay:e[0],lastDay:t[t.length-1]})},[p]);let _=e=>{h(t=>{let n=new Date;return n.setDate(1),n.setFullYear(t.year),n.setMonth(t.month+e),O(n)})},v=()=>{let[e,t]=u!==void 0&&(p.year<u.getFullYear()||p.year===u.getFullYear()&&p.month<=u.getMonth())?[!0]:[void 0,()=>_(-1)];return(0,L.jsx)(N,{type:`button`,onClick:t,disabled:e,children:(0,L.jsx)(C,{type:`feather`,icon:`chevron_left`,color:`darkBlue`,strokeWidth:`3px`})})},ee=()=>{let[e,t]=d!==void 0&&(p.year>d.getFullYear()||p.year===d.getFullYear()&&p.month>=d.getMonth())?[!0]:[void 0,()=>_(1)];return(0,L.jsx)(N,{type:`button`,onClick:t,disabled:e,children:(0,L.jsx)(C,{type:`feather`,icon:`chevron_right`,color:`darkBlue`,strokeWidth:`3px`})})};return(0,L.jsxs)(fe,{ref:t,$paddingless:e.paddingless,children:[e.label&&(0,L.jsx)(pe,{children:e.label}),(0,L.jsxs)(me,{children:[(0,L.jsxs)(we,{children:[(0,L.jsxs)(ge,{children:[v(),(0,L.jsxs)(`div`,{ref:te(()=>a(!1)),children:[u!==void 0&&d!==void 0&&u.getFullYear()===d.getFullYear()&&u.getMonth()===d.getMonth()?(0,L.jsxs)(_e,{children:[T[p.month],` `,p.year]}):(0,L.jsxs)(ve,{onClick:()=>a(e=>!e),children:[(0,L.jsxs)(_e,{children:[T[p.month],` `,p.year]}),(0,L.jsx)(C,{type:`feather`,icon:i?`chevron_up`:`chevron_down`,width:`14px`})]}),(0,L.jsx)(xe,{open:i,close:()=>a(!1),year:p.year,setValue:(e,t)=>{let n=new Date;n.setDate(1),n.setFullYear(e),n.setMonth(t),h(O(n))},min:u,max:d,width:`100%`,maxHeight:`180px`,transition:{properties:{"max-height":{}}},itemSpacing:`s3`,bordered:!0})]}),ee()]}),(0,L.jsxs)(F,{children:[(0,L.jsx)(`div`,{children:`D`}),(0,L.jsx)(`div`,{children:`S`}),(0,L.jsx)(`div`,{children:`T`}),(0,L.jsx)(`div`,{children:`Q`}),(0,L.jsx)(`div`,{children:`Q`}),(0,L.jsx)(`div`,{children:`S`}),(0,L.jsx)(`div`,{children:`S`})]})]}),p.weeks.map((e,t)=>(0,L.jsx)(F,{children:e.map((e,t)=>{let r=n(e),i=e.getDate(),a=e.getMonth()!==p.month||d&&e>d||u&&e<u?`disabled`:r.appearance,[o,s,c,l]=a===`disabled`?[!0,void 0]:[void 0,r.onClick,r.onMouseOver,r.onMouseOut];return(0,L.jsxs)(Te,{type:`button`,onClick:s,onMouseOver:c,onMouseOut:l,disabled:o,$appearance:a,$activeColor:r.activeColor||`blue`,$today:f(new Date,e,`eq`,!1)?1:0,children:[i,r.indicator&&(0,L.jsx)(Ee,{type:r.indicator})]},t)})},t))]}),!e.children||Array.isArray(e.children)&&!e.children.some(e=>e)?null:(0,L.jsx)(Ce,{children:e.children}),s&&(0,L.jsx)(y,{filled:o.getColor(`white`,95)})]})}),R.displayName=`Main`,R.__docgenInfo={description:``,methods:[],displayName:`Main`,props:{label:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``},initialMonth:{required:!1,tsType:{name:`Date`},description:``},max:{required:!1,tsType:{name:`Date`},description:``},min:{required:!1,tsType:{name:`Date`},description:``},getDay:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(date: Date) => {
  appearance?: DayAppearance
  activeColor?: ColorOptions
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement>
  indicator?: IndicatorProps['type']
}`,signature:{arguments:[{type:{name:`Date`},name:`date`}],return:{name:`signature`,type:`object`,raw:`{
  appearance?: DayAppearance
  activeColor?: ColorOptions
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement>
  indicator?: IndicatorProps['type']
}`,signature:{properties:[{key:`appearance`,value:{name:`union`,raw:`'active' | 'highlight' | 'disabled'`,elements:[{name:`literal`,value:`'active'`},{name:`literal`,value:`'highlight'`},{name:`literal`,value:`'disabled'`}],required:!1}},{key:`activeColor`,value:{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}],required:!1}},{key:`onClick`,value:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}],required:!1}},{key:`onMouseOver`,value:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}],required:!1}},{key:`onMouseOut`,value:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}],required:!1}},{key:`indicator`,value:{name:`IndicatorProps['type']`,raw:`IndicatorProps['type']`,required:!1}}]}}}},description:``},onChangeMonth:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  calendar: CalendarInterface & {
    firstDay: Date
    lastDay: Date
  },
) => Promise<void>`,signature:{arguments:[{type:{name:`intersection`,raw:`CalendarInterface & {
  firstDay: Date
  lastDay: Date
}`,elements:[{name:`CalendarInterface`},{name:`signature`,type:`object`,raw:`{
  firstDay: Date
  lastDay: Date
}`,signature:{properties:[{key:`firstDay`,value:{name:`Date`,required:!0}},{key:`lastDay`,value:{name:`Date`,required:!0}}]}}]},name:`calendar`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},calendar:{required:!1,tsType:{name:`tuple`,raw:`[
  CalendarInterface,
  React.Dispatch<React.SetStateAction<CalendarInterface>>,
]`,elements:[{name:`CalendarInterface`},{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<CalendarInterface>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<CalendarInterface>`,elements:[{name:`CalendarInterface`}]}]}]},description:``},paddingless:{required:!1,tsType:{name:`literal`,value:`true`},description:``}}}})),ke,z,B,Ae=t((()=>{ke=e(n(),1),p(),D(),Oe(),ye(),z=s(),B=ke.forwardRef((e,t)=>{let n=m(e,[`initialMonth`,`max`,`min`,`getDay`,`calendar`,`absolute`,`onChangeMonth`,`paddingless`]);return`absolute`in e?(0,z.jsx)(he,{axis:`y`,maxHeight:E,...n,ref:t,children:(0,z.jsx)(R,{...e})}):(0,z.jsx)(R,{...e})}),B.displayName=`BasicCalendar`,B.__docgenInfo={description:``,methods:[],displayName:`BasicCalendar`}})),je,V,Me,Ne=t((()=>{d(),M(),je=(e,t,n)=>[...e.filter(e=>e&&!isNaN(e.getTime())&&A(e,t,n)).sort((e,t)=>f(e,t,`eq`)?0:f(e,t,`lt`)?-1:1),null,null].slice(0,2),V=e=>{let t=new Date;return t.setFullYear(e.year),t.setMonth(e.month+1),t.setDate(1),t.setHours(0,0,0,0),O(t)},Me=(e,t)=>e===!0?[{},{}]:e?e.map((e,n)=>typeof e==`function`?e(t[n]):e):[void 0,void 0]})),Pe,Fe=t((()=>{i(),b(),Pe=a(x)`
  width: 105px;
`})),Ie,Le,Re=t((()=>{i(),Fe(),Ie=a.div`
  display: flex;
  gap: ${({theme:e})=>e.spacings.s3};
  background-color: ${({theme:e})=>e.colors.white};
`,Le=a.div`
  color: ${({theme:e})=>e.colors.darkestGrey};
  > b {
    color: ${({theme:e})=>e.colors.darkBlue};
  }
`})),H,U,W,ze=t((()=>{H=e(n(),1),p(),d(),oe(),D(),M(),Ae(),Ne(),Re(),U=s(),W=H.forwardRef((e,t)=>{let{initialMonth:n,initialValue:r,min:i,max:a}=e,[o,s]=e.value||(0,H.useState)(je(r||[],i,a)),[c,l]=e.invalid||(0,H.useState)([!1,!1]),[d,p]=(0,H.useState)(()=>o.map(ue)),[h,g]=(0,H.useState)(()=>j(o[0]||n,i,a)),_=e=>{g(t=>{let n=typeof e==`function`?e(t):e;return n.month===t.month&&n.year===t.year?t:n})},[v,ee]=(0,H.useState)(()=>V(h)),y=e=>{ee(t=>{let n=typeof e==`function`?e(t):e;return n.month===t.month&&n.year===t.year?t:n})},[b,x]=(0,H.useState)(null);(0,H.useEffect)(()=>{let e=j(o[0]||n,i,a),t=V(e);_(e),y(t)},[n?.toISOString(),i?.toISOString(),a?.toISOString()]),(0,H.useEffect)(()=>{let t=Me(e.time,o);if(x(null),o[0]){let e=O(o[0]),t=(()=>{let t=V(e);if(o[1]){let t=O(o[1]);if(t.year>e.year||t.year===e.year&&t.month>e.month)return t}return t})();_(e),y(t)}l(o.map((e,n)=>de(e,d[n],t[n],i,a)))},[o,d,e.time]);let te=e.getDay||(()=>({})),ne=(e,t)=>{let n=te(e,t),r=()=>{let t=[...o];t[0]?t[1]?(t[0]=new Date(e),t[1]=null):f(e,t[0],`lt`)?(t[1]=t[0],t[0]=new Date(e)):t[1]=new Date(e):t[0]=new Date(e),s(t)},[i,a]=o[0]&&!o[1]?[()=>x(e),()=>x(null)]:[()=>{},()=>{}],c=(()=>{if(o.some(t=>t&&f(t,e,`eq`,!1)))return`active`;if(o[0]&&o[1]&&A(e,o[0],o[1])||o[0]&&b&&(A(e,o[0],b)||A(e,b,o[0])))return`highlight`})(),[l,u,d]=[`onClick`,`onMouseOver`,`onMouseOut`].map(e=>n[e]||(()=>{}));return{...n,appearance:c||n.appearance,onClick:e=>{l(e),r()},onMouseOver:e=>{u(e),i()},onMouseOut:e=>{d(e),a()}}},S=m(e,[`initialValue`,`value`,`time`,`onSubmit`,`invalid`,`initialMonth`,`max`,`min`,`getDay`]),C=d.some(e=>e.length>0)?d.map(e=>e.length===0):[!1,!1],re=e.onSubmit?(()=>{let t=e.onSubmit.disabled||o.some(e=>e===null)||c.some(e=>e)||C.some(e=>e),{onClick:n}=e.onSubmit;return{...e.onSubmit,disabled:t,onClick:t?void 0:()=>{n([o[0]?k(o[0],d[0]):null,o[1]?k(o[1],d[1],!0):null])}}})():void 0,w=[new Date,new Date];w[0].setDate(1),w[0].setFullYear(v.year),w[0].setMonth(v.month),w[0].setDate(0),w[0].setHours(23,59,59,999),w[1].setDate(1),w[1].setFullYear(h.year),w[1].setMonth(h.month+1),w[1].setHours(0,0,0,0);let ie=Me(e.time,o).map((e,t)=>{if(!e)return;let n=e.seconds?`withSeconds`:`withoutSeconds`;return(0,U.jsx)(se,{...e,type:`time`,value:d[t],setValue:e=>p(n=>{let r=[...n];return r[t]=e,r}),invalid:o[t]!==null&&c[t]||C[t],width:ce[n]},t)}),ae=e.onChangeMonth||(async()=>{});return(0,U.jsxs)(Ie,{children:[(0,U.jsx)(B,{...S,getDay:e=>ne(e,`left`),onChangeMonth:async e=>await ae(e,`left`),ref:t,label:(0,U.jsxs)(Le,{children:[(0,U.jsx)(`b`,{children:`Inicio:`}),` `,o[0]?u(o[0]):`––/––/––––`]}),calendar:[h,e=>{_(t=>{let n=typeof e==`function`?e(t):e;return y(e=>e.year>n.year||e.year===n.year&&e.month>n.month?e:V(n)),n})}],min:i,max:a&&f(a,w[0],`lt`)?a:w[0],children:ie[0]}),(0,U.jsxs)(B,{...S,getDay:e=>ne(e,`right`),onChangeMonth:async e=>await ae(e,`right`),ref:t,label:(0,U.jsxs)(Le,{children:[(0,U.jsx)(`b`,{children:`Fim:`}),` `,o[1]?u(o[1]):`––/––/––––`]}),calendar:[v,y],min:i&&f(i,w[1],`gt`)?i:w[1],max:a,children:[ie[1],re&&(0,U.jsx)(Pe,{content:`Aplicar`,...re,type:`button`})]})]})}),W.displayName=`Main`,W.__docgenInfo={description:``,methods:[],displayName:`Main`,props:{initialValue:{required:!1,tsType:{name:`tuple`,raw:`[Date | null, Date | null]`,elements:[{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]}]},description:``},value:{required:!1,tsType:{name:`tuple`,raw:`[Value, (value: Value) => void]`,elements:[{name:`tuple`,raw:`[Date | null, Date | null]`,elements:[{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]}]},{name:`signature`,type:`function`,raw:`(value: Value) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[Date | null, Date | null]`,elements:[{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]}]},name:`value`}],return:{name:`void`}}}]},description:``},time:{required:!1,tsType:{name:`union`,raw:`| true
| [
    GetInputTimeProps | InputTimeProps | undefined,
    GetInputTimeProps | InputTimeProps | undefined,
  ]`,elements:[{name:`literal`,value:`true`},{name:`tuple`,raw:`[
  GetInputTimeProps | InputTimeProps | undefined,
  GetInputTimeProps | InputTimeProps | undefined,
]`,elements:[{name:`union`,raw:`GetInputTimeProps | InputTimeProps | undefined`,elements:[{name:`signature`,type:`function`,raw:`(value: Date | null) => InputTimeProps | undefined`,signature:{arguments:[{type:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},name:`value`}],return:{name:`union`,raw:`InputTimeProps | undefined`,elements:[{name:`Omit`,elements:[{name:`TimeProps`},{name:`union`,raw:`'type' | 'value' | 'setValue' | 'minWidth'`,elements:[{name:`literal`,value:`'type'`},{name:`literal`,value:`'value'`},{name:`literal`,value:`'setValue'`},{name:`literal`,value:`'minWidth'`}]}],raw:`Omit<
  TimeProps,
  'type' | 'value' | 'setValue' | 'minWidth'
>`},{name:`undefined`}]}}},{name:`Omit`,elements:[{name:`TimeProps`},{name:`union`,raw:`'type' | 'value' | 'setValue' | 'minWidth'`,elements:[{name:`literal`,value:`'type'`},{name:`literal`,value:`'value'`},{name:`literal`,value:`'setValue'`},{name:`literal`,value:`'minWidth'`}]}],raw:`Omit<
  TimeProps,
  'type' | 'value' | 'setValue' | 'minWidth'
>`},{name:`undefined`}]},{name:`union`,raw:`GetInputTimeProps | InputTimeProps | undefined`,elements:[{name:`signature`,type:`function`,raw:`(value: Date | null) => InputTimeProps | undefined`,signature:{arguments:[{type:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},name:`value`}],return:{name:`union`,raw:`InputTimeProps | undefined`,elements:[{name:`Omit`,elements:[{name:`TimeProps`},{name:`union`,raw:`'type' | 'value' | 'setValue' | 'minWidth'`,elements:[{name:`literal`,value:`'type'`},{name:`literal`,value:`'value'`},{name:`literal`,value:`'setValue'`},{name:`literal`,value:`'minWidth'`}]}],raw:`Omit<
  TimeProps,
  'type' | 'value' | 'setValue' | 'minWidth'
>`},{name:`undefined`}]}}},{name:`Omit`,elements:[{name:`TimeProps`},{name:`union`,raw:`'type' | 'value' | 'setValue' | 'minWidth'`,elements:[{name:`literal`,value:`'type'`},{name:`literal`,value:`'value'`},{name:`literal`,value:`'setValue'`},{name:`literal`,value:`'minWidth'`}]}],raw:`Omit<
  TimeProps,
  'type' | 'value' | 'setValue' | 'minWidth'
>`},{name:`undefined`}]}]}]},description:``},onSubmit:{required:!1,tsType:{name:`intersection`,raw:`Omit<ButtonProps, 'type' | 'onClick'> & {
  onClick: (value: Value) => void
}`,elements:[{name:`Omit`,elements:[{name:`ButtonProps`},{name:`union`,raw:`'type' | 'onClick'`,elements:[{name:`literal`,value:`'type'`},{name:`literal`,value:`'onClick'`}]}],raw:`Omit<ButtonProps, 'type' | 'onClick'>`},{name:`signature`,type:`object`,raw:`{
  onClick: (value: Value) => void
}`,signature:{properties:[{key:`onClick`,value:{name:`signature`,type:`function`,raw:`(value: Value) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[Date | null, Date | null]`,elements:[{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]}]},name:`value`}],return:{name:`void`}},required:!0}}]}}]},description:``},invalid:{required:!1,tsType:{name:`tuple`,raw:`[[boolean, boolean], (invalid: [boolean, boolean]) => void]`,elements:[{name:`tuple`,raw:`[boolean, boolean]`,elements:[{name:`boolean`},{name:`boolean`}]},{name:`signature`,type:`function`,raw:`(invalid: [boolean, boolean]) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[boolean, boolean]`,elements:[{name:`boolean`},{name:`boolean`}]},name:`invalid`}],return:{name:`void`}}}]},description:``},onChangeMonth:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  calendar: Parameters<OnChangeMonth>[0],
  side: 'left' | 'right',
) => ReturnType<OnChangeMonth>`,signature:{arguments:[{type:{name:`Parameters[0]`,raw:`Parameters<OnChangeMonth>[0]`},name:`calendar`},{type:{name:`union`,raw:`'left' | 'right'`,elements:[{name:`literal`,value:`'left'`},{name:`literal`,value:`'right'`}]},name:`side`}],return:{name:`ReturnType`,elements:[{name:`Exclude`,elements:[{name:`union['onChangeMonth']`,raw:`BasicCalendarProps['onChangeMonth']`},{name:`undefined`}],raw:`Exclude<BasicCalendarProps['onChangeMonth'], undefined>`}],raw:`ReturnType<OnChangeMonth>`}}},description:``},getDay:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  day: Date,
  side: 'left' | 'right',
) => Partial<ReturnType<BasicCalendarProps['getDay']>>`,signature:{arguments:[{type:{name:`Date`},name:`day`},{type:{name:`union`,raw:`'left' | 'right'`,elements:[{name:`literal`,value:`'left'`},{name:`literal`,value:`'right'`}]},name:`side`}],return:{name:`Partial`,elements:[{name:`ReturnType`,elements:[{name:`union['getDay']`,raw:`BasicCalendarProps['getDay']`}],raw:`ReturnType<BasicCalendarProps['getDay']>`}],raw:`Partial<ReturnType<BasicCalendarProps['getDay']>>`}}},description:``}},composes:[`Pick`,`Omit`]}})),Be,G,K,Ve=t((()=>{Be=e(n(),1),p(),h(),D(),ze(),G=s(),K=Be.forwardRef((e,t)=>{let n=m(e,[`initialMonth`,`max`,`min`,`initialValue`,`value`,`time`,`onSubmit`,`invalid`,`absolute`,`getDay`,`onChangeMonth`]),r=m(e,[`absolute`]);return e.absolute?(0,G.jsx)(g,{axis:`y`,maxHeight:E,...n,ref:t,children:(0,G.jsx)(W,{...r})}):(0,G.jsx)(W,{...r})}),K.displayName=`CalendarInterval`,K.__docgenInfo={description:``,methods:[],displayName:`CalendarInterval`}})),q,J,Y,He=t((()=>{q=e(n(),1),p(),d(),oe(),D(),M(),Fe(),Ae(),J=s(),Y=q.forwardRef((e,t)=>{let{initialValue:n,min:r,max:i}=e,[a,o]=e.value||(0,q.useState)(n&&!isNaN(n.getTime())&&A(n,r,i)?n:null),s=e.time===!0?{}:typeof e.time==`function`?e.time(a):e.time,[c,l]=e.invalid||(0,q.useState)(!1),[u,d]=(0,q.useState)(ue(a));(0,q.useEffect)(()=>{l(de(a,u,s,r,i))},[a,u,s]);let p=e.getDay||(()=>({})),h=e=>{let t=p(e),n=a&&f(a,e,`eq`,!1),r=t.onClick||(()=>{}),i=n?()=>o(null):()=>o(new Date(e));return{...t,appearance:n?`active`:t.appearance,onClick:e=>{r(e),i()}}},g=m(e,[`value`,`time`,`onSubmit`,`invalid`,`getDay`]),_={disabled:a===null||c,onClick:()=>{}};if(e.onSubmit){let{disabled:t,onClick:n}=e.onSubmit;t&&(_.disabled=!0),_.onClick=()=>{n(a?k(a,u):null)}}return(0,J.jsxs)(B,{...g,getDay:h,ref:t,initialMonth:e.initialValue||e.initialMonth,children:[s&&(0,J.jsx)(se,{...s,type:`time`,value:u,setValue:d,invalid:a!==null&&c,width:ce[s.seconds?`withSeconds`:`withoutSeconds`]}),e.onSubmit&&(0,J.jsx)(Pe,{..._,type:`button`,content:`Aplicar`})]})}),Y.displayName=`SingleCalendar`,Y.__docgenInfo={description:``,methods:[],displayName:`SingleCalendar`,props:{initialValue:{required:!1,tsType:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},description:``},value:{required:!1,tsType:{name:`tuple`,raw:`[Value, (value: Value) => void]`,elements:[{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},{name:`signature`,type:`function`,raw:`(value: Value) => void`,signature:{arguments:[{type:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},name:`value`}],return:{name:`void`}}}]},description:``},time:{required:!1,tsType:{name:`union`,raw:`true | InputTimeProps | ((value: Value) => InputTimeProps | undefined)`,elements:[{name:`literal`,value:`true`},{name:`Omit`,elements:[{name:`TimeProps`},{name:`union`,raw:`'type' | 'value' | 'setValue' | 'minWidth'`,elements:[{name:`literal`,value:`'type'`},{name:`literal`,value:`'value'`},{name:`literal`,value:`'setValue'`},{name:`literal`,value:`'minWidth'`}]}],raw:`Omit<
  TimeProps,
  'type' | 'value' | 'setValue' | 'minWidth'
>`},{name:`unknown`}]},description:``},onSubmit:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  onClick: (value: Value) => void
  disabled?: boolean
}`,signature:{properties:[{key:`onClick`,value:{name:`signature`,type:`function`,raw:`(value: Value) => void`,signature:{arguments:[{type:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}]},name:`value`}],return:{name:`void`}},required:!0}},{key:`disabled`,value:{name:`boolean`,required:!1}}]}},description:``},invalid:{required:!1,tsType:{name:`tuple`,raw:`[boolean, (invalid: boolean) => void]`,elements:[{name:`boolean`},{name:`signature`,type:`function`,raw:`(invalid: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`invalid`}],return:{name:`void`}}}]},description:``},getDay:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(day: Date) => Partial<ReturnType<BasicCalendarProps['getDay']>>`,signature:{arguments:[{type:{name:`Date`},name:`day`}],return:{name:`Partial`,elements:[{name:`ReturnType`,elements:[{name:`union['getDay']`,raw:`BasicCalendarProps['getDay']`}],raw:`ReturnType<BasicCalendarProps['getDay']>`}],raw:`Partial<ReturnType<BasicCalendarProps['getDay']>>`}}},description:``}},composes:[`Pick`,`Omit`]}})),Ue,X,Z,We=t((()=>{Ue=e(n(),1),p(),h(),D(),He(),X=s(),Z=Ue.forwardRef((e,t)=>{let n=m(e,[`initialMonth`,`max`,`min`,`initialValue`,`value`,`time`,`onSubmit`,`invalid`,`absolute`,`getDay`,`onChangeMonth`,`label`,`calendar`,`paddingless`]),r=m(e,[`absolute`]);return e.absolute?(0,X.jsx)(g,{axis:`y`,maxHeight:E,...n,ref:t,children:(0,X.jsx)(Y,{...r})}):(0,X.jsx)(Y,{...r})}),Z.displayName=`CalendarSingle`,Z.__docgenInfo={description:``,methods:[],displayName:`CalendarSingle`}})),Ge=t((()=>{Ae(),Ve(),We()})),Ke,Q,$,qe=t((()=>{Ke=e(n(),1),Ge(),Q=s(),$=Ke.forwardRef((e,t)=>{switch(e.type){case`basic`:return(0,Q.jsx)(B,{...e,ref:t});case`interval`:return(0,Q.jsx)(K,{...e,ref:t});case`single`:return(0,Q.jsx)(Z,{...e,ref:t})}}),$.displayName=`Input`,$.__docgenInfo={description:``,methods:[],displayName:`Input`}}));export{le as a,K as i,qe as n,M as o,Z as r,$ as t};