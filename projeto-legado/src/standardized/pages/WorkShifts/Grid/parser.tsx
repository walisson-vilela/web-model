import Bullet from '../../../../components/Bullet'
import { ModalState } from '../../../../components/MwModal'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'
import AssociatedUsers from '../../../components/modals/AssociatedUsers'
import { WorkShift } from '../types'

import WeekDaysPopup from './Popups/WorkShiftsData'
import { BodyInterface } from './interface'
import { Link } from './styles'

export const managerWorkShiftsParser: (
  data: WorkShift[],
  setModal: React.Dispatch<React.SetStateAction<ModalState>>,
) => BodyInterface[] = (data, setModal) => {
  const parsedWorkShifts = data.reduce<BodyInterface[]>((acc, item) => {
    const weekdays_jsx = (
      <WeekDaysPopup
        id={item.id}
        electronic_point_label={notEmptyStringOrDefault(
          item.electronic_point_label,
        )}
        weekdays={item.weekdays}
      />
    )

    const workShift: BodyInterface = {
      ...item,
      active_jsx: (
        <Bullet
          color={item.active ? 'green' : 'red'}
          content={item.active_label}
        />
      ),
      weekdays_jsx,
      user_count_jsx:
        item.user_count < 1 ? null : (
          <Link
            onClick={() =>
              setModal(
                <AssociatedUsers
                  by='work-shift'
                  data={{
                    id: item.id,
                    eletronic_point_label: item.electronic_point_label,
                    count: item.user_count,
                  }}
                  close={() => setModal(null)}
                />,
              )
            }
          >
            {item.user_count}
          </Link>
        ),
    }

    return [...acc, workShift]
  }, [])

  return parsedWorkShifts
}
