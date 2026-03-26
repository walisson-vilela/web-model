import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import * as actions from '../../../../store/modules/dashboard/actions'
import { getStartEndDayOfWeek } from '../../../../utils/DateTime'

import { BulletOptions, Buttons, Container, Header, Icons } from './styles'

interface ModalProps {
  title: string
  subTitle?: string
  isOpen: any
  setOpen: any
  options: any
  className: string
  hasFooter?: boolean
  label1?: string
  label2?: string
  hasBulletOptions?: boolean
  hasButtons?: boolean
}

export function DefaultModal({
  title,
  isOpen,
  setOpen,
  options,
  className,
  subTitle,
  hasFooter,
  label1,
  label2,
  hasBulletOptions,
  hasButtons,
}: ModalProps) {
  const dispatch = useDispatch()
  const [isPress1, setIsPress1] = useState(false)
  const [isPress2, setIsPress2] = useState(false)
  const [isPress3, setIsPress3] = useState(false)
  const [isPress4, setIsPress4] = useState(false)

  const s0 = getStartEndDayOfWeek()
  const s1 = getStartEndDayOfWeek(1)
  const s2 = getStartEndDayOfWeek(2)
  const s3 = getStartEndDayOfWeek(3)

  if (!isOpen) {
    return <></>
  }

  return (
    <Container>
      <Header>
        <div>
          <strong>{title}</strong>
          <span> {subTitle}</span>
        </div>
        <AiOutlineClose
          size={18}
          onClick={() => {
            setOpen(false)
          }}
        />
      </Header>
      <section>
        <HighchartsReact
          Highcharts={Highcharts}
          options={options}
          containerProps={{ className: className }}
        />

        {hasBulletOptions && (
          <BulletOptions>
            <div className='wrapper'>
              <div className='item-container'>
                <div className='bullet'>
                  <div className='bullet-icon' />
                </div>
                <span> Dentro </span>
              </div>
              <div className='item-container'>
                <div className='bullet bullet2'>
                  <div className='bullet-icon' />
                </div>
                <span> Fora </span>
              </div>
            </div>
          </BulletOptions>
        )}

        {hasButtons && (
          <>
            <Buttons
              btn1={isPress1}
              btn2={isPress2}
              btn3={isPress3}
              btn4={isPress4}
            >
              <button
                className='btn1'
                onClick={async () => {
                  setIsPress1(true)
                  setIsPress2(false)
                  setIsPress3(false)
                  setIsPress4(false)
                  dispatch(actions.getWidget32([s0]))
                }}
              >
                {' '}
                S0{' '}
              </button>
              <button
                className='btn2'
                onClick={async () => {
                  setIsPress2(true)
                  setIsPress1(false)
                  setIsPress3(false)
                  setIsPress4(false)

                  dispatch(actions.getWidget32([s1]))
                }}
              >
                {' '}
                S-1{' '}
              </button>
              <button
                className='btn3'
                onClick={async () => {
                  setIsPress3(true)
                  setIsPress2(false)
                  setIsPress1(false)
                  setIsPress4(false)
                  dispatch(actions.getWidget32([s2]))
                }}
              >
                {' '}
                S-2{' '}
              </button>
              <button
                className='btn4'
                onClick={async () => {
                  setIsPress4(true)
                  setIsPress2(false)
                  setIsPress1(false)
                  setIsPress3(false)
                  dispatch(actions.getWidget32([s3]))
                }}
              >
                {' '}
                S-3{' '}
              </button>
            </Buttons>
          </>
        )}
      </section>
      <footer>
        {hasFooter && (
          <Icons>
            <span>{label1}</span>
            <span>{label2} </span>
          </Icons>
        )}
      </footer>
    </Container>
  )
}
