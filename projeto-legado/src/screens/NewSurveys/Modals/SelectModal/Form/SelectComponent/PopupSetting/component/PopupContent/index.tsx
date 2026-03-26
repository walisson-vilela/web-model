import { useContext, useState } from 'react'

import { MwButton, MwIcon, MwInput } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { FormContext } from '../../../../context'
import { PopupFormI, PopupSettingsContentProps } from '../../../interface'
import * as S from '../../styles'

export const PopupContent = ({
  config,
  id,
  setSettingOpened,
}: PopupSettingsContentProps) => {
  const { selectedItems, setSelectedItems } = useContext(FormContext)

  const item = selectedItems[config.label].items.find((item) => item.id === id)

  const [form, setForm] = useState<PopupFormI>({
    display: item.display,
    first_attendance: item.first_attendance,
    complete_filling_only: item.complete_filling_only,
    first_attendance_percentage: item.first_attendance_percentage || 10,
    confirmWarnign: item.confirmWarnign,
  })

  const [minMaxRange, setMinMaxRange] = useState({
    min: 10,
    max:
      form.complete_filling_only === 'S' && form.first_attendance === 'S'
        ? 100
        : 50,
  })

  const options = [
    {
      label: 'Ocultar Formulário (Default)',
      value: 'N',
      data: {},
    },
    { label: 'Nunca Ocultar Formulário', value: 'S', data: {} },
  ]

  const saveSettings = () => {
    const index = selectedItems[config.label].items.findIndex(
      (i) => i.id === item.id,
    )

    item.display = form.display
    item.first_attendance = form.first_attendance
    item.complete_filling_only = form.complete_filling_only
    item.first_attendance_percentage = form.first_attendance_percentage
    item.confirmWarnign = form.confirmWarnign

    setSelectedItems((prev) => {
      prev[config.label].items.splice(index, 1, item)
      return {
        ...prev,
        [config.label]: {
          items: prev[config.label].items,
        },
      }
    })
    setSettingOpened(false)
  }
  return (
    <S.PopupContaier>
      <S.PopupHeader>
        <span>Opções de Configuração</span>
      </S.PopupHeader>

      <S.PopupContent>
        <span>
          <span>
            Defina a dinâmica de visualização da pesquisa após o preenchimento,
            respeitando o respectivo ciclo.
          </span>

          <Popup
            wide
            inverted
            on='click'
            className='popup-field'
            position='bottom center'
            trigger={
              <div
                style={{
                  display: 'inline-block',
                  marginLeft: 3.5,
                }}
              >
                <MwIcon
                  type='feather'
                  icon='info'
                  width={12}
                  height={12}
                  color='#192338'
                />
              </div>
            }
            content={
              <S.info>
                <h1>Dinâmica de Visualização do Formulário</h1>

                <div>
                  <span>
                    - <b>Ocultar formulário:</b> Ao concluir o formulário ele é
                    ocultado, retornado no próximo ciclo
                  </span>
                  <span>
                    - <b>Nunca ocultar formulário:</b> Ao concluir o formulário
                    continuará visível.
                  </span>
                </div>

                <h1>Execução do Formulário</h1>

                <div>
                  <span>
                    - <b>Iniciar o formulário da pesquisa na 1ª visita?:</b> O
                    executar deverá iniciar no mínimo 10% do formulário na
                    primeira visita de um PDV dentro do Ciclo.
                  </span>
                  <span>
                    -{' '}
                    <b>
                      O Executor deve iniciar e concluir a pesquisa dentro da
                      mesma visita:
                    </b>{' '}
                    Se o executor iniciar uma pesquisa terá que conclui-la 100%.
                  </span>
                </div>
              </S.info>
            }
          />
        </span>

        <div>
          <MwInput
            type='select'
            placeholder='Selecione'
            loader={async () => ({
              lastPage: true,
              options,
            })}
            label='Após concluir o formulário da pesquisa:'
            value={form.display}
            setValue={(value) => {
              setForm((prev) => ({
                ...prev,
                display: value as 'S' | 'N',
                first_attendance: prev.first_attendance as 'S' | 'N',
              }))
            }}
          />
        </div>

        <S.InputsContent>
          <span>Iniciar o formulário da pesquisa na 1ª visita?</span>
          <div>
            <MwInput
              type='radio'
              label='Sim'
              checked={form.first_attendance === 'S'}
              name='radio-form'
              onChange={() => {
                if (form.complete_filling_only === 'S') {
                  setMinMaxRange((prev) => ({ ...prev, max: 100 }))
                  setForm((prev) => ({
                    ...prev,
                    min_search: 100,
                    first_attendance: 'S',
                  }))
                } else {
                  setMinMaxRange((prev) => ({ ...prev, max: 50 }))
                  setForm((prev) => ({
                    ...prev,
                    min_search: 10,
                    first_attendance: 'S',
                  }))
                }
              }}
            />

            <MwInput
              type='radio'
              label='Não'
              checked={form.first_attendance === 'N'}
              name='radio-form'
              onChange={() => {
                setMinMaxRange((prev) => ({ ...prev, max: 50 }))
                setForm((prev) => ({
                  ...prev,
                  min_search: 10,
                  first_attendance: 'N',
                }))
              }}
            />

            <MwInput
              type='range'
              name='radius'
              disabled={
                form.first_attendance === 'N' ||
                form.complete_filling_only === 'S'
              }
              value={numberOrDefault(form.first_attendance_percentage)}
              setValue={(value) => {
                setForm((prev) => {
                  const radius =
                    typeof value === 'function'
                      ? value(
                          numberOrDefault(prev.first_attendance_percentage, 10),
                        )
                      : value
                  return {
                    ...prev,
                    first_attendance_percentage: Number(radius),
                  }
                })
              }}
              markers={{ min: minMaxRange.min, max: minMaxRange.max }}
              maxLabel={`${minMaxRange.max}%`}
              minLabel={`Mínimo: ${minMaxRange.min}%`}
              step={5}
            />
          </div>
        </S.InputsContent>

        <S.InputsContent>
          <span>
            O Executor deve iniciar e concluir a pesquisa dentro da mesma
            visita.
          </span>

          <div>
            <MwInput
              type='radio'
              label='Sim'
              checked={form.complete_filling_only === 'S'}
              name='radio-form-finish'
              onChange={() => {
                if (form.first_attendance === 'S') {
                  setMinMaxRange((prev) => ({ ...prev, max: 100 }))
                  setForm((prev) => ({
                    ...prev,
                    min_search: 100,
                    complete_filling_only: 'S',
                  }))
                } else {
                  setMinMaxRange((prev) => ({ ...prev, max: 50 }))
                  setForm((prev) => ({
                    ...prev,
                    min_search: 10,
                    complete_filling_only: 'S',
                  }))
                }
              }}
            />

            <MwInput
              type='radio'
              label='Não'
              checked={form.complete_filling_only === 'N'}
              name='radio-form-finish'
              onChange={() => {
                setMinMaxRange((prev) => ({ ...prev, max: 50 }))
                setForm((prev) => ({
                  ...prev,
                  min_search: 10,
                  complete_filling_only: 'N',
                }))
              }}
            />
          </div>
        </S.InputsContent>

        {form.first_attendance === 'S' &&
          form.complete_filling_only === 'S' && (
            <S.WarningContainer>
              <strong children='Ação coloca em risco a qualidade da execução' />

              <S.WarningText>
                <span>
                  Será obrigatório concluir o formulário integralmente nas
                  primeiras visitas.
                </span>
              </S.WarningText>

              <S.WarningInput>
                <strong>Sim, eu estou ciente disto</strong>
                <MwInput
                  type='checkbox'
                  checked={form.confirmWarnign}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      confirmWarnign: e.target.checked,
                    }))
                  }
                />
              </S.WarningInput>
            </S.WarningContainer>
          )}
      </S.PopupContent>

      <S.Footer>
        <div>
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={() => setSettingOpened(false)}
          />

          <MwButton
            content='Salvar'
            onClick={saveSettings}
            disabled={
              form.first_attendance === 'S' &&
              form.complete_filling_only === 'S' &&
              !form.confirmWarnign
            }
          />
        </div>
      </S.Footer>
    </S.PopupContaier>
  )
}
