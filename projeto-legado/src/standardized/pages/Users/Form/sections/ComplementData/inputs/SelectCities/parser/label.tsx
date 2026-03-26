import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import styled from 'styled-components'

import { HostCity } from '../types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s3} / 2);
  color: ${({ theme }) => theme.colors.greyishBlue};
  overflow: hidden;
  > div {
    :nth-child(2) {
      color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
    }
  }
`

const Label: Exclude<SelectOption<HostCity>['label'], React.ReactNode> = ({
  data,
}) => {
  return (
    <Container>
      <MwEllipsisContainer children={data.name || '-'} />
      <MwEllipsisContainer
        children={[data.state.name, data.country.name]
          .map((e) => e || '-')
          .join(' | ')}
      />
    </Container>
  )
}

export default Label
