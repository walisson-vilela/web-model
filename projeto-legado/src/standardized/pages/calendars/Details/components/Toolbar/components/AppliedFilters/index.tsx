import { MwAppliedFilters } from '@mw-kit/mw-ui'

import { useMainContext } from '../../../../contexts'

const AppliedFilters = () => {
  const { appliedFilters } = useMainContext()

  return (
    <div className='filter'>
      <MwAppliedFilters
        containerProps={{ axis: 'y', center: { x: 0, y: 75 } }}
        appliedFilters={appliedFilters}
      />
    </div>
  )
}

export default AppliedFilters
