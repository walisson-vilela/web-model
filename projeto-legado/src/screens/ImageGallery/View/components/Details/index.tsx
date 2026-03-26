import { useState } from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import moment from 'moment'
import { MdGpsFixed } from 'react-icons/md'

import GoogleMap from '../../../../../components/GoogleMap'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import StatusModal from '../Popup/StatusModal'

import { ImageDetailsProps } from './interface'
import * as S from './styles'

export const ImageDetails = ({ data }: ImageDetailsProps) => {
  const [openPopup, setOpenPopup] = useState(false)

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  const result = ['Pendente', 'Aprovado', 'Reprovado']

  const attendance_out_radius =
    data &&
    data.tags &&
    data.tags.find((item) => item.name === 'attendance_out_radius')
  return (
    <>
      <S.Info>
        {data && isObject(data.category) && (
          <S.Text>
            <b>Categoria:</b>
            <MwEllipsisContainer children={data.category.name} />
          </S.Text>
        )}
        <S.Text>
          <b>Formulário:</b>
          <MwEllipsisContainer
            children={data && data.form ? data.form.name : ''}
          />
        </S.Text>

        <S.Text>
          <b>Executor:</b>
          <MwEllipsisContainer
            children={data && data.people ? data.people.name : ''}
          />
          <MwEllipsisContainer
            children={`(${
              data && data.people && data.people.role
                ? data.people.role.name
                : ''
            } / ID: ${data.people ? data.people.id : ''})`}
          />
        </S.Text>
        <S.Text>
          <b>Data/hora:</b>
          {days[moment(data && data.created_at).weekday()]}{' '}
          {moment(data.created_at).format('DD/MM/YYYY')} às{' '}
          {moment(data.created_at).format('HH:mm:ss')}
        </S.Text>

        <S.StatusContainet>
          <S.Text>
            <b>Status:</b> {result[data.status ? data.status.value : 0]} -{' '}
            {data.status && data.status.modified_by ? (
              <MwEllipsisContainer
                style={{ maxWidth: '19%' }}
                children={data.status.modified_by.name || ''}
              />
            ) : (
              'Undefined'
            )}{' '}
            {' - '}
            {moment(data.status && data.status.modified_at).format(
              'DD/MM/YY',
            ) || ''}{' '}
            -
            {moment(data.status && data.status.modified_at).format('HH:mm') ||
              ''}
          </S.Text>
          {data.status &&
            data.status.notes !== null &&
            data.status.notes.length > 0 && (
              <S.CustomPopup
                om='click'
                pinned
                open={openPopup}
                position='left center'
                content={
                  <div>
                    <StatusModal
                      setOpenPopup={() => setOpenPopup(false)}
                      statusData={data.status}
                    />
                  </div>
                }
                trigger={
                  <img
                    src={`/assets/icons/image-gallery-tour/Detalhe Status.svg`}
                    style={{ cursor: 'pointer', height: '18px' }}
                    onClick={() => setOpenPopup(true)}
                  />
                }
              />
            )}
        </S.StatusContainet>
        <S.Text>
          <b> Motivo:</b>
          {data.status.reason.description
            ? data.status.reason.description
            : 'Não informado'}
        </S.Text>
      </S.Info>
      <S.Position isOut={attendance_out_radius.value}>
        <strong>Posição</strong>
        <S.MapContainer>
          <GoogleMap
            zoom={15}
            markers={[
              {
                lat: numberOrDefault(data.store ? data.store.lat : 0),
                lng: numberOrDefault(data.store ? data.store.lng : 0),

                circle: {
                  radius: numberOrDefault(data.store ? data.store.radius : 0),
                },
              },
              {
                lat: numberOrDefault(data.attendance ? data.attendance.lat : 0),
                lng: numberOrDefault(data.attendance ? data.attendance.lng : 0),
                icon: 'user-white-green',
                circle: {
                  radius: numberOrDefault(
                    data.attendance ? data.attendance.radius : 0,
                  ),
                  options: {
                    fillColor: '#66BB6A',
                    strokeColor: '#66BB6A',
                  },
                },
              },
            ]}
            hideUI={true}
            containerStyles={{
              width: '100%',
              height: '100%',
            }}
            loadingElement={<S.Map />}
            defaultOptions={{
              gestureHandling: 'none',
            }}
          />
        </S.MapContainer>
        {attendance_out_radius.value === 1 ? (
          <span>
            <MdGpsFixed />
            Imagem fora do raio, distancia de{' '}
            {Number(data.attendance.distance / 1000).toFixed(1)}Km
          </span>
        ) : (
          <span>
            <MdGpsFixed />
            Imagem dentro do raio, distancia de{' '}
            {Number(data.attendance.distance / 1000).toFixed(1)}Km
          </span>
        )}
      </S.Position>
      <S.Skus>
        <strong>Skus selecionado na pesquisa</strong>
        <ul>
          {data.products &&
            data.products.length > 0 &&
            data.products.map((item) => (
              <li key={item.id}>
                <S.Text>
                  <span>{item.id}</span>{' '}
                  <span className='spacer'>{'  -  '}</span>
                  <MwEllipsisContainer
                    style={{ width: '75%' }}
                    children={
                      item.name +
                      +`${
                        item.description === undefined
                          ? ''
                          : ' - ' + item.description
                      }`
                    }
                  />
                </S.Text>
              </li>
            ))}
        </ul>
      </S.Skus>
    </>
  )
}
