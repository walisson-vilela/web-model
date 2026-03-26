import { MwButton, MwGrid } from '@mw-kit/mw-ui'

import useContext from '../../../../../../context'
import * as S from '../../styled'
import { IOccupationPosition } from '../types'

import List from './List'
import * as Modals from './Modals'

const Positioning = (props: IOccupationPosition) => {
  const {
    modal: [, setModal],
  } = useContext()

  const {
    country: [country, setCountry],
    errors,
  } = props

  const onManageSegments = () => {
    setModal(
      <Modals.SegmentsManager
        close={() => setModal(null)}
        country_name={country.name}
        onSubmit={(selected, segments_rule) => {
          setCountry((prev) => ({
            ...prev,
            segments: [...selected],
            segments_rule,
          }))
        }}
        rule={country.segments_rule}
        selected={country.segments}
      />,
    )
  }

  const onManageMarketFlags = () => {
    setModal(
      <Modals.MarketFlagsManager
        close={() => setModal(null)}
        country_name={country.name}
        onSubmit={(selected, market_flags_rule) => {
          setCountry((prev) => ({
            ...prev,
            market_flags: selected.map((market_flag) => ({
              id: market_flag.id || null,
              foreign_id: market_flag.foreign_id,
              name: market_flag.name,
              network: {
                name: market_flag.chain,
                group: {
                  name: market_flag.group,
                },
              },
            })),
            market_flags_rule,
          }))
        }}
        rule={country.market_flags_rule}
        selected={country.market_flags.map((market_flag) => ({
          ...(market_flag.id ? { id: market_flag.id } : {}),
          foreign_id: market_flag.foreign_id,
          name: market_flag.name,
          chain: market_flag.network.name,
          group: market_flag.network.group.name,
        }))}
      />,
    )
  }

  return (
    <>
      <MwGrid.Row spacing={{ top: 's4', left: '0', right: '0' }}>
        <MwGrid.Col>
          <div>
            <S.Title>Posicionamento *</S.Title>

            <S.Subtitle>
              A Marca está para todos os Canais e Bandeiras. Se necessário,
              utilize os campos abaixo para restringir ou excluir.
            </S.Subtitle>
          </div>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <div>
            <S.Title>Canal</S.Title>

            <MwButton content='Definir Canais' onClick={onManageSegments} />
          </div>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <List {...props} field='segments' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <div>
            <S.Title>Bandeira</S.Title>

            <MwButton
              content='Definir Bandeiras'
              onClick={onManageMarketFlags}
            />
          </div>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <List {...props} field='market_flags' />
        </MwGrid.Col>
      </MwGrid.Row>
    </>
  )
}

export default Positioning
