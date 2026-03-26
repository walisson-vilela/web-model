import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{t as r}from"./react-dom-CfS7yHFF.js";import{a as i,i as a,o}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as s}from"./iframe-fSyR9o4x.js";import{f as c,h as l,n as u,p as d,r as f}from"./validators-Chja94ks.js";import{c as p,n as m,o as h,t as g}from"./formatters-C0aJpNv6.js";import{n as _,t as v}from"./Loader-CzH8aMET.js";import{n as y,t as b}from"./Icon-7EFkF0Ko.js";var x,S,C=t((()=>{x=e(n(),1),u(),S=e=>{let{active:t,mountDuration:n,element:r}=e,[i,a]=(0,x.useState)(`first`);return(0,x.useEffect)(()=>{a(e=>e===`first`&&t===!1?`unmounted`:!1);let e=t?setTimeout(()=>a(!0)):setTimeout(()=>a(`unmounted`),n);return()=>clearTimeout(e)},[t]),f(i)?r({active:i,mountDuration:n}):null}})),w,T=t((()=>{a(),p(),w=(e,t)=>{let{active:n,mountDuration:r}=e,a={enabled:i``,disabled:i``},o=[],s=[],c=[];if(l(e.properties).forEach(n=>{let i=e.properties[n];i!==void 0&&(o.push(n),s.push(i.duration&&i.duration<=r?i.duration:r),c.push(i.function||`ease-in-out`),t[n].disabled&&(a.disabled=a.disabled.concat(`${n}: ${t[n].disabled};`)),t[n].enabled&&(a.enabled=a.enabled.concat(`${n}: ${t[n].enabled};`)))}),o.length!==0)return i`
    transition-property: ${o.join(`, `)};
    transition-duration: ${s.map(e=>`${e}ms`).join(`, `)};
    transition-timing-function: ${c.join(`, `)};
    ${a[n?`enabled`:`disabled`]}
  `}})),E,D=t((()=>{C(),T(),E=S})),O,k,A,j=t((()=>{a(),c(),D(),O={"top right":({bottom:e,left:t},n)=>i`
    top: ${e?`calc(100% - ${e})`:0};
    left: ${t||`calc(100% + ${n})`};
  `,"top left":({bottom:e,right:t},n)=>i`
    top: ${e?`calc(100% - ${e})`:0};
    right: ${t||`calc(100% + ${n})`};
  `,"bottom right":({top:e,left:t},n)=>i`
    bottom: ${e?`calc(100% - ${e})`:0};
    left: ${t||`calc(100% + ${n})`};
  `,"bottom left":({top:e,right:t},n)=>i`
    bottom: ${e?`calc(100% - ${e})`:0};
    right: ${t||`calc(100% + ${n})`};
  `,"right top":({bottom:e},t)=>i`
    bottom: ${e||`calc(100% + ${t})`};
    right: 0;
  `,"right bottom":({top:e},t)=>i`
    top: ${e||`calc(100% + ${t})`};
    right: 0;
  `,"left top":({bottom:e},t)=>i`
    bottom: ${e||`calc(100% + ${t})`};
    left: 0;
  `,"left bottom":({top:e},t)=>i`
    top: ${e||`calc(100% + ${t})`};
    left: 0;
  `},k={"top right":(e,t)=>i`
    top: ${e};
    left: calc(${t} / 2 * -1);
  `,"top left":(e,t)=>i`
    top: ${e};
    right: calc(${t} / 2 * -1);
  `,"bottom right":(e,t)=>i`
    bottom: ${e};
    left: calc(${t} / 2 * -1);
  `,"bottom left":(e,t)=>i`
    bottom: ${e};
    right: calc(${t} / 2 * -1);
  `,"right top":(e,t)=>i`
    bottom: calc(${t} / 2 * -1);
    right: ${e};
  `,"right bottom":(e,t)=>i`
    top: calc(${t} / 2 * -1);
    right: ${e};
  `,"left top":(e,t)=>i`
    bottom: calc(${t} / 2 * -1);
    left: ${e};
  `,"left bottom":(e,t)=>i`
    top: calc(${t} / 2 * -1);
    left: ${e};
  `},A=o.div`
  ${({theme:e})=>e.useTypography(`p`)};
  display: flex;

  > div {
    box-shadow: 0px 3px 6px ${({theme:e})=>e.getColor(`black`,15)};
    border: 1px solid ${({theme:e})=>e.colors.lightestGrey};
    overflow: hidden;
    z-index: 1;
    background-color: ${({theme:e,$bgColor:t})=>t?typeof t==`function`?t(e):d(e.colors,t)?e.colors[t]:t:e.colors.white};
  }

  z-index: ${({$zIndex:e})=>e||1};

  ${({$width:e})=>{if(e)return i`
      width: ${e};
    `}}

  ${({$height:e})=>{if(e)return i`
      height: ${e};
    `}}

  ${({$maxWidth:e})=>{if(e)return i`
      max-width: ${e};
    `}}

  ${({$maxHeight:e})=>{if(e)return i`
      max-height: ${e};
    `}}

  position: absolute;

  ${({theme:e,$position:t,$references:n,$pointer:r})=>{if(!t)return i`
        visibility: collapse;
      `;let a=r?r===!0?e.spacings.s1:typeof r.size==`function`?r.size(e):r.size||e.spacings.s1:`0px`;return O[t](n||{},a)}}

  ${e=>{let{$transition:t}=e;if(t!==void 0)return w(t,{"max-width":{disabled:`0px`},"max-height":{disabled:`0px`},width:{disabled:`0px`},height:{disabled:`0px`}})}};

  ${({theme:e,$pointer:t,$position:n})=>{if(!t||!n)return;let r={size:`s1`,color:`white`,distance:`s1`,...t===!0?{}:t},a=typeof r.size==`function`?r.size(e):d(e.spacings,r.size)?e.spacings[r.size]:r.size,o=typeof r.distance==`function`?r.distance(e):d(e.spacings,r.distance)?e.spacings[r.distance]:r.distance,s=typeof r.color==`function`?r.color(e):d(e.colors,r.color)?e.colors[r.color]:r.color;return i`
      &:after {
        content: '';

        position: absolute;

        ${k[n](o,a)}

        width: ${a};
        height: ${a};

        transform: rotate(45deg);

        background-color: ${s};
        box-shadow: 0px 3px 6px ${({theme:e})=>e.getColor(`black`,15)};
        border: 1px solid ${({theme:e})=>e.colors.lightestGrey};
      }
    `}}
`})),M,N,ee,te=t((()=>{M=e(n(),1),p(),u(),D(),j(),N=s(),ee=M.forwardRef((e,t)=>{let{open:n,boundRef:r}=e,i=e.center||{x:50,y:75},a=e.axis||`y`,[o,s]=(0,M.useState)(null),c=(0,M.useCallback)(()=>{if(e.position)return e.position;if(!o)return null;let{width:t,height:n,offsetTop:s,offsetLeft:c}=r?(()=>{let e=r.getBoundingClientRect();return{offsetTop:e.top,offsetLeft:e.left,width:r.offsetWidth,height:r.offsetHeight}})():{offsetTop:0,offsetLeft:0,width:window.innerWidth,height:window.innerHeight},l=o.getBoundingClientRect(),u=l.top-s,d=(l.left-c)*100/t,f=u*100/n;if(a===`y`)return`${d>i.x?`right`:`left`} ${f>i.y?`top`:`bottom`}`;{let e=d>i.x?`left`:`right`;return`${f>i.y?`bottom`:`top`} ${e}`}},[o,r,e.position]),[u,f]=(0,M.useState)(c);(0,M.useImperativeHandle)(t,()=>o),(0,M.useEffect)(()=>{f(c)},[c]);let p=g(e,[`width`,`height`,`maxWidth`,`maxHeight`,`references`,`zIndex`,`pointer`,`bgColor`,`open`,`position`,`axis`,`center`,`ref`,`boundRef`,`transition`,`content`]),m={width:`width`,"max-width":`maxWidth`,height:`height`,"max-height":`maxHeight`},h={mountDuration:500,properties:l(m).filter(t=>{let n=m[t];return d(e,n)&&e[n]!==void 0}).reduce((e,t)=>({...e,[t]:{}}),{}),...e.transition||{}};return(0,N.jsx)(E,{active:n,mountDuration:h.mountDuration,element:t=>(0,N.jsx)(A,{...p,ref:s,$position:u,$transition:{...h,...t},$bgColor:e.bgColor,$width:e.width,$height:e.height,$maxWidth:e.maxWidth,$maxHeight:e.maxHeight,$references:e.references,$pointer:e.pointer,$zIndex:e.zIndex,children:(0,N.jsx)(`div`,{children:`content`in e?(0,N.jsx)(e.content,{}):e.children})})})}),ee.displayName=`AbsoluteContainer`,ee.__docgenInfo={description:``,methods:[],displayName:`AbsoluteContainer`,props:{width:{required:!1,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:``},height:{required:!1,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:``},maxWidth:{required:!1,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:``},maxHeight:{required:!1,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:``},references:{required:!1,tsType:{name:`References`},description:``},zIndex:{required:!1,tsType:{name:`number`},description:``},pointer:{required:!1,tsType:{name:`union`,raw:`| {
    color?: ColorOptions | string | ((theme: ThemeInterface) => string)
    size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
    distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  }
| true`,elements:[{name:`signature`,type:`object`,raw:`{
  color?: ColorOptions | string | ((theme: ThemeInterface) => string)
  size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
}`,signature:{properties:[{key:`color`,value:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`size`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`distance`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}}]}},{name:`literal`,value:`true`}]},description:``},bgColor:{required:!1,tsType:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}]},description:``},open:{required:!0,tsType:{name:`boolean`},description:``},position:{required:!1,tsType:{name:`union`,raw:`| 'top right'
| 'top left'
| 'bottom right'
| 'bottom left'
| 'right top'
| 'right bottom'
| 'left top'
| 'left bottom'`,elements:[{name:`literal`,value:`'top right'`},{name:`literal`,value:`'top left'`},{name:`literal`,value:`'bottom right'`},{name:`literal`,value:`'bottom left'`},{name:`literal`,value:`'right top'`},{name:`literal`,value:`'right bottom'`},{name:`literal`,value:`'left top'`},{name:`literal`,value:`'left bottom'`}]},description:``},axis:{required:!1,tsType:{name:`union`,raw:`'x' | 'y'`,elements:[{name:`literal`,value:`'x'`},{name:`literal`,value:`'y'`}]},description:``},center:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  x: number
  y: number
}`,signature:{properties:[{key:`x`,value:{name:`number`,required:!0}},{key:`y`,value:{name:`number`,required:!0}}]}},description:``},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},boundRef:{required:!1,tsType:{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}]},description:`defines an element to be the bound reference when calculating auto position,
the window will be used by default`},transition:{required:!1,tsType:{name:`Partial`,elements:[{name:`Omit`,elements:[{name:`Transition`,elements:[{name:`union`,raw:`'width' | 'max-width' | 'height' | 'max-height'`,elements:[{name:`literal`,value:`'width'`},{name:`literal`,value:`'max-width'`},{name:`literal`,value:`'height'`},{name:`literal`,value:`'max-height'`}]}],raw:`Transition<
  'width' | 'max-width' | 'height' | 'max-height'
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`},description:``}}}}));function ne(){return typeof window<`u`}function re(e){return ie(e)?(e.nodeName||``).toLowerCase():`#document`}function P(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function F(e){return((ie(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function ie(e){return ne()?e instanceof Node||e instanceof P(e).Node:!1}function I(e){return ne()?e instanceof Element||e instanceof P(e).Element:!1}function L(e){return ne()?e instanceof HTMLElement||e instanceof P(e).HTMLElement:!1}function ae(e){return!ne()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof P(e).ShadowRoot}function oe(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=z(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function se(e){return/^(table|td|th)$/.test(re(e))}function ce(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}function le(e){let t=I(e)?z(e):e;return H(t.transform)||H(t.translate)||H(t.scale)||H(t.rotate)||H(t.perspective)||!de()&&(H(t.backdropFilter)||H(t.filter))||he.test(t.willChange||``)||ge.test(t.contain||``)}function ue(e){let t=B(e);for(;L(t)&&!R(t);){if(le(t))return t;if(ce(t))return null;t=B(t)}return null}function de(){return _e??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),_e}function R(e){return/^(html|body|#document)$/.test(re(e))}function z(e){return P(e).getComputedStyle(e)}function fe(e){return I(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function B(e){if(re(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||ae(e)&&e.host||F(e);return ae(t)?t.host:t}function pe(e){let t=B(e);return R(t)?e.ownerDocument?e.ownerDocument.body:e.body:L(t)&&oe(t)?t:pe(t)}function V(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=pe(e),i=r===e.ownerDocument?.body,a=P(r);if(i){let e=me(a);return t.concat(a,a.visualViewport||[],oe(r)?r:[],e&&n?V(e):[])}else return t.concat(r,V(r,[],n))}function me(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}var he,ge,H,_e,ve=t((()=>{he=/transform|translate|scale|rotate|perspective|filter/,ge=/paint|layout|strict|content/,H=e=>!!e&&e!==`none`}));function ye(e,t,n){return G(e,W(t,n))}function be(e,t){return typeof e==`function`?e(t):e}function xe(e){return e.split(`-`)[0]}function Se(e){return e.split(`-`)[1]}function Ce(e){return e===`x`?`y`:`x`}function we(e){return e===`y`?`height`:`width`}function U(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function Te(e){return Ce(U(e))}function Ee(e,t,n){n===void 0&&(n=!1);let r=Se(e),i=Te(e),a=we(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=je(o)),[o,je(o)]}function De(e){let t=je(e);return[Oe(e),t,Oe(t)]}function Oe(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}function ke(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Be:ze:t?ze:Be;case`left`:case`right`:return t?Ve:He;default:return[]}}function Ae(e,t,n,r){let i=Se(e),a=ke(xe(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Oe)))),a}function je(e){let t=xe(e);return Re[t]+e.slice(t.length)}function Me(e){return{top:0,right:0,bottom:0,left:0,...e}}function Ne(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Me(e)}function Pe(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}var Fe,W,G,Ie,Le,K,Re,ze,Be,Ve,He,Ue=t((()=>{Fe=[`top`,`right`,`bottom`,`left`],W=Math.min,G=Math.max,Ie=Math.round,Le=Math.floor,K=e=>({x:e,y:e}),Re={left:`right`,right:`left`,bottom:`top`,top:`bottom`},ze=[`left`,`right`],Be=[`right`,`left`],Ve=[`top`,`bottom`],He=[`bottom`,`top`]})),We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,ot,st,ct,lt,ut,dt,ft,pt,mt,ht,gt,_t,vt,yt=t((()=>{We=[`input:not([inert]):not([inert] *)`,`select:not([inert]):not([inert] *)`,`textarea:not([inert]):not([inert] *)`,`a[href]:not([inert]):not([inert] *)`,`button:not([inert]):not([inert] *)`,`[tabindex]:not(slot):not([inert]):not([inert] *)`,`audio[controls]:not([inert]):not([inert] *)`,`video[controls]:not([inert]):not([inert] *)`,`[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)`,`details>summary:first-of-type:not([inert]):not([inert] *)`,`details:not([inert]):not([inert] *)`],Ge=We.join(`,`),Ke=typeof Element>`u`,qe=Ke?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,Je=!Ke&&Element.prototype.getRootNode?function(e){return e?.getRootNode?.call(e)}:function(e){return e?.ownerDocument},Ye=function(e,t){t===void 0&&(t=!0);var n=e?.getAttribute?.call(e,`inert`);return n===``||n===`true`||t&&e&&(typeof e.closest==`function`?e.closest(`[inert]`):Ye(e.parentNode))},Xe=function(e){var t=e?.getAttribute?.call(e,`contenteditable`);return t===``||t===`true`},Ze=function(e,t,n){if(Ye(e))return[];var r=Array.prototype.slice.apply(e.querySelectorAll(Ge));return t&&qe.call(e,Ge)&&r.unshift(e),r=r.filter(n),r},Qe=function(e,t,n){for(var r=[],i=Array.from(e);i.length;){var a=i.shift();if(!Ye(a,!1))if(a.tagName===`SLOT`){var o=a.assignedElements(),s=Qe(o.length?o:a.children,!0,n);n.flatten?r.push.apply(r,s):r.push({scopeParent:a,candidates:s})}else{qe.call(a,Ge)&&n.filter(a)&&(t||!e.includes(a))&&r.push(a);var c=a.shadowRoot||typeof n.getShadowRoot==`function`&&n.getShadowRoot(a),l=!Ye(c,!1)&&(!n.shadowRootFilter||n.shadowRootFilter(a));if(c&&l){var u=Qe(c===!0?a.children:c.children,!0,n);n.flatten?r.push.apply(r,u):r.push({scopeParent:a,candidates:u})}else i.unshift.apply(i,a.children)}}return r},$e=function(e){return!isNaN(parseInt(e.getAttribute(`tabindex`),10))},et=function(e){if(!e)throw Error(`No node provided`);return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||Xe(e))&&!$e(e)?0:e.tabIndex},tt=function(e,t){var n=et(e);return n<0&&t&&!$e(e)?0:n},nt=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},rt=function(e){return e.tagName===`INPUT`},it=function(e){return rt(e)&&e.type===`hidden`},at=function(e){return e.tagName===`DETAILS`&&Array.prototype.slice.apply(e.children).some(function(e){return e.tagName===`SUMMARY`})},ot=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]},st=function(e){if(!e.name)return!0;var t=e.form||Je(e),n=function(e){return t.querySelectorAll(`input[type="radio"][name="`+e+`"]`)},r;if(typeof window<`u`&&window.CSS!==void 0&&typeof window.CSS.escape==`function`)r=n(window.CSS.escape(e.name));else try{r=n(e.name)}catch(e){return console.error(`Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s`,e.message),!1}var i=ot(r,e.form);return!i||i===e},ct=function(e){return rt(e)&&e.type===`radio`},lt=function(e){return ct(e)&&!st(e)},ut=function(e){var t=e&&Je(e),n=t?.host,r=!1;if(t&&t!==e){var i,a,o;for(r=!!((i=n)!=null&&(a=i.ownerDocument)!=null&&a.contains(n)||e!=null&&(o=e.ownerDocument)!=null&&o.contains(e));!r&&n;){var s,c;t=Je(n),n=t?.host,r=!!((s=n)!=null&&(c=s.ownerDocument)!=null&&c.contains(n))}}return r},dt=function(e){var t=e.getBoundingClientRect(),n=t.width,r=t.height;return n===0&&r===0},ft=function(e,t){var n=t.displayCheck,r=t.getShadowRoot;if(n===`full-native`&&`checkVisibility`in e)return!e.checkVisibility({checkOpacity:!1,opacityProperty:!1,contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0});if(getComputedStyle(e).visibility===`hidden`)return!0;var i=qe.call(e,`details>summary:first-of-type`)?e.parentElement:e;if(qe.call(i,`details:not([open]) *`))return!0;if(!n||n===`full`||n===`full-native`||n===`legacy-full`){if(typeof r==`function`){for(var a=e;e;){var o=e.parentElement,s=Je(e);if(o&&!o.shadowRoot&&r(o)===!0)return dt(e);e=e.assignedSlot?e.assignedSlot:!o&&s!==e.ownerDocument?s.host:o}e=a}if(ut(e))return!e.getClientRects().length;if(n!==`legacy-full`)return!0}else if(n===`non-zero-area`)return dt(e);return!1},pt=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if(t.tagName===`FIELDSET`&&t.disabled){for(var n=0;n<t.children.length;n++){var r=t.children.item(n);if(r.tagName===`LEGEND`)return qe.call(t,`fieldset[disabled] *`)?!0:!r.contains(e)}return!0}t=t.parentElement}return!1},mt=function(e,t){return!(t.disabled||it(t)||ft(t,e)||at(t)||pt(t))},ht=function(e,t){return!(lt(t)||et(t)<0||!mt(e,t))},gt=function(e){var t=parseInt(e.getAttribute(`tabindex`),10);return!!(isNaN(t)||t>=0)},_t=function(e){var t=[],n=[];return e.forEach(function(e,r){var i=!!e.scopeParent,a=i?e.scopeParent:e,o=tt(a,i),s=i?_t(e.candidates):a;o===0?i?t.push.apply(t,s):t.push(a):n.push({documentOrder:r,tabIndex:o,item:e,isScope:i,content:s})}),n.sort(nt).reduce(function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e},[]).concat(t)},vt=function(e,t){t||={};var n=t.getShadowRoot?Qe([e],t.includeContainer,{filter:ht.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:gt}):Ze(e,t.includeContainer,ht.bind(null,t));return _t(n)}}));function bt(){return/apple/i.test(navigator.vendor)}function xt(e){let t=e.activeElement;for(;((n=t)==null||(n=n.shadowRoot)==null?void 0:n.activeElement)!=null;){var n;t=t.shadowRoot.activeElement}return t}function St(e,t){if(!e||!t)return!1;let n=t.getRootNode==null?void 0:t.getRootNode();if(e.contains(t))return!0;if(n&&ae(n)){let n=t;for(;n;){if(e===n)return!0;n=n.parentNode||n.host}}return!1}function Ct(e){return`composedPath`in e?e.composedPath()[0]:e.target}function wt(e,t){if(t==null)return!1;if(`composedPath`in e)return e.composedPath().includes(t);let n=e;return n.target!=null&&t.contains(n.target)}function Tt(e){return e.matches(`html,body`)}function q(e){return e?.ownerDocument||document}function Et(e){return L(e)&&e.matches(zt)}function Dt(e,t,n){return n===void 0&&(n=!0),e.filter(e=>e.parentId===t&&(!n||e.context?.open)).flatMap(t=>[t,...Dt(e,t.id,n)])}function Ot(e){return`nativeEvent`in e}function kt(e,t){let n=[`mouse`,`pen`];return t||n.push(``,void 0),n.includes(e)}function At(e){let t=Lt.useRef(e);return Y(()=>{t.current=e}),t}function J(e){let t=Lt.useRef(()=>{});return Vt(()=>{t.current=e}),Lt.useCallback(function(){var e=[...arguments];return t.current==null?void 0:t.current(...e)},[])}function jt(e,t){let n=vt(e,Ht()),r=n.length;if(r===0)return;let i=xt(q(e)),a=n.indexOf(i);return n[a===-1?t===1?0:r-1:a+t]}function Mt(e){return jt(q(e).body,1)||e}function Nt(e){return jt(q(e).body,-1)||e}function Pt(e,t){let n=t||e.currentTarget,r=e.relatedTarget;return!r||!St(n,r)}function Ft(e){vt(e,Ht()).forEach(e=>{e.dataset.tabindex=e.getAttribute(`tabindex`)||``,e.setAttribute(`tabindex`,`-1`)})}function It(e){e.querySelectorAll(`[data-tabindex]`).forEach(e=>{let t=e.dataset.tabindex;delete e.dataset.tabindex,t?e.setAttribute(`tabindex`,t):e.removeAttribute(`tabindex`)})}var Lt,Rt,zt,Y,Bt,Vt,Ht,Ut=t((()=>{ve(),Lt=e(n(),1),Rt=e(n(),1),yt(),zt=`input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])`,Y=typeof document<`u`?Rt.useLayoutEffect:function(){},Bt={...Lt},Vt=Bt.useInsertionEffect||(e=>e()),Ht=()=>({getShadowRoot:!0,displayCheck:typeof ResizeObserver==`function`&&ResizeObserver.toString().includes(`[native code]`)?`full`:`none`})}));function Wt(e,t,n){let{reference:r,floating:i}=e,a=U(t),o=Te(t),s=we(o),c=xe(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(Se(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1);break}return p}async function Gt(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=be(t,e),p=Ne(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Pe(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Pe(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}function Kt(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function qt(e){return Fe.some(t=>e[t]>=0)}async function Jt(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=xe(n),s=Se(n),c=U(n)===`y`,l=en.has(o)?-1:1,u=a&&c?-1:1,d=be(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var Yt,Xt,Zt,Qt,$t,en,tn,nn,rn,an=t((()=>{Ue(),Yt=50,Xt=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Gt},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=Wt(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<Yt&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=Wt(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},Zt=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=be(e,t)||{};if(l==null)return{};let d=Ne(u),f={x:n,y:r},p=Te(i),m=we(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=W(d[_],T),D=W(d[v],T),O=E,k=C-h[m]-D,A=C/2-h[m]/2+w,j=ye(O,A,k),M=!c.arrow&&Se(i)!=null&&A!==j&&a.reference[m]/2-(A<O?E:D)-h[m]/2<0,N=M?A<O?A-O:A-k:0;return{[p]:f[p]+N,data:{[p]:j,centerOffset:A-j-N,...M&&{alignmentOffset:N}},reset:M}}}),Qt=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=be(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=xe(r),_=U(o),v=xe(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[je(o)]:De(o)),x=p!==`none`;!d&&x&&b.push(...Ae(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=Ee(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(!(u===`alignment`&&_!==U(t))||T.every(e=>U(e.placement)===_?e.overflows[0]>0:!0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=U(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o;break}if(r!==n)return{reset:{placement:n}}}return{}}}},$t=function(e){return e===void 0&&(e={}),{name:`hide`,options:e,async fn(t){let{rects:n,platform:r}=t,{strategy:i=`referenceHidden`,...a}=be(e,t);switch(i){case`referenceHidden`:{let e=Kt(await r.detectOverflow(t,{...a,elementContext:`reference`}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:qt(e)}}}case`escaped`:{let e=Kt(await r.detectOverflow(t,{...a,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:qt(e)}}}default:return{}}}}},en=new Set([`left`,`top`]),tn=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await Jt(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},nn=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=be(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=U(xe(i)),p=Ce(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=ye(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=ye(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},rn=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=be(e,t),u=await o.detectOverflow(t,l),d=xe(i),f=Se(i),p=U(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=W(h-u[g],v),x=W(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=G(u.left,0),t=G(u.right,0),n=G(u.top,0),r=G(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:G(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:G(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}}}));function on(e){let t=z(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=L(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Ie(n)!==a||Ie(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function sn(e){return I(e)?e:e.contextElement}function cn(e){let t=sn(e);if(!L(t))return K(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=on(t),o=(a?Ie(n.width):n.width)/r,s=(a?Ie(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}function ln(e){let t=P(e);return!de()||!t.visualViewport?Mn:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function un(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==P(e)?!1:t}function dn(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=sn(e),o=K(1);t&&(r?I(r)&&(o=cn(r)):o=cn(e));let s=un(a,n,r)?ln(a):K(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=P(a),t=r&&I(r)?P(r):r,n=e,i=me(n);for(;i&&r&&t!==n;){let e=cn(i),t=i.getBoundingClientRect(),r=z(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=P(i),i=me(n)}}return Pe({width:u,height:d,x:c,y:l})}function fn(e,t){let n=fe(e).scrollLeft;return t?t.left+n:dn(F(e)).left+n}function pn(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-fn(e,n),y:n.top+t.scrollTop}}function mn(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=F(r),s=t?ce(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=K(1),u=K(0),d=L(r);if((d||!d&&!a)&&((re(r)!==`body`||oe(o))&&(c=fe(r)),d)){let e=dn(r);l=cn(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?pn(o,c):K(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function hn(e){return Array.from(e.getClientRects())}function gn(e){let t=F(e),n=fe(e),r=e.ownerDocument.body,i=G(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=G(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+fn(e),s=-n.scrollTop;return z(r).direction===`rtl`&&(o+=G(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}function _n(e,t){let n=P(e),r=F(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=de();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=fn(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=Nn&&(a-=o)}else l<=Nn&&(a+=l);return{width:a,height:o,x:s,y:c}}function vn(e,t){let n=dn(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=L(e)?cn(e):K(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function yn(e,t,n){let r;if(t===`viewport`)r=_n(e,n);else if(t===`document`)r=gn(F(e));else if(I(t))r=vn(t,n);else{let n=ln(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Pe(r)}function bn(e,t){let n=B(e);return n===t||!I(n)||R(n)?!1:z(n).position===`fixed`||bn(n,t)}function xn(e,t){let n=t.get(e);if(n)return n;let r=V(e,[],!1).filter(e=>I(e)&&re(e)!==`body`),i=null,a=z(e).position===`fixed`,o=a?B(e):e;for(;I(o)&&!R(o);){let t=z(o),n=le(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||oe(o)&&!n&&bn(e,o))?r=r.filter(e=>e!==o):i=t,o=B(o)}return t.set(e,r),r}function Sn(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?ce(t)?[]:xn(t,this._c):[].concat(n),r],o=yn(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=yn(t,a[e],i);s=G(n.top,s),c=W(n.right,c),l=W(n.bottom,l),u=G(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Cn(e){let{width:t,height:n}=on(e);return{width:t,height:n}}function wn(e,t,n){let r=L(t),i=F(t),a=n===`fixed`,o=dn(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=K(0);function l(){c.x=fn(i)}if(r||!r&&!a)if((re(t)!==`body`||oe(i))&&(s=fe(t)),r){let e=dn(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l();a&&!r&&i&&l();let u=i&&!r&&!a?pn(i,s):K(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function Tn(e){return z(e).position===`static`}function En(e,t){if(!L(e)||z(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return F(e)===n&&(n=n.ownerDocument.body),n}function Dn(e,t){let n=P(e);if(ce(e))return n;if(!L(e)){let t=B(e);for(;t&&!R(t);){if(I(t)&&!Tn(t))return t;t=B(t)}return n}let r=En(e,t);for(;r&&se(r)&&Tn(r);)r=En(r,t);return r&&R(r)&&Tn(r)&&!le(r)?n:r||ue(e)||n}function On(e){return z(e).direction===`rtl`}function kn(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function An(e,t){let n=null,r,i=F(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=Le(d),h=Le(i.clientWidth-(u+f)),g=Le(i.clientHeight-(d+p)),_=Le(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:G(0,W(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!kn(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function jn(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=sn(e),u=i||a?[...l?V(l):[],...t?V(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?An(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?dn(e):null;c&&g();function g(){let t=dn(e);h&&!kn(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un=t((()=>{an(),Ue(),ve(),Mn=K(0),Nn=25,Pn=async function(e){let t=this.getOffsetParent||Dn,n=this.getDimensions,r=await n(e.floating);return{reference:wn(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},Fn={convertOffsetParentRelativeRectToViewportRelativeRect:mn,getDocumentElement:F,getClippingRect:Sn,getOffsetParent:Dn,getElementRects:Pn,getClientRects:hn,getDimensions:Cn,getScale:cn,isElement:I,isRTL:On},In=tn,Ln=nn,Rn=Qt,zn=rn,Bn=$t,Vn=Zt,Hn=(e,t,n)=>{let r=new Map,i={platform:Fn,...n},a={...i.platform,_c:r};return Xt(e,t,{...i,platform:a})}}));function Wn(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e==`function`&&e.toString()===t.toString())return!0;let n,r,i;if(e&&t&&typeof e==`object`){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;r--!==0;)if(!Wn(e[r],t[r]))return!1;return!0}if(i=Object.keys(e),n=i.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!{}.hasOwnProperty.call(t,i[r]))return!1;for(r=n;r--!==0;){let n=i[r];if(!(n===`_owner`&&e.$$typeof)&&!Wn(e[n],t[n]))return!1}return!0}return e!==e&&t!==t}function Gn(e){return typeof window>`u`?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Kn(e,t){let n=Gn(e);return Math.round(t*n)/n}function qn(e){let t=X.useRef(e);return Zn(()=>{t.current=e}),t}function Jn(e){e===void 0&&(e={});let{placement:t=`bottom`,strategy:n=`absolute`,middleware:r=[],platform:i,elements:{reference:a,floating:o}={},transform:s=!0,whileElementsMounted:c,open:l}=e,[u,d]=X.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[f,p]=X.useState(r);Wn(f,r)||p(r);let[m,h]=X.useState(null),[g,_]=X.useState(null),v=X.useCallback(e=>{e!==S.current&&(S.current=e,h(e))},[]),y=X.useCallback(e=>{e!==C.current&&(C.current=e,_(e))},[]),b=a||m,x=o||g,S=X.useRef(null),C=X.useRef(null),w=X.useRef(u),T=c!=null,E=qn(c),D=qn(i),O=qn(l),k=X.useCallback(()=>{if(!S.current||!C.current)return;let e={placement:t,strategy:n,middleware:f};D.current&&(e.platform=D.current),Hn(S.current,C.current,e).then(e=>{let t={...e,isPositioned:O.current!==!1};A.current&&!Wn(w.current,t)&&(w.current=t,Xn.flushSync(()=>{d(t)}))})},[f,t,n,D,O]);Zn(()=>{l===!1&&w.current.isPositioned&&(w.current.isPositioned=!1,d(e=>({...e,isPositioned:!1})))},[l]);let A=X.useRef(!1);Zn(()=>(A.current=!0,()=>{A.current=!1}),[]),Zn(()=>{if(b&&(S.current=b),x&&(C.current=x),b&&x){if(E.current)return E.current(b,x,k);k()}},[b,x,k,E,T]);let j=X.useMemo(()=>({reference:S,floating:C,setReference:v,setFloating:y}),[v,y]),M=X.useMemo(()=>({reference:b,floating:x}),[b,x]),N=X.useMemo(()=>{let e={position:n,left:0,top:0};if(!M.floating)return e;let t=Kn(M.floating,u.x),r=Kn(M.floating,u.y);return s?{...e,transform:`translate(`+t+`px, `+r+`px)`,...Gn(M.floating)>=1.5&&{willChange:`transform`}}:{position:n,left:t,top:r}},[n,s,M.floating,u.x,u.y]);return X.useMemo(()=>({...u,update:k,refs:j,elements:M,floatingStyles:N}),[u,k,j,M,N])}var X,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar=t((()=>{Un(),X=e(n(),1),Yn=e(n(),1),Xn=e(r(),1),Zn=typeof document<`u`?Yn.useLayoutEffect:function(){},Qn=e=>{function t(e){return{}.hasOwnProperty.call(e,`current`)}return{name:`arrow`,options:e,fn(n){let{element:r,padding:i}=typeof e==`function`?e(n):e;return r&&t(r)?r.current==null?{}:Vn({element:r.current,padding:i}).fn(n):r?Vn({element:r,padding:i}).fn(n):{}}}},$n=(e,t)=>{let n=In(e);return{name:n.name,fn:n.fn,options:[e,t]}},er=(e,t)=>{let n=Ln(e);return{name:n.name,fn:n.fn,options:[e,t]}},tr=(e,t)=>{let n=Rn(e);return{name:n.name,fn:n.fn,options:[e,t]}},nr=(e,t)=>{let n=zn(e);return{name:n.name,fn:n.fn,options:[e,t]}},rr=(e,t)=>{let n=Bn(e);return{name:n.name,fn:n.fn,options:[e,t]}},ir=(e,t)=>{let n=Qn(e);return{name:n.name,fn:n.fn,options:[e,t]}}}));function or(){let[e,t]=Q.useState(()=>Lr?zr():void 0);return Y(()=>{e??t(zr())},[]),Q.useEffect(()=>{Lr=!0},[]),e}function sr(){let e=new Map;return{emit(t,n){var r;(r=e.get(t))==null||r.forEach(e=>e(n))},on(t,n){e.has(t)||e.set(t,new Set),e.get(t).add(n)},off(t,n){var r;(r=e.get(t))==null||r.delete(n)}}}function cr(e){return`data-floating-ui-`+e}function Z(e){e.current!==-1&&(clearTimeout(e.current),e.current=-1)}function lr(e,t,n){if(n&&!kt(n))return 0;if(typeof e==`number`)return e;if(typeof e==`function`){let n=e();return typeof n==`number`?n:n?.[t]}return e?.[t]}function ur(e){return typeof e==`function`?e():e}function dr(e,t){t===void 0&&(t={});let{open:n,onOpenChange:r,dataRef:i,events:a,elements:o}=e,{enabled:s=!0,delay:c=0,handleClose:l=null,mouseOnly:u=!1,restMs:d=0,move:f=!0}=t,p=Wr(),m=Ur(),h=At(l),g=At(c),_=At(n),v=At(d),y=Q.useRef(),b=Q.useRef(-1),x=Q.useRef(),S=Q.useRef(-1),C=Q.useRef(!0),w=Q.useRef(!1),T=Q.useRef(()=>{}),E=Q.useRef(!1),D=J(()=>{let e=i.current.openEvent?.type;return e?.includes(`mouse`)&&e!==`mousedown`});Q.useEffect(()=>{if(!s)return;function e(e){let{open:t}=e;t||(Z(b),Z(S),C.current=!0,E.current=!1)}return a.on(`openchange`,e),()=>{a.off(`openchange`,e)}},[s,a]),Q.useEffect(()=>{if(!s||!h.current||!n)return;function e(e){D()&&r(!1,e,`hover`)}let t=q(o.floating).documentElement;return t.addEventListener(`mouseleave`,e),()=>{t.removeEventListener(`mouseleave`,e)}},[o.floating,n,r,s,h,D]);let O=Q.useCallback(function(e,t,n){t===void 0&&(t=!0),n===void 0&&(n=`hover`);let i=lr(g.current,`close`,y.current);i&&!x.current?(Z(b),b.current=window.setTimeout(()=>r(!1,e,n),i)):t&&(Z(b),r(!1,e,n))},[g,r]),k=J(()=>{T.current(),x.current=void 0}),A=J(()=>{if(w.current){let e=q(o.floating).body;e.style.pointerEvents=``,e.removeAttribute(Gr),w.current=!1}}),j=J(()=>i.current.openEvent?[`click`,`mousedown`].includes(i.current.openEvent.type):!1);Q.useEffect(()=>{if(!s)return;function e(e){if(Z(b),C.current=!1,u&&!kt(y.current)||ur(v.current)>0&&!lr(g.current,`open`))return;let t=lr(g.current,`open`,y.current);t?b.current=window.setTimeout(()=>{_.current||r(!0,e,`hover`)},t):n||r(!0,e,`hover`)}function t(e){if(j()){A();return}T.current();let t=q(o.floating);if(Z(S),E.current=!1,h.current&&i.current.floatingContext){n||Z(b),x.current=h.current({...i.current.floatingContext,tree:p,x:e.clientX,y:e.clientY,onClose(){A(),k(),j()||O(e,!0,`safe-polygon`)}});let r=x.current;t.addEventListener(`mousemove`,r),T.current=()=>{t.removeEventListener(`mousemove`,r)};return}(y.current!==`touch`||!St(o.floating,e.relatedTarget))&&O(e)}function a(e){j()||i.current.floatingContext&&(h.current==null||h.current({...i.current.floatingContext,tree:p,x:e.clientX,y:e.clientY,onClose(){A(),k(),j()||O(e)}})(e))}function c(){Z(b)}function l(e){j()||O(e,!1)}if(I(o.domReference)){let r=o.domReference,i=o.floating;return n&&r.addEventListener(`mouseleave`,a),f&&r.addEventListener(`mousemove`,e,{once:!0}),r.addEventListener(`mouseenter`,e),r.addEventListener(`mouseleave`,t),i&&(i.addEventListener(`mouseleave`,a),i.addEventListener(`mouseenter`,c),i.addEventListener(`mouseleave`,l)),()=>{n&&r.removeEventListener(`mouseleave`,a),f&&r.removeEventListener(`mousemove`,e),r.removeEventListener(`mouseenter`,e),r.removeEventListener(`mouseleave`,t),i&&(i.removeEventListener(`mouseleave`,a),i.removeEventListener(`mouseenter`,c),i.removeEventListener(`mouseleave`,l))}}},[o,s,e,u,f,O,k,A,r,n,_,p,g,h,i,j,v]),Y(()=>{var e;if(s&&n&&(e=h.current)!=null&&(e=e.__options)!=null&&e.blockPointerEvents&&D()){w.current=!0;let e=o.floating;if(I(o.domReference)&&e){var t;let n=q(o.floating).body;n.setAttribute(Gr,``);let r=o.domReference,i=p==null||(t=p.nodesRef.current.find(e=>e.id===m))==null||(t=t.context)==null?void 0:t.elements.floating;return i&&(i.style.pointerEvents=``),n.style.pointerEvents=`none`,r.style.pointerEvents=`auto`,e.style.pointerEvents=`auto`,()=>{n.style.pointerEvents=``,r.style.pointerEvents=``,e.style.pointerEvents=``}}}},[s,n,m,o,p,h,D]),Y(()=>{n||(y.current=void 0,E.current=!1,k(),A())},[n,k,A]),Q.useEffect(()=>()=>{k(),Z(b),Z(S),A()},[s,o.domReference,k,A]);let M=Q.useMemo(()=>{function e(e){y.current=e.pointerType}return{onPointerDown:e,onPointerEnter:e,onMouseMove(e){let{nativeEvent:t}=e;function i(){!C.current&&!_.current&&r(!0,t,`hover`)}u&&!kt(y.current)||n||ur(v.current)===0||E.current&&e.movementX**2+e.movementY**2<2||(Z(S),y.current===`touch`?i():(E.current=!0,S.current=window.setTimeout(i,ur(v.current))))}}},[u,r,n,_,v]);return Q.useMemo(()=>s?{reference:M}:{},[s,M])}function fr(e){e===void 0&&(e={});let{id:t,root:n}=e,r=Br(),i=Zr(),[a,o]=Q.useState(null),s=Q.useRef(null);return Y(()=>()=>{a?.remove(),queueMicrotask(()=>{s.current=null})},[a]),Y(()=>{if(!r||s.current)return;let e=t?document.getElementById(t):null;if(!e)return;let n=document.createElement(`div`);n.id=r,n.setAttribute(Xr,``),e.appendChild(n),s.current=n,o(n)},[t,r]),Y(()=>{if(n===null||!r||s.current)return;let e=n||i?.portalNode;e&&!ie(e)&&(e=e.current),e||=document.body;let a=null;t&&(a=document.createElement(`div`),a.id=t,e.appendChild(a));let c=document.createElement(`div`);c.id=r,c.setAttribute(Xr,``),e=a||e,e.appendChild(c),s.current=c,o(c)},[t,n,r,i]),a}function pr(e){let{children:t,id:n,root:r,preserveTabOrder:i=!0}=e,a=fr({id:n,root:r}),[o,s]=Q.useState(null),c=Q.useRef(null),l=Q.useRef(null),u=Q.useRef(null),d=Q.useRef(null),f=o?.modal,p=o?.open,m=!!o&&!o.modal&&o.open&&i&&!!(r||a);return Q.useEffect(()=>{if(!a||!i||f)return;function e(e){a&&Pt(e)&&(e.type===`focusin`?It:Ft)(a)}return a.addEventListener(`focusin`,e,!0),a.addEventListener(`focusout`,e,!0),()=>{a.removeEventListener(`focusin`,e,!0),a.removeEventListener(`focusout`,e,!0)}},[a,i,f]),Q.useEffect(()=>{a&&(p||It(a))},[p,a]),(0,Tr.jsxs)(Yr.Provider,{value:Q.useMemo(()=>({preserveTabOrder:i,beforeOutsideRef:c,afterOutsideRef:l,beforeInsideRef:u,afterInsideRef:d,portalNode:a,setFocusManagerState:s}),[i,a]),children:[m&&a&&(0,Tr.jsx)(qr,{"data-type":`outside`,ref:c,onFocus:e=>{if(Pt(e,a)){var t;(t=u.current)==null||t.focus()}else Nt(o?o.domReference:null)?.focus()}}),m&&a&&(0,Tr.jsx)(`span`,{"aria-owns":a.id,style:Jr}),a&&Er.createPortal(t,a),m&&a&&(0,Tr.jsx)(qr,{"data-type":`outside`,ref:l,onFocus:e=>{if(Pt(e,a)){var t;(t=d.current)==null||t.focus()}else Mt(o?o.domReference:null)?.focus(),o!=null&&o.closeOnFocusOut&&o?.onOpenChange(!1,e.nativeEvent,`focus-out`)}})]})}function mr(e){return L(e.target)&&e.target.tagName===`BUTTON`}function hr(e){return L(e.target)&&e.target.tagName===`A`}function gr(e){return Et(e)}function _r(e,t){t===void 0&&(t={});let{open:n,onOpenChange:r,dataRef:i,elements:{domReference:a}}=e,{enabled:o=!0,event:s=`click`,toggle:c=!0,ignoreMouse:l=!1,keyboardHandlers:u=!0,stickIfOpen:d=!0}=t,f=Q.useRef(),p=Q.useRef(!1),m=Q.useMemo(()=>({onPointerDown(e){f.current=e.pointerType},onMouseDown(e){let t=f.current;e.button===0&&s!==`click`&&(kt(t,!0)&&l||(n&&c&&(!(i.current.openEvent&&d)||i.current.openEvent.type===`mousedown`)?r(!1,e.nativeEvent,`click`):(e.preventDefault(),r(!0,e.nativeEvent,`click`))))},onClick(e){let t=f.current;if(s===`mousedown`&&f.current){f.current=void 0;return}kt(t,!0)&&l||(n&&c&&(!(i.current.openEvent&&d)||i.current.openEvent.type===`click`)?r(!1,e.nativeEvent,`click`):r(!0,e.nativeEvent,`click`))},onKeyDown(e){f.current=void 0,!(e.defaultPrevented||!u||mr(e))&&(e.key===` `&&!gr(a)&&(e.preventDefault(),p.current=!0),!hr(e)&&e.key===`Enter`&&r(!(n&&c),e.nativeEvent,`click`))},onKeyUp(e){e.defaultPrevented||!u||mr(e)||gr(a)||e.key===` `&&p.current&&(p.current=!1,r(!(n&&c),e.nativeEvent,`click`))}}),[i,a,s,l,u,r,n,d,c]);return Q.useMemo(()=>o?{reference:m}:{},[o,m])}function vr(e,t){t===void 0&&(t={});let{open:n,onOpenChange:r,elements:i,dataRef:a}=e,{enabled:o=!0,escapeKey:s=!0,outsidePress:c=!0,outsidePressEvent:l=`pointerdown`,referencePress:u=!1,referencePressEvent:d=`pointerdown`,ancestorScroll:f=!1,bubbles:p,capture:m}=t,h=Wr(),g=J(typeof c==`function`?c:()=>!1),_=typeof c==`function`?g:c,v=Q.useRef(!1),{escapeKey:y,outsidePress:b}=ei(p),{escapeKey:x,outsidePress:S}=ei(m),C=Q.useRef(!1),w=J(e=>{if(!n||!o||!s||e.key!==`Escape`||C.current)return;let t=a.current.floatingContext?.nodeId,i=h?Dt(h.nodesRef.current,t):[];if(!y&&(e.stopPropagation(),i.length>0)){let e=!0;if(i.forEach(t=>{var n;if((n=t.context)!=null&&n.open&&!t.context.dataRef.current.__escapeKeyBubbles){e=!1;return}}),!e)return}r(!1,Ot(e)?e.nativeEvent:e,`escape-key`)}),T=J(e=>{var t;let n=()=>{var t;w(e),(t=Ct(e))==null||t.removeEventListener(`keydown`,n)};(t=Ct(e))==null||t.addEventListener(`keydown`,n)}),E=J(e=>{let t=a.current.insideReactTree;a.current.insideReactTree=!1;let n=v.current;if(v.current=!1,l===`click`&&n||t||typeof _==`function`&&!_(e))return;let o=Ct(e),s=`[`+cr(`inert`)+`]`,c=q(i.floating).querySelectorAll(s),u=I(o)?o:null;for(;u&&!R(u);){let e=B(u);if(R(e)||!I(e))break;u=e}if(c.length&&I(o)&&!Tt(o)&&!St(o,i.floating)&&Array.from(c).every(e=>!St(u,e)))return;if(L(o)&&k){let t=R(o),n=z(o),r=/auto|scroll/,i=t||r.test(n.overflowX),a=t||r.test(n.overflowY),s=i&&o.clientWidth>0&&o.scrollWidth>o.clientWidth,c=a&&o.clientHeight>0&&o.scrollHeight>o.clientHeight,l=n.direction===`rtl`,u=c&&(l?e.offsetX<=o.offsetWidth-o.clientWidth:e.offsetX>o.clientWidth),d=s&&e.offsetY>o.clientHeight;if(u||d)return}let d=a.current.floatingContext?.nodeId,f=h&&Dt(h.nodesRef.current,d).some(t=>wt(e,t.context?.elements.floating));if(wt(e,i.floating)||wt(e,i.domReference)||f)return;let p=h?Dt(h.nodesRef.current,d):[];if(p.length>0){let e=!0;if(p.forEach(t=>{var n;if((n=t.context)!=null&&n.open&&!t.context.dataRef.current.__outsidePressBubbles){e=!1;return}}),!e)return}r(!1,e,`outside-press`)}),D=J(e=>{var t;let n=()=>{var t;E(e),(t=Ct(e))==null||t.removeEventListener(l,n)};(t=Ct(e))==null||t.addEventListener(l,n)});Q.useEffect(()=>{if(!n||!o)return;a.current.__escapeKeyBubbles=y,a.current.__outsidePressBubbles=b;let e=-1;function t(e){r(!1,e,`ancestor-scroll`)}function c(){window.clearTimeout(e),C.current=!0}function u(){e=window.setTimeout(()=>{C.current=!1},de()?5:0)}let d=q(i.floating);s&&(d.addEventListener(`keydown`,x?T:w,x),d.addEventListener(`compositionstart`,c),d.addEventListener(`compositionend`,u)),_&&d.addEventListener(l,S?D:E,S);let p=[];return f&&(I(i.domReference)&&(p=V(i.domReference)),I(i.floating)&&(p=p.concat(V(i.floating))),!I(i.reference)&&i.reference&&i.reference.contextElement&&(p=p.concat(V(i.reference.contextElement)))),p=p.filter(e=>e!==d.defaultView?.visualViewport),p.forEach(e=>{e.addEventListener(`scroll`,t,{passive:!0})}),()=>{s&&(d.removeEventListener(`keydown`,x?T:w,x),d.removeEventListener(`compositionstart`,c),d.removeEventListener(`compositionend`,u)),_&&d.removeEventListener(l,S?D:E,S),p.forEach(e=>{e.removeEventListener(`scroll`,t)}),window.clearTimeout(e)}},[a,i,s,_,l,n,r,f,o,y,b,w,x,T,E,S,D]),Q.useEffect(()=>{a.current.insideReactTree=!1},[a,_,l]);let O=Q.useMemo(()=>({onKeyDown:w,...u&&{[Qr[d]]:e=>{r(!1,e.nativeEvent,`reference-press`)},...d!==`click`&&{onClick(e){r(!1,e.nativeEvent,`reference-press`)}}}}),[w,r,u,d]),k=Q.useMemo(()=>{function e(e){e.button===0&&(v.current=!0)}return{onKeyDown:w,onMouseDown:e,onMouseUp:e,[$r[l]]:()=>{a.current.insideReactTree=!0}}},[w,l,a]);return Q.useMemo(()=>o?{reference:O,floating:k}:{},[o,O,k])}function yr(e){let{open:t=!1,onOpenChange:n,elements:r}=e,i=Br(),a=Q.useRef({}),[o]=Q.useState(()=>sr()),s=Ur()!=null,[c,l]=Q.useState(r.reference),u=J((e,t,r)=>{a.current.openEvent=e?t:void 0,o.emit(`openchange`,{open:e,event:t,reason:r,nested:s}),n?.(e,t,r)}),d=Q.useMemo(()=>({setPositionReference:l}),[]),f=Q.useMemo(()=>({reference:c||r.reference||null,floating:r.floating||null,domReference:r.reference}),[c,r.reference,r.floating]);return Q.useMemo(()=>({dataRef:a,open:t,onOpenChange:u,elements:f,events:o,floatingId:i,refs:d}),[t,u,f,o,i,d])}function br(e){e===void 0&&(e={});let{nodeId:t}=e,n=yr({...e,elements:{reference:null,floating:null,...e.elements}}),r=e.rootContext||n,i=r.elements,[a,o]=Q.useState(null),[s,c]=Q.useState(null),l=i?.domReference||a,u=Q.useRef(null),d=Wr();Y(()=>{l&&(u.current=l)},[l]);let f=Jn({...e,elements:{...i,...s&&{reference:s}}}),p=Q.useCallback(e=>{let t=I(e)?{getBoundingClientRect:()=>e.getBoundingClientRect(),getClientRects:()=>e.getClientRects(),contextElement:e}:e;c(t),f.refs.setReference(t)},[f.refs]),m=Q.useCallback(e=>{(I(e)||e===null)&&(u.current=e,o(e)),(I(f.refs.reference.current)||f.refs.reference.current===null||e!==null&&!I(e))&&f.refs.setReference(e)},[f.refs]),h=Q.useMemo(()=>({...f.refs,setReference:m,setPositionReference:p,domReference:u}),[f.refs,m,p]),g=Q.useMemo(()=>({...f.elements,domReference:l}),[f.elements,l]),_=Q.useMemo(()=>({...f,...r,refs:h,elements:g,nodeId:t}),[f,h,g,t,r]);return Y(()=>{r.dataRef.current.floatingContext=_;let e=d?.nodesRef.current.find(e=>e.id===t);e&&(e.context=_)}),Q.useMemo(()=>({...f,context:_,refs:h,elements:g}),[f,h,g,_])}function xr(e,t,n){let r=new Map,i=n===`item`,a=e;if(i&&e){let{[Or]:t,[kr]:n,...r}=e;a=r}return{...n===`floating`&&{tabIndex:-1,[Dr]:``},...a,...t.map(t=>{let r=t?t[n]:null;return typeof r==`function`?e?r(e):null:r}).concat(e).reduce((e,t)=>(t&&Object.entries(t).forEach(t=>{let[n,a]=t;if(!(i&&[Or,kr].includes(n)))if(n.indexOf(`on`)===0){if(r.has(n)||r.set(n,[]),typeof a==`function`){var o;(o=r.get(n))==null||o.push(a),e[n]=function(){var e=[...arguments];return r.get(n)?.map(t=>t(...e)).find(e=>e!==void 0)}}}else e[n]=a}),e),{})}}function Sr(e){e===void 0&&(e=[]);let t=e.map(e=>e?.reference),n=e.map(e=>e?.floating),r=e.map(e=>e?.item),i=Q.useCallback(t=>xr(t,e,`reference`),t),a=Q.useCallback(t=>xr(t,e,`floating`),n),o=Q.useCallback(t=>xr(t,e,`item`),r);return Q.useMemo(()=>({getReferenceProps:i,getFloatingProps:a,getItemProps:o}),[i,a,o])}function Cr(e,t){let[n,r]=Q.useState(e);return e&&!n&&r(!0),Q.useEffect(()=>{if(!e&&n){let e=setTimeout(()=>r(!1),t);return()=>clearTimeout(e)}},[e,n,t]),n}function wr(e,t){t===void 0&&(t={});let{open:n,elements:{floating:r}}=e,{duration:i=250}=t,a=(typeof i==`number`?i:i.close)||0,[o,s]=Q.useState(`unmounted`),c=Cr(n,a);return!c&&o===`close`&&s(`unmounted`),Y(()=>{if(r){if(n){s(`initial`);let e=requestAnimationFrame(()=>{Er.flushSync(()=>{s(`open`)})});return()=>{cancelAnimationFrame(e)}}s(`close`)}},[n,r]),{isMounted:c,status:o}}var Q,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti=t((()=>{Q=e(n(),1),Ut(),Tr=s(),ve(),Er=e(r(),1),ar(),Dr=`data-floating-ui-focusable`,Or=`active`,kr=`selected`,Ar=`ArrowLeft`,jr=`ArrowRight`,Mr=`ArrowUp`,Nr=`ArrowDown`,Pr=[Ar,jr],Fr=[Mr,Nr],[...Pr,...Fr],Ir={...Q},Lr=!1,Rr=0,zr=()=>`floating-ui-`+Math.random().toString(36).slice(2,6)+ Rr++,Br=Ir.useId||or,Vr=Q.createContext(null),Hr=Q.createContext(null),Ur=()=>Q.useContext(Vr)?.id||null,Wr=()=>Q.useContext(Hr),Gr=cr(`safe-polygon`),Kr={border:0,clip:`rect(0 0 0 0)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`fixed`,whiteSpace:`nowrap`,width:`1px`,top:0,left:0},qr=Q.forwardRef(function(e,t){let[n,r]=Q.useState();Y(()=>{bt()&&r(`button`)},[]);let i={ref:t,tabIndex:0,role:n,"aria-hidden":n?void 0:!0,[cr(`focus-guard`)]:``,style:Kr};return(0,Tr.jsx)(`span`,{...e,...i})}),Jr={clipPath:`inset(50%)`,position:`fixed`,top:0,left:0},Yr=Q.createContext(null),Xr=cr(`portal`),Zr=()=>Q.useContext(Yr),Qr={pointerdown:`onPointerDown`,mousedown:`onMouseDown`,click:`onClick`},$r={pointerdown:`onPointerDownCapture`,mousedown:`onMouseDownCapture`,click:`onClickCapture`},ei=e=>({escapeKey:typeof e==`boolean`?e:e?.escapeKey??!1,outsidePress:typeof e==`boolean`?e:e?.outsidePress??!0})})),ni,ri,ii,ai=t((()=>{ni=e(n(),1),ri={top:[`top-start`,`top-end`,`bottom`,`right`,`left`],"top-start":[`top`,`top-end`,`right-start`,`left-start`,`bottom-start`],"top-end":[`top`,`top-start`,`right-end`,`left-end`,`bottom-end`],right:[`right-start`,`right-end`,`bottom`,`top`,`left`],"right-start":[`right`,`right-end`,`bottom-start`,`top-start`,`left-start`],"right-end":[`right`,`right-start`,`bottom-end`,`top-end`,`left-end`],bottom:[`bottom-start`,`bottom-end`,`top`,`right`,`left`],"bottom-start":[`bottom`,`bottom-end`,`right-start`,`left-start`,`top-start`],"bottom-end":[`bottom`,`bottom-start`,`right-end`,`left-end`,`top-end`],left:[`left-start`,`left-end`,`bottom`,`top`,`right`],"left-start":[`left`,`left-end`,`bottom-start`,`top-start`,`right-start`],"left-end":[`left`,`left-start`,`bottom-end`,`top-end`,`right-end`]},ii=e=>{let{placement:t,fallbackPlacements:n}=e;return(0,ni.useMemo)(()=>n&&n.length>0?n:ri[t],[n,t])}})),oi,si,ci=t((()=>{oi=e(n(),1),si=e=>{let[t,n]=(0,oi.useState)(!1),r=e.open!==void 0;return[r?e.open:t,t=>{if(r){e.setOpen?.(t);return}n(t)}]}})),li=t((()=>{ai(),ci()})),ui,di,fi=t((()=>{a(),ui=o.div`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;

  ${({$arrow:e,$placement:t})=>{let n=((e||`pointed`)===`flattened`?30:16)/2,[r,a]=t.split(`-`);if(r===`top`||r===`bottom`)return i`
        ${r===`top`?i`
              bottom: 0;
              &::before {
                content: '';
                position: absolute;
                left: -${n}px;
                border-left: ${n}px solid transparent;
                border-right: ${n}px solid transparent;
                border-top: ${6}px solid var(--tooltip-border);
              }
              &::after {
                content: '';
                position: absolute;
                left: -${n-1}px;
                top: -${1}px;
                border-left: ${n-1}px solid transparent;
                border-right: ${n-1}px solid transparent;
                border-top: ${5}px solid var(--tooltip-bg);
              }
            `:i`
              top: -${6}px;
              &::before {
                content: '';
                position: absolute;
                left: -${n}px;
                border-left: ${n}px solid transparent;
                border-right: ${n}px solid transparent;
                border-bottom: ${6}px solid var(--tooltip-border);
              }
              &::after {
                content: '';
                position: absolute;
                left: -${n-1}px;
                top: ${1}px;
                border-left: ${n-1}px solid transparent;
                border-right: ${n-1}px solid transparent;
                border-bottom: ${5}px solid var(--tooltip-bg);
              }
            `}
        ${a===`start`?i`
              left: ${n}px;
              margin-left: ${6}px;
            `:a===`end`?i`
              right: ${n}px;
              margin-right: ${6}px;
            `:i`
              left: 50%;
            `}
      `;let o=r===`left`?i`
            right: 0;
            &::before {
              content: '';
              position: absolute;
              top: -${n}px;
              border-top: ${n}px solid transparent;
              border-bottom: ${n}px solid transparent;
              border-left: ${6}px solid var(--tooltip-border);
            }
            &::after {
              content: '';
              position: absolute;
              top: -${n-1}px;
              left: -${1}px;
              border-top: ${n-1}px solid transparent;
              border-bottom: ${n-1}px solid transparent;
              border-left: ${5}px solid var(--tooltip-bg);
            }
          `:i`
            left: -${6}px;
            &::before {
              content: '';
              position: absolute;
              top: -${n}px;
              border-top: ${n}px solid transparent;
              border-bottom: ${n}px solid transparent;
              border-right: ${6}px solid var(--tooltip-border);
            }
            &::after {
              content: '';
              position: absolute;
              top: -${n-1}px;
              left: ${1}px;
              border-top: ${n-1}px solid transparent;
              border-bottom: ${n-1}px solid transparent;
              border-right: ${5}px solid var(--tooltip-bg);
            }
          `;return a===`start`?i`
        top: ${n}px;
        margin-top: ${6}px;
        ${o}
      `:a===`end`?i`
        bottom: ${n}px;
        margin-bottom: ${6}px;
        ${o}
      `:i`
      top: 50%;
      ${o}
    `}}
`,di=o.div`
  ${({theme:e})=>e.useTypography(`p`)}

  ${({theme:e,$background:t,$placement:n})=>{let[r]=n.split(`-`),[a,o,s,c]=t===`light`?[e.colors.white,e.colors.greyishBlue,`#eeeeee`,5]:[e.colors.greyishBlue,e.colors.white,e.colors.greyishBlue,0],l={top:[0,-4],bottom:[0,4],right:[4,0],left:[-4,0]}[r]||[0,4];return i`
      --tooltip-bg: ${a};
      --tooltip-border: ${s};
      border: 1px solid ${s};
      border-radius: ${c}px;
      box-shadow: ${l[0]}px ${l[1]}px 10px
        ${e.getColor(`black`,10)};
      color: ${o};

      &,
      & ${ui} {
        background-color: ${a};
      }
    `}}

  padding: ${({theme:e})=>e.spacings.s3};
`})),pi,mi,hi,gi,_i,vi=t((()=>{pi=e(n(),1),ti(),li(),fi(),mi=s(),hi=(...e)=>t=>{e.forEach(e=>{e&&(typeof e==`function`?e(t):e.current=t)})},gi=e=>{let{content:t,renderTrigger:n,triggerProps:r,on:i=`hover`,placement:a,offset:o=8,shift:s=8,background:c=`dark`,closeOnClip:l=!1,zIndex:u=1e3}=e,d=e.arrow||(c===`dark`?`pointed`:`flattened`),f=d!==`none`,[p,m]=si(e),[h,g]=(0,pi.useState)(null),_=ii(e),v=br({open:p,onOpenChange:m,placement:a,whileElementsMounted:jn,middleware:[$n(o),tr({fallbackPlacements:_,padding:s}),er({padding:s}),...f?[ir({element:h})]:[],...l?[rr(),{name:`closeOnClip`,fn(e){return e.middlewareData.hide?.referenceHidden&&m(!1),{}}}]:[]]}),{refs:y,floatingStyles:b,placement:x}=v,S=(0,pi.useCallback)(e=>{y.setFloating(e)},[y]),C=Sr([dr(v.context,{move:!1,enabled:i===`hover`}),_r(v.context,{enabled:i===`click`}),vr(v.context,{outsidePressEvent:`mousedown`,escapeKey:!0,enabled:i===`click`})]),w=(0,pi.useMemo)(()=>{let{ref:e,...t}=r||{};return C.getReferenceProps({...t,ref:hi(y.setReference,e)})},[C,y.setReference,r]);return(0,mi.jsxs)(pi.Fragment,{children:[n(w),p?(0,mi.jsx)(pr,{children:(0,mi.jsxs)(di,{ref:S,style:{...b,zIndex:u},$placement:x,$background:c,...C.getFloatingProps(),children:[f?(0,mi.jsx)(ui,{ref:g,$arrow:d,$placement:x}):null,(0,mi.jsx)(t,{})]})}):null]})},_i=(({enabled:e,...t})=>e===!1?t.renderTrigger(t.triggerProps||{}):(0,mi.jsx)(gi,{...t})),_i.__docgenInfo={description:``,methods:[],displayName:`Popup`,props:{content:{required:!0,tsType:{name:`ReactFunctionComponent`,raw:`React.FunctionComponent`},description:``},placement:{required:!0,tsType:{name:`union`,raw:`| 'top'
| 'top-start'
| 'top-end'
| 'right'
| 'right-start'
| 'right-end'
| 'bottom'
| 'bottom-start'
| 'bottom-end'
| 'left'
| 'left-start'
| 'left-end'`,elements:[{name:`literal`,value:`'top'`},{name:`literal`,value:`'top-start'`},{name:`literal`,value:`'top-end'`},{name:`literal`,value:`'right'`},{name:`literal`,value:`'right-start'`},{name:`literal`,value:`'right-end'`},{name:`literal`,value:`'bottom'`},{name:`literal`,value:`'bottom-start'`},{name:`literal`,value:`'bottom-end'`},{name:`literal`,value:`'left'`},{name:`literal`,value:`'left-start'`},{name:`literal`,value:`'left-end'`}]},description:``},on:{required:!1,tsType:{name:`union`,raw:`'hover' | 'click'`,elements:[{name:`literal`,value:`'hover'`},{name:`literal`,value:`'click'`}]},description:``},triggerType:{required:!1,tsType:{name:`T`},description:``},triggerProps:{required:!1,tsType:{name:`ReactComponentPropsWithRef`,raw:`React.ComponentPropsWithRef<T>`,elements:[{name:`T`}]},description:``},renderTrigger:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(props: React.ComponentPropsWithRef<T>) => React.ReactNode`,signature:{arguments:[{type:{name:`ReactComponentPropsWithRef`,raw:`React.ComponentPropsWithRef<T>`,elements:[{name:`T`}]},name:`props`}],return:{name:`ReactReactNode`,raw:`React.ReactNode`}}},description:``},offset:{required:!1,tsType:{name:`number`},description:``},shift:{required:!1,tsType:{name:`number`},description:``},background:{required:!1,tsType:{name:`union`,raw:`'light' | 'dark'`,elements:[{name:`literal`,value:`'light'`},{name:`literal`,value:`'dark'`}]},description:``},arrow:{required:!1,tsType:{name:`union`,raw:`'flattened' | 'pointed' | 'none'`,elements:[{name:`literal`,value:`'flattened'`},{name:`literal`,value:`'pointed'`},{name:`literal`,value:`'none'`}]},description:``},closeOnClip:{required:!1,tsType:{name:`boolean`},description:``},open:{required:!1,tsType:{name:`boolean`},description:``},setOpen:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(open: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``},fallbackPlacements:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`| 'top'
| 'top-start'
| 'top-end'
| 'right'
| 'right-start'
| 'right-end'
| 'bottom'
| 'bottom-start'
| 'bottom-end'
| 'left'
| 'left-start'
| 'left-end'`,elements:[{name:`literal`,value:`'top'`},{name:`literal`,value:`'top-start'`},{name:`literal`,value:`'top-end'`},{name:`literal`,value:`'right'`},{name:`literal`,value:`'right-start'`},{name:`literal`,value:`'right-end'`},{name:`literal`,value:`'bottom'`},{name:`literal`,value:`'bottom-start'`},{name:`literal`,value:`'bottom-end'`},{name:`literal`,value:`'left'`},{name:`literal`,value:`'left-start'`},{name:`literal`,value:`'left-end'`}]}],raw:`PopupPlacement[]`},description:``},zIndex:{required:!1,tsType:{name:`number`},description:``},enabled:{required:!1,tsType:{name:`boolean`},description:``}}}})),yi,bi=t((()=>{a(),p(),yi=o.div`
  ${({theme:e,$fluid:t,$spacing:n})=>{let r=h(n||`0`,{top:`0`,right:`0`,bottom:`0`,left:`0`}).split(` `);return r[1]=t?`0`:`calc(${e.spacings.s1} * 1.5)`,i`
      padding: ${r.join(` `)};
    `}}

  ${({theme:e,$background:t})=>{if(!t)return;let n=Array.isArray(t)?t:[t],r=e.getColor(...n);return i`
      background-color: ${r};
      &:after {
        background-color: ${r};
      }
    `}}

  display: flex;
  flex-direction: column;

  position: relative;

  &:after {
    content: '';
    width: ${({theme:e})=>`calc(${e.spacings.s1} * .5)`};
    height: 100%;

    position: absolute;
    top: 0;
    left: 100%;
  }
`})),xi,Si=t((()=>{a(),xi=o.div`
  ${({theme:e})=>e.useTypography(`p`)};

  padding-right: calc(${({theme:e})=>e.spacings.s1} / 2);
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`})),Ci,wi=t((()=>{a(),p(),Ci=o.div`
  overflow-y: scroll;
  overflow-y: overlay;
  width: 100%;
  position: relative;

  flex: 1;
  display: flex;
  flex-direction: column;

  ${({$height:e,$maxHeight:t})=>e?i`
        min-height: ${e};
        max-height: ${t||e};
      `:i`
      max-height: ${t||`100%`};
    `};

  scrollbar-color: ${({theme:e})=>`${e.colors.grey} ${e.colors.white}`};
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({theme:e})=>e.colors.grey};
  }
  &::-webkit-scrollbar-track {
    background: ${({theme:e})=>e.colors.white};
  }

  ${({$spacing:e,theme:t})=>{let n=h(e||`0`,`0`).split(` `);return i`
      padding: ${n[0]} calc(${t.spacings.s1} * 1.5) ${n[2]}
        ${n[3]};
    `}};
`})),Ti,Ei=t((()=>{a(),Ti=o.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`})),Di=t((()=>{bi(),Si(),wi(),Ei()})),Oi,ki,Ai,ji,Mi,Ni=t((()=>{Oi=e(n(),1),p(),_(),Di(),ki=s(),Ai=e=>!Oi.isValidElement(e),ji=e=>{if(!e)return null;if(!Ai(e))return(0,ki.jsx)(yi,{children:e});let t=g(e,[`fluid`,`background`,`spacing`],{$fluid:e.fluid,$background:e.background,$spacing:e.spacing});return(0,ki.jsx)(yi,{...t})},Mi=Oi.forwardRef((e,t)=>{let{loading:n}=e,r=e.onScrollEnd||(()=>{}),[,i]=(0,Oi.useState)(new Date),a=e=>{if(e.target!==e.currentTarget)return;let t=e.nativeEvent.target;if(!t)return;let n=t.scrollHeight-t.getBoundingClientRect().height-10,a=t.scrollTop;n>0&&a>=n&&i(t=>{let n=new Date;return Math.abs((n.getTime()-t.getTime())/1e3)<.5?t:(r(e),n)})},o=e.onScroll||(()=>{}),s=g(e,[`onScrollEnd`,`before`,`after`,`loading`,`height`,`maxHeight`,`spacing`,`empty`],{$height:e.height,$maxHeight:e.maxHeight,$spacing:e.spacing});return(0,ki.jsxs)(xi,{children:[ji(e.before),(0,ki.jsxs)(Ti,{children:[(0,ki.jsx)(Ci,{ref:t,...s,onScroll:e=>{o(e),a(e)},...e.empty&&e.empty.empty?{children:e.empty.content}:{}}),n&&(0,ki.jsx)(v,{filled:!0,...n===!0?{}:n})]}),ji(e.after)]})}),Mi.displayName=`ScrollContainer`,Mi.__docgenInfo={description:``,methods:[],displayName:`ScrollContainer`,props:{height:{required:!1,tsType:{name:`string`},description:``},maxHeight:{required:!1,tsType:{name:`string`},description:``},spacing:{required:!1,tsType:{name:`union`,raw:`SpacingOrZero | Omit<Spacings, 'right'>`,elements:[{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1},{name:`Omit`,elements:[{name:`signature`,type:`object`,raw:`{
  top?: SpacingOrZero
  left?: SpacingOrZero
  bottom?: SpacingOrZero
  right?: SpacingOrZero
}`,signature:{properties:[{key:`top`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`left`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`bottom`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`right`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}}]}},{name:`literal`,value:`'right'`}],raw:`Omit<Spacings, 'right'>`}]},description:``},onScrollEnd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  event: React.UIEvent<HTMLDivElement, UIEvent>,
) => void | Promise<void>`,signature:{arguments:[{type:{name:`ReactUIEvent`,raw:`React.UIEvent<HTMLDivElement, UIEvent>`,elements:[{name:`HTMLDivElement`},{name:`UIEvent`}]},name:`event`}],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:``},before:{required:!1,tsType:{name:`union`,raw:`ReactNode | AfterBefore`,elements:[{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!0},{name:`intersection`,raw:`React.HTMLAttributes<HTMLDivElement> & {
  fluid?: true
  background?:
    | Parameters<ThemeInterface['getColor']>
    | Parameters<ThemeInterface['getColor']>[0]
  spacing?: SpacingOrZero | Omit<Spacings, 'right'>
  children: ReactNode
}`,elements:[{name:`ReactHTMLAttributes`,raw:`React.HTMLAttributes<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},{name:`signature`,type:`object`,raw:`{
  fluid?: true
  background?:
    | Parameters<ThemeInterface['getColor']>
    | Parameters<ThemeInterface['getColor']>[0]
  spacing?: SpacingOrZero | Omit<Spacings, 'right'>
  children: ReactNode
}`,signature:{properties:[{key:`fluid`,value:{name:`literal`,value:`true`,required:!1}},{key:`background`,value:{name:`union`,raw:`| Parameters<ThemeInterface['getColor']>
| Parameters<ThemeInterface['getColor']>[0]`,elements:[{name:`Parameters`,elements:[{name:`ThemeInterface['getColor']`,raw:`ThemeInterface['getColor']`}],raw:`Parameters<ThemeInterface['getColor']>`},{name:`Parameters[0]`,raw:`Parameters<ThemeInterface['getColor']>[0]`}],required:!1}},{key:`spacing`,value:{name:`union`,raw:`SpacingOrZero | Omit<Spacings, 'right'>`,elements:[{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1},{name:`Omit`,elements:[{name:`signature`,type:`object`,raw:`{
  top?: SpacingOrZero
  left?: SpacingOrZero
  bottom?: SpacingOrZero
  right?: SpacingOrZero
}`,signature:{properties:[{key:`top`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`left`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`bottom`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`right`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}}]}},{name:`literal`,value:`'right'`}],raw:`Omit<Spacings, 'right'>`}],required:!1}},{key:`children`,value:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!0}}]}}]}]},description:``},after:{required:!1,tsType:{name:`union`,raw:`ReactNode | AfterBefore`,elements:[{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!0},{name:`intersection`,raw:`React.HTMLAttributes<HTMLDivElement> & {
  fluid?: true
  background?:
    | Parameters<ThemeInterface['getColor']>
    | Parameters<ThemeInterface['getColor']>[0]
  spacing?: SpacingOrZero | Omit<Spacings, 'right'>
  children: ReactNode
}`,elements:[{name:`ReactHTMLAttributes`,raw:`React.HTMLAttributes<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},{name:`signature`,type:`object`,raw:`{
  fluid?: true
  background?:
    | Parameters<ThemeInterface['getColor']>
    | Parameters<ThemeInterface['getColor']>[0]
  spacing?: SpacingOrZero | Omit<Spacings, 'right'>
  children: ReactNode
}`,signature:{properties:[{key:`fluid`,value:{name:`literal`,value:`true`,required:!1}},{key:`background`,value:{name:`union`,raw:`| Parameters<ThemeInterface['getColor']>
| Parameters<ThemeInterface['getColor']>[0]`,elements:[{name:`Parameters`,elements:[{name:`ThemeInterface['getColor']`,raw:`ThemeInterface['getColor']`}],raw:`Parameters<ThemeInterface['getColor']>`},{name:`Parameters[0]`,raw:`Parameters<ThemeInterface['getColor']>[0]`}],required:!1}},{key:`spacing`,value:{name:`union`,raw:`SpacingOrZero | Omit<Spacings, 'right'>`,elements:[{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1},{name:`Omit`,elements:[{name:`signature`,type:`object`,raw:`{
  top?: SpacingOrZero
  left?: SpacingOrZero
  bottom?: SpacingOrZero
  right?: SpacingOrZero
}`,signature:{properties:[{key:`top`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`left`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`bottom`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}},{key:`right`,value:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}],required:!1}}]}},{name:`literal`,value:`'right'`}],raw:`Omit<Spacings, 'right'>`}],required:!1}},{key:`children`,value:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!0}}]}}]}]},description:``},empty:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  empty: boolean
  content: ReactNode
}`,signature:{properties:[{key:`empty`,value:{name:`boolean`,required:!0}},{key:`content`,value:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!0}}]}},description:``},loading:{required:!1,tsType:{name:`union`,raw:`boolean | LoaderProps`,elements:[{name:`boolean`},{name:`LoaderProps`}]},description:``}}}})),Pi,Fi,Ii,Li=t((()=>{a(),c(),p(),te(),Pi=o.div`
  ${({theme:e})=>e.useTypography(`p`,{lineHeight:e.spacings.s3})}
  color: ${({theme:e})=>e.colors.darkBlue};
  display: flex;
  gap: ${({theme:e})=>e.spacings.s1};

  > :nth-child(1) {
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 100%;
  }

  ${({$disabled:e})=>e?i`
      pointer-events: none;
      opacity: 0.3;
    `:i`
        cursor: pointer;
      `};

  ${({$border:e,theme:t})=>{if(!e)return;let n=m(e);return l(n).filter(e=>n[e]!==void 0).map(e=>{let r=n[e];return i`
          border-${e}-width: ${r.width||`1px`};
          border-${e}-style: ${r.style||`solid`};
          border-${e}-color: ${d(t.colors,r.color)?t.colors[r.color]:r.color};
        `})}};

  &:hover {
    background-color: ${({theme:e})=>e.getColor(`blue`,15)};
  }

  ${({$highlighted:e})=>{if(e)return i`
      background-color: ${({theme:e})=>e.getColor(`blue`,15)};
    `}}
`,Fi=o.div`
  ${({theme:e})=>e.useTypography(`p`)};

  border-bottom: 1px solid ${({theme:e})=>e.colors.greyishBlue};
  margin: 14px;
  width: calc(100% - 28px);
`,Ii=o(ee)`
  display: flex;

  > div {
    display: flex;
    width: 100%;

    > div:nth-child(1) {
      background-color: ${({theme:e})=>e.colors.white};
      border-radius: 4px;

      ${({$containerSpacing:e,theme:t})=>{if(!e)return;let n=h(e),r=n.split(` `);return r[1]=`calc(${t.spacings.s1} / 2)`,n=r.join(` `),i`
          padding: ${n};
        `}}
    }

    ${({$bordered:e})=>{if(e)return i`
        ${Pi} {
          &:not(:last-child) {
            border-bottom: 1px solid
              ${({theme:e})=>e.getColor(`greyishBlue`,10)};
          }
        }
      `}}

    ${({$itemSpacing:e,theme:t})=>{if(!e)return i`
          ${Fi} {
            margin: ${t.spacings.s1} 0px ${t.spacings.s1}
              ${t.spacings.s1};
          }
        `;let n=h(e,{right:`0`});return i`
        ${Pi} {
          padding: ${n};
        }
        ${Fi} {
          margin: ${n};
        }
      `}}
  }
`})),Ri,$,zi,Bi,Vi,Hi=t((()=>{Ri=e(n(),1),p(),y(),vi(),Ni(),Li(),$=s(),zi=(e,t)=>{let n=t.scrollTop,r=n+t.offsetHeight,i=e.offsetTop;return i+e.offsetHeight<=r&&i>=n},Bi=(e,t)=>{let{close:n,options:r,children:i,highlight:a}={...e},[o,s]=(0,Ri.useState)(null);(0,Ri.useEffect)(()=>{if(!o||a===void 0)return;let e=o.children[a];e&&(zi(e,o)||o.scrollTo(0,e.offsetTop))},[a,o]);let c=g(e,[`after`,`before`,`bordered`,`children`,`close`,`containerSpacing`,`emptyContent`,`highlight`,`itemSpacing`,`loading`,`onScrollEnd`,`options`,`scrollSpacing`,`scrollTabIndex`]);return(0,$.jsx)(Ii,{...c,ref:t,$bordered:e.bordered,$containerSpacing:e.containerSpacing,$itemSpacing:e.itemSpacing,children:(0,$.jsxs)(Ri.Fragment,{children:[(0,$.jsx)(Mi,{ref:s,onScrollEnd:e.onScrollEnd,before:e.before,after:e.after,empty:e.emptyContent?{empty:r.length===0,content:e.emptyContent}:void 0,spacing:e.scrollSpacing,loading:e.loading,tabIndex:e.scrollTabIndex,children:r.map((e,t)=>{let{delimiter:r,keepOpen:i,caret:o,data:s}={...e},c=i?()=>{}:n,l,u=e.disabled,d=({children:e})=>e;if(!u){let n=(e.rules||[]).map(e=>e(t,s)).find(e=>e!==!0);if(n===void 0){let n=e.onClick||(()=>{});l=r=>{n(t,e,r),c()}}else if(u=!0,n!==!1){let e=n;d=({children:t})=>(0,$.jsx)(_i,{on:`click`,placement:e.placement||`left`,background:e.background||`light`,arrow:e.arrow||`none`,zIndex:e.zIndex||1100,closeOnClip:!0,content:()=>(0,$.jsx)($.Fragment,{children:e.content}),renderTrigger:e=>(0,$.jsx)(`div`,{...e,children:t})})}}d.displayName=`OptionContent`;let f=e.label,p=g(e,[`onClick`,`label`,`rules`]);p.disabled=u;let m=typeof f==`function`?f:()=>(0,$.jsx)(Ri.Fragment,{children:f});return(0,$.jsxs)(Ri.Fragment,{children:[(0,$.jsx)(d,{children:(0,$.jsxs)(Pi,{onClick:l,$disabled:u,$border:e.border,$highlighted:t===a,children:[(0,$.jsx)(`div`,{children:(0,$.jsx)(m,{...e,disabled:u})}),o?(0,$.jsx)(b,{type:`feather`,icon:`chevron_right`,width:`14px`}):null]})}),r&&(0,$.jsx)(Fi,{})]},t)})}),i]})})},Vi=Ri.forwardRef(Bi),Vi.__docgenInfo={description:``,methods:[],displayName:`Menu`}}));export{te as _,_i as a,ti as c,Sr as d,wr as f,ee as g,jn as h,Ni as i,vr as l,nr as m,Hi as n,vi as o,tr as p,Mi as r,pr as s,Vi as t,br as u,D as v};