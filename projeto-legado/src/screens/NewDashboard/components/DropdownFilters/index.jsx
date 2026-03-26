import React, { useEffect, useRef, useState } from 'react';
import { Container, MenuDropdown, MenuItem, MenuItens, MenuOptions, MenuOptionsSearch } from "./styles";

import axios from 'axios';

export const DropdownFilters = ({ filters, appliedFilters, setAppliedFilters }) => {

  const [showItens, setShowItens] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsSearch, setShowOptionsSearch] = useState(false);
  const [filterSelected, setFilterSelected] = useState({});
  const [titleFilter, setTitleFilter] = useState('');
  const [options, setOptions] = useState([]);
  const [firstSearch, setFirstSearch] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let ref = useRef(null);

  const hideMenus = () => {
    setShowItens(false);
    setShowOptions(false);
    setShowOptionsSearch(false);
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      hideMenus();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const toogleMenuItens = () => {
    const new_val = !showItens;

    if (!new_val) {
      setShowOptions(false);
      setShowOptionsSearch(false);
    }

    setShowItens(new_val);
  }

  const handleMenuItem = (index) => {
    const filter = filters[index];
    setFilterSelected(filter);
    setTitleFilter(filter.label);
    if (filter.type === 'search') {
      setSearch('');
      setFirstSearch(true);
      setNotFound(false);
      setOptions([]);
      setShowOptions(false);
      setShowOptionsSearch(true);
    } else {
      setOptions(filter.options);
      setShowOptions(true);
      setShowOptionsSearch(false);
    }
  }

  const applyFilter = (option) => {
    const filter = {
      ...filterSelected,
      selected_value: option.value,
      selected_label: option.label
    }
    handleAppliedFilters(filter);
    hideMenus();
  }

  const searchOptions = async (value) => {
    setOptions([]);
    setFirstSearch(false);
    setNotFound(false);
    setIsLoading(true);
    var params = { limit: 200 };
    params[filterSelected.field_search] = value;
    const res = await axios.get(
      filterSelected.url,
      { params }
    );
    setIsLoading(false);
    if (res.data.success) {

      let newOptions = [];
      for (let item of res.data.data) {

        newOptions.push(
          {
            label: filterSelected.option_label(item),
            value: item[filterSelected.option_value_field]
          }
        );
      }

      if (newOptions.length > 0) {

        setOptions(newOptions);
      } else {
        setNotFound(true);
      }
    }

    console.log('res', res);
  }

  const applySearchOptions = (value, key = null) => {
    if (key !== 'Enter') {
      return;
    }

    searchOptions(value);
  }

  const handleAppliedFilters = (filter) => {
    const actualFilters = [...appliedFilters];
    const found = actualFilters.findIndex(element => element.field === filter.field);
    if (found >= 0) {
      actualFilters[found] = filter;
    } else {
      actualFilters.push(filter);
    }
    setAppliedFilters(actualFilters);
  }

  return (<>
    <Container ref={ref}>
      <MenuDropdown onClick={toogleMenuItens}>Filtros</MenuDropdown>

      {
        showItens && (
          <MenuItens >
            {filters.map((filter, index) => {
              return (
                <MenuItem key={index} onClick={() => { handleMenuItem(index) }}>{filter.label}</MenuItem>
              )
            })}

          </MenuItens>
        )
      }

      {
        showOptions && (
          <MenuOptions>
            <div className='filter-title'>{titleFilter}</div>
            <div className='filter-options'>
              {options.map((option, index) => {
                return (
                  <div key={index} className='filter-options-item' onClick={() => {
                    applyFilter(option)


                  }} >
                    <div>{option.label}</div>
                  </div>
                )
              })}
            </div>
          </MenuOptions>
        )
      }

      {
        showOptionsSearch && (
          <MenuOptionsSearch>
            <div className='filter-title'>{titleFilter}</div>
            <div className='options-search'>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => applySearchOptions(e.target.value, e.key)}
                type="text"
                placeholder="Pesquisar"
              />
              <img
                onClick={() => searchOptions(search)} alt="search"
                src="https://agencia.traderesult.app/manager/images/search.svg"
              />
            </div>
            {
              firstSearch && (
                <div className="option-message">Utilize a busca para pesquisar por {titleFilter.toLowerCase()}</div>
              )
            }
            {
              notFound && (
                <div className="option-message-notfound" >Nenhum registro encontrado</div>
              )
            }
            {
              isLoading && (
                <div className='loading-search'>
                  <div className="ui active centered inline loader"></div>
                </div>
              )
            }
            <div className='filter-options'>
              {
                options.map((option, index) => {
                  return (
                    <div key={index} className='filter-options-item' onClick={() => { applyFilter(option) }} >
                      <div>{option.label}</div>
                    </div>
                  )
                })
              }
            </div>
          </MenuOptionsSearch>
        )
      }


    </Container>
  </>);
}


