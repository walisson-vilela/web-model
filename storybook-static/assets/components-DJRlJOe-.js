import{a as e,n as t,t as n}from"./chunk-BneVvdWh.js";import{t as r}from"./react-B_0iYUWB.js";import{t as i}from"./react-dom-CfS7yHFF.js";import{a,i as o,o as s}from"./styled-components.browser.esm-BYvzgcDz.js";import{a as c,d as l,i as u,r as d,s as f,u as p}from"./iframe-fSyR9o4x.js";import{_ as m,a as h,c as g,d as _,f as v,h as y,i as b,l as x,m as S,n as C,o as w,p as T,s as ee,u as E,v as D}from"./Menu-TRSAQrSQ.js";import{n as O,t as te}from"./Loader-CzH8aMET.js";import{n as ne}from"./Button-BLRRkxhG.js";import{n as k}from"./Calendar-X3vNC0iC.js";import{r as re,t as ie}from"./hooks-MVq9czon.js";import{n as ae,t as A}from"./Icon-7EFkF0Ko.js";import{n as oe}from"./Indicator-DcmOLqNJ.js";import{n as se,t as ce}from"./Form-BqpbciIA.js";import{n as le}from"./EllipsisContainer-CYb-gjAK.js";import{n as ue,t as de}from"./Input-CZLJcecz.js";import{n as fe}from"./Card-BpqOnJGg.js";import{i as pe,r as me}from"./Checkbox-BAIuYiF7.js";import{n as he}from"./Input-CNfwAAHR.js";import{n as ge}from"./Link-BDf88lME.js";import{n as _e}from"./AppliedFilters-bKWkQ42s.js";import{n as ve}from"./Filters-D92z1VrF.js";import{n as ye}from"./Grid-BSgbs7Jq.js";import{m as be,n as xe}from"./MwManager-bfz1LzHc.js";import{n as Se}from"./Modal-BHf3hx4n.js";import{n as Ce,t as we}from"./Template1-j5zQWNO1.js";import{n as Te,t as Ee}from"./Template2-DGSxdFIl.js";import{n as De,t as Oe}from"./Template3-CS88rPw3.js";import{n as ke,t as Ae}from"./Template4-Bq1IE59U.js";import{n as je,t as Me}from"./Template5-BoN9WTLs.js";import{n as Ne,t as Pe}from"./Template6-huu5giAE.js";import{n as Fe,t as Ie}from"./Template7-gRSr_hbE.js";import{n as Le,t as Re}from"./Template8-BZ4kgabk.js";import{n as ze,t as Be}from"./Template9-PHOL_Plm.js";import{n as Ve,t as He}from"./Template10-BsO1lqj1.js";import{n as Ue}from"./ProgressBar-D4vLl3ty.js";import{n as We}from"./Tabs-C2C64xq0.js";import{n as Ge}from"./TextArea-BNHxv9T4.js";import{n as Ke}from"./Toast-CIeMdWqr.js";import{n as qe}from"./Zoom-CyI1D_da.js";var j,Je,Ye=t((()=>{r(),Ce(),Te(),De(),ke(),je(),Ne(),Fe(),Le(),ze(),Ve(),j=d(),Je=e=>{switch(e.type){case`template1`:return(0,j.jsx)(we,{...e});case`template2`:return(0,j.jsx)(Ee,{...e});case`template3`:return(0,j.jsx)(Oe,{...e});case`template4`:return(0,j.jsx)(Ae,{...e});case`template5`:return(0,j.jsx)(Me,{...e});case`template6`:return(0,j.jsx)(Pe,{...e});case`template7`:return(0,j.jsx)(Ie,{...e});case`template8`:return(0,j.jsx)(Re,{...e});case`template9`:return(0,j.jsx)(Be,{...e});case`template10`:return(0,j.jsx)(He,{...e})}},Je.__docgenInfo={description:``,methods:[],displayName:`Placeholder`,props:{loading:{required:!0,tsType:{name:`boolean`},description:``},type:{required:!0,tsType:{name:`union`,raw:`| 'template1'
| 'template2'
| 'template3'
| 'template4'
| 'template5'
| 'template6'
| 'template7'
| 'template8'
| 'template9'
| 'template10'`,elements:[{name:`literal`,value:`'template1'`},{name:`literal`,value:`'template2'`},{name:`literal`,value:`'template3'`},{name:`literal`,value:`'template4'`},{name:`literal`,value:`'template5'`},{name:`literal`,value:`'template6'`},{name:`literal`,value:`'template7'`},{name:`literal`,value:`'template8'`},{name:`literal`,value:`'template9'`},{name:`literal`,value:`'template10'`}]},description:``}}}})),Xe=t((()=>{})),M,Ze,Qe=t((()=>{M=e(r(),1),ie(),Xe(),Ze=e=>{let[t,n]=(0,M.useState)([]),[r,i]=(0,M.useState)({page:1,last:!1,fetched:null}),a=(0,M.useMemo)(()=>t.length>0?t[t.length-1]:null,[t]),{current:[o,s],debounced:[c]}=re(``,()=>{n([]),i({page:1,last:!0,fetched:null})},500),l=(0,M.useCallback)(async()=>{if(r.fetched===null)try{let t=await e(c,r.page,a);if(t===null)return;n(r.page===1?t.options:e=>[...e,...t.options]),i(e=>({...e,fetched:new Date,last:t.last}))}catch{i(e=>({...e,fetched:new Date,last:!0}))}},[e,c,r.page,r.fetched,a]);return(0,M.useEffect)(()=>{l()},[l]),{options:t,loading:r.fetched===null,paginate:()=>i(e=>e.last?e:{page:e.page+1,last:!0,fetched:null}),searchInput:[o,s]}}})),$e,et=t((()=>{g(),Xe(),$e=({open:e,onOpenChange:t})=>{let n=E({open:e,onOpenChange:t,placement:`bottom-start`,whileElementsMounted:y,middleware:[T(),S({apply({rects:e,elements:t}){Object.assign(t.floating.style,{minWidth:`${e.reference.width}px`})}})]});return{floating:n,transition:v(n.context,{duration:250}),interactions:_([x(n.context,{outsidePressEvent:`mousedown`,escapeKey:!0})])}}})),N,P,tt,nt,rt=t((()=>{N=e(r(),1),P=-1,tt=(e,t)=>{let[n,r]=(0,N.useState)(P);return(0,N.useEffect)(()=>{r(t=>t>=e?P:t)},[e]),[n,(e,n=!0)=>{r(e),!(e<0||!n)&&t?.(e)}]},nt=({itemCount:e,isItemDisabled:t,onSelect:n,scrollToIndex:r})=>{let[i,a]=tt(e,r),o=(0,N.useMemo)(()=>{for(let n=0;n<e;n+=1)if(!t(n))return n;return P},[t,e]),s=(0,N.useMemo)(()=>{for(let n=e-1;n>=0;--n)if(!t(n))return n;return P},[t,e]),c=(0,N.useCallback)((n,r)=>{let i=n;for(;i>=0&&i<e;){if(!t(i))return i;i+=r}return P},[t,e]);return{activeIndex:i,onMouseEnter:e=>a(e,!1),onKeyDown:(0,N.useCallback)(r=>{if(r.key===`ArrowDown`){r.preventDefault();let e=c(i<0?0:i+1,1);e>=0&&a(e);return}if(r.key===`ArrowUp`){r.preventDefault();let t=c(i<0?e-1:i-1,-1);t>=0&&a(t);return}if(r.key===`Home`){r.preventDefault(),o>=0&&a(o);return}if(r.key===`End`){r.preventDefault(),s>=0&&a(s);return}(r.key===`Enter`||r.key===` `)&&i>=0&&(r.preventDefault(),t(i)||n(i))},[i,c,o,t,e,s,n])}}})),it,at,ot=t((()=>{it=e(r(),1),at=({options:e,getKey:t,rules:n})=>{let r=(0,it.useMemo)(()=>{let r=new Map;return e.forEach(e=>{let i=t(e),a=n?.find(t=>!t.allow(e));a&&r.set(i,a)}),r},[t,e,n]);return{getFailedRuleByKey:(0,it.useCallback)(e=>r.get(e),[r]),enabledCount:e.length-r.size}}}));function F(e,t,n){let r=n.initialDeps??[],i,a=!0;function o(){let o;n.key&&n.debug?.call(n)&&(o=Date.now());let s=e();if(!(s.length!==r.length||s.some((e,t)=>r[t]!==e)))return i;r=s;let c;if(n.key&&n.debug?.call(n)&&(c=Date.now()),i=t(...s),n.key&&n.debug?.call(n)){let e=Math.round((Date.now()-o)*100)/100,t=Math.round((Date.now()-c)*100)/100,r=t/16,i=(e,t)=>{for(e=String(e);e.length<t;)e=` `+e;return e};console.info(`%c⏱ ${i(t,5)} /${i(e,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*r,120))}deg 100% 31%);`,n?.key)}return n?.onChange&&!(a&&n.skipInitialOnChange)&&n.onChange(i),a=!1,i}return o.updateDeps=e=>{r=e},o}function st(e,t){if(e===void 0)throw Error(`Unexpected undefined${t?`: ${t}`:``}`);return e}var ct,lt,ut=t((()=>{ct=(e,t)=>Math.abs(e-t)<1.01,lt=(e,t,n)=>{let r;return function(...i){e.clearTimeout(r),r=e.setTimeout(()=>t.apply(this,i),n)}}}));function dt({measurements:e,outerSize:t,scrollOffset:n,lanes:r}){let i=e.length-1,a=t=>e[t].start;if(e.length<=r)return{startIndex:0,endIndex:i};let o=St(0,i,a,n),s=o;if(r===1)for(;s<i&&e[s].end<n+t;)s++;else if(r>1){let a=Array(r).fill(0);for(;s<i&&a.some(e=>e<n+t);){let t=e[s];a[t.lane]=t.end,s++}let c=Array(r).fill(n+t);for(;o>=0&&c.some(e=>e>=n);){let t=e[o];c[t.lane]=t.start,o--}o=Math.max(0,o-o%r),s=Math.min(i,s+(r-1-s%r))}return{startIndex:o,endIndex:s}}var ft,pt,mt,ht,gt,_t,vt,yt,bt,xt,St,Ct=t((()=>{ut(),ft=e=>{let{offsetWidth:t,offsetHeight:n}=e;return{width:t,height:n}},pt=e=>e,mt=e=>{let t=Math.max(e.startIndex-e.overscan,0),n=Math.min(e.endIndex+e.overscan,e.count-1),r=[];for(let e=t;e<=n;e++)r.push(e);return r},ht=(e,t)=>{let n=e.scrollElement;if(!n)return;let r=e.targetWindow;if(!r)return;let i=e=>{let{width:n,height:r}=e;t({width:Math.round(n),height:Math.round(r)})};if(i(ft(n)),!r.ResizeObserver)return()=>{};let a=new r.ResizeObserver(t=>{let r=()=>{let e=t[0];if(e?.borderBoxSize){let t=e.borderBoxSize[0];if(t){i({width:t.inlineSize,height:t.blockSize});return}}i(ft(n))};e.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(r):r()});return a.observe(n,{box:`border-box`}),()=>{a.unobserve(n)}},gt={passive:!0},_t=typeof window>`u`?!0:`onscrollend`in window,vt=(e,t)=>{let n=e.scrollElement;if(!n)return;let r=e.targetWindow;if(!r)return;let i=0,a=e.options.useScrollendEvent&&_t?()=>void 0:lt(r,()=>{t(i,!1)},e.options.isScrollingResetDelay),o=r=>()=>{let{horizontal:o,isRtl:s}=e.options;i=o?n.scrollLeft*(s&&-1||1):n.scrollTop,a(),t(i,r)},s=o(!0),c=o(!1);n.addEventListener(`scroll`,s,gt);let l=e.options.useScrollendEvent&&_t;return l&&n.addEventListener(`scrollend`,c,gt),()=>{n.removeEventListener(`scroll`,s),l&&n.removeEventListener(`scrollend`,c)}},yt=(e,t,n)=>{if(t?.borderBoxSize){let e=t.borderBoxSize[0];if(e)return Math.round(e[n.options.horizontal?`inlineSize`:`blockSize`])}return e[n.options.horizontal?`offsetWidth`:`offsetHeight`]},bt=(e,{adjustments:t=0,behavior:n},r)=>{var i,a;let o=e+t;(a=(i=r.scrollElement)?.scrollTo)==null||a.call(i,{[r.options.horizontal?`left`:`top`]:o,behavior:n})},xt=class{constructor(e){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.scrollState=null,this.measurementsCache=[],this.itemSizeCache=new Map,this.laneAssignments=new Map,this.pendingMeasuredCacheIndexes=[],this.prevLanes=void 0,this.lanesChangedFlag=!1,this.lanesSettling=!1,this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this.elementsCache=new Map,this.now=()=>{var e;return((e=this.targetWindow?.performance)?.now)?.call(e)??Date.now()},this.observer=(()=>{let e=null,t=()=>e||(!this.targetWindow||!this.targetWindow.ResizeObserver?null:e=new this.targetWindow.ResizeObserver(e=>{e.forEach(e=>{let t=()=>{let t=e.target,n=this.indexFromElement(t);if(!t.isConnected){this.observer.unobserve(t);return}this.shouldMeasureDuringScroll(n)&&this.resizeItem(n,this.options.measureElement(t,e,this))};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(t):t()})}));return{disconnect:()=>{var n;(n=t())==null||n.disconnect(),e=null},observe:e=>t()?.observe(e,{box:`border-box`}),unobserve:e=>t()?.unobserve(e)}})(),this.range=null,this.setOptions=e=>{Object.entries(e).forEach(([t,n])=>{n===void 0&&delete e[t]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:pt,rangeExtractor:mt,onChange:()=>{},measureElement:yt,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:`data-index`,initialMeasurementsCache:[],lanes:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,...e}},this.notify=e=>{var t,n;(n=(t=this.options).onChange)==null||n.call(t,this,e)},this.maybeNotify=F(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),e=>{this.notify(e)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.observer.disconnect(),this.rafId!=null&&this.targetWindow&&(this.targetWindow.cancelAnimationFrame(this.rafId),this.rafId=null),this.scrollState=null,this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{let e=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==e){if(this.cleanup(),!e){this.maybeNotify();return}this.scrollElement=e,this.scrollElement&&`ownerDocument`in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=this.scrollElement?.window??null,this.elementsCache.forEach(e=>{this.observer.observe(e)}),this.unsubs.push(this.options.observeElementRect(this,e=>{this.scrollRect=e,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(e,t)=>{this.scrollAdjustments=0,this.scrollDirection=t?this.getScrollOffset()<e?`forward`:`backward`:null,this.scrollOffset=e,this.isScrolling=t,this.scrollState&&this.scheduleScrollReconcile(),this.maybeNotify()})),this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})}},this.rafId=null,this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?`width`:`height`]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??(typeof this.options.initialOffset==`function`?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getFurthestMeasurement=(e,t)=>{let n=new Map,r=new Map;for(let i=t-1;i>=0;i--){let t=e[i];if(n.has(t.lane))continue;let a=r.get(t.lane);if(a==null||t.end>a.end?r.set(t.lane,t):t.end<a.end&&n.set(t.lane,!0),n.size===this.options.lanes)break}return r.size===this.options.lanes?Array.from(r.values()).sort((e,t)=>e.end===t.end?e.index-t.index:e.end-t.end)[0]:void 0},this.getMeasurementOptions=F(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled,this.options.lanes],(e,t,n,r,i,a)=>(this.prevLanes!==void 0&&this.prevLanes!==a&&(this.lanesChangedFlag=!0),this.prevLanes=a,this.pendingMeasuredCacheIndexes=[],{count:e,paddingStart:t,scrollMargin:n,getItemKey:r,enabled:i,lanes:a}),{key:!1}),this.getMeasurements=F(()=>[this.getMeasurementOptions(),this.itemSizeCache],({count:e,paddingStart:t,scrollMargin:n,getItemKey:r,enabled:i,lanes:a},o)=>{if(!i)return this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),[];if(this.laneAssignments.size>e)for(let t of this.laneAssignments.keys())t>=e&&this.laneAssignments.delete(t);this.lanesChangedFlag&&(this.lanesChangedFlag=!1,this.lanesSettling=!0,this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),this.pendingMeasuredCacheIndexes=[]),this.measurementsCache.length===0&&!this.lanesSettling&&(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(e=>{this.itemSizeCache.set(e.key,e.size)}));let s=this.lanesSettling?0:this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[],this.lanesSettling&&this.measurementsCache.length===e&&(this.lanesSettling=!1);let c=this.measurementsCache.slice(0,s),l=Array(a).fill(void 0);for(let e=0;e<s;e++){let t=c[e];t&&(l[t.lane]=e)}for(let i=s;i<e;i++){let e=r(i),a=this.laneAssignments.get(i),s,u;if(a!==void 0&&this.options.lanes>1){s=a;let e=l[s],r=e===void 0?void 0:c[e];u=r?r.end+this.options.gap:t+n}else{let e=this.options.lanes===1?c[i-1]:this.getFurthestMeasurement(c,i);u=e?e.end+this.options.gap:t+n,s=e?e.lane:i%this.options.lanes,this.options.lanes>1&&this.laneAssignments.set(i,s)}let d=o.get(e),f=typeof d==`number`?d:this.options.estimateSize(i),p=u+f;c[i]={index:i,start:u,size:f,end:p,key:e,lane:s},l[s]=i}return this.measurementsCache=c,c},{key:!1,debug:()=>this.options.debug}),this.calculateRange=F(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(e,t,n,r)=>this.range=e.length>0&&t>0?dt({measurements:e,outerSize:t,scrollOffset:n,lanes:r}):null,{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=F(()=>{let e=null,t=null,n=this.calculateRange();return n&&(e=n.startIndex,t=n.endIndex),this.maybeNotify.updateDeps([this.isScrolling,e,t]),[this.options.rangeExtractor,this.options.overscan,this.options.count,e,t]},(e,t,n,r,i)=>r===null||i===null?[]:e({startIndex:r,endIndex:i,overscan:t,count:n}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=e=>{let t=this.options.indexAttribute,n=e.getAttribute(t);return n?parseInt(n,10):(console.warn(`Missing attribute name '${t}={index}' on measured element.`),-1)},this.shouldMeasureDuringScroll=e=>{if(!this.scrollState||this.scrollState.behavior!==`smooth`)return!0;let t=this.scrollState.index??this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)?.index;if(t!==void 0&&this.range){let n=Math.max(this.options.overscan,Math.ceil((this.range.endIndex-this.range.startIndex)/2)),r=Math.max(0,t-n),i=Math.min(this.options.count-1,t+n);return e>=r&&e<=i}return!0},this.measureElement=e=>{if(!e){this.elementsCache.forEach((e,t)=>{e.isConnected||(this.observer.unobserve(e),this.elementsCache.delete(t))});return}let t=this.indexFromElement(e),n=this.options.getItemKey(t),r=this.elementsCache.get(n);r!==e&&(r&&this.observer.unobserve(r),this.observer.observe(e),this.elementsCache.set(n,e)),(!this.isScrolling||this.scrollState)&&this.shouldMeasureDuringScroll(t)&&this.resizeItem(t,this.options.measureElement(e,void 0,this))},this.resizeItem=(e,t)=>{let n=this.measurementsCache[e];if(!n)return;let r=t-(this.itemSizeCache.get(n.key)??n.size);r!==0&&(this.scrollState?.behavior!==`smooth`&&(this.shouldAdjustScrollPositionOnItemSizeChange===void 0?n.start<this.getScrollOffset()+this.scrollAdjustments:this.shouldAdjustScrollPositionOnItemSizeChange(n,r,this))&&this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=r,behavior:void 0}),this.pendingMeasuredCacheIndexes.push(n.index),this.itemSizeCache=new Map(this.itemSizeCache.set(n.key,t)),this.notify(!1))},this.getVirtualItems=F(()=>[this.getVirtualIndexes(),this.getMeasurements()],(e,t)=>{let n=[];for(let r=0,i=e.length;r<i;r++){let i=t[e[r]];n.push(i)}return n},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=e=>{let t=this.getMeasurements();if(t.length!==0)return st(t[St(0,t.length-1,e=>st(t[e]).start,e)])},this.getMaxScrollOffset=()=>{if(!this.scrollElement)return 0;if(`scrollHeight`in this.scrollElement)return this.options.horizontal?this.scrollElement.scrollWidth-this.scrollElement.clientWidth:this.scrollElement.scrollHeight-this.scrollElement.clientHeight;{let e=this.scrollElement.document.documentElement;return this.options.horizontal?e.scrollWidth-this.scrollElement.innerWidth:e.scrollHeight-this.scrollElement.innerHeight}},this.getOffsetForAlignment=(e,t,n=0)=>{if(!this.scrollElement)return 0;let r=this.getSize(),i=this.getScrollOffset();t===`auto`&&(t=e>=i+r?`end`:`start`),t===`center`?e+=(n-r)/2:t===`end`&&(e-=r);let a=this.getMaxScrollOffset();return Math.max(Math.min(a,e),0)},this.getOffsetForIndex=(e,t=`auto`)=>{e=Math.max(0,Math.min(e,this.options.count-1));let n=this.getSize(),r=this.getScrollOffset(),i=this.measurementsCache[e];if(!i)return;if(t===`auto`)if(i.end>=r+n-this.options.scrollPaddingEnd)t=`end`;else if(i.start<=r+this.options.scrollPaddingStart)t=`start`;else return[r,t];if(t===`end`&&e===this.options.count-1)return[this.getMaxScrollOffset(),t];let a=t===`end`?i.end+this.options.scrollPaddingEnd:i.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(a,t,i.size),t]},this.scrollToOffset=(e,{align:t=`start`,behavior:n=`auto`}={})=>{let r=this.getOffsetForAlignment(e,t);this.scrollState={index:null,align:t,behavior:n,startedAt:this.now(),lastTargetOffset:r,stableFrames:0},this._scrollToOffset(r,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollToIndex=(e,{align:t=`auto`,behavior:n=`auto`}={})=>{e=Math.max(0,Math.min(e,this.options.count-1));let r=this.getOffsetForIndex(e,t);if(!r)return;let[i,a]=r,o=this.now();this.scrollState={index:e,align:a,behavior:n,startedAt:o,lastTargetOffset:i,stableFrames:0},this._scrollToOffset(i,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollBy=(e,{behavior:t=`auto`}={})=>{let n=this.getScrollOffset()+e;this.scrollState={index:null,align:`start`,behavior:t,startedAt:this.now(),lastTargetOffset:n,stableFrames:0},this._scrollToOffset(n,{adjustments:void 0,behavior:t}),this.scheduleScrollReconcile()},this.getTotalSize=()=>{let e=this.getMeasurements(),t;if(e.length===0)t=this.options.paddingStart;else if(this.options.lanes===1)t=e[e.length-1]?.end??0;else{let n=Array(this.options.lanes).fill(null),r=e.length-1;for(;r>=0&&n.some(e=>e===null);){let t=e[r];n[t.lane]===null&&(n[t.lane]=t.end),r--}t=Math.max(...n.filter(e=>e!==null))}return Math.max(t-this.options.scrollMargin+this.options.paddingEnd,0)},this._scrollToOffset=(e,{adjustments:t,behavior:n})=>{this.options.scrollToFn(e,{behavior:n,adjustments:t},this)},this.measure=()=>{this.itemSizeCache=new Map,this.laneAssignments=new Map,this.notify(!1)},this.setOptions(e)}scheduleScrollReconcile(){if(!this.targetWindow){this.scrollState=null;return}this.rafId??=this.targetWindow.requestAnimationFrame(()=>{this.rafId=null,this.reconcileScroll()})}reconcileScroll(){if(!this.scrollState||!this.scrollElement)return;if(this.now()-this.scrollState.startedAt>5e3){this.scrollState=null;return}let e=this.scrollState.index==null?void 0:this.getOffsetForIndex(this.scrollState.index,this.scrollState.align),t=e?e[0]:this.scrollState.lastTargetOffset,n=t!==this.scrollState.lastTargetOffset;if(!n&&ct(t,this.getScrollOffset())){if(this.scrollState.stableFrames++,this.scrollState.stableFrames>=1){this.scrollState=null;return}}else this.scrollState.stableFrames=0,n&&(this.scrollState.lastTargetOffset=t,this.scrollState.behavior=`auto`,this._scrollToOffset(t,{adjustments:void 0,behavior:`auto`}));this.scheduleScrollReconcile()}},St=(e,t,n,r)=>{for(;e<=t;){let i=(e+t)/2|0,a=n(i);if(a<r)e=i+1;else if(a>r)t=i-1;else return i}return e>0?e-1:0}}));function wt({useFlushSync:e=!0,...t}){let n=I.useReducer(()=>({}),{})[1],r={...t,onChange:(r,i)=>{var a;e&&i?(0,Et.flushSync)(n):n(),(a=t.onChange)==null||a.call(t,r,i)}},[i]=I.useState(()=>new xt(r));return i.setOptions(r),Dt(()=>i._didMount(),[]),Dt(()=>i._willUpdate()),i}function Tt(e){return wt({observeElementRect:ht,observeElementOffset:vt,scrollToFn:bt,...e})}var I,Et,Dt,Ot=t((()=>{I=e(r(),1),Et=e(i(),1),Ct(),Ct(),Dt=typeof document<`u`?I.useLayoutEffect:I.useEffect})),L,kt,At=t((()=>{L=e(r(),1),Ot(),kt=e=>{let{optionsLength:t,loading:n,onPaginate:r,overscan:i=2}=e,a=(0,L.useMemo)(()=>{let t=e.estimateSize;return t===void 0?()=>46:typeof t==`function`?t:()=>t},[e.estimateSize]),o=(0,L.useRef)(null),s=(0,L.useRef)(null),c=Tt({count:t,getScrollElement:()=>o.current,estimateSize:a,overscan:i}),l=c.getVirtualItems();(0,L.useEffect)(()=>{s.current?.focus()},[s.current]);let u=(0,L.useMemo)(()=>l[l.length-1]?.index??0,[l]);return(0,L.useEffect)(()=>{n||t<1||u>=t-1-i&&r()},[n,u,t,i,r]),{listRef:o,searchRef:s,rowVirtualizer:c,virtualItems:l}}})),jt=t((()=>{Qe(),et(),rt(),ot(),At()})),Mt,Nt=t((()=>{o(),Mt=s.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;

  background-color: ${({theme:e})=>e.colors.blue};
  border-radius: 3px;

  ${({theme:e})=>e.useTypography(`h4`)}
  color: ${({theme:e})=>e.colors.white};

  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  transition-property: opacity;
  transition-duration: 0.25s;
  transition-timing-function: linear;

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
  &:not([aria-disabled='true']) {
    cursor: pointer;
  }
`})),Pt,Ft,It,Lt=t((()=>{Pt=e(r(),1),w(),Nt(),Ft=d(),It=({setValue:e,clearable:t,applyRules:n,onClose:r,draft:i})=>{let a=(0,Pt.useMemo)(()=>Array.from(i.values()),[i]),o=(0,Pt.useMemo)(()=>n.find(e=>!e.allow(a)),[a,n]),s=o?.Component,c=()=>{!t&&i.size<1||o===void 0&&(e(Array.from(i.values())),r())};return(0,Ft.jsx)(h,{...s===void 0?{enabled:!1,content:()=>null}:{enabled:!0,content:()=>(0,Ft.jsx)(s,{value:a})},on:`click`,closeOnClip:!0,placement:`right`,triggerType:`button`,triggerProps:{onClick:c},renderTrigger:e=>(0,Ft.jsx)(Mt,{type:`button`,"aria-disabled":!t&&i.size<1||o!==void 0,...e,children:`Aplicar`})})},It.__docgenInfo={description:``,methods:[],displayName:`Apply`,props:{onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},draft:{required:!0,tsType:{name:`Map`,elements:[{name:`string`},{name:`unknown`}],raw:`Map<string, unknown>`},description:``}}}})),Rt,zt,Bt,Vt,R,Ht,Ut,Wt=t((()=>{o(),pe(),Rt=s.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`,zt=s.div`
  overflow-y: scroll;
  overflow-y: overlay;
  width: 100%;
  height: 100%;

  /* Firefox */
  @supports (scrollbar-width: thin) {
    .scroll {
      scrollbar-color: ${({theme:e})=>`${e.colors.grey} ${e.colors.white}`};
      scrollbar-width: thin;
    }
  }

  /* Chrome/Edge/Safari (WebKit/Blink) */
  @supports selector(::-webkit-scrollbar) {
    &::-webkit-scrollbar {
      width: ${({theme:e})=>e.spacings.s1};
    }
    &::-webkit-scrollbar-thumb {
      background: ${({theme:e})=>e.colors.grey};
    }
    &::-webkit-scrollbar-track {
      background: ${({theme:e})=>e.colors.white};
    }
  }
`,Bt=s.div`
  position: relative;
  width: 100%;
`,Vt=s.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({theme:e})=>e.useTypography(`p`)}
  color: ${({theme:e})=>e.getColor(`greyishBlue`,80)};
`,R=me,Ht=s.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 3px;

  transition-property: background-color;
  transition-timing-function: linear;
  transition-duration: 0.25s;
`,Ut=s.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacings.s1};

  background-color: ${({theme:e,$active:t})=>t?e.getColor(`blue`,15):e.colors.white};
  padding: ${({theme:e})=>e.spacings.s3};

  ${({theme:e})=>e.useTypography(`p`)}
  color: ${({theme:e})=>e.colors.greyishBlue};

  border-bottom-width: 1px;
  border-bottom-style: solid;
  &:nth-last-child(1) {
    border-bottom-color: transparent;
  }
  &:not(:nth-last-child(1)) {
    border-bottom-color: ${({theme:e})=>e.getColor(`greyishBlue`,10)};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:not([aria-disabled='true']) {
    cursor: pointer;
    opacity: 1;
  }

  &[aria-selected='true'] > ${Ht} {
    background-color: ${({theme:e})=>e.colors.blue};
  }
  &:not([aria-selected='true']) > ${Ht} {
    background-color: transparent;
  }

  > ${R} {
    background-color: ${({theme:e,$active:t})=>t?e.colors.iceWhite:e.colors.white};
  }

  &[aria-selected='true'] > ${R} {
    border-color: ${({theme:e})=>e.colors.blue};
  }
  &[aria-selected='true'] > ${R}:after {
    width: 5px;
    height: 9.5px;
    border-width: 0 2px 2px 0;
    left: 5px;
    top: 1px;
  }
  &:not([aria-selected='true']) > ${R} {
    border-color: ${({theme:e})=>e.colors.lightestGrey};
  }

  transition-property: background-color, opacity;
  transition-timing-function: linear;
  transition-duration: 0.25s;
`})),Gt,z,Kt,qt=t((()=>{Gt=e(r(),1),O(),w(),Wt(),z=d(),Kt=Gt.forwardRef(({menuId:e,loading:t,options:n,virtualItems:r,totalSize:i,measureElement:a,OptionComponent:o,onClickOption:s,onMouseEnterOption:c,activeIndex:l,getKey:u,getIsSelected:d,getFailedRuleByKey:f,mode:p,...m},g)=>{let _=p===`single`?Ht:R;return(0,z.jsxs)(Rt,{children:[t?(0,z.jsx)(te,{filled:!0}):n.length<1?(0,z.jsx)(Vt,{children:`Nenhuma opção encontrada`}):null,(0,z.jsx)(zt,{ref:g,id:e,role:`listbox`,...m,onMouseDown:e=>e.preventDefault(),children:(0,z.jsx)(Bt,{style:{height:`${i}px`},children:r.map(t=>{let r=n[t.index];if(!r)return null;let i=u(r),p=f(i),m=!!p,g=d(i),v=l===t.index,y=p?.Component;return(0,z.jsx)(h,{enabled:!!y,content:()=>(0,z.jsx)(y,{option:r}),on:`click`,closeOnClip:!0,placement:`right`,triggerProps:{ref:a,onMouseEnter:()=>c(t.index),onClick:()=>s(t.index)},renderTrigger:n=>(0,z.jsxs)(Ut,{id:`${e}-option-${t.index}`,"data-index":t.index,role:`option`,"aria-selected":g,"aria-disabled":m,$active:v,style:{transform:`translateY(${t.start}px)`},...n,children:[(0,z.jsx)(_,{}),(0,z.jsx)(o,{option:r,isActive:v,isSelected:g,isDisabled:m})]})},i)})})})]})}),Kt.__docgenInfo={description:``,methods:[],displayName:`Scroll`,props:{menuId:{required:!0,tsType:{name:`string`},description:``},options:{required:!0,tsType:{name:`Array`,elements:[{name:`unknown`}],raw:`unknown[]`},description:``},virtualItems:{required:!0,tsType:{name:`Array`,elements:[{name:`VirtualItem`}],raw:`VirtualItem[]`},description:``},loading:{required:!0,tsType:{name:`boolean`},description:``},totalSize:{required:!0,tsType:{name:`number`},description:``},measureElement:{required:!0,tsType:{name:`Virtualizer['measureElement']`,raw:`Virtualizer<Element, Element>['measureElement']`},description:``},OptionComponent:{required:!0,tsType:{name:`ReactFunctionComponent`,raw:`React.FunctionComponent<{
  option: Option
  isActive: boolean
  isSelected: boolean
  isDisabled: boolean
}>`,elements:[{name:`signature`,type:`object`,raw:`{
  option: Option
  isActive: boolean
  isSelected: boolean
  isDisabled: boolean
}`,signature:{properties:[{key:`option`,value:{name:`unknown`,required:!0}},{key:`isActive`,value:{name:`boolean`,required:!0}},{key:`isSelected`,value:{name:`boolean`,required:!0}},{key:`isDisabled`,value:{name:`boolean`,required:!0}}]}}]},description:``},onClickOption:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},onMouseEnterOption:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},activeIndex:{required:!0,tsType:{name:`number`},description:``},getKey:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(option: Option) => string`,signature:{arguments:[{type:{name:`unknown`},name:`option`}],return:{name:`string`}}},description:``},getIsSelected:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(key: string) => boolean`,signature:{arguments:[{type:{name:`string`},name:`key`}],return:{name:`boolean`}}},description:``},getFailedRuleByKey:{required:!0,tsType:{name:`Map['get']`,raw:`Map<string, SelectRule<unknown>>['get']`},description:``},mode:{required:!0,tsType:{name:`union`,raw:`'single' | 'multi'`,elements:[{name:`literal`,value:`'single'`},{name:`literal`,value:`'multi'`}]},description:``}}}})),Jt,Yt=t((()=>{o(),Jt=s.div`
  padding: 0 ${({theme:e})=>e.spacings.s3};
  margin-bottom: ${({theme:e})=>e.spacings.s1};

  ${({theme:e})=>e.useTypography(`p`)}

  position: relative;

  > input {
    width: 100%;
    min-height: 35px;

    padding-top: 0;
    /* padding + icon width + gap */
    padding-right: calc(
      ${({theme:e})=>`${e.spacings.s1} + 24px + ${e.spacings.s1}`}
    );
    padding-bottom: 0;
    padding-left: ${({theme:e})=>e.spacings.s3};

    outline: none;

    border-style: solid;
    border-width: 1px;
    border-color: ${({theme:e})=>e.colors.lightGrey};
    border-radius: 4px;
  }

  > :last-child {
    position: absolute;
    top: 50%;

    /* parent padding + input padding */
    right: calc(
      ${({theme:e})=>`${e.spacings.s3} + ${e.spacings.s1}`}
    );
    transform: translateY(-50%);
  }
`})),Xt,Zt,Qt,$t=t((()=>{Xt=e(r(),1),ae(),Yt(),Zt=d(),Qt=Xt.forwardRef(({menuId:e,onKeyDown:t,value:[n,r],activeIndex:i},a)=>{let[o,s]=(0,Xt.useState)(null);return(0,Zt.jsxs)(Jt,{children:[(0,Zt.jsx)(`input`,{ref:e=>{s(e),typeof a==`function`?a(e):a&&(a.current=e)},value:n,onChange:e=>r(e.target.value),onKeyDown:t,placeholder:`Buscar...`,role:`searchbox`,"aria-controls":e,"aria-activedescendant":i>=0?`${e}-option-${i}`:void 0}),(0,Zt.jsx)(A,{type:`feather`,...n.length>0?{icon:`x`,onClick:e=>{e.preventDefault(),r(``),o?.focus()},strokeWidth:`4px`}:{icon:`search`,onClick:e=>{e.preventDefault(),e.stopPropagation(),o?.focus()}}})]})}),Qt.__docgenInfo={description:``,methods:[],displayName:`Search`,props:{menuId:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`tuple`,raw:`[string, (input: string) => void]`,elements:[{name:`string`},{name:`signature`,type:`function`,raw:`(input: string) => void`,signature:{arguments:[{type:{name:`string`},name:`input`}],return:{name:`void`}}}]},description:``},activeIndex:{required:!0,tsType:{name:`number`},description:``}}}})),en,tn,nn,rn=t((()=>{o(),en=s.div`
  padding: 0 ${({theme:e})=>e.spacings.s3};
  margin: ${({theme:e})=>e.spacings.s1} 0;
  display: flex;
  gap: ${({theme:e})=>e.spacings.s1};
  justify-content: space-between;
  align-items: center;
`,tn=s.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: calc(${({theme:e})=>e.spacings.s1} / 2);

  ${({theme:e})=>e.useTypography(`h4`)}
  color: ${({theme:e})=>e.getColor(`black`,80)};

  transition-property: color;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover {
    color: ${({theme:e})=>e.colors.blue};
  }

  > span:nth-child(1) {
    position: relative;
    width: calc(${({theme:e})=>e.spacings.s3} * 2);
    height: ${({theme:e})=>e.spacings.s3};
    background-color: ${({theme:e})=>e.colors.warningGray};
    border-radius: 20px;
    transition-property: background-color;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    box-sizing: content-box;

    &:before {
      content: '';
      transition-property: left, transform;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      position: absolute;
      border-width: 1px;
      border-style: solid;
      border-radius: 100%;
      border-color: ${({theme:e})=>e.colors.lightGrey};
      left: 0;
      box-shadow: 0px 1px 3px ${({theme:e})=>e.getColor(`black`,10)};
      width: 50%;
      height: 100%;
      background-color: ${({theme:e})=>e.colors.white};
      box-sizing: border-box;
    }
  }

  &[aria-checked='true'] > span:nth-child(1) {
    background-color: ${({theme:e})=>e.colors.blue};
  }

  &[aria-checked='true'] > span:nth-child(1):before {
    left: 100%;
    transform: translateX(-100%);
  }
`,nn=s.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;

  ${({theme:e})=>e.useTypography(`h6`)}
  color: ${({theme:e})=>e.colors.greyishBlue};

  transition-property: color;
  transition-duration: 0.25s;
  transition-timing-function: linear;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover {
    color: ${({theme:e})=>e.colors.blue};
  }
`})),B,V,an,on,sn,cn,ln,un,dn=t((()=>{B=e(r(),1),ie(),Lt(),qt(),$t(),Xe(),jt(),rn(),V=d(),an=(e,t)=>new Map(e.map(e=>[t(e),e])),on=()=>{},sn=(e,t)=>{let{current:[n,r],debounced:[i]}=re(``,()=>{},500);return{options:(0,B.useMemo)(()=>{let n=Array.from(e.values());return i?t(i,n):n},[e,i,t]),loading:!1,paginate:on,searchInput:[n,r]}},cn=(e,t)=>{let[n,r]=(0,B.useState)(()=>({options:an(e,t),on:!1}));return{draft:[n.options,e=>{r(t=>{let n=typeof e==`function`?e(t.options):e;return n===t.options?t:{options:n,on:t.on&&n.size>0}})}],switchDraft:[n.on,e=>{r(t=>{let n=typeof e==`function`?e(t.on):e;return n===t.on?t:{options:t.options,on:n&&t.options.size>0}})}]}},ln=({loader:e,getKey:t,OptionComponent:n,rules:r,overscan:i,estimateSize:a,value:o,setValue:s,menuId:c,onClose:l,clearable:u=!1,finder:d,applyRules:f=[]})=>{let{draft:[p,m],switchDraft:[h,g]}=cn(o,t),_=Ze(e),v=sn(p,d),{options:y,loading:b,paginate:x,searchInput:[S,C]}=h?v:_,{getFailedRuleByKey:w,enabledCount:T}=at({options:y,getKey:t,rules:r}),{listRef:ee,searchRef:E,rowVirtualizer:D,virtualItems:O}=kt({optionsLength:y.length,loading:b,onPaginate:x,overscan:i,estimateSize:a}),te=e=>{let n=y[e];return n?!!w(t(n)):!0},ne=e=>{let n=y[e];if(!n)return;if(te(e)){E.current?.focus();return}let r=t(n);m(e=>{let t=new Map(e);return t.has(r)?t.delete(r):t.set(r,n),t})},k=nt({itemCount:y.length,isItemDisabled:te,onSelect:ne,scrollToIndex:D.scrollToIndex}),re=()=>{m(e=>{let n=new Map(e);return y.forEach(e=>{let r=t(e);w(r)||n.set(r,e)}),n})},ie=()=>{m(new Map([]))},ae=(0,B.useCallback)(e=>p.has(e),[p]);return(0,V.jsxs)(B.Fragment,{children:[(0,V.jsxs)(en,{children:[(0,V.jsxs)(tn,{type:`button`,role:`switch`,"aria-checked":h,onClick:()=>g(e=>!e),disabled:p.size<1,children:[(0,V.jsx)(`span`,{}),`Selecionados (`,p.size,`)`]}),(0,V.jsx)(nn,{type:`button`,...T>0&&T===p.size?{onClick:ie,children:`Desselecionar tudo`}:{onClick:re,children:`Selecionar tudo`,disabled:T<1}})]}),(0,V.jsx)(Qt,{ref:E,menuId:c,value:[S,C],activeIndex:k.activeIndex,onKeyDown:k.onKeyDown}),(0,V.jsx)(Kt,{ref:ee,menuId:c,options:y,virtualItems:O,totalSize:D.getTotalSize(),measureElement:D.measureElement,loading:b,OptionComponent:n,onClickOption:ne,onMouseEnterOption:k.onMouseEnter,activeIndex:k.activeIndex,getKey:t,getIsSelected:ae,getFailedRuleByKey:w,mode:`multi`,"aria-multiselectable":!0}),(0,V.jsx)(It,{setValue:s,onClose:l,draft:p,clearable:u,applyRules:f})]})},un=({label:e,loader:t,getKey:n,OptionComponent:r,rules:i,placeholder:a=`Selecione`,required:o,invalid:s,clearable:c,readOnly:l,viewMode:u,overscan:d,estimateSize:f,height:p,value:m,setValue:h,finder:g,applyRules:_,...v})=>{let y=(0,B.useMemo)(()=>m.length<1?u?(0,V.jsx)(B.Fragment,{children:`\xA0`}):a:`Há ${m.length} opções selecionadas`,[a,m.length,u]);return{isEmpty:m.length===0,placeholder:y,onClear:()=>h([]),Component:ln,buttonProps:v}}})),H,U,fn,pn,mn=t((()=>{H=e(r(),1),qt(),$t(),jt(),U=d(),fn=({loader:e,getKey:t,OptionComponent:n,rules:r,overscan:i,estimateSize:a,value:o,setValue:s,menuId:c,onClose:l,clearable:u})=>{let{options:d,loading:f,paginate:p,searchInput:[m,h]}=Ze(e),{getFailedRuleByKey:g}=at({options:d,getKey:t,rules:r}),{listRef:_,searchRef:v,rowVirtualizer:y,virtualItems:b}=kt({optionsLength:d.length,loading:f,onPaginate:p,overscan:i,estimateSize:a}),x=o?t(o):null,S=e=>{let n=d[e];return n?!!g(t(n)):!0},C=e=>{let n=d[e];if(n){if(S(e)){v.current?.focus();return}if(x===t(n)){if(!u)return;s(null)}else s(n);l()}},w=nt({itemCount:d.length,isItemDisabled:S,onSelect:C,scrollToIndex:y.scrollToIndex}),T=(0,H.useCallback)(e=>x===e,[x]);return(0,U.jsxs)(H.Fragment,{children:[(0,U.jsx)(Qt,{ref:v,menuId:c,value:[m,h],activeIndex:w.activeIndex,onKeyDown:w.onKeyDown}),(0,U.jsx)(Kt,{ref:_,menuId:c,options:d,virtualItems:b,totalSize:y.getTotalSize(),measureElement:y.measureElement,loading:f,OptionComponent:n,onClickOption:C,onMouseEnterOption:w.onMouseEnter,activeIndex:w.activeIndex,getKey:t,getIsSelected:T,getFailedRuleByKey:g,mode:`single`,"aria-multiselectable":!0})]})},pn=({label:e,loader:t,getKey:n,OptionComponent:r,rules:i,placeholder:a=`Selecione`,required:o,invalid:s,clearable:c,readOnly:l,viewMode:u,overscan:d,estimateSize:f,height:p,value:m,setValue:h,ValueComponent:g,..._})=>{let v=g||r,y=(0,H.useMemo)(()=>m?(0,U.jsx)(v,{option:m,isActive:!1,isSelected:!0,isDisabled:!1}):u?(0,U.jsx)(H.Fragment,{children:`\xA0`}):a,[v,a,m,u]);return{isEmpty:!m,placeholder:y,onClear:()=>h(null),Component:fn,buttonProps:_}}})),hn,gn=t((()=>{dn(),mn(),hn=({type:e,...t})=>e===`multi-select`?un(t):pn(t)})),_n,vn,yn,bn,xn,Sn=t((()=>{o(),Xe(),_n=s.div`
  z-index: 1000;

  &,
  & > div {
    height: var(--height);
    min-height: var(--height);
    max-height: var(--height);
  }

  > div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: ${({theme:e})=>e.spacings.s1};

    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  transition-property: height, max-height, min-height;
  transition-timing-function: linear;
  transition-duration: ${250}ms;

  background: ${({theme:e})=>e.colors.white};
  border: 1px solid ${({theme:e})=>e.colors.lightGrey};
  border-radius: 6px;
  box-shadow: 0px 3px 6px ${({theme:e})=>e.getColor(`black`,15)};
  overflow: hidden;
`,vn=s.button`
  width: 100%;

  transition-property: opacity, border-color, box-shadow, color,
    background-color;
  transition-timing-function: linear;
  transition-duration: 0.25s;

  ${({$viewMode:e})=>e?a`
          padding: 0;

          border: none;
        `:a`
          min-height: 35px;
          padding: 0 ${({theme:e})=>e.spacings.s3};

          border-style: solid;
          border-width: 1px;
          border-radius: 4px;
        `}

  outline: none !important;

  &:focus-visible {
    box-shadow: 3px 3px 6px ${({theme:e})=>e.getColor(`black`,15)};
  }

  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacings.s1};

  ${({theme:e})=>e.useTypography(`p`)}

  &[aria-invalid='true'] {
    border-color: ${({theme:e})=>e.colors.warningRed};
    color: ${({theme:e})=>e.colors.warningRed};
    background-color: ${({theme:e})=>e.getColor(`warningRed`,5)};
  }
  &:not([aria-invalid='true']) {
    border-color: ${({theme:e})=>e.colors.lightGrey};
    color: ${({theme:e,$empty:t})=>t?e.colors.darkGrey:e.colors.darkBlue};
    background-color: ${({theme:e})=>e.colors.white};
  }

  &:disabled {
    opacity: 0.5;
  }

  &:not(:disabled),
  &:not([aria-readonly='true']) {
    cursor: pointer;
  }

  &:disabled,
  &[aria-readonly='true'] {
    pointer-events: none;
  }

  > i {
    transition-property: transform;
    transition-timing-function: linear;
    transition-duration: 0.25s;
    transform: rotate(${({$open:e})=>e?`180deg`:`0deg`});
  }
`,yn=s.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`,bn=s.label`
  display: inline-block;
  margin-bottom: ${({theme:e,$viewMode:t})=>e.spacings[t?`s3`:`s1`]};

  ${({theme:e,$viewMode:t})=>e.useTypography(`p`,{fontWeight:t?`bold`:`normal`})}
  color: ${({theme:e})=>e.colors.greyishBlue};

  transition-property: opacity, border-color, box-shadow, color,
    background-color;
  transition-timing-function: linear;
  transition-duration: 0.25s;

  &:has(+ [aria-required='true']):after {
    content: ' *';
  }

  &:has(+ :disabled) {
    opacity: 0.5;
  }
`,xn=s.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({theme:e})=>e.spacings.s1} / 2);
  overflow: hidden;

  > div {
    display: flex;
    gap: calc(${({theme:e})=>e.spacings.s1} / 2);
    color: ${({theme:e})=>e.colors.darkBlue};
    white-space: nowrap;
  }

  > div:nth-child(1) {
    ${({theme:e})=>e.useTypography(`p`)}
  }

  > div:not(:nth-child(1)) {
    ${({theme:e})=>e.useTypography(`h6`)}
    opacity: 0.5;
  }
`})),W,G,Cn,wn,Tn=t((()=>{W=e(r(),1),g(),c(),se(),ae(),jt(),gn(),Sn(),G=d(),Cn=W.forwardRef((e,t)=>{let[n,r]=(0,W.useState)(!1),i=e.id||(0,W.useId)(),{isRequired:a,isInvalid:o,isViewMode:s,isDisabled:c}=ce.useContext(e.name),l=o()||e.invalid,d=a()||e.required,f=c()||e.disabled,p=s()||e.viewMode,{floating:m,transition:h,interactions:g}=$e({open:n,onOpenChange:r}),_=(0,W.useMemo)(()=>h.status===`open`?e.height===void 0?e.type===`single-select`?240:260:e.height:0,[h.status!==`open`,e.type,e.height]),v=(0,W.useId)(),y=e=>{!n&&[`ArrowDown`,`ArrowUp`,`Enter`,` `].includes(e.key)&&(e.preventDefault(),r(!0))},{isEmpty:b,placeholder:x,Component:S,onClear:C,buttonProps:w}=hn(e);return(0,G.jsxs)(W.Fragment,{children:[e.label!==void 0&&(0,G.jsx)(bn,{htmlFor:i,$viewMode:p,children:e.label}),(0,G.jsxs)(vn,{id:i,type:`button`,role:`combobox`,"aria-haspopup":`listbox`,"aria-expanded":n,"aria-controls":v,$open:n,$empty:b,$viewMode:p,"aria-readonly":e.readOnly||p,"aria-invalid":l,"aria-required":d&&!p,...g.getReferenceProps({...w,disabled:f,onClick:(t=>{e.readOnly||p||f||(r(e=>!e),w.onClick?.(t))}),onKeyDown:(t=>{e.readOnly||p||e.disabled||(y(t),w.onKeyDown?.(t))})}),ref:e=>{m.refs.setReference(e),typeof t==`function`?t(e):t&&(t.current=e)},children:[(0,G.jsx)(yn,{children:x}),!p&&(0,G.jsx)(A,{width:`14px`,color:e.invalid?u.warningRed:u.darkGrey,...!b&&e.clearable&&!e.disabled&&!e.readOnly?{type:`feather`,icon:`x`,onClick:e=>{e.stopPropagation(),C()},strokeWidth:`4px`}:{type:`feather`,icon:`chevron_down`}})]}),h.isMounted?(0,G.jsx)(ee,{children:(0,G.jsx)(_n,{ref:m.refs.setFloating,style:{...m.floatingStyles,"--height":`${_}px`},...g.getFloatingProps(),children:(0,G.jsx)(`div`,{children:(0,G.jsx)(S,{...e,menuId:v,onClose:()=>r(!1)})})})}):null]})}),wn=Object.assign(Cn,{OptionContainer:xn}),Cn.__docgenInfo={description:``,methods:[],displayName:`Select`}}));function En(){return En=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},En.apply(null,arguments)}var Dn=t((()=>{}));function On(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var kn=t((()=>{}));function An(e,t){if(e==null)return{};var n,r,i=On(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var jn=t((()=>{kn()}));function K(e){"@babel/helpers - typeof";return K=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},K(e)}var Mn=t((()=>{}));function Nn(e,t){if(K(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(K(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Pn=t((()=>{Mn()}));function Fn(e){var t=Nn(e,`string`);return K(t)==`symbol`?t:t+``}var In=t((()=>{Mn(),Pn()}));function Ln(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,Fn(r.key),r)}}function Rn(e,t,n){return t&&Ln(e.prototype,t),n&&Ln(e,n),Object.defineProperty(e,`prototype`,{writable:!1}),e}var zn=t((()=>{In()}));function Bn(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}var Vn=t((()=>{}));function Hn(e,t){return Hn=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},Hn(e,t)}var Un=t((()=>{}));function Wn(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Super expression must either be null or a function`);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,`prototype`,{writable:!1}),t&&Hn(e,t)}var Gn=t((()=>{Un()}));function Kn(e){return Kn=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},Kn(e)}var qn=t((()=>{}));function Jn(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Jn=function(){return!!e})()}var Yn=t((()=>{}));function Xn(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}var Zn=t((()=>{}));function Qn(e,t){if(t&&(K(t)==`object`||typeof t==`function`))return t;if(t!==void 0)throw TypeError(`Derived constructors may only return object or undefined`);return Xn(e)}var $n=t((()=>{Mn(),Zn()}));function er(e){var t=Jn();return function(){var n,r=Kn(e);if(t){var i=Kn(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return Qn(this,n)}}var tr=t((()=>{qn(),Yn(),$n()})),nr=n(((e,t)=>{t.exports=`SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED`})),rr=n(((e,t)=>{var n=nr();function r(){}function i(){}i.resetWarningCache=r,t.exports=function(){function e(e,t,r,i,a,o){if(o!==n){var s=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name=`Invariant Violation`,s}}e.isRequired=e;function t(){return e}var a={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:r};return a.PropTypes=a,a}})),ir=n(((e,t)=>{t.exports=rr()()}));function q(e,t,n){this.x=e,this.y=t,this.time=n||new Date().getTime()}function ar(e,t,n,r){this.startPoint=e,this.control1=t,this.control2=n,this.endPoint=r}function or(e,t,n){var r,i,a,o=null,s=0;n||={};var c=function(){s=n.leading===!1?0:Date.now(),o=null,a=e.apply(r,i),o||(r=i=null)};return function(){var l=Date.now();!s&&n.leading===!1&&(s=l);var u=t-(l-s);return r=this,i=arguments,u<=0||u>t?(o&&=(clearTimeout(o),null),s=l,a=e.apply(r,i),o||(r=i=null)):!o&&n.trailing!==!1&&(o=setTimeout(c,u)),a}}function J(e,t){var n=this,r=t||{};this.velocityFilterWeight=r.velocityFilterWeight||.7,this.minWidth=r.minWidth||.5,this.maxWidth=r.maxWidth||2.5,this.throttle=`throttle`in r?r.throttle:16,this.minDistance=`minDistance`in r?r.minDistance:5,this.throttle?this._strokeMoveUpdate=or(J.prototype._strokeUpdate,this.throttle):this._strokeMoveUpdate=J.prototype._strokeUpdate,this.dotSize=r.dotSize||function(){return(this.minWidth+this.maxWidth)/2},this.penColor=r.penColor||`black`,this.backgroundColor=r.backgroundColor||`rgba(0,0,0,0)`,this.onBegin=r.onBegin,this.onEnd=r.onEnd,this._canvas=e,this._ctx=e.getContext(`2d`),this.clear(),this._handleMouseDown=function(e){e.which===1&&(n._mouseButtonDown=!0,n._strokeBegin(e))},this._handleMouseMove=function(e){n._mouseButtonDown&&n._strokeMoveUpdate(e)},this._handleMouseUp=function(e){e.which===1&&n._mouseButtonDown&&(n._mouseButtonDown=!1,n._strokeEnd(e))},this._handleTouchStart=function(e){if(e.targetTouches.length===1){var t=e.changedTouches[0];n._strokeBegin(t)}},this._handleTouchMove=function(e){e.preventDefault();var t=e.targetTouches[0];n._strokeMoveUpdate(t)},this._handleTouchEnd=function(e){e.target===n._canvas&&(e.preventDefault(),n._strokeEnd(e))},this.on()}var sr=t((()=>{q.prototype.velocityFrom=function(e){return this.time===e.time?1:this.distanceTo(e)/(this.time-e.time)},q.prototype.distanceTo=function(e){return Math.sqrt((this.x-e.x)**2+(this.y-e.y)**2)},q.prototype.equals=function(e){return this.x===e.x&&this.y===e.y&&this.time===e.time},ar.prototype.length=function(){for(var e=10,t=0,n=void 0,r=void 0,i=0;i<=e;i+=1){var a=i/e,o=this._point(a,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),s=this._point(a,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(i>0){var c=o-n,l=s-r;t+=Math.sqrt(c*c+l*l)}n=o,r=s}return t},ar.prototype._point=function(e,t,n,r,i){return t*(1-e)*(1-e)*(1-e)+3*n*(1-e)*(1-e)*e+3*r*(1-e)*e*e+i*e*e*e},J.prototype.clear=function(){var e=this._ctx,t=this._canvas;e.fillStyle=this.backgroundColor,e.clearRect(0,0,t.width,t.height),e.fillRect(0,0,t.width,t.height),this._data=[],this._reset(),this._isEmpty=!0},J.prototype.fromDataURL=function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=new Image,i=n.ratio||window.devicePixelRatio||1,a=n.width||this._canvas.width/i,o=n.height||this._canvas.height/i;this._reset(),r.src=e,r.onload=function(){t._ctx.drawImage(r,0,0,a,o)},this._isEmpty=!1},J.prototype.toDataURL=function(e){var t;switch(e){case`image/svg+xml`:return this._toSVG();default:var n=[...arguments].slice(1);return(t=this._canvas).toDataURL.apply(t,[e].concat(n))}},J.prototype.on=function(){this._handleMouseEvents(),this._handleTouchEvents()},J.prototype.off=function(){this._canvas.removeEventListener(`mousedown`,this._handleMouseDown),this._canvas.removeEventListener(`mousemove`,this._handleMouseMove),document.removeEventListener(`mouseup`,this._handleMouseUp),this._canvas.removeEventListener(`touchstart`,this._handleTouchStart),this._canvas.removeEventListener(`touchmove`,this._handleTouchMove),this._canvas.removeEventListener(`touchend`,this._handleTouchEnd)},J.prototype.isEmpty=function(){return this._isEmpty},J.prototype._strokeBegin=function(e){this._data.push([]),this._reset(),this._strokeUpdate(e),typeof this.onBegin==`function`&&this.onBegin(e)},J.prototype._strokeUpdate=function(e){var t=e.clientX,n=e.clientY,r=this._createPoint(t,n),i=this._data[this._data.length-1],a=i&&i[i.length-1],o=a&&r.distanceTo(a)<this.minDistance;if(!(a&&o)){var s=this._addPoint(r),c=s.curve,l=s.widths;c&&l&&this._drawCurve(c,l.start,l.end),this._data[this._data.length-1].push({x:r.x,y:r.y,time:r.time,color:this.penColor})}},J.prototype._strokeEnd=function(e){var t=this.points.length>2,n=this.points[0];if(!t&&n&&this._drawDot(n),n){var r=this._data[this._data.length-1],i=r[r.length-1];n.equals(i)||r.push({x:n.x,y:n.y,time:n.time,color:this.penColor})}typeof this.onEnd==`function`&&this.onEnd(e)},J.prototype._handleMouseEvents=function(){this._mouseButtonDown=!1,this._canvas.addEventListener(`mousedown`,this._handleMouseDown),this._canvas.addEventListener(`mousemove`,this._handleMouseMove),document.addEventListener(`mouseup`,this._handleMouseUp)},J.prototype._handleTouchEvents=function(){this._canvas.style.msTouchAction=`none`,this._canvas.style.touchAction=`none`,this._canvas.addEventListener(`touchstart`,this._handleTouchStart),this._canvas.addEventListener(`touchmove`,this._handleTouchMove),this._canvas.addEventListener(`touchend`,this._handleTouchEnd)},J.prototype._reset=function(){this.points=[],this._lastVelocity=0,this._lastWidth=(this.minWidth+this.maxWidth)/2,this._ctx.fillStyle=this.penColor},J.prototype._createPoint=function(e,t,n){var r=this._canvas.getBoundingClientRect();return new q(e-r.left,t-r.top,n||new Date().getTime())},J.prototype._addPoint=function(e){var t=this.points,n=void 0;if(t.push(e),t.length>2){t.length===3&&t.unshift(t[0]),n=this._calculateCurveControlPoints(t[0],t[1],t[2]);var r=n.c2;n=this._calculateCurveControlPoints(t[1],t[2],t[3]);var i=n.c1,a=new ar(t[1],r,i,t[2]),o=this._calculateCurveWidths(a);return t.shift(),{curve:a,widths:o}}return{}},J.prototype._calculateCurveControlPoints=function(e,t,n){var r=e.x-t.x,i=e.y-t.y,a=t.x-n.x,o=t.y-n.y,s={x:(e.x+t.x)/2,y:(e.y+t.y)/2},c={x:(t.x+n.x)/2,y:(t.y+n.y)/2},l=Math.sqrt(r*r+i*i),u=Math.sqrt(a*a+o*o),d=s.x-c.x,f=s.y-c.y,p=u/(l+u),m={x:c.x+d*p,y:c.y+f*p},h=t.x-m.x,g=t.y-m.y;return{c1:new q(s.x+h,s.y+g),c2:new q(c.x+h,c.y+g)}},J.prototype._calculateCurveWidths=function(e){var t=e.startPoint,n=e.endPoint,r={start:null,end:null},i=this.velocityFilterWeight*n.velocityFrom(t)+(1-this.velocityFilterWeight)*this._lastVelocity,a=this._strokeWidth(i);return r.start=this._lastWidth,r.end=a,this._lastVelocity=i,this._lastWidth=a,r},J.prototype._strokeWidth=function(e){return Math.max(this.maxWidth/(e+1),this.minWidth)},J.prototype._drawPoint=function(e,t,n){var r=this._ctx;r.moveTo(e,t),r.arc(e,t,n,0,2*Math.PI,!1),this._isEmpty=!1},J.prototype._drawCurve=function(e,t,n){var r=this._ctx,i=n-t,a=Math.floor(e.length());r.beginPath();for(var o=0;o<a;o+=1){var s=o/a,c=s*s,l=c*s,u=1-s,d=u*u,f=d*u,p=f*e.startPoint.x;p+=3*d*s*e.control1.x,p+=3*u*c*e.control2.x,p+=l*e.endPoint.x;var m=f*e.startPoint.y;m+=3*d*s*e.control1.y,m+=3*u*c*e.control2.y,m+=l*e.endPoint.y;var h=t+l*i;this._drawPoint(p,m,h)}r.closePath(),r.fill()},J.prototype._drawDot=function(e){var t=this._ctx,n=typeof this.dotSize==`function`?this.dotSize():this.dotSize;t.beginPath(),this._drawPoint(e.x,e.y,n),t.closePath(),t.fill()},J.prototype._fromData=function(e,t,n){for(var r=0;r<e.length;r+=1){var i=e[r];if(i.length>1)for(var a=0;a<i.length;a+=1){var o=i[a],s=new q(o.x,o.y,o.time),c=o.color;if(a===0)this.penColor=c,this._reset(),this._addPoint(s);else if(a!==i.length-1){var l=this._addPoint(s),u=l.curve,d=l.widths;u&&d&&t(u,d,c)}}else{this._reset();var f=i[0];n(f)}}},J.prototype._toSVG=function(){var e=this,t=this._data,n=this._canvas,r=Math.max(window.devicePixelRatio||1,1),i=0,a=0,o=n.width/r,s=n.height/r,c=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);c.setAttributeNS(null,`width`,n.width),c.setAttributeNS(null,`height`,n.height),this._fromData(t,function(e,t,n){var r=document.createElement(`path`);if(!isNaN(e.control1.x)&&!isNaN(e.control1.y)&&!isNaN(e.control2.x)&&!isNaN(e.control2.y)){var i=`M `+e.startPoint.x.toFixed(3)+`,`+e.startPoint.y.toFixed(3)+` `+(`C `+e.control1.x.toFixed(3)+`,`+e.control1.y.toFixed(3)+` `)+(e.control2.x.toFixed(3)+`,`+e.control2.y.toFixed(3)+` `)+(e.endPoint.x.toFixed(3)+`,`+e.endPoint.y.toFixed(3));r.setAttribute(`d`,i),r.setAttribute(`stroke-width`,(t.end*2.25).toFixed(3)),r.setAttribute(`stroke`,n),r.setAttribute(`fill`,`none`),r.setAttribute(`stroke-linecap`,`round`),c.appendChild(r)}},function(t){var n=document.createElement(`circle`),r=typeof e.dotSize==`function`?e.dotSize():e.dotSize;n.setAttribute(`r`,r),n.setAttribute(`cx`,t.x),n.setAttribute(`cy`,t.y),n.setAttribute(`fill`,t.color),c.appendChild(n)});var l=`data:image/svg+xml;base64,`,u=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"`+(` viewBox="`+i+` `+a+` `+o+` `+s+`"`)+(` width="`+o+`"`)+(` height="`+s+`"`)+`>`,d=c.innerHTML;if(d===void 0){var f=document.createElement(`dummy`),p=c.childNodes;f.innerHTML=``;for(var m=0;m<p.length;m+=1)f.appendChild(p[m].cloneNode(!0));d=f.innerHTML}var h=u+d+`</svg>`;return l+btoa(h)},J.prototype.fromData=function(e){var t=this;this.clear(),this._fromData(e,function(e,n){return t._drawCurve(e,n.start,n.end)},function(e){return t._drawDot(e)}),this._data=e},J.prototype.toData=function(){return this._data}})),cr=n(((e,t)=>{(function(n,r){typeof e==`object`&&typeof t==`object`?t.exports=r():typeof define==`function`&&define.amd?define([],r):typeof e==`object`?e.trimCanvas=r():n.trimCanvas=r()})(e,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p=``,t(0)}([function(e,t){function n(e){var t=e.getContext(`2d`),n=e.width,r=e.height,i=t.getImageData(0,0,n,r).data,s=a(!0,n,r,i),c=a(!1,n,r,i),l=o(!0,n,r,i),u=o(!1,n,r,i)-l+1,d=c-s+1,f=t.getImageData(l,s,u,d);return e.width=u,e.height=d,t.clearRect(0,0,u,d),t.putImageData(f,0,0),e}function r(e,t,n,r){return{red:r[4*(n*t+e)],green:r[4*(n*t+e)+1],blue:r[4*(n*t+e)+2],alpha:r[4*(n*t+e)+3]}}function i(e,t,n,i){return r(e,t,n,i).alpha}function a(e,t,n,r){for(var a=e?1:-1,o=e?0:n-1;e?o<n:o>-1;o+=a)for(var s=0;s<t;s++)if(i(s,o,t,r))return o;return null}function o(e,t,n,r){for(var a=e?1:-1,o=e?0:t-1;e?o<t:o>-1;o+=a)for(var s=0;s<n;s++)if(i(o,s,t,r))return o;return null}Object.defineProperty(t,`__esModule`,{value:!0}),t.default=n}])})})),Y,lr,ur,dr,X,fr=t((()=>{Dn(),jn(),zn(),Vn(),Gn(),tr(),Y=e(ir(),1),lr=e(r(),1),sr(),ur=e(cr(),1),dr=[`canvasProps`,`clearOnResize`],X=function(e){Wn(n,e);var t=er(n);function n(){var e;Bn(this,n);var r=[...arguments];return e=t.call.apply(t,[this].concat(r)),e.staticThis=e.constructor,e._sigPad=null,e._canvas=null,e.setRef=function(t){e._canvas=t,e._canvas===null&&(e._sigPad=null)},e._excludeOurProps=function(){var t=e.props;return t.canvasProps,t.clearOnResize,An(t,dr)},e.componentDidMount=function(){var t=e.getCanvas();e._sigPad=new J(t,e._excludeOurProps()),e._resizeCanvas(),e.on()},e.componentWillUnmount=function(){e.off()},e.componentDidUpdate=function(){Object.assign(e._sigPad,e._excludeOurProps())},e.getCanvas=function(){if(e._canvas===null)throw e.staticThis.refNullError;return e._canvas},e.getTrimmedCanvas=function(){var t=e.getCanvas(),n=document.createElement(`canvas`);return n.width=t.width,n.height=t.height,n.getContext(`2d`).drawImage(t,0,0),(0,ur.default)(n)},e.getSignaturePad=function(){if(e._sigPad===null)throw e.staticThis.refNullError;return e._sigPad},e._checkClearOnResize=function(){e.props.clearOnResize&&e._resizeCanvas()},e._resizeCanvas=function(){var t=e.props.canvasProps??{},n=t.width,r=t.height;if(!(n!==void 0&&r!==void 0)){var i=e.getCanvas(),a=Math.max(window.devicePixelRatio??1,1);n===void 0&&(i.width=i.offsetWidth*a),r===void 0&&(i.height=i.offsetHeight*a),i.getContext(`2d`).scale(a,a),e.clear()}},e.render=function(){var t=e.props.canvasProps;return lr.createElement(`canvas`,En({ref:e.setRef},t))},e.on=function(){return window.addEventListener(`resize`,e._checkClearOnResize),e.getSignaturePad().on()},e.off=function(){return window.removeEventListener(`resize`,e._checkClearOnResize),e.getSignaturePad().off()},e.clear=function(){return e.getSignaturePad().clear()},e.isEmpty=function(){return e.getSignaturePad().isEmpty()},e.fromDataURL=function(t,n){return e.getSignaturePad().fromDataURL(t,n)},e.toDataURL=function(t,n){return e.getSignaturePad().toDataURL(t,n)},e.fromData=function(t){return e.getSignaturePad().fromData(t)},e.toData=function(){return e.getSignaturePad().toData()},e}return Rn(n)}(lr.Component),X.propTypes={velocityFilterWeight:Y.default.number,minWidth:Y.default.number,maxWidth:Y.default.number,minDistance:Y.default.number,dotSize:Y.default.oneOfType([Y.default.number,Y.default.func]),penColor:Y.default.string,throttle:Y.default.number,onEnd:Y.default.func,onBegin:Y.default.func,canvasProps:Y.default.object,clearOnResize:Y.default.bool},X.defaultProps={clearOnResize:!0},X.refNullError=Error(`react-signature-canvas is currently mounting or unmounting: React refs are null during this phase.`)})),pr,mr,hr=t((()=>{o(),pr=s.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacings.s3};
`,mr=s.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  background-color: ${({theme:e,$invalid:t})=>t?e.getColor(`warningRed`,5):e.colors.white};

  &[data-placeholder]:before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    color: ${({theme:e,$invalid:t})=>e.colors[t?`warningRed`:`darkBlue`]};

    ${({theme:e})=>e.useTypography(`h1`)}
    font-size: 59px;
    line-height: 71px;
    opacity: 0.1;
    z-index: 1;
  }

  canvas {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid
      ${({theme:e,$invalid:t})=>e.colors[t?`warningRed`:`lightGrey`]};
    border-radius: 4px;
    z-index: 2;
  }

  /* icons container */
  > div:nth-child(1) {
    position: absolute;
    top: ${({theme:e})=>e.spacings.s3};
    right: ${({theme:e})=>e.spacings.s3};
    display: flex;
    gap: ${({theme:e})=>e.spacings.s1};
    z-index: 3;

    > button {
      padding: 0;
      outline: none;
      border: none;
      background: none;

      > i.icon,
      > i.icon:before {
        color: #4e4e4e;
        font-size: 20px;
        line-height: 20px;
        width: 20px;
      }

      &:not(:disabled) {
        cursor: pointer;
      }
      &:disabled {
        opacity: 0.5;
      }

      transition: opacity 0.25s linear;
    }
  }
`})),Z,Q,$,gr,_r,vr,yr=t((()=>{br(),Z=e(r(),1),fr(),l(),c(),ue(),hr(),Q=d(),$=[`GreatVibes`,`Pacifico`,`Allura`],gr=64,_r=()=>{},vr=({setValue:e,value:t,penColor:n,backgroundColor:r,invalid:i,label:a=`Digite seu nome`,inputPlaceholder:o=`Digite seu nome`,canvasPlaceholder:s=`Assine aqui`,onBegin:c=_r,onEnd:l=_r,...d})=>{let[m,h]=(0,Z.useState)(``),[g,_]=(0,Z.useState)($[0]),[v,y]=(0,Z.useState)(!0),[b,x]=(0,Z.useState)(!1),[S,C]=(0,Z.useState)(null);(0,Z.useEffect)(()=>{if(!S)return;let e=()=>{S.isEmpty()&&!t||S.toDataURL(`image/png`)!==t&&(S.clear(),S.fromDataURL(t))};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[S,t]);let w=(0,Z.useCallback)(async(t,n)=>{if(!S)return;let r=t.trim();if(r.length<1)return;x(!0);let i=await p(f[n],gr,r);if(x(!1),!i)return;let a=document.createElement(`canvas`);a.width=S.getCanvas().width,a.height=S.getCanvas().height;let o=a.getContext(`2d`);if(!o)return;o.clearRect(0,0,a.width,a.height),o.fillStyle=`#000`,o.textAlign=`center`,o.textBaseline=`middle`,o.font=`${gr}px ${f[n]}`,o.fillText(r,a.width/2,a.height/2);let s=a.toDataURL(`image/png`);S.clear(),S.fromDataURL(s),e(s)},[S]),T=(0,Z.useCallback)(e=>{c(e,S),y(!1)},[S,c]),ee=(0,Z.useCallback)(t=>{l(t,S),!(!S||S.isEmpty())&&e(S.toDataURL(`image/png`))},[S,l]),E=(0,Z.useCallback)(()=>{w(m,g)},[m,g,w]),D=(0,Z.useCallback)(()=>{S&&(y(!0),h(``),S.clear(),e(``))},[S]),O=(0,Z.useMemo)(()=>!t&&(!S||S.isEmpty()),[S,t]);return(0,Q.jsxs)(pr,{children:[(0,Q.jsx)(de,{label:a,value:m,onChange:e=>{h(e.target.value)},onPressEnter:E,placeholder:o,style:{width:`100%`,marginBottom:8},disabled:b,...m?{icon:{icon:{type:`feather`,icon:`edit`,onClick:E}}}:{}}),(0,Q.jsxs)(mr,{$invalid:i,...v&&!t?{"data-placeholder":s}:{},children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`button`,{type:`button`,onClick:()=>{let e=$.findIndex(e=>e===g);if(e<0)return;let t=e<$.length-1?e+1:0;_($[t]),w(m,$[t])},disabled:b||m.trim().length<1,title:`Trocar fonte`,children:(0,Q.jsx)(A,{type:`feather`,icon:`type`})}),(0,Q.jsx)(`button`,{type:`button`,onClick:()=>{!S||S.isEmpty()||e(S.getTrimmedCanvas().toDataURL(`image/png`))},disabled:O,title:`Recortar`,children:(0,Q.jsx)(A,{type:`feather`,icon:`scissors`})}),(0,Q.jsx)(`button`,{onClick:D,disabled:O,title:`Limpar`,children:(0,Q.jsx)(A,{type:`feather`,icon:`delete`})})]}),(0,Q.jsx)(X,{ref:C,...d,penColor:u[n||`black`],...r?{backgroundColor:u[r]}:{},onBegin:T,onEnd:ee})]})]})},vr.__docgenInfo={description:``,methods:[],displayName:`SignatureInput`,props:{setValue:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(base64: string) => void`,signature:{arguments:[{type:{name:`string`},name:`base64`}],return:{name:`void`}}},description:``},value:{required:!0,tsType:{name:`string`},description:``},penColor:{required:!1,tsType:{name:`unknown`},description:``},backgroundColor:{required:!1,tsType:{name:`unknown`},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},label:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``,defaultValue:{value:`'Digite seu nome'`,computed:!1}},inputPlaceholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Digite seu nome'`,computed:!1}},canvasPlaceholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Assine aqui'`,computed:!1}},onBegin:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: MouseEvent, ref: SignatureCanvas | null) => void`,signature:{arguments:[{type:{name:`MouseEvent`},name:`event`},{type:{name:`union`,raw:`SignatureCanvas | null`,elements:[{name:`SignatureCanvas`},{name:`null`}]},name:`ref`}],return:{name:`void`}}},description:``,defaultValue:{value:`() => {}`,computed:!1}},onEnd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: MouseEvent, ref: SignatureCanvas | null) => void`,signature:{arguments:[{type:{name:`MouseEvent`},name:`event`},{type:{name:`union`,raw:`SignatureCanvas | null`,elements:[{name:`SignatureCanvas`},{name:`null`}]},name:`ref`}],return:{name:`void`}}},description:``,defaultValue:{value:`() => {}`,computed:!1}}}}})),br=t((()=>{m(),ne(),k(),fe(),le(),_e(),ve(),se(),ye(),ae(),oe(),he(),ge(),O(),C(),xe(),be(),Se(),Ye(),Ue(),b(),Tn(),yr(),We(),Ge(),Ke(),D(),qe()}));export{wn as i,vr as n,yr as r,br as t};