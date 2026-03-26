import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{r}from"./iframe-fSyR9o4x.js";import{n as i,t as a}from"./Icon-7EFkF0Ko.js";import{n as o,t as s}from"./Form-BqpbciIA.js";import{n as c,t as l}from"./EllipsisContainer-CYb-gjAK.js";import{n as u,t as d}from"./Select-DRtM5LFv.js";import{n as f,t as p}from"./services-CzkwhazY.js";var m,h=t((()=>{m={label:{description:`Input label.`,table:{defaultValue:{summary:`Label`}}},name:{description:`Form field name. Required to Form Context to work`,table:{defaultValue:{summary:`Name`}},control:`text`},placeholder:{description:`Input placeholder.`,table:{defaultValue:{summary:`Text`}},control:`text`},required:{description:`Define if input is required.`,table:{defaultValue:{summary:`false`}},control:`boolean`},disabled:{description:`Define if input is disabled.`,table:{defaultValue:{summary:`false`}},control:`boolean`},invalid:{description:`Define if input is invalid.`,table:{defaultValue:{summary:`false`}},control:`boolean`},loading:{description:`Define if input is loading.`,table:{defaultValue:{summary:`false`}},control:`boolean`},search:{description:`Define if input has search filter.`,table:{defaultValue:{summary:`false`}},control:`boolean`}}})),g,_,v,y,b,x;t((()=>{g=e(n(),1),c(),o(),i(),u(),f(),h(),_=r(),v={id:`Select`,title:`Components/Input/type="select"`,component:d,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:m},y={name:`Wilhuff Tarkin`,height:`180`,mass:`unknown`,hair_color:`auburn, grey`,skin_color:`fair`,eye_color:`blue`,birth_year:`64BBY`,gender:`male`,homeworld:`https://swapi.py4e.com/api/planets/21/`,films:[`https://swapi.py4e.com/api/films/1/`,`https://swapi.py4e.com/api/films/6/`],species:[`https://swapi.py4e.com/api/species/1/`],vehicles:[],starships:[],created:`2014-12-10T16:26:56.138000Z`,edited:`2014-12-20T21:17:50.330000Z`,url:`https://swapi.py4e.com/api/people/12/`},b={args:{label:`Label`,name:`name`,placeholder:`Selecione`,required:!1,disabled:!1,invalid:!1,loading:!1,search:!0},render:e=>{let[t,n]=(0,g.useState)({...y}),[r,i]=(0,g.useState)(!1),o=(0,g.useCallback)(async(e,t)=>{console.log({teste:r,search:e,page:t});let n=await p(e,t),i=!n.next;return{options:(n.results||[]).map(e=>{let t=e.name.length===5;return{label:e=>(0,_.jsxs)(g.Fragment,{children:[(0,_.jsx)(a,{type:`feather`,icon:`truck`,width:`14px`}),(0,_.jsxs)(l,{children:[e.data.name,e.mode===`placeholder`&&` (${e.data.gender})`]})]}),value:e.url.split(`/`).slice(-2)[0],data:e,disabled:t}}),lastPage:i}},[t,r]);(0,g.useEffect)(()=>{console.log(t)},[t]);let c=(0,g.useCallback)(()=>[{label:y.name,data:y,value:y.url.split(`/`).slice(-2)[0]}],[y]);return(0,_.jsxs)(s,{children:[(0,_.jsx)(`button`,{type:`button`,onClick:()=>i(e=>!e),style:{marginBottom:`21px`},children:`reload options`}),(0,_.jsx)(d,{...e,type:`select`,label:`Personagem de Star Wars`,value:t?{label:t.name,data:t,value:t.url.split(`/`).slice(-2)[0]}:``,setValue:(e,t)=>{console.log({value:e,option:t}),n(e?t:``)},onClear:n,inputWidth:`220px`,loader:o,dirty:{data:y,value:y.url.split(`/`).slice(-2)[0]},initialLoader:c})]})}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    name: 'name',
    placeholder: 'Selecione',
    required: false,
    disabled: false,
    invalid: false,
    loading: false,
    search: true
  },
  render: args => {
    const [value, setValue] = useState<typeof initial | ''>({
      ...initial
    });
    const [teste, setTeste] = useState<boolean>(false);
    const loader: SelectLoader = useCallback(async (search, page) => {
      console.log({
        teste,
        search,
        page
      });
      const responseData = await getStarWars(search, page);

      // setando se a pagina atual e a ultima
      const lastPage = !responseData.next;
      // pegando os resultados da requisicao
      const results = responseData.results || [];
      return {
        options: results.map(e => {
          const disabled = e.name.length === 5;
          return {
            label: props => {
              return <React.Fragment>
                    <Icon type='feather' icon='truck' width='14px' />
                    <EllipsisContainer>
                      {props.data.name}
                      {props.mode === 'placeholder' && \` (\${props.data.gender})\`}
                    </EllipsisContainer>
                  </React.Fragment>;
            },
            value: e.url.split('/').slice(-2)[0],
            data: e,
            disabled
          } as SelectOption<{
            name: string;
            gender: string;
          }>;
        }),
        lastPage
      };
    }, [value, teste]);
    useEffect(() => {
      console.log(value);
    }, [value]);
    const initialLoader = useCallback((): SelectOption[] => {
      return [{
        label: initial.name,
        data: initial,
        value: initial.url.split('/').slice(-2)[0]
      }];
    }, [initial]);
    return <Form>
        <button type='button' onClick={() => setTeste(prev => !prev)} style={{
        marginBottom: '21px'
      }}>
          reload options
        </button>

        <Select {...args} type='select' label='Personagem de Star Wars' value={value ? {
        label: value.name,
        data: value,
        value: value.url.split('/').slice(-2)[0]
      } : ''} setValue={(value, option) => {
        console.log({
          value,
          option
        });
        setValue(value ? option as typeof initial : '');
      }} onClear={setValue} inputWidth='220px' loader={loader} dirty={{
        data: initial,
        value: initial.url.split('/').slice(-2)[0]
      }} initialLoader={initialLoader} />
      </Form>;
  }
}`,...b.parameters?.docs?.source}}},x=[`SelectStory`]}))();export{b as SelectStory,x as __namedExportsOrder,v as default};