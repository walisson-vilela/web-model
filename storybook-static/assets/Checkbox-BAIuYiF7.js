import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{n as s,p as c}from"./validators-Chja94ks.js";import{c as l,t as u}from"./formatters-C0aJpNv6.js";import{n as d,t as f}from"./Form-BqpbciIA.js";var p,m,h,g,_=t((()=>{i(),s(),p=`17px`,m=a.div`
  position: relative;
  height: ${p};
  width: ${p};
  background-color: ${({theme:e})=>e.colors.white};

  border-style: solid;
  border-color: transparent;
  border-width: 1px;
  border-radius: 4px;

  transition-property: border-color;
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);

  &:after {
    content: '';
    position: absolute;

    left: 50%;
    top: 50%;
    height: 0;
    width: 0;

    border-style: solid;
    border-color: ${({theme:e})=>e.colors.blue};
    border-width: 0;
    transform: rotate(45deg);

    transition-property: width height border-width top left;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  /** if there is a label, it will be placed after this element */
  + * {
    flex: 1;
  }
`,h=a.label`
  ${({theme:e})=>e.useTypography(`p`,{lineHeight:e.spacings.s3})}

  ${({$padding:e,theme:t})=>{if(!e)return;let n={top:`0`,left:`0`,right:`0`,bottom:`0`};return e.top&&(n.top=e.top,c(t.spacings,e.top)&&(n.top=t.spacings[e.top])),e.left&&(n.left=e.left,c(t.spacings,e.left)&&(n.left=t.spacings[e.left])),e.bottom&&(n.bottom=e.bottom,c(t.spacings,e.bottom)&&(n.bottom=t.spacings[e.bottom])),e.right&&(n.right=e.right,c(t.spacings,e.right)&&(n.right=t.spacings[e.right])),r`
      padding-top: ${n.top};
      padding-left: ${n.left};
      padding-right: ${n.right};
      padding-bottom: ${n.bottom};
    `}}

  ${({$disabled:e,$readOnly:t})=>{if(e)return r`
        opacity: 0.5;
      `;if(!t)return r`
      cursor: pointer;
    `}}

  ${({theme:e,$bordered:t,$invalid:n})=>{if(t)return r`
      padding: ${e.spacings.s2} ${e.spacings.s3};

      border-width: 1px;
      border-style: solid;
      border-color: ${e.colors[n?`warningRed`:`lightGrey`]};
      border-radius: 4px;
    `}}

  display: flex;
  align-items: center;

  user-select: none;
  min-height: ${p};
  min-width: ${p};
  gap: ${({theme:e})=>e.spacings.s1};

  > input {
    position: absolute;
    opacity: 0;
    height: 1px;
    width: 1px;
  }

  &:hover ${m} {
    background-color: ${({theme:e})=>e.colors.iceWhite};
  }
  ${({theme:e,$viewMode:t})=>t?r`
          > input ~ ${m} {
            border-color: transparent;
          }
        `:r`
          > input ~ ${m} {
            border-color: ${e.colors.lightestGrey};
          }
          > input:checked ~ ${m} {
            border-color: ${({theme:e})=>e.colors.blue};
          }
        `}

  > input:checked ~ ${m} {
    &:after {
      width: 5px;
      height: 9.5px;
      border-width: 0 2px 2px 0;
      left: 5px;
      top: 1px;
    }
  }

  ${({theme:e,$invalid:t})=>{if(t)return r`
      ${m},
      > input:checked ~ ${m}, 
      > input:checked ~ ${m}:after {
        border-color: ${e.colors.warningRed};
      }
    `}};

  ${({$width:e})=>e&&r`
        width: ${e};
      `}
`,g=a.div`
  display: inline-block;
  ${({theme:e})=>e.useTypography(`p`,{lineHeight:e.spacings.s3})}
  flex: 1;
  overflow: hidden;

  ${({$required:e,$viewMode:t})=>{if(!(!e||t))return r`
      &:after {
        content: ' *';
      }
    `}}
`})),v,y,b,x,S=t((()=>{v=e(n(),1),l(),d(),_(),y=o(),b=e=>(0,y.jsx)(g,{$required:e.required,$viewMode:e.viewMode,children:e.children}),x=v.forwardRef((e,t)=>{let{padding:n,bordered:r}=e,{isRequired:i,isInvalid:a,isViewMode:o,isDisabled:s}=f.useContext(e.name),c=a()||e.invalid,l=i()||e.required,d=s()||e.disabled,p=o()||e.viewMode,g=u(e,[`label`,`invalid`,`required`,`padding`,`bordered`]),[_,v]=e.label?typeof e.label==`function`?[e.label]:[b,e.label]:[(()=>null)];return(0,y.jsxs)(h,{$disabled:d,$required:l,$invalid:c,$bordered:!p&&r,$padding:n,$readOnly:e.readOnly||p,$width:e.width,$viewMode:p,children:[(0,y.jsx)(`input`,{...g,type:`checkbox`,ref:t,disabled:g.disabled||p}),(0,y.jsx)(m,{}),(0,y.jsx)(_,{disabled:d,required:l,viewMode:p,invalid:c,bordered:r,padding:n,children:v})]})}),x.displayName=`Checkbox`,x.__docgenInfo={description:``,methods:[],displayName:`Checkbox`,props:{required:{required:!1,tsType:{name:`boolean`},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},viewMode:{required:!1,tsType:{name:`boolean`},description:``},padding:{required:!1,tsType:{name:`Padding`},description:``},bordered:{required:!1,tsType:{name:`literal`,value:`true`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},label:{required:!1,tsType:{name:`union`,raw:`ReactNode | React.FunctionComponent<LabelContentProps>`,elements:[{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},{name:`ReactFunctionComponent`,raw:`React.FunctionComponent<LabelContentProps>`,elements:[{name:`LabelContentProps`}]}]},description:``},type:{required:!0,tsType:{name:`literal`,value:`'checkbox'`},description:``},width:{required:!1,tsType:{name:`string`},description:``}},composes:[`Omit`]}}));export{_ as i,S as n,m as r,x as t};