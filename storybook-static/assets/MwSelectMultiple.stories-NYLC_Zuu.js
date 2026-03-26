import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Form-BqpbciIA.js";import{n as o,t as s}from"./Select-DRtM5LFv.js";import{n as c,t as l}from"./services-CzkwhazY.js";var u,d=t((()=>{u={label:{description:`Input label.`,table:{defaultValue:{summary:`Label`}}},name:{description:`Form field name. Required to Form Context to work`,table:{defaultValue:{summary:`Name`}},control:`text`},placeholder:{description:`Input placeholder.`,table:{defaultValue:{summary:`Text`}},control:`text`},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},selectAll:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},loading:{description:`Define if input is loading.`,table:{defaultValue:{summary:`false`}},control:`boolean`},search:{description:`Define if input has search filter.`,table:{defaultValue:{summary:`false`}},control:`boolean`},minSelected:{description:`Minimum number of selected options. Only enforced when set; if higher than maxSelected, the component flags an error and does not apply limits.`,table:{defaultValue:{summary:`undefined`}},control:{type:`number`,min:0}},maxSelected:{description:`Maximum number of selected options. Only enforced when set; if lower than minSelected, the component flags an error and does not apply limits.`,table:{defaultValue:{summary:`undefined`}},control:{type:`number`,min:0}}}})),f,p,m,h,g,_,v;t((()=>{f=e(n(),1),i(),o(),c(),d(),p=r(),m={id:`SelectMultiple`,title:`Components/Input/type="select-multiple"`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:u},h=[{name:`Wilhuff Tarkin`,height:`180`,mass:`unknown`,hair_color:`auburn, grey`,skin_color:`fair`,eye_color:`blue`,birth_year:`64BBY`,gender:`male`,homeworld:`https://swapi.py4e.com/api/planets/21/`,films:[`https://swapi.py4e.com/api/films/1/`,`https://swapi.py4e.com/api/films/6/`],species:[`https://swapi.py4e.com/api/species/1/`],vehicles:[],starships:[],created:`2014-12-10T16:26:56.138000Z`,edited:`2014-12-20T21:17:50.330000Z`,url:`https://swapi.py4e.com/api/people/12/`}],g=async(e,t)=>{let n=await l(e,t),r=!n.next;return{options:(n.results||[]).map(e=>({label:e.name,value:e.url.split(`/`).slice(-2)[0],data:e,onClick:(...e)=>console.log(`click`,e),rules:[e=>e===0||e%5!=0?!0:{content:`O indice é divisor de 5.`}]})),lastPage:r}},_={args:{label:`Label`,name:`name`,placeholder:`Selecione`,required:!1,disabled:!1,invalid:!1,selectAll:!0,loading:!1,search:!0,minSelected:void 0,maxSelected:void 0},render:e=>{let[t,n]=(0,f.useState)(h),r=e=>{if(e!=null&&typeof e==`number`&&!Number.isNaN(e)&&e>=0)return e},i=r(e.minSelected),o=r(e.maxSelected);return(0,p.jsx)(a,{children:(0,p.jsx)(s,{...e,type:`select-multiple`,minSelected:i,maxSelected:o,value:t.map(e=>({label:e.name,data:e,value:e.url.split(`/`).slice(-2)[0]})),setValue:(e,t)=>{console.log({value:e,data:t}),n(t)},loader:g,dirty:h.map(e=>({data:e,value:e.url.split(`/`).slice(-2)[0]}))})})}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    name: 'name',
    placeholder: 'Selecione',
    required: false,
    disabled: false,
    invalid: false,
    selectAll: true,
    loading: false,
    search: true,
    minSelected: undefined,
    maxSelected: undefined
  },
  render: args => {
    const [value, setValue] = useState(initial);
    const normalizeLimit = (limit: number | null | undefined): number | undefined => {
      if (limit === null || limit === undefined) return undefined;
      if (typeof limit === 'number' && !Number.isNaN(limit) && limit >= 0) {
        return limit;
      }
      return undefined;
    };
    const minSelected = normalizeLimit(args.minSelected);
    const maxSelected = normalizeLimit(args.maxSelected);
    return <Form>
        <Select {...args} type='select-multiple' minSelected={minSelected} maxSelected={maxSelected} value={value.map(data => ({
        label: data.name,
        data,
        value: data.url.split('/').slice(-2)[0]
      }))} setValue={(value, data) => {
        console.log({
          value,
          data
        });
        setValue(data as never as typeof initial);
      }} loader={loader} dirty={initial.map(data => ({
        data,
        value: data.url.split('/').slice(-2)[0]
      }))} />
      </Form>;
  }
}`,..._.parameters?.docs?.source}}},v=[`SelectMultiple`]}))();export{_ as SelectMultiple,v as __namedExportsOrder,m as default};