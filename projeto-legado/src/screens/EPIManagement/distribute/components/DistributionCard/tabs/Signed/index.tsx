import React, { useEffect, useState } from 'react'

import { DistributionSignature } from '../../../../../interfaces'
import { listDistributionSignatures } from '../../../../services'
import SignatureList from '../../components/SignatureList'
import SignatureItem from './SignatureItem'

type SignedTabProps = {
  distributionId: number
}

const SignedTab = ({ distributionId }: SignedTabProps) => {
  const [signatures, setSignatures] = useState<DistributionSignature[]>([])
  const [loading, setLoading] = useState(false)
  const [profileId, setProfileId] = useState<string | number | undefined>()

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      try {
        const data = await listDistributionSignatures(distributionId, 'C', {
          profileId,
        })
        if (mounted) setSignatures(data)
      } catch (error) {
        console.error(error)
        if (mounted) setSignatures([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [distributionId, profileId])

  return (
    <SignatureList
      signatures={signatures}
      loading={loading}
      onProfileFilterChange={setProfileId}
      renderItem={(item) => (
        <SignatureItem data={item} distributionId={distributionId} />
      )}
    />
  )
}

export default SignedTab
