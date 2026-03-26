import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Indicator-DcmOLqNJ.js";import{n as o,t as s}from"./AppliedFilters-bKWkQ42s.js";var c,l=t((()=>{c={}})),u,d,f=t((()=>{n(),i(),u=r(),d=Array(30).fill(1).map((e,t)=>{let n=(t+1).toString().padStart(2,`0`);return{name:`filtro_${n}`,labels:{filter:{text:`Filtro ${n}`,element:`Filtro ${n}`},option:{text:`Opção ${n}`,element:(0,u.jsx)(a,{labelColor:`black`,size:`small`,type:t%2==0?`danger`:`success`,children:`Opção ${n}`})}},value:1}})})),p,m,h,g,_;t((()=>{p=e(n(),1),o(),l(),f(),m=r(),h={id:`AppliedFilters`,title:`Components/Filters/AppliedFilters`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},g={render:e=>{let[t,n]=(0,p.useState)([...d]);return(0,p.useEffect)(()=>{console.log({appliedFilters:t})},[t]),(0,m.jsx)(`div`,{style:{position:`relative`},children:(0,m.jsx)(s,{...e,appliedFilters:[t,n]})})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([...mock]);
    useEffect(() => {
      console.log({
        appliedFilters
      });
    }, [appliedFilters]);
    return <div style={{
      position: 'relative'
    }}>
        <AppliedFilters {...args} appliedFilters={[appliedFilters, setAppliedFilters]} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_=[`AppliedFiltersStory`]}))();export{g as AppliedFiltersStory,_ as __namedExportsOrder,h as default};