import React from 'react'

import { AiOutlineExpandAlt } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import expandIcon from '../../../NewDashboard/assets/img/Icones_Expandir.svg'

import { IconContainer, Menu, MenuOptions, WidgetHeaderWrapper } from './styles'

type StateAction<T> = React.Dispatch<React.SetStateAction<T>>
export interface WidgetHeaderProps {
  text: string
  description?: string
  link?: string
  expand?: boolean
  className?: string
  subTitle?: string
  onOpen?: any
  details?: {
    icon: JSX.Element
    state: boolean
    setState: () => Promise<void>
  }
}

interface MenuIconsProps {
  link?: string
  expand?: boolean
  onOpen?: any
  details?: {
    icon?: JSX.Element
    state?: boolean
    setState?: () => void
  }
}

const MenuIcons = ({ link, expand, onOpen, details }: MenuIconsProps) => {
  return (
    <Menu.Menu
      compact
      position='right'
      size='mini'
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <MenuOptions direction={link && expand}>
        {details && details.state && (
          <IconContainer onClick={details.setState}>
            {' '}
            {details.icon}
          </IconContainer>
        )}
        {link && (
          <Menu.Item className='item-svg'>
            <Link to={link}>
              <img src={expandIcon} alt='expandir' />
            </Link>
          </Menu.Item>
        )}
        {expand && (
          <Menu.Item position='right' className='item-link'>
            <AiOutlineExpandAlt
              size={20}
              color='#A3A9B3'
              onClick={() => {
                onOpen(true)
              }}
            />
          </Menu.Item>
        )}
      </MenuOptions>
    </Menu.Menu>
  )
}

export const WidgetHeader = ({
  text,
  link,
  expand,
  className,
  onOpen,
  description,
  subTitle,
  details,
}: WidgetHeaderProps) => (
  <WidgetHeaderWrapper>
    <Menu secondary icon fluid compact>
      <Menu.Item header className={className || ''}>
        <span>{text}</span>

        <p> {description} </p>
      </Menu.Item>
      {(link || expand) && (
        <MenuIcons
          link={link}
          expand={expand}
          onOpen={onOpen}
          details={details}
        />
      )}
    </Menu>
    <p className='subTitle'>{subTitle} </p>
  </WidgetHeaderWrapper>
)
