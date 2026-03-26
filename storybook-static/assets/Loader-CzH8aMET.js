import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./react-B_0iYUWB.js";import{a as n,i as r,n as i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{n as s,p as c,s as l}from"./validators-Chja94ks.js";var u,d,f,p,m=e((()=>{t(),r(),s(),u=o(),d=i`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`,f=a.div`
  ${({$size:e,$borderSize:t,$bgColor:r,$color:i,theme:a,$filled:o,$zIndex:s})=>{let u=t||e;t=u?`calc(${u} * 0.0757)`:`5px`,e||=`48px`,i||=`blue`,r||=i;let f=c(a.colors,r)?a.getColor(r,25):i,p=c(a.colors,i)?a.getColor(i):i;return n`
      ${o?n`
          position: absolute;
          left: 0;
          top: 0;
          background-color: ${()=>l(o)?c(a.colors,o)?a.getColor(o):o:a.colors.white};
          width: 100%;
          height: 100%;
        `:n``}

      pointer-events: none;

      z-index: ${s||1};

      &::before,
      &::after {
        position: absolute;
        content: '';

        top: calc(50% - ${e} / 2);
        left: calc(50% - ${e} / 2);
        width: ${e};
        height: ${e};
        border-radius: 50%;
        border-width: ${t};
        border-style: solid;
      }

      &::before {
        border-color: ${f};
      }

      &::after {
        animation: ${d} 0.6s linear;
        animation-iteration-count: infinite;
        border-color: ${p} transparent transparent;
      }
    `}}
`,p=({color:e,bgColor:t,size:n,borderSize:r,filled:i,zIndex:a,...o})=>(0,u.jsx)(f,{...o,$color:e,$bgColor:t,$size:n,$borderSize:r,$filled:i,$zIndex:a}),p.__docgenInfo={description:``,methods:[],displayName:`Loader`,props:{color:{required:!1,tsType:{name:`union`,raw:`string | keyof typeof colors`,elements:[{name:`string`},{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]}]},description:``},bgColor:{required:!1,tsType:{name:`union`,raw:`string | keyof typeof colors`,elements:[{name:`string`},{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]}]},description:``},size:{required:!1,tsType:{name:`string`},description:``},borderSize:{required:!1,tsType:{name:`string`},description:``},filled:{required:!1,tsType:{name:`union`,raw:`true | string | keyof typeof colors`,elements:[{name:`literal`,value:`true`},{name:`string`},{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]}]},description:``},zIndex:{required:!1,tsType:{name:`number`},description:``}},composes:[`Omit`]}}));export{m as n,p as t};