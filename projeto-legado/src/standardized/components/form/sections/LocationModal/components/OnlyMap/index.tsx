import React, { useEffect, useState } from 'react'

import Modal from '../../../../../../../components/MwModal'
import { Form, OnlyMapProps } from '../../interface'
import LocationModalFooter from '../Footer'

import * as Components from './components'
import ContentInfoComponent from './components/ContentInfoComponent'
import { formatAddress } from './functions'
import * as Inputs from './inputs'

const OnlyMap = (props: OnlyMapProps) => {
  const { close, account_name, audits } = props

  const [values, setValues] = useState<Form>({ ...props.value })
  const [loading, setLoading] = useState(false)
  const [auditsOpen, setAuditsOpen] = useState(false)
  const [auditsEnabled, setAuditsEnabled] = useState<number[]>([])
  const [auditsInfoWindows, setAuditsInfoWindows] = useState<number[]>([])

  useEffect(() => {
    setAuditsOpen(false)
    setAuditsEnabled([])
    setAuditsInfoWindows([])
  }, [audits])

  const handleSetAuditsEnabled = (v: React.SetStateAction<boolean>) => {
    if (v) {
      setAuditsEnabled(props.audits?.map((_, i) => i) || [])
    } else {
      setAuditsEnabled([])
    }
  }

  const onConfirm = () => {
    props.save({ ...values })
    close()
  }

  return (
    <React.Fragment>
      <Modal.Body style={{ padding: '0' }}>
        <div style={{ display: 'flex', flex: '1' }}>
          <div style={{ width: '40%' }}>
            <ContentInfoComponent
              height='60%'
              title='Dados da Localização'
              children={
                <React.Fragment>
                  {account_name && <div>{account_name}</div>}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                    }}
                  >
                    {formatAddress(values)}
                  </div>
                </React.Fragment>
              }
            />
            <ContentInfoComponent height='10%'>
              {' '}
              {props.audits !== undefined && (
                <Components.AuditsSwitch
                  open={[
                    auditsOpen,
                    (v) => {
                      handleSetAuditsEnabled(v)
                      setAuditsInfoWindows([])
                      setAuditsOpen(v)
                    },
                  ]}
                  disabled={props.audits.length < 1}
                />
              )}
            </ContentInfoComponent>

            <ContentInfoComponent
              height='30%'
              title='Parâmetros do Raio'
              children={<Inputs.RadiusMap values={[values, setValues]} />}
            />
          </div>

          <Components.OnlyGoogleMap
            propsMap={props}
            setLoading={setLoading}
            values={[values, setValues]}
            auditsEnabled={[auditsEnabled, setAuditsEnabled]}
            auditsInfoWindows={[auditsInfoWindows, setAuditsInfoWindows]}
          />

          {props.audits !== undefined && auditsOpen && (
            <Components.AuditsSubtitle
              open={[
                auditsEnabled,
                (v) => {
                  setAuditsInfoWindows([])
                  setAuditsEnabled(v)
                },
              ]}
              length={props.audits.length}
            />
          )}
        </div>
      </Modal.Body>

      <LocationModalFooter
        close={close}
        onSubmit={onConfirm}
        loading={loading}
      />
    </React.Fragment>
  )
}

export default OnlyMap
