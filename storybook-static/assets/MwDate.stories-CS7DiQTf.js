import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Date-Fj7A3oMj.js";import{n as o,t as s}from"./services-CzkwhazY.js";var c,l=t((()=>{c={label:{description:`Input label.`,table:{defaultValue:{summary:`Label`}}},placeholder:{description:`Input placeholder.`,table:{defaultValue:{summary:`Text`}},control:`text`},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},loading:{description:`Define if input is loading.`,table:{defaultValue:{summary:`false`}},control:`boolean`},clearable:{description:`Define if input is clearable.`,table:{defaultValue:{summary:`false`}},control:`boolean`},setValue:{description:`Define if input is clearable and it's function.`},type:{description:`Input type.`,table:{defaultValue:{summary:`date`}}}}})),u,d,f,p,m;t((()=>{u=e(n(),1),i(),o(),l(),d=r(),f={id:`Date`,title:`Components/Input/type="date"`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},p={args:{label:`Label`,required:!1,disabled:!1,invalid:!1,loading:!1,clearable:!1,setValue:e=>{console.log(`set value to: "${e}"`)},type:`date`},render:e=>{let[t,n]=(0,u.useState)(``);return(0,d.jsx)(a,{...e,type:`date`,value:t,setValue:n,picker:{onChangeMonth:async e=>{let t=await s(``,1);console.log({calendar:e,response:t})},getDay:e=>({indicator:[`warning`,`success`,`danger`][e.getDate()%3]})}})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    required: false,
    disabled: false,
    invalid: false,
    loading: false,
    clearable: false,
    setValue: (value: string) => {
      console.log(\`set value to: "\${value}"\`);
    },
    type: 'date'
  },
  render: args => {
    const [value, setValue] = useState<string>('');
    return <Date {...args} type='date' value={value} setValue={setValue} picker={{
      onChangeMonth: async calendar => {
        const response = await getStarWars('', 1);
        console.log({
          calendar,
          response
        });
      },
      getDay: day => ({
        indicator: (['warning', 'success', 'danger'] as const)[day.getDate() % 3]
      })
    }} />;
  }
}`,...p.parameters?.docs?.source}}},m=[`DateStory`]}))();export{p as DateStory,m as __namedExportsOrder,f as default};