import React, {Component} from 'react';
import moment from 'moment';
import {Header, Menu, Label} from 'semantic-ui-react';
import {Icomoon} from "../../../../components/Icomoon";

export default class Toolbar extends Component {

    label = (value) => {
        return (
            <Header as='h4'>
                <Header.Content>
                    {value.format('MMMM')}
                    <Header.Subheader>{value.format('YYYY')}</Header.Subheader>
                </Header.Content>
            </Header>
        );
        /*
        return (
            <span><b>{value.format('MMMM')}</b><br /><span>{value.format('YYYY')}</span></span>
        );
        */
    };

    render() {
        const {toggleSidebar, date, handleNavigate} = this.props;
        let d = moment(date);
        return (
            <React.Fragment>
                <Menu attached borderless secondary>
                    <Menu.Item icon>
                        <Icomoon name={'menu circular link'} onClick={toggleSidebar}/>
                    </Menu.Item>
                    <Menu.Item header style={{minWidth: 160}}>
                        {this.label(d)}
                    </Menu.Item>
                    <Menu.Item>
                        <Icomoon name={'trash'}/>
                    </Menu.Item>
                    <Menu.Item>
                        <Icomoon name={'trash-2'}/>
                    </Menu.Item>
                    <Menu.Menu position={'right'}>
                        <Menu.Item onClick={() => {
                            handleNavigate(d.subtract(1, 'month').toDate());
                        }}>
                            <Icomoon name={'chevron-left'} title={'Mês anterior'}/>
                        </Menu.Item>
                        <Menu.Item onClick={() => {
                            handleNavigate(moment().toDate());
                        }}>
                            <Icomoon name={'calendar'} title={'Mês atual'}/>
                        </Menu.Item>
                        <Menu.Item onClick={() => {
                            handleNavigate(d.add(1, 'month').toDate());
                        }}>
                            <Icomoon name={'chevron-right'} title={'Próximo mês'}/>
                        </Menu.Item>
                        <Menu.Item icon>
                            <Label size={'large'} content={'Mês'}/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </React.Fragment>
        );
    }
};