import { MwInput } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import { dateOrDefault } from '../../../../../../../utils/Formatters'
import { CalendarProps } from '../../interfaces'

const Calendar = ({ form, setForm, disabled }: CalendarProps) => {
  const min = new Date()
  min.setDate(min.getDate() + 3)
  min.setHours(0, 0, 0, 0)

  return (
    <div>
      <Popup
        on='click'
        trigger={
          <div>
            <MwInput
              type='date'
              picker={{
                axis: 'x',
                center: { x: 50, y: 0 },
              }}
              min={min}
              value={dateOrDefault(form.date, '', 'DD/MM/YYYY')}
              setValue={(value) => {
                const date = dateOrDefault(
                  value,
                  '',
                  'YYYY-MM-DD',
                  'DD/MM/YYYY',
                )
                setForm((prev) => ({
                  ...prev,
                  date,
                }))
              }}
              disabled={disabled}
            />
          </div>
        }
        content={<p>Defina uma chave antes de definir uma data.</p>}
        position='right center'
        className='popup-field'
        inverted
        wide
        disabled={!disabled}
      />
    </div>
  )
}

export default Calendar
