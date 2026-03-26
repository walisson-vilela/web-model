import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Form from './Form'
import Manager from './Manager'
import useImportDataContext, { ImportDataProvider } from './provider'

const ImportData = createRouteTab(() => {
  const {
    form: [form, setForm],
    reloadTrigger: [reloadTrigger, setReloadTrigger],
    managerProps,
  } = useImportDataContext()

  return (
    <MwManagerContainer>
      <Header
        description='Defina através da opção abaixo qual o procedimento de importação que você deseja realizar.'
        style={{ marginBottom: 7 }}
      />

      <Form form={[form, setForm]} reload={setReloadTrigger} />

      <Manager
        {...managerProps}
        formType={form.type}
        reloadTriggerState={[reloadTrigger, setReloadTrigger]}
      />
    </MwManagerContainer>
  )
}, ImportDataProvider)

export default ImportData
