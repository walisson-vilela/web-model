import { get } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Popup } from "semantic-ui-react";
import "./style.css";
import { Container, ContainerPopUp, MenuDropdown, MenuItens } from "./styles";

export const DropdownAppliedFilters = ({ segment_Id, appliedFilters, setAppliedFilters }) => {

  const [showItens, setShowItens] = useState(false);
  const [search, setSearch] = useState('');
  const [showing, setShowing] = useState([]);

  const filter = get(appliedFilters, '[0].selected_value');
  segment_Id(filter);

  const toogleMenuItens = () => {
    const new_val = !showItens;
    setShowItens(new_val);
  }

  let ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowItens(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    let aux = [...appliedFilters];

    let indexs = aux.map((item, index) => {
      return index;
    });

    setShowing(indexs);
  }, [appliedFilters]);

  const popupstyle = {

  }

  const clearAllFilters = () => {
    setShowItens(false);
    clearAllAppliedFilters();
    segment_Id(undefined);
  }

  const removeItem = (index) => {
    setShowItens(false);
    clearByIndexAppliedFilters(index);
    segment_Id(undefined);
  }

  const clearAllAppliedFilters = () => {
    setAppliedFilters([]);
  }

  const clearByIndexAppliedFilters = (index) => {
    setAppliedFilters([]);
    const actualFilters = [...appliedFilters];
    actualFilters.splice(index, 1);
    setAppliedFilters(actualFilters);
  }

  const applySearchOptions = (value, key = null) => {
    if (key !== 'Enter') {
      return;
    }

    searchOptions(value);
  }

  const searchOptions = (value) => {
    console.log(value);

    let aux = [...appliedFilters];


    if (value !== '') {
      value = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      aux = aux.filter(item => {
        let name = item.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return name.includes(value);
      })
    }

    let indexs = aux.map((_, index) => index);

    setShowing(indexs);
  }

  return (<>
    <Container ref={ref}>
      <Popup
        inverted
        on='click'
        pinned
        className="popup-applied-filters"
        disabled={appliedFilters.length > 0}
        style={popupstyle}
        content={(<ContainerPopUp className='popup-not-applied' >No momento não há nenhum filtro aplicado</ContainerPopUp>)}
        position='bottom center'
        trigger={
          <MenuDropdown onClick={toogleMenuItens}>Filtros aplicados ({appliedFilters.length})</MenuDropdown>
        }
      />
      {
        showItens && appliedFilters.length > 0 && (
          <MenuItens>
            <div className="applied-filters-header">
              <div className="applied-filters-title">Filtros aplicados</div>
              <div className="applied-filters-clear-all" onClick={clearAllFilters} >Limpar todos</div>
            </div>
            <div className='options-search'>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => applySearchOptions(e.target.value, e.key)}
                type="text"
                placeholder="Pesquisar"
              />

              <img src="https://agencia.traderesult.app/manager/images/search.svg" alt="search" />
            </div>

            <div className="applied-filters-itens">
              {
                appliedFilters.map((filter, index) => {
                  return (
                    showing.includes(index) && <div key={index} className="applied-filters-item">
                      <div className="item-info">
                        <div className="item-info-filter">{filter.label}</div>
                        <div className="item-info-value">
                          {filter.selected_label}
                        </div>
                      </div>
                      <div
                        onClick={() => { removeItem(index) }}
                        className="item-remove"
                        filter_key="active"
                      >
                        <img src="https://s3.sa-east-1.amazonaws.com/icons.sistemagiv.com.br/filter_remove.svg" alt="filter-remove" />
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </MenuItens>
        )
      }

    </Container>
  </>);
}
