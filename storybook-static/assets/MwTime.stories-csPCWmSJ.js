import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Time-DauZdfUC.js";var o,s=t((()=>{o={label:{description:`Input label.`,table:{defaultValue:{summary:`Label`}}},placeholder:{description:`Input placeholder.`,table:{defaultValue:{summary:`Text`}},control:`text`},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},loading:{description:`Define if input is loading.`,table:{defaultValue:{summary:`false`}},control:`boolean`},clearable:{description:`Define if input is clearable.`,table:{defaultValue:{summary:`false`}},control:`boolean`},setValue:{description:`Define if input is clearable and it's function.`},type:{description:`Input type.`,table:{defaultValue:{summary:`time`}}},icon:{description:`Input type.`}}})),c,l,u,d,f;t((()=>{c=e(n(),1),i(),s(),l=r(),u={id:`Time`,title:`Components/Input/type="time"`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:o},d={args:{label:`Label`,required:!1,disabled:!1,invalid:!1,loading:!1,clearable:!1,setValue:e=>{console.log(`set value to: "${e}"`)},type:`time`,icon:{icon:{type:`feather`,icon:`clock`,color:`blue`,onClick:()=>{console.log(`icon clicked`)}}}},render:e=>{let[t,n]=(0,c.useState)(``);return(0,c.useEffect)(()=>{console.log({value:t})},[t]),(0,l.jsx)(a,{...e,type:`time`,value:t,setValue:n})}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
    type: 'time',
    icon: {
      icon: {
        type: 'feather',
        icon: 'clock',
        color: 'blue',
        onClick: () => {
          console.log('icon clicked');
        }
      }
    }
  },
  render: args => {
    const [value, setValue] = useState<string>('');
    useEffect(() => {
      console.log({
        value
      });
    }, [value]);
    return <Time {...args} type='time' value={value} setValue={setValue} />;
  }
}`,...d.parameters?.docs?.source}}},f=[`TimeStory`]}))();export{d as TimeStory,f as __namedExportsOrder,u as default};