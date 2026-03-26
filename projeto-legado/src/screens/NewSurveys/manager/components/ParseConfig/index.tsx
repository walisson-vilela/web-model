import { useContext } from 'react'

import { IoMdSettings } from 'react-icons/io'

import { SurveysContext } from '../../../context'

import { ConfigurationModal } from './components/Configuration'
import * as S from './styles'

interface ParseConfigProps {
  id: number
  reload: () => void
}

const ParseConfig = ({ id, reload }: ParseConfigProps) => {
  const { setOpenCreateModal } = useContext(SurveysContext)

  return (
    <S.Container>
      <IoMdSettings
        size={14}
        color={'#949494'}
        style={{ cursor: 'pointer' }}
        onClick={() =>
          setOpenCreateModal(<ConfigurationModal id={id} reload={reload} />)
        }
      />
    </S.Container>
  )
}

export default ParseConfig
