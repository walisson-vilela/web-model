import { MwButton, MwGrid, MwInput } from '@mw-kit/mw-ui'

import ErrorMessage from '../../../../../../../../../../standardized/components/form/components/ErrorMessage'
import useContext from '../../../../../../context'
import { Countries } from '../../../../../../interfaces'
import Label from '../label'
import { IOccupationPosition } from '../types'

import * as Modals from './Modals'
import * as S from './styled'

const Occupation = (props: IOccupationPosition) => {
  const {
    modal: [, setModal],
    form,
  } = useContext()

  const {
    country: [country, setCountry],
    errors,
  } = props

  const {
    formState: { submitCount },
  } = form

  const setOccupation = (occupation: Countries['occupation']) =>
    setCountry((prev) =>
      prev.occupation === occupation ? prev : { ...prev, occupation },
    )

  const onNotificate = () => {
    setModal(
      <Modals.Notificate
        onClose={() => setModal(null)}
        setOcupation={() => {
          setCountry((prev) => ({
            ...prev,

            occupation: 'NATIONAL',

            states: [],
            states_rule: '',

            cities: [],
            cities_rule: '',
          }))
          setModal(null)
        }}
      />,
    )
  }

  const onManageArea = () => {
    setModal(
      <Modals.ManageArea
        close={() => setModal(null)}
        country_name={country.name}
        onSubmit={(selected, rule) => {
          setCountry((prev) => ({
            ...prev,
            states: [...selected.states],
            states_rule: rule.states,

            cities: selected.cities.map((city) => ({
              id: city.id || null,
              foreign_id: city.foreign_id,
              name: city.name,
              state: {
                name: city.state_name,
                name_short: city.state_name_short,
              },
            })),
            cities_rule: rule.cities,
          }))
        }}
        rule={{
          states: country.states_rule,
          cities: country.cities_rule,
        }}
        selected={{
          states: country.states,
          cities: country.cities.map((city) => ({
            ...(city.id ? { id: city.id } : {}),
            foreign_id: city.foreign_id,
            name: city.name,
            state_name: city.state.name,
            state_name_short: city.state.name_short,
          })),
        }}
      />,
    )
  }

  return (
    <>
      <MwGrid.Row>
        <MwGrid.Col>
          <div>
            <S.Title>Atuação da Marca | País: {country.name} *</S.Title>
            <S.Subtitle>
              Neste campo defina a Área onde a Marca tem a sua atuação
              consolidada
            </S.Subtitle>
          </div>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='auto'>
          <div>Atuação da Marca:</div>
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <MwInput
            type='radio'
            label='Nacional'
            checked={country.occupation === 'NATIONAL'}
            onChange={(e) => {
              e.target.checked && onNotificate()
            }}
          />
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <MwInput
            type='radio'
            label='Regional'
            checked={country.occupation === 'REGIONAL'}
            onChange={(e) => e.target.checked && setOccupation('REGIONAL')}
            required
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <ErrorMessage
            children={
              'occupation' in errors && submitCount > 0
                ? errors.occupation.message
                : undefined
            }
          />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <MwButton
            content='Gerenciar Áreas'
            disabled={!country || country.occupation === 'NATIONAL'}
            onClick={onManageArea}
          />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          {country.occupation === 'NATIONAL' && (
            <S.Message>Esta marca está para todas as áreas do País.</S.Message>
          )}

          <S.Grid
            $isInvalid={'occupation' in errors && submitCount > 0}
            cols={{
              spacing: 's3',
              align: { content: { horizontal: 'center' } },
              bordered: true,
            }}
          >
            <MwGrid.Row style={{ borderRadius: 4, fontWeight: 'bold' }}>
              <MwGrid.Col width='6' children='Estado' />

              <MwGrid.Col children='Cidade' />
            </MwGrid.Row>

            <MwGrid.Row borderless style={{ borderRadius: 4 }}>
              <MwGrid.Col width='6'>
                <Label
                  count={country.states.length}
                  rule={country.states_rule}
                  singular='Estado'
                  plural='Estados'
                />
              </MwGrid.Col>

              <MwGrid.Col>
                <Label
                  count={country.cities.length}
                  rule={country.cities_rule}
                  singular='Cidade'
                  plural='Cidades'
                />
              </MwGrid.Col>
            </MwGrid.Row>
          </S.Grid>
        </MwGrid.Col>
      </MwGrid.Row>
    </>
  )
}

export default Occupation
