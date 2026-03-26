import { MwFilters } from '@mw-kit/mw-ui'
import type { FiltersProps } from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import { useMainContext } from '../../../../contexts'

const Filters = (props: Pick<FiltersProps, 'items'>) => {
  const {
    appliedFilters: [, setAppliedFilters],
  } = useMainContext()

  return (
    <div className='filter'>
      <MwFilters
        {...{ ...props, setAppliedFilters }}
        containerProps={{ position: 'right bottom' }}
        subContainerProps={{ center: { x: 25, y: 50 } }}
      />
    </div>
  )
}

export default Filters
