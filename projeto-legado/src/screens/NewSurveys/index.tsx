import { Header } from '../../components'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import { SurveysProvider } from './context'
import { SurveyManager } from './manager'
import useNewSurveysContext, { NewSurveyProvider } from './provider'

const NewSurveys = createRouteTab(() => {
  const { managerProps } = useNewSurveysContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize os campos abaixo para gerenciar e configurar um modelo de pesquisa dentro do universo da execução' />

      <SurveysProvider>
        <SurveyManager {...managerProps} />
      </SurveysProvider>
    </MwManagerContainer>
  )
}, NewSurveyProvider)

export default NewSurveys
