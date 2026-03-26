import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./DatePicker-C76aInPF.js";import{n as o,t as s}from"./services-CzkwhazY.js";var c,l=t((()=>{c={borderless:{description:`Define if the input has no borders.`,table:{defaultValue:{summary:`false`}},control:`boolean`},paddingless:{description:`Define if the input has no padding.`,table:{defaultValue:{summary:`false`}},control:`boolean`}}})),u,d,f,p,m;t((()=>{u=e(n(),1),i(),o(),l(),d=r(),f={id:`DatePicker`,title:`Components/Input/type="datepicker"`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},p={args:{borderless:!1,paddingless:!1},render:e=>{let[t,n]=(0,u.useState)(``);return(0,d.jsx)(a,{...e,type:`datepicker`,value:t,setValue:n,min:new Date(`2022-06-05 00:00:00`),max:new Date(`2022-06-29 00:00:00`),picker:{onChangeMonth:async e=>{let t=await s(``,1);console.log({calendar:e,response:t})},getDay:e=>({indicator:[`warning`,`success`,`danger`][e.getDate()%3]})}})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    borderless: false,
    paddingless: false
  },
  render: args => {
    const [value, setValue] = useState<string>('');
    return <DatePicker {...args} type='datepicker' value={value} setValue={setValue} min={new Date('2022-06-05 00:00:00')} max={new Date('2022-06-29 00:00:00')} picker={{
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
}`,...p.parameters?.docs?.source}}},m=[`DatePickerStory`]}))();export{p as DatePickerStory,m as __namedExportsOrder,f as default};