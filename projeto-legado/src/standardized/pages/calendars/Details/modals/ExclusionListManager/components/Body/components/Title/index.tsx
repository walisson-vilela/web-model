import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import type { SelectOption } from '@mw-kit/mw-ui/types'
import { format } from 'date-fns'

import type { Events } from '../../../../../Form/types'
import useExclusionListManagerContext from '../../../../context'

import { CopyUserPopup } from './components/CopyUserPopup'
import * as S from './styled'

const getOption = (ev: Events): SelectOption => {
  return {
    label: format(new Date(ev.start), 'dd/MM/yyyy HH:mm'),
    value: ev.id.toString(),
    data: ev,
  }
}

const Title = () => {
  const {
    eventsList: [eventsList],
    selected: [selected],
    selectedIndex: [, setSelectedIndex],
  } = useExclusionListManagerContext()

  const loader = useCallback(async () => {
    return eventsList.map((ev) => getOption(ev))
  }, [eventsList])

  return (
    <S.TitleContainer>
      <S.TitleSection>
        <S.TitleText>Lista de Usuários</S.TitleText>
        <S.SubTitleText>
          Utilize os campos abaixo para excluir usuários de um evento
        </S.SubTitleText>
        <S.SelectEventContainer>
          Selecione o evento:{' '}
          <MwInput
            type='select'
            placeholder='Selecione'
            value={selected ? getOption(selected) : ''}
            setValue={(selectedStart) => {
              const selectedEvent = eventsList.findIndex((ev) => {
                return ev.id.toString() === selectedStart
              })
              if (selectedEvent < 0) return
              setSelectedIndex(selectedEvent)
            }}
            loader={loader}
          />
        </S.SelectEventContainer>
      </S.TitleSection>
      <div>
        <CopyUserPopup />
      </div>
    </S.TitleContainer>
  )
}

export default Title
