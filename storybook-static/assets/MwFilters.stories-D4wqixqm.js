import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Filters-D92z1VrF.js";import{n as o,t as s}from"./services-CzkwhazY.js";var c,l=t((()=>{c={items:{description:`Define the menu options.`}}})),u,d,f,p,m;t((()=>{u=e(n(),1),i(),o(),l(),d=r(),f={id:`Filters`,title:`Components/Filters/Filters`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},p={args:{items:Array(10).fill(1).map((e,t)=>{let n=t+1;return t===0?{label:`Personagem de Star Wars`,name:`star_wars_person`,allowEmptySearch:!0,delimiter:!0,options:async(e,t)=>{let n=await s(e,t),r=!n.next;return{options:(n.results||[]).map(e=>({label:e.name,value:e.url})),lastPage:r}}}:{label:`Item ${n}`,name:`item_${n}`,options:Array(10).fill(1).map((e,t)=>{let r=t+1;return{label:`Subtem - ${n}.${r}`,value:r}})}})},render:e=>{let[t,n]=(0,u.useState)([]);return(0,u.useEffect)(()=>{console.log({appliedFilters:t})},[t]),(0,d.jsx)(`div`,{style:{position:`relative`},children:(0,d.jsx)(a,{...e,setAppliedFilters:n})})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: Array(10).fill(1).map<Filter>((_v, index) => {
      const i = index + 1;
      if (index === 0) {
        return {
          label: 'Personagem de Star Wars',
          name: 'star_wars_person',
          allowEmptySearch: true,
          delimiter: true,
          options: async (search, page) => {
            const responseData = await getStarWars(search, page);

            // setando se a pagina atual e a ultima
            const lastPage = !responseData.next;
            // pegando os resultados da requisicao
            const results = (responseData.results || []) as {
              name: string;
              url: string;
            }[];
            return {
              options: results.map<Option>(e => ({
                label: e.name,
                value: e.url
              })),
              lastPage
            };
          }
        };
      }
      return {
        label: \`Item \${i}\`,
        name: \`item_\${i}\`,
        options: Array(10).fill(1).map((v, index) => {
          const j = index + 1;
          return {
            label: \`Subtem - \${i}.\${j}\`,
            value: j
          };
        })
      };
    })
  },
  render: args => {
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
    useEffect(() => {
      console.log({
        appliedFilters
      });
    }, [appliedFilters]);
    return <div style={{
      position: 'relative'
    }}>
        <Filters {...args} setAppliedFilters={setAppliedFilters} />
      </div>;
  }
}`,...p.parameters?.docs?.source}}},m=[`FiltersStory`]}))();export{p as FiltersStory,m as __namedExportsOrder,f as default};