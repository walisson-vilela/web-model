import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Form-BqpbciIA.js";import{n as o,t as s}from"./Range-UlpF-Ye4.js";var c,l=t((()=>{c={name:{description:`Form field name. Required to Form Context to work`,table:{defaultValue:{summary:`Name`}},control:`text`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},viewMode:{description:`Define if input is viewMode.`,table:{defaultValue:{summary:`false`}},control:`boolean`}}})),u,d,f,p,m;t((()=>{u=e(n(),1),i(),o(),l(),d=r(),f={id:`Range`,title:`Components/Input/type="range"`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:c},p={args:{name:`name`,disabled:!1,invalid:!1,required:!1,viewMode:!1},render:e=>{let[t,n]=(0,u.useState)(50);return(0,u.useEffect)(()=>{console.log(`Changed value to`,t)},[t]),(0,d.jsx)(`div`,{style:{marginTop:`50px`,marginLeft:`100px`,width:`200px`},children:(0,d.jsx)(a,{children:(0,d.jsx)(s,{...e,type:`range`,value:t,setValue:n,markers:{markers:[-50,0,50,100],position:`top`,strict:!0},step:`1`})})})}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    // label: 'Label',
    name: 'name',
    // minLabel: 'Minimum',
    // maxLabel: 'Maximum',
    disabled: false,
    invalid: false,
    required: false,
    viewMode: false
    // step: 5,
  },
  render: args => {
    const [value, setValue] = useState<number>(50);
    useEffect(() => {
      console.log('Changed value to', value);
    }, [value]);
    return <div style={{
      marginTop: '50px',
      marginLeft: '100px',
      width: '200px'
    }}>
        <Form>
          <Range {...args} type='range' value={value} setValue={setValue as React.Dispatch<React.SetStateAction<number>>} markers={{
          markers: [-50, 0, 50, 100],
          position: 'top',
          strict: true
        }} step='1' />
        </Form>
      </div>;
  }
}`,...p.parameters?.docs?.source}}},m=[`RangeStory`]}))();export{p as RangeStory,m as __namedExportsOrder,f as default};