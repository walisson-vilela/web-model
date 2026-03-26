import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

import useFormContext from '../../context'

import Components from './components'

const Grid = styled(MwGrid)`
  gap: ${({ theme }) => theme.spacings.s3};

  > div {
    height: 59px;
    border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  }
`

const Status = () => {
  const {
    form: { watch },
  } = useFormContext()

  const status = watch('status')

  const Component = Components[status]

  return (
    <Grid
      rows={{
        spacing: {
          top: '0',
          right: 's3',
          bottom: '0',
          left: 's3',
        },
        borderless: true,
      }}
      cols={{
        spacing: {
          top: '0',
          right: 's1',
          bottom: '0',
          left: 's1',
        },
        align: {
          content: {
            vertical: 'center',
          },
        },
        spacingAround: true,
      }}
      borderless
    >
      <Component />
    </Grid>
  )
}

export default Status
