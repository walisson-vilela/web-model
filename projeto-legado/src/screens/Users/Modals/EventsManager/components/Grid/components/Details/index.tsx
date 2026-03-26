import { MwEllipsisContainer, MwIcon, MwScrollContainer } from '@mw-kit/mw-ui'

import { notEmptyStringOrDefault } from '../../../../../../../../utils/Formatters'
import useEventManagerContext from '../../../../context'

import { formatPeriod } from './function'
import { Concluded, Interrupt, Removed } from './status'
import * as S from './styles'

const Details = () => {
  const {
    paginator,
    events: [data],
    loading: [loading],
    mode,
  } = useEventManagerContext()

  return (
    <MwScrollContainer
      style={{
        padding: '7px',
        gap: '7px',
        display: 'flex',
        flex: 1,
      }}
      onScrollEnd={paginator}
      empty={{
        empty: data.length === 0,
        content: (
          <S.EmptyMessage>
            Nenhum resultado encontrado para a busca realizada
          </S.EmptyMessage>
        ),
      }}
      loading={loading}
    >
      {data.map((item, index) => {
        const StatusName = (() => {
          if (item.type === 'out' || item.interrupted_at) {
            return Removed
          }

          if (item.event.ended_at) {
            return Concluded
          }

          return Interrupt
        })()

        const name = item.event.classification
          ? ['Motivo', item.event.classification.name]
          : ['Evento', item.event.name]

        return (
          <S.Card className={mode} key={index}>
            <div>
              <div>
                <MwEllipsisContainer>
                  <b>Tipo:</b>{' '}
                  {notEmptyStringOrDefault(item.event.type_label, ' - ')}
                </MwEllipsisContainer>

                <MwEllipsisContainer>
                  <b>Origem:</b>{' '}
                  {notEmptyStringOrDefault(item.event.origin, ' - ')}
                </MwEllipsisContainer>
              </div>

              <div>
                <MwEllipsisContainer>
                  <b>{name[0]}:</b> {name[1] || '-'}
                </MwEllipsisContainer>
              </div>

              <div>
                <MwEllipsisContainer>
                  <b>Período:</b>{' '}
                  {formatPeriod(item.event.starts_at, item.event.ends_at)}
                </MwEllipsisContainer>
              </div>

              <div>
                <MwEllipsisContainer>
                  <b>Responsável:</b>{' '}
                  {notEmptyStringOrDefault(item.modifier?.name, '-')}
                </MwEllipsisContainer>
              </div>
            </div>

            <div>
              {item.event?.file?.url && (
                <a href={item.event.file.url} target='_blank'>
                  <MwIcon
                    type='feather'
                    icon='file'
                    color='greyishBlue'
                    height={17}
                    width={17}
                  />

                  <MwEllipsisContainer>
                    {item.event.file.name}
                  </MwEllipsisContainer>
                </a>
              )}
            </div>

            <div>
              <StatusName event={item} />
            </div>
          </S.Card>
        )
      })}
    </MwScrollContainer>
  )
}

export default Details
