import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{m as s,n as c}from"./validators-Chja94ks.js";import{c as l,t as u}from"./formatters-C0aJpNv6.js";import{n as d,t as f}from"./Icon-7EFkF0Ko.js";import{n as p,t as m}from"./Form-BqpbciIA.js";var h,g,_=t((()=>{i(),h=r`
  appearance: none;
  width: ${({$bulletSize:e})=>e}px;
  height: ${({$bulletSize:e})=>e}px;
  border-radius: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${({theme:e})=>e.colors.lightestGrey};

  box-shadow: 0px 1px 3px ${({theme:e})=>e.getColor(`black`,10)};
  box-sizing: border-box;

  background-color: ${({theme:e,$activeBullet:t})=>e.colors[t?`blue`:`white`]};

  transition: background-color 0.2s ease-in-out;
`,g=a.input`
  appearance: none;
  width: 100%;
  height: 10px;
  background-color: transparent;
  outline: none;
  position: relative;
  z-index: 3;
  margin: 0;

  &:not(:disabled) {
    cursor: pointer;
  }

  /** firefox */
  &::-moz-range-thumb {
    ${h}
  }
  /** ie */
  &::-ms-thumb {
    ${h}
  }
  /** chrome */
  &::-webkit-slider-thumb {
    ${h}
  }
`})),v,y=t((()=>{i(),v=a.div`
  background-color: ${({theme:e})=>e.getColor(`greyishBlue`,10)};

  height: 3px;
  width: 100%;
  position: absolute;
  bottom: calc(50% - 2px);
  left: 0;
  display: flex;
  z-index: 1;

  > span {
    background-color: ${({theme:e})=>e.colors.blue};
    height: 100%;
  }
`})),b,x=t((()=>{i(),_(),y(),b=a.div`
  flex: 1;
  display: flex;
  gap: 6px;

  > div {
    position: relative;
  }

  ${({theme:e,$invalid:t})=>t?r`
      ${v} > span {
        background-color: ${e.colors.warningRed};
      }

      ${g} {
        /** firefox */
        &::-moz-range-thumb {
          border-color: ${e.colors.warningRed};
        }
        /** ie */
        &::-ms-thumb {
          border-color: ${e.colors.warningRed};
        }
        /** chrome */
        &::-webkit-slider-thumb {
          border-color: ${e.colors.warningRed};
        }
      }
    `:r`
        ${v} > span {
          background-color: ${e.colors.blue};
        }

        ${g} {
          /** firefox */
          &::-moz-range-thumb {
            border-color: ${e.colors.lightestGrey};
          }
          /** ie */
          &::-ms-thumb {
            border-color: ${e.colors.lightestGrey};
          }
          /** chrome */
          &::-webkit-slider-thumb {
            border-color: ${e.colors.lightestGrey};
          }
        }
      `}
`})),S,C=t((()=>{i(),S=a.div`
  display: inline-block;
  margin-bottom: ${({theme:e})=>e.spacings.s1};
`})),w,T=t((()=>{i(),w=a.div`
  position: absolute;
  z-index: 2;

  left: 0;
  width: 100%;
  height: calc(33px + ${({theme:e})=>e.spacings.s3});
  transition: height 0.25s ease-in-out;
  overflow: hidden;

  ${({theme:e,$position:t,$strict:n})=>{let i=n?`calc(${e.spacings.s1} / 2)`:`0px`;return t===`bottom`?r`
          bottom: calc(100% + ${i});
          > div:nth-child(1) {
            bottom: ${e.spacings.s1};
          }

          > div:nth-child(2) {
            top: calc(100% - 7px);
          }
        `:r`
          top: calc(100% + ${i});
          > div:nth-child(1) {
            top: ${e.spacings.s1};
          }

          > div:nth-child(2) {
            bottom: calc(100% - 7px);
            transform: rotate(180deg);
          }
        `}}

  > div:nth-child(1) {
    position: absolute;
    z-index: 2;

    width: 93px;
    /* height: 30px; */
    padding: 9px 7px;
    font-size: 13px;
    line-height: 16px;
    border-radius: 1px;

    background-color: ${({theme:e})=>e.colors.blue};
    color: ${({theme:e})=>e.colors.white};
    padding: ${({theme:e})=>e.spacings.s1};

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > div:nth-child(2) {
    position: absolute;
    width: 0px;
    height: 0px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 5px solid ${({theme:e})=>e.colors.blue};
  }
`})),E,D=t((()=>{i(),C(),T(),E=a.label`
  ${({theme:e})=>e.useTypography(`p`)}

  ${({$width:e,$viewMode:t})=>e?r`
        width: ${e};
      `:!t&&r`
        width: 100%;
      `};
  box-sizing: border-box;
  display: block;
  position: relative;

  ${({$disabled:e})=>{if(e)return r`
      opacity: 0.5;
    `}}

  > ${S} {
    ${({$required:e,$viewMode:t})=>e&&!t&&r`
          &:after {
            content: ' *';
          }
        `}
  }

  &:not(:hover) ${w} {
    height: 0;
  }
`})),O,k=t((()=>{i(),O=a.div`
  position: absolute;
  top: 0;
  width: 40px;
  text-align: center;
  left: ${({$left:e})=>e};
  z-index: 2;

  ${({$firstChild:e})=>e&&r`
      &:first-child {
        left: 0;
        text-align: left;

        &:after {
          left: 0;
        }
      }
    `}

  ${({$lastChild:e})=>e&&r`
      &:last-child {
        right: 0;
        left: unset;
        text-align: right;

        &:after {
          right: 0;
          left: unset;
        }
      }
    `}

  ${({$bullet:e,theme:t})=>{if(e)return r`
      &:after {
        content: '';
        position: absolute;
        left: calc(50% - 5px);
        width: 10px;
        height: 10px;
        border-radius: 100%;
        border: 1px solid ${t.colors.lightestGrey};
        background-color: ${t.colors.white};
        box-shadow: 0px 1px 3px ${t.getColor(`black`,10)};
      }
    `}}
`})),A,j=t((()=>{i(),A=a.div`
  display: flex;
  padding-bottom: 2px;
`})),M,N=t((()=>{i(),x(),k(),j(),M=a.div`
  display: flex;
  gap: 7px;

  ${({$position:e})=>e===`bottom`?r`
        ${b} {
          flex-direction: column-reverse;
        }

        ${O} {
          &:after {
            bottom: calc(100% + 9px);
          }
        }

        ${A} {
          align-items: start;
        }
      `:r`
      ${b} {
        flex-direction: column;
      }

      ${O} {
        &:after {
          top: calc(100% + 10px);
        }
      }

      ${A} {
        align-items: end;
      }
    `}
`})),P,F=t((()=>{i(),P=a.div`
  height: 17px;
`})),I,L=t((()=>{i(),I=a.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`})),R=t((()=>{_(),x(),D(),C(),N(),k(),F(),j(),T(),y(),L()})),z,B,V,H,U,W,G,K,q=t((()=>{z=e(n(),1),l(),c(),p(),d(),R(),B=o(),V=e=>{if(e.markers&&`markers`in e.markers){let{strict:t}=e.markers,n=e.markers.position||`bottom`,r=e.markers.markers.map(e=>s(e)?e:{label:e.toString(),value:e});return r.sort((e,t)=>e.value-t.value),t?{min:0,max:r.length-1,step:1,strict:t,markers:r,position:n,value:r.findIndex(t=>t.value===e.value)}:{min:`min`in e.markers&&e.markers.min!==void 0?e.markers.min:r[0].value,max:`max`in e.markers&&e.markers.max!==void 0?e.markers.max:r[r.length-1].value,step:e.step?parseFloat(`${e.step}`):r[1].value-r[0].value,strict:t,markers:r,position:n,value:e.value}}let t=e.markers||{},n=e.step?parseFloat(`${e.step}`):1;return{min:t.min||0,max:t.max||100,step:n,strict:!1,markers:[],position:`bottom`,value:e.value}},H=(e,t,n,r,i,a)=>{let o=e-2;o<e-1&&(o=e-1);let s=20-20/o*(o-n);return`calc(${a?n*100/t:(r-i)*100/t}% - 10px - ${s}px)`},U=(e,t,n,r,i)=>{let a=(n-r)*100/(i-r);return`calc(${a}% - ${t*a/100}px + ${(t-e)/2}px)`},W=(e,t)=>`min(max(${t}, 0%), calc(100% - ${e}px))`,G=(e,t)=>`min(max(${t}, calc(0% - ${e}px)), calc(100% - ${e}px))`,K=z.forwardRef((e,t)=>{let{label:n,minLabel:r,maxLabel:i,width:a,setValue:o,hideNavbar:s}=e,{isRequired:c,isInvalid:l,isViewMode:d,isDisabled:p}=m.useContext(e.name),h=l()||e.invalid,_=c()||e.required,y=p()||e.disabled,x=d()||e.viewMode,{min:S,max:C,strict:T,markers:D,step:k,position:j,value:N}=V(e),F=C-S,L=(N-S)*100/F;if(N<S||N>C)throw Error(`Value must be between "${S}" and "${C}". "${N}" given`);let R=T?e=>D[typeof e==`number`?e:parseInt(e)].value:e=>typeof e==`number`?e:parseFloat(e),z=R(N),K=e.onChange||((e,t)=>o(t)),q=e=>{K(e,R(e.target.value))},{increment:J,canIncrement:Y,decrement:X,canDecrement:Z}=T?{increment:()=>{o(e=>{let t=D.findIndex(t=>t.value===e);if(t<0)return e;let n=t+1;return n<D.length?D[n].value:e})},canIncrement:N+1<D.length,decrement:()=>{o(e=>{let t=D.findIndex(t=>t.value===e);if(t<0)return e;let n=t-1;return n>=0?D[n].value:e})},canDecrement:N-1>=0}:{increment:()=>{o(e=>{let t=e+k;return t>C?e:t})},canIncrement:N+k<=C,decrement:()=>{o(e=>{let t=e-k;return t<S?e:t})},canDecrement:N-k>=S},Q=u(e,[`hideNavbar`,`invalid`,`label`,`markers`,`maxLabel`,`minLabel`,`onChange`,`required`,`setValue`,`value`,`viewMode`,`width`],{min:S,max:C,step:k,onChange:q,value:N}),$=T===!0?22:14;return(0,B.jsxs)(E,{$required:_,$disabled:y,$viewMode:x,$width:a,children:[n&&(0,B.jsx)(`div`,{children:n}),x?(0,B.jsx)(I,{children:z}):(0,B.jsxs)(M,{$position:j,children:[r&&(0,B.jsx)(A,{children:r}),(0,B.jsxs)(b,{$invalid:h,children:[D.length>0&&(0,B.jsx)(P,{children:D.map((e,t)=>{let n=T||S===D[0].value,r=T||C===D[D.length-1].value,i=H(D.length+(n?0:1)+(r?0:1),F,t+(n?0:1),e.value,S,T),a=T||e.value>z&&e.value<C;return(0,B.jsx)(O,{$left:i,$bullet:a,$firstChild:n,$lastChild:r,children:e.label},t)})}),(0,B.jsxs)(`div`,{children:[(0,B.jsx)(g,{ref:t,...Q,$activeBullet:(T===!0?D[N].value:N)!==0,$bulletSize:$}),!s&&(0,B.jsxs)(w,{$position:j,$strict:T,children:[(0,B.jsxs)(`div`,{style:{left:W(93,U(93,$,N,S,C))},children:[(0,B.jsx)(f,{type:`feather`,icon:`minus_circle`,color:`white`,onClick:Z?X:void 0,width:`12px`,height:`12px`,strokeWidth:`2.5px`}),z,(0,B.jsx)(f,{type:`feather`,icon:`plus_circle`,color:`white`,onClick:Y?J:void 0,width:`12px`,height:`12px`,strokeWidth:`2.5px`})]}),(0,B.jsx)(`div`,{style:{left:G(14,U(14,$,N,S,C))}})]}),(0,B.jsx)(v,{children:(0,B.jsx)(`span`,{style:{width:`calc(${L}% - (${$*L/100}px)`}})})]})]}),i&&(0,B.jsx)(A,{children:i})]})]})}),K.displayName=`input`,K.__docgenInfo={description:``,methods:[],displayName:`input`,props:{type:{required:!0,tsType:{name:`literal`,value:`'range'`},description:``},label:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``},minLabel:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``},maxLabel:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},hideNavbar:{required:!1,tsType:{name:`boolean`},description:``},viewMode:{required:!1,tsType:{name:`boolean`},description:``},value:{required:!0,tsType:{name:`number`},description:``},width:{required:!1,tsType:{name:`string`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: React.ChangeEvent<HTMLInputElement>, value: number) => void`,signature:{arguments:[{type:{name:`ReactChangeEvent`,raw:`React.ChangeEvent<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},name:`event`},{type:{name:`number`},name:`value`}],return:{name:`void`}}},description:``},setValue:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<number>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<number>`,elements:[{name:`number`}]}]},description:``},markers:{required:!1,tsType:{name:`union`,raw:`| {
    min?: number
    max?: number
  }
| ({
    markers: {
      0: number | Marker
      1: number | Marker
    } & Array<number | Marker>
    position?: 'bottom' | 'top'
  } & (
    | {
        strict: true
      }
    | {
        strict?: false
        min?: number
        max?: number
      }
  ))`,elements:[{name:`signature`,type:`object`,raw:`{
  min?: number
  max?: number
}`,signature:{properties:[{key:`min`,value:{name:`number`,required:!1}},{key:`max`,value:{name:`number`,required:!1}}]}},{name:`unknown`}]},description:``}},composes:[`Omit`]}}));export{q as n,K as t};