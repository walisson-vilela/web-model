import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Tags-BKlMfIx8.js";var o,s=t((()=>{o={label:{description:`text that will be next to the input`,table:{defaultValue:{summary:``}}},placeholder:{description:`text that will be next to the input`},disabled:{description:`Define if the button is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},required:{description:`Define if the button is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if the button is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},unique:{description:`Define if the tags should be unique.`,table:{defaultValue:{summary:`false`}},control:`boolean`},maxTags:{description:`Define if the max number of tags.`},paddingless:{description:`Define if the tags should be paddingless.`,table:{defaultValue:{summary:`false`}},control:`boolean`},borderless:{description:`Define if the tags should be borderless.`,table:{defaultValue:{summary:`false`}},control:`boolean`},type:{description:`Input type.`,table:{defaultValue:{summary:`tags`}}},onBeforeAdd:{description:`Method called before add a new tag`},onBlur:{description:`Method called when an element loses focus`}}})),c,l,u,d,f;t((()=>{c=e(n(),1),i(),s(),l=r(),u={id:`Tags`,title:`Components/Input/type="tags"`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:o},d={args:{label:`Input label`,placeholder:`Input placeholder`,disabled:!1,required:!1,invalid:!1,unique:!1,maxTags:1/0,paddingless:!1,borderless:!1,type:`tags`,onBeforeAdd:e=>e},render:e=>{let[t,n]=(0,c.useState)([]);return(0,c.useEffect)(()=>{console.log(`new value`,t)},[t]),(0,l.jsx)(a,{...e,type:`tags`,value:t,setValue:n,validate:e=>(console.log({value:e}),e.length>1)})}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Input label',
    placeholder: 'Input placeholder',
    disabled: false,
    required: false,
    invalid: false,
    unique: false,
    maxTags: Number.POSITIVE_INFINITY,
    paddingless: false,
    borderless: false,
    type: 'tags',
    onBeforeAdd: (v: string) => v
  },
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    useEffect(() => {
      console.log('new value', value);
    }, [value]);
    return <Tags {...args} type='tags' value={value} setValue={setValue} validate={(value: string) => {
      console.log({
        value
      });
      return value.length > 1;
    }} />;
  }
}`,...d.parameters?.docs?.source}}},f=[`TagsStory`]}))();export{d as TagsStory,f as __namedExportsOrder,u as default};