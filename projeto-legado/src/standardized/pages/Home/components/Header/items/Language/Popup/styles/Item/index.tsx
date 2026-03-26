import { MwIcon } from '@mw-kit/mw-ui'
import styled from 'styled-components'

import { filterObject } from '../../../../../../../../../utils/formatters'

type ItemProps = React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean
}

const Container = styled.div<{ $active: ItemProps['active'] }>`
  padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s3}`};
  ${({ theme }) => theme.useTypography('h4')}
  line-height: 17px;

  color: ${({ theme, $active: active }) =>
    theme.getColor('greyishBlue', active === false ? 50 : 100)};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};

  > div + div {
    margin: -2.75px 0;
  }
`

const Item = (props: ItemProps) => {
  const containerProps = filterObject<
    ItemProps,
    Parameters<typeof Container>[0]
  >(props, ['active'], {
    $active: props.active,
  })

  return (
    <Container {...containerProps}>
      <div children={props.children} />

      {props.active && (
        <MwIcon
          type='feather'
          icon='check'
          width='22.5px'
          height='22.5px'
          color='green'
        />
      )}
    </Container>
  )
}

export default Item
