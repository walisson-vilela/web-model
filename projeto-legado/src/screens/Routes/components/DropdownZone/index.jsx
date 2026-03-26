import { isEmpty, isFunction } from 'lodash';
import * as PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Placeholder } from 'semantic-ui-react';

import { Icomoon } from '../../../../components';

import { ItemMenu, Loader, Wrapper } from './style';

const DropdownRoute = ({options}) => {
    if (!options) {
        return <Fragment/>
    }

    return <Dropdown
        pointing='top left'
        trigger={<Icomoon name={'more-vertical link'}/>}
        icon={null}
    >
        <Dropdown.Menu>
            {
                options.map((res, key) => {
                    if (res.name === 'divider') {
                        return <Dropdown.Divider key={key}/>
                    }

                    if (!isFunction(res.onClick) && !res.link) {
                        return (
                            <Dropdown.Header
                                key={key}
                                content={res.name}
                            />
                        )
                    }

                    if (res.link === true) {
                        return (
                            <Dropdown.Item link key={key}>
                                <Link to={res.onClick}>
                                    <ItemMenu>{res.name}</ItemMenu>
                                </Link>
                            </Dropdown.Item>
                        )
                    }

                    return (
                        <Dropdown.Item
                            key={key}
                            onClick={() => res.onClick()}
                            text={res.name}
                        />
                    )
                })
            }
        </Dropdown.Menu>
    </Dropdown>;
}

const DropdownZone = ({name, options, loading, extendsName, performer}) => {
    // {name, description, options, loading, extendsName, popup, maxWidth, publish_at, performer}
    let zone = null;
    if (name && extendsName && name !== extendsName) {
        zone = extendsName;
    }

    if (loading) {
        return (
            <Loader>
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Header>
                </Placeholder>
            </Loader>
        )
    }

    return (
        <Wrapper>
            <div className={"avatar"}>
                <Image
                    avatar
                    fluid
                    src={performer && performer.image ? performer.image : "https://react.semantic-ui.com/images/wireframe/image.png"}
                    alt={'Usuário'}
                />
            </div>
            <div className={"details"}>
                <div>
                    <h4>{performer && performer.name ? performer.name : "Sem executor"}</h4>
                    {performer && !isEmpty(performer.trigger) ? performer.trigger : null}
                </div>
                <h5><strong>Perfil:</strong> {performer && performer.profile ? performer.profile : "Sem perfil"}</h5>
                <div>
                    <h5><strong>Nome da rota:</strong> {name || "Rota sem nome"} {zone && `(${zone})`}</h5>
                    <DropdownRoute options={options}/>
                </div>
            </div>
        </Wrapper>
    );

    // return (
    //     <Container>
    //         <div>
    //             {
    //                 popup ?
    //                     <Popup
    //                         trigger={<Header maxWidth={maxWidth}>{name} <span>{extendsName && `(${extendsName})`}</span></Header>}
    //                     >
    //                         {name} {extendsName && `(${extendsName})`}
    //                     </Popup>
    //                     : <Header maxWidth={maxWidth}>{name} <span>{extendsName && `(${extendsName})`}</span></Header>
    //             }
    //
    //             {
    //                 !isEmpty(options) &&
    //                 <Popup
    //                     basic
    //                     open={open}
    //                     position={'bottom left'}
    //                     trigger={<Icomoon name={'more-vertical link'} onClick={() => setOpen(true)}/>}
    //                     onClose={() => setOpen(false)}
    //                 >
    //                     <Menu secondary vertical size={'tiny'}>
    //                         {
    //                             options.map((res, key) => {
    //
    //                                 if (res.name === 'divider') {
    //                                     return <Divider key={key}/>
    //                                 }
    //
    //                                 if (!isFunction(res.onClick) && !res.link) {
    //                                     return (
    //                                         <Menu.Item header key={key}>
    //                                             <MenuHeader>{res.name}</MenuHeader>
    //                                         </Menu.Item>
    //                                     )
    //                                 }
    //
    //                                 if (res.link === true) {
    //                                     return (
    //                                         <Menu.Item link key={key}>
    //                                             <Link to={res.onClick}>
    //                                                 <ItemMenu>{res.name}</ItemMenu>
    //                                             </Link>
    //                                         </Menu.Item>
    //                                     )
    //                                 }
    //
    //                                 return (
    //                                     <Menu.Item key={key} onClick={() => {
    //                                         res.onClick();
    //                                         setOpen(false);
    //                                     }}>
    //                                         <ItemMenu>{res.name}</ItemMenu>
    //                                     </Menu.Item>
    //                                 )
    //                             })
    //                         }
    //                     </Menu>
    //                 </Popup>
    //             }
    //         </div>
    //         <Description maxWidth={maxWidth}>{description}</Description>
    //         {
    //             publish_at && <small>Agendado para: {publish_at.format('DD/MM/YYYY')} - aguardando publicação</small>
    //         }
    //     </Container>
    // )
};

DropdownZone.propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    extendsName: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    options: PropTypes.array,
    loading: PropTypes.bool,
    popup: PropTypes.bool,
    maxWidth: PropTypes.string
};

DropdownZone.defaultProps = {
    name: '',
    extendsName: '',
    description: '',
    options: [],
    loading: false,
    popup: false,
    maxWidth: ''
};

export default DropdownZone;
