import { findIndex, isEmpty } from 'lodash';
import React, { createContext, useCallback, useContext, useImperativeHandle, useMemo, useState } from 'react';
import { Button, Dropdown, Modal, Tab } from 'semantic-ui-react';

import { dateGet } from '../../../../utils/DateTime';

import Info from "./Info";
import Multiconta from "./Multiconta";
import Repeat from "./Repeat";

import { Wrapper } from "./style";

import { EventManagerContext } from "../../EventManager";

export const DetailsContext = createContext({
  dirt: undefined,
  setDirt: undefined,
  event: undefined,
  next: undefined,
  formData: undefined,
  setFormData: undefined
});

const ButtonDelete = () => {
  const remove = useCallback((all = false) => {
    alert(`Remover: ${all ? "Todos" : "Somente este"}`);
  }, []);

  const options = [
    {key: 'unique', text: 'Remover este atendimento', onClick: () => remove()},
    {key: 'delete', text: 'Remover todos atendimentos do PDV', onClick: () => remove(true)},
  ];

  return (
    <Button.Group negative floated={"left"}>
      <Button content={"Remover"} onClick={() => remove()}/>
      <Dropdown
        floating
        defaultUpward
        className='button icon'
        options={options}
        trigger={<></>}
      />
    </Button.Group>
  );
}

const EventDetails = React.forwardRef((props, ref) => {

  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({});
  const [next, setNext] = useState({});
  const [tabIndex, setTabIndex] = useState(0);

  const {dirt, setDirt, default_mode} = useContext(EventManagerContext);

  const value = useMemo(() => ({event, next}), [event, next]);

  useImperativeHandle(ref, () => ({
    open(event, events) {
      setOpen(true);
      setEvent(event);

      const i = findIndex(events, (o) => {
        return o.event_id === event.event_id;
      });

      const n = i + 1;
      if (!isEmpty(events[n])) {
        setNext(events[n])
      }
    },
    close() {
      setOpen(false);
    }
  }), []);

  const date = dateGet(event.start, default_mode === 'week' ? 'dddd' : 'DD/MM/YY');
  const panes = useMemo(() => {
    let options = [
      {
        menuItem: 'Repetição',
        render: () => <Repeat/>,
      },
      {
        menuItem: 'Informações',
        render: () => <Info/>,
      },
      {
        menuItem: 'Multicontas x',
        render: () => <Multiconta/>,
      },
    ];

    if (default_mode !== 'week') {
      options.splice(0, 1);
      options.splice(1, 1);
    }

    return options;
  }, [default_mode]);

  return (
    <DetailsContext.Provider value={value}>
      <Modal open={open}>
        <Modal.Header>{event.code} - {event.title} - {date}</Modal.Header>
        <Modal.Content style={{paddingTop: 7, paddingBottom: 0}}>
          <Wrapper>
            <Tab
              menu={{secondary: true, pointing: true}}
              panes={panes}
              tabIndex={tabIndex}
              onTabChange={(e, {activeIndex}) => {
                if (dirt) {
                  if (window.confirm('Alterações que não foram salvas serão perdidas, deseja prosseguir?')) {
                    setTabIndex(activeIndex);
                    setDirt(false);
                  }
                } else {
                  setTabIndex(activeIndex);
                }
              }}
            />
          </Wrapper>
        </Modal.Content>
        <Modal.Actions>
          {
            default_mode === "week" && <ButtonDelete/>
          }
          <Button
            content={tabIndex !== 1 ? "Cancelar" : "Fechar"}
            onClick={() => setOpen(false)}
          />
          {
            tabIndex !== 1 &&
            <Button
              primary
              type={"submit"}
              content={"Salvar"}
              disabled={!dirt}
              form={"details-form"}
            />
          }
        </Modal.Actions>
      </Modal>
    </DetailsContext.Provider>
  );
});

export default EventDetails;
