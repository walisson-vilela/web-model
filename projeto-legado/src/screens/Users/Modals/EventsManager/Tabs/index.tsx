import { MwGrid } from '@mw-kit/mw-ui'

import Grid from '../components/Grid'
import useEventManagerContext from '../context'

import FormUser from './components/Form'

const Tabs = () => {
  const { mode } = useEventManagerContext()
  return (
    <MwGrid.Row key={mode}>
      {mode === 'future' && (
        <MwGrid.Col
          style={{ padding: '0' }}
          align={{ content: { horizontal: 'center' } }}
          width='4'
        >
          <FormUser />
        </MwGrid.Col>
      )}

      <MwGrid.Col
        style={{ padding: '0', overflow: 'hidden' }}
        {...(mode === 'future' ? { width: '8' } : { width: '12' })}
      >
        <Grid />
      </MwGrid.Col>
    </MwGrid.Row>
  )
}

export default Tabs
