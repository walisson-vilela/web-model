import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./validators-Chja94ks.js";import{i as o,n as s,r as c,t as l}from"./Input-CNfwAAHR.js";import{n as u,t as d}from"./services-CzkwhazY.js";var f,p=t((()=>{f={borderless:{description:`Define if the input has no borders.`,table:{defaultValue:{summary:`false`}},control:`boolean`},paddingless:{description:`Define if the input has no padding.`,table:{defaultValue:{summary:`false`}},control:`boolean`}}})),m,h,g,_,v;t((()=>{m=e(n(),1),s(),o(),i(),u(),p(),h=r(),g={id:`DateIntervalPicker`,title:`Components/Input/type="date-interval-picker"`,component:c,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:f},_={args:{borderless:!1,paddingless:!1},render:e=>{let[t,n]=(0,m.useState)(l.useDefaultDateIntervalState);return(0,m.useEffect)(()=>{console.log(`value`,t)},[t]),(0,h.jsx)(c,{...e,type:`date-interval-picker`,value:t,setValue:n,calendar:{onChangeMonth:async e=>{let t=await d(``,1);console.log({calendar:e,response:t})},getDay:e=>({indicator:[`warning`,`success`,`danger`][e.getDate()%3]}),time:[e=>e&&a(e,new Date,`eq`,!1)?void 0:{},{}]}})}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    borderless: false,
    paddingless: false
  },
  render: args => {
    const [value, setValue] = useState<[string, string]>(Input.useDefaultDateIntervalState);
    useEffect(() => {
      console.log('value', value);
    }, [value]);
    return <DateIntervalPicker {...args} type='date-interval-picker' value={value} setValue={setValue} calendar={{
      onChangeMonth: async calendar => {
        const response = await getStarWars('', 1);
        console.log({
          calendar,
          response
        });
      },
      getDay: day => ({
        indicator: (['warning', 'success', 'danger'] as const)[day.getDate() % 3]
      }),
      time: [value => {
        return value && dateCompare(value, new Date(), 'eq', false) ? undefined : {};
      }, {}]
    }} />;
  }
}`,..._.parameters?.docs?.source}}},v=[`DateIntervalPickerStory`]}))();export{_ as DateIntervalPickerStory,v as __namedExportsOrder,g as default};