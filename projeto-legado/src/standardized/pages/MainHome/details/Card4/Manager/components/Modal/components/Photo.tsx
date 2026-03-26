import { Popup } from 'semantic-ui-react'

import { CheckFoto, CheckGps } from '../../../icons'
import { Map } from './Map'

type Props = {
  captionLeft: string
  captionRight: string
  showValidationFooter?: boolean
  recognitionPercent?: number
  distanceBetweenCenters?: number
  enableSelfValidationPopup?: boolean
  enableGpsValidationPopup?: boolean
  gpsMapType?: string
}

export const Photo = (props: Props) => {
  const {
    captionLeft,
    captionRight,
    showValidationFooter,
    recognitionPercent = 10.3,
    distanceBetweenCenters = 5.5,
    enableSelfValidationPopup,
    enableGpsValidationPopup,
    gpsMapType = 'check_out',
  } = props

  const selfValidationPopup = (
    <div
      style={{
        padding: 12,
        width: 720,
        maxWidth: 'calc(100vw - 64px)',
        background: '#f3f4f6',
        borderRadius: 4,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Validação da self</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
            Fonte da imagem: Cadastro
          </div>
          <div
            style={{
              width: '100%',
              height: 220,
              background:
                'url(/assets/images/profile.png) center/cover no-repeat',
              borderRadius: 4,
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
            Fonte da imagem: Self do check
          </div>
          <div
            style={{
              width: '100%',
              height: 220,
              background:
                'url(/assets/images/square-image.png) center/cover no-repeat',
              borderRadius: 4,
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: 8, textAlign: 'right', fontSize: 12 }}>
        <span style={{ color: '#6b7280', cursor: 'pointer' }}>Fechar</span>
      </div>
    </div>
  )

  const gpsValidationPopup = (
    <div
      style={{
        width: 720,
        maxWidth: 'calc(100vw - 64px)',
        background: '#f3f4f6',
        borderRadius: 4,
      }}
    >
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
          {captionLeft} (102000)
        </div>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
          Segunda-Feira 20/02/2021 - 09:08:41
        </div>

        <div style={{ width: '100%', borderRadius: 4, overflow: 'hidden' }}>
          <Map type={gpsMapType === 'check_in' ? 'check_in' : 'check_out'} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 8,
            fontSize: 12,
            color: '#6b7280',
          }}
        >
          <span>Precisão da Coordenada 1,7 m</span>
          <span style={{ cursor: 'pointer' }}>Fechar</span>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: 273,
          background: `url(/assets/images/square-image.png) center/cover no-repeat`,
          borderRadius: 4,
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: '#6b7280',
          marginTop: 10,
        }}
      >
        <div>{captionLeft}</div>
        <div>{captionRight}</div>
      </div>

      {showValidationFooter ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: 12,
            color: '#6b7280',
            marginTop: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>
              Percentual reconhecimento entre as imagens do executor:
            </span>
            {enableSelfValidationPopup ? (
              <Popup
                on='click'
                position='top center'
                offset={[0, 8]}
                style={{ padding: 0, background: '#f3f4f6' }}
                trigger={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <CheckFoto width={14} height={14} />
                  </span>
                }
                content={selfValidationPopup}
                wide
              />
            ) : (
              <CheckFoto width={14} height={14} />
            )}
            <strong style={{ color: '#111827' }}>
              {recognitionPercent.toString().replace('.', ',')}%
            </strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Distância entre o centros dos raio:</span>
            {enableGpsValidationPopup ? (
              <Popup
                on='click'
                position='top center'
                offset={[0, 8]}
                style={{ padding: 0, background: '#f3f4f6' }}
                trigger={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <CheckGps width={14} height={14} />
                  </span>
                }
                content={gpsValidationPopup}
                wide
              />
            ) : (
              <CheckGps width={14} height={14} />
            )}
            <strong style={{ color: '#111827' }}>
              {distanceBetweenCenters.toString().replace('.', ',')}m
            </strong>
          </div>
        </div>
      ) : null}
    </div>
  )
}
