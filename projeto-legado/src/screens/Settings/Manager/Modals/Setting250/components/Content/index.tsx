import { MwIcon, MwInput, MwMenu } from '@mw-kit/mw-ui'
import moment from 'moment'
import { Popup } from 'semantic-ui-react'

import { Grid } from '../../../../../../../components/FormFields'
import { download } from '../../../../../../../utils/DownloadFile'
import { dateOrDefault } from '../../../../../../../utils/Formatters'
import Manager from '../../Manager'
import { labels, types } from '../../constants'
import { ContentProps } from '../../interfaces'
import { getSettingData } from '../../services'
import * as S from '../../styles'

const Content = ({
  form,
  currentType,
  currentSchedule,
  type,
  setForm,
  item,
  modalRef,
  setOpenedMenu,
  openedMenu,
  closeMenu,
  loading,
  setLoading,
}: ContentProps) => {
  const extractData = async (pendencies: string) => {
    try {
      const data = await getSettingData({
        pendence: pendencies,
        extract: true,
      })
      if (data) {
        download(data.url)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <S.Wrapper isActive={form.type === type}>
      <S.Options>
        <MwInput
          type='radio'
          name='type'
          label={`${labels[type]}${type === types[0] ? ' (Default)' : ''}`}
          checked={form.type === type}
          onChange={() =>
            setForm((prev) => ({
              ...prev,
              type,
            }))
          }
          disabled={item.length > 0}
        />
        <Popup
          style={{ height: '400px', width: '600px' }}
          on='click'
          trigger={
            <S.Pendencies>
              {item.length !== 0 && (
                <>
                  <span> {item.length} Pendências</span>

                  <MwIcon type='semantic' icon='dropdown' color='#939393' />
                </>
              )}
            </S.Pendencies>
          }
          content={
            <S.PopupContent>
              <Grid.Row justify='between' align='center'>
                <span>Lista de usuários sem informação de matrícula</span>

                <div style={{ position: 'relative' }} ref={modalRef}>
                  <MwIcon
                    color='#D6D6D6'
                    type='feather'
                    icon='more_vertical'
                    onClick={() => setOpenedMenu(true)}
                  />

                  <MwMenu
                    open={openedMenu}
                    close={closeMenu}
                    position='top left'
                    width={'114px'}
                    options={[
                      {
                        label: 'Extrair dados',
                        onClick: () => extractData(type),
                        data: {},
                      },
                    ]}
                  />
                </div>
              </Grid.Row>

              <S.Manager>
                <Manager
                  loading={loading}
                  pendance={type}
                  setLoading={setLoading}
                />
              </S.Manager>
            </S.PopupContent>
          }
          position='right center'
          wide
        />
        {item.length > 0 && (
          <Popup
            on='click'
            trigger={
              <MwIcon
                type='feather'
                icon='info'
                color='black'
                width={12}
                height={12}
              />
            }
            content={
              <>
                <p>
                  Para habilitar este campo é necessário que todos os cadastros
                  tenham a matricula preenchida.
                </p>

                <p>
                  Verifique na seta ao lado, todas as pendências a serem
                  corrigidas.
                </p>
              </>
            }
            position='right center'
            className='popup-field'
            inverted
            wide
          />
        )}
      </S.Options>
      <S.OptionsAlert>
        {(() => {
          if (form.type !== type) return

          if (currentSchedule) {
            if (form.type === currentSchedule.type) {
              return (
                <p>
                  Troca de credencial em andamento, de{' '}
                  <strong>{labels[currentType]}</strong> para{' '}
                  <strong>{labels[currentSchedule.type]}</strong> - Conclusão em{' '}
                  <strong>
                    {dateOrDefault(currentSchedule.date, '-', 'DD/MM/YYYY')}
                  </strong>
                </p>
              )
            }

            if (form.type === currentType) {
              return (
                <p>Essa ação irá cancelar o ciclo de mudança da credencial</p>
              )
            }

            return
          }

          if (form.type === currentType) return

          const daysLeft =
            Math.abs(moment().diff(moment(form.date), 'days')) + 1
          return (
            <p>
              Ação inicia um novo ciclo de mundanças em {daysLeft} dias, de{' '}
              <strong>{labels[currentType]}</strong> para{' '}
              <strong>{labels[form.type]}</strong>
            </p>
          )
        })()}
      </S.OptionsAlert>
    </S.Wrapper>
  )
}

export default Content
