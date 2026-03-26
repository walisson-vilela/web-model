import moment from 'moment'

import { selectedForm } from './components/content/components/forms'
import { CreateSurveyFormData } from './interface'

export const parserCreateSurvey = (
  values: CreateSurveyFormData,
  selectedItems: selectedForm,
) => {
  const inicialDate = moment(values.validityStart).format('YYYY-MM-DD')

  const finalDate =
    values.validity === 'fi'
      ? '0000-00-00'
      : moment(values.validityEnd).format('YYYY-MM-DD')

  const survey_forms = Object.values(selectedItems.form)
    .filter((element) => element !== null)
    .map((item) =>
      Object.values(item).map((element) =>
        element.map((el) => ({
          form_id: el.id,
          display: el.display,
          first_attendance: el.first_attendance,
          first_attendance_percentage: el.first_attendance_percentage,
          complete_filling_only: el.complete_filling_only === 'S' ? 1 : 0,
        })),
      ),
    )
    .flat(2)

  delete selectedItems.form

  const survey_links = Object.values(selectedItems)
    .filter((element) => element !== null)
    .map((item) =>
      Object.values(item)
        //@ts-ignore
        .filter((element) => element.items.length > 0)
        .map((el) =>
          //@ts-ignore
          el.items.map((b) => ({ link_type: b.link_type, link_id: b.id })),
        ),
    )
    .flat(2)

  var frequecyType = values.frequency

  switch (values.frequency) {
    case 'U':
    case 'D':
      frequecyType = 'R'
      break
  }

  const payload = {
    name: values.name,
    action: values.behavior,
    status: values.status,
    type: values.mandatory,
    hierarchy_id: values.pilar,
    frequency: {
      type: frequecyType,
      cycle: values.frequencyCicle || values.frequencyDays[0],
      days: values.frequency === 'S' ? values.frequencyDays : null,
      fortnights: values.frequency === 'Q' ? values.frequencyDays : null,
    },
    validity: {
      start: inicialDate,
      end: finalDate,
    },
    survey_forms,
    survey_links,
  }

  values.frequency !== 'S' && delete payload.frequency.days
  values.frequency !== 'Q' && delete payload.frequency.fortnights

  return payload
}
