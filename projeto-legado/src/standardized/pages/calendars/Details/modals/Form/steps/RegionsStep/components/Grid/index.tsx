import { MwGrid } from '@mw-kit/mw-ui'

import { Selector } from '../../../../../../components'
import type {
  SelectorConfig,
  SelectorProps,
} from '../../../../../../components/types'
import useFormContext from '../../../../context'
import type { Value } from '../../../../types'

export const Grid = <Field extends 'regions' | 'cities' | 'states'>(props: {
  config: SelectorConfig<Value[Field][number]>
  target: Field
}) => {
  const { useField, originals } = useFormContext()

  const [selected, setSelected] = useField(props.target)

  const config = {
    ...props.config,
    selected: [selected, setSelected],
    original: originals[props.target],
  } as SelectorProps<(typeof selected)[number]>

  return (
    <MwGrid
      cols={{
        spacing: {
          top: 's1',
          left: 's1',
          bottom: 's3',
          right: 's1',
        },
        bordered: true,
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col>
          <Selector.Left {...config} />
        </MwGrid.Col>

        <MwGrid.Col>
          <Selector.Right {...config} />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}
