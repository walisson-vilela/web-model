const save = {
  success: false,
  isLoading: false,
  error: false,

  result: {
    success: false,
    error: false,
    data: {},
  },
};

const modalResults = {
  isLoading: false,
  success: false,
  error: false,
  data: [],
}

const storeData = {
  isLoading: false,
  success: false,
  error: false,
  data: [],
}

const modalSearchFilter = {
  count: 0,
  data: [],
  prevState: [],
  initialState: [],
  message: false,
  isClosed: false,
  isOpen: false,
  initilState: []
}

const searchFilter = {
  count: 0,
  data: [],
  prevState: [],
  initialState: [],
  message: false,
  isClosed: false,
  isOpen: false
}

const flagSearchFilter = {
  count: 0,
  data: [],
  prevState: [],
  initialState: [],
  message: false,
  isClosed: false,
  isOpen: false
}

const groupSearchFilter = {
  count: 0,
  data: [],
  prevState: [],
  initialState: [],
  message: false,
  isClosed: false,
  isOpen: false
}

const networkSearchFilter = {
  count: 0,
  data: [],
  prevState: [],
  initialState: [],
  message: false,
  isClosed: false,
  isOpen: false
}

const alerts = {
  message: false
}

const newTableProps = {
  hasLoading: false
}

const results = {
  isLoading: false,
  success: false,
  error: false,
  data: [],
  users: [],
  pdv: [],
  state: [],
  city: [],
  neighboord: [],
};

const content = {
  save,
  ...save
};

const defaultState = {
  storeData,
  flagSearchFilter,
  networkSearchFilter,
  groupSearchFilter,
  modalSearchFilter,
  newTableProps,
  modalResults,
  searchFilter,
  alerts,
  content,
  results,
  results2: results,
  reload: false,
  ...save,

};

export const STORAGE = {
  LOGIN: '_GIV_LOGIN',
  USER: '_GIV_USER',
};

export default {
  defaultState,
  HIERARCHY_STRUCTURE_NAMES: [{
    key: 'REGIAO',
    value: 'REGIAO',
    text: 'Região'
  }, {
    key: 'PDA',
    value: 'PDA',
    text: 'Ponto de Atendimento'
  }, {
    key: 'PESSOA',
    value: 'PESSOA',
    text: 'Pessoa'
  }],

  HIERARCHY_LINKS_PEOPLE: [{
    key: 'PESSOA',
    value: 'PESSOA',
    text: 'Pessoa'
  }],

  HIERARCHY_LINKS_STORE: [{
    key: 'LOJA',
    value: 'LOJA',
    text: 'Loja'
  }],

  HIERARCHY_LINKS_PEOPLE_STORE: [{
    key: 'PESSOA',
    value: 'PESSOA',
    text: 'Pessoa'
  }, {
    key: 'LOJA',
    value: 'LOJA',
    text: 'Loja'
  }],

  SAVE_SUCCESS: {
    type: 'success',
    title: 'Sucesso',
    description: 'Registro salvo com sucesso!',
    time: 3000
  },

  DELETE_SUCCESS: {
    type: 'success',
    title: 'Sucesso',
    description: 'Registro(s) deletado(s) com sucesso!',
    time: 3000
  },

  WINDOW_RESIZE: 'WINDOW_RESIZE',
  DIMMER_TOGGLE: 'DIMMER_TOGGLE',
  YES_OR_NO: [{
    key: 'no',
    value: 0,
    text: 'Não'
  }, {
    key: 'yes',
    value: 1,
    text: 'Sim'
  }],
  HOME_OR_WORK: [{
    key: 'disabled',
    value: 0,
    text: 'Primeira loja do dia'
  }, {
    key: 'home',
    value: 2,
    text: 'Casa'
  }, {
    key: 'work',
    value: 1,
    text: 'Empresa'
  }],
  STATES_SHORT: [
    { key: 'AC', value: 'AC', text: 'AC' },
    { key: 'AL', value: 'AL', text: 'AL' },
    { key: 'AP', value: 'AP', text: 'AP' },
    { key: 'AM', value: 'AM', text: 'AM' },
    { key: 'BA', value: 'BA', text: 'BA' },
    { key: 'CE', value: 'CE', text: 'CE' },
    { key: 'DF', value: 'DF', text: 'DF' },
    { key: 'ES', value: 'ES', text: 'ES' },
    { key: 'GO', value: 'GO', text: 'GO' },
    { key: 'MA', value: 'MA', text: 'MA' },
    { key: 'MT', value: 'MT', text: 'MT' },
    { key: 'MS', value: 'MS', text: 'MS' },
    { key: 'MG', value: 'MG', text: 'MG' },
    { key: 'PA', value: 'PA', text: 'PA' },
    { key: 'PB', value: 'PB', text: 'PB' },
    { key: 'PR', value: 'PR', text: 'PR' },
    { key: 'PE', value: 'PE', text: 'PE' },
    { key: 'PI', value: 'PI', text: 'PI' },
    { key: 'RJ', value: 'RJ', text: 'RJ' },
    { key: 'RN', value: 'RN', text: 'RN' },
    { key: 'RS', value: 'RS', text: 'RS' },
    { key: 'RO', value: 'RO', text: 'RO' },
    { key: 'RR', value: 'RR', text: 'RR' },
    { key: 'SC', value: 'SC', text: 'SC' },
    { key: 'SP', value: 'SP', text: 'SP' },
    { key: 'SE', value: 'SE', text: 'SE' },
    { key: 'TO', value: 'TO', text: 'TO' },
  ]
};
