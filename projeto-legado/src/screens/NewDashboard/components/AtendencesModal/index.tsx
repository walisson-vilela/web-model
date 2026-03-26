import React, { useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from 'lodash'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../../../../components/Loader'
import * as actions from '../../../../store/modules/dashboard/actions'
import { getStartEndDayOfWeek } from '../../../../utils/DateTime'

import { Buttons, Container, Header } from './styles'

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

export function AttendencesModal({
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
  const { attendencesModal } = useSelector((state: any) => state.dashboard)
  const { data, loading } = attendencesModal
  const [firstLoading, setFirstLoading] = useState(true)
  const [isPress1, setIsPress1] = useState(true)
  const [isPress2, setIsPress2] = useState(false)
  const [isPress3, setIsPress3] = useState(false)
  const [isPress4, setIsPress4] = useState(false)

  const s0 = getStartEndDayOfWeek()
  const s1 = getStartEndDayOfWeek(1)
  const s2 = getStartEndDayOfWeek(2)
  const s3 = getStartEndDayOfWeek(3)

  const loadAttendences = () => {
    dispatch(actions.attendencesModal([s0]))
  }

  useEffect(() => {
    loadAttendences()
  }, [])

  const categoriesData = get(data, 'chart.xAxis.categories')
  const seriesData = get(data, 'chart.series')

  options.xAxis.categories = categoriesData
  options.series = seriesData

  if (!isOpen) {
    return <></>
  }

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
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
                    setFirstLoading(false)
                    dispatch(actions.attendencesModal([s0]))
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
                    setFirstLoading(false)

                    dispatch(actions.attendencesModal([s1]))
                  }}
                >
                  {' '}
                  S-1{' '}
                </button>
                <button
                  className='btn3'
                  onClick={async () => {
                    setIsPress3(true)
                    setFirstLoading(false)
                    setIsPress2(false)
                    setIsPress1(false)
                    setIsPress4(false)
                    dispatch(actions.attendencesModal([s2]))
                  }}
                >
                  {' '}
                  S-2{' '}
                </button>
                <button
                  className='btn4'
                  onClick={async () => {
                    setFirstLoading(false)
                    setIsPress4(true)
                    setIsPress2(false)
                    setIsPress1(false)
                    setIsPress3(false)
                    dispatch(actions.attendencesModal([s3]))
                  }}
                >
                  {' '}
                  S-3{' '}
                </button>
              </Buttons>
            </>
          </section>
        </>
      )}
    </Container>
  )
}
