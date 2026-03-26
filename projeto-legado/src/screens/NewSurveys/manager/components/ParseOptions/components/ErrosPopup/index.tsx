import { useContext, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { Loader } from 'semantic-ui-react'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { SurveysContext } from '../../../../../context'
import { DataInterface } from '../../../../interface'
import {
  ModalsNames,
  PeopleProps,
  ProductsProps,
  StoresProps,
} from '../../interfaces'
import { GetConflicts } from '../../service'
import * as S from '../../styles'
import ConflictListModal from '../ConflictListModal'

interface ErrosPopupProps {
  errors: number
  code: number[]
  item: DataInterface
  type: ModalsNames
}

export const ErrosPopup = ({ errors, item, code, type }: ErrosPopupProps) => {
  const { setOpenSelectModal } = useContext(SurveysContext)
  const [loading, setLoading] = useState(true)
  const [conflict, setConflict] = useState<
    PeopleProps[] | ProductsProps[] | StoresProps[]
  >([])

  const getConflicts = async () => {
    if (errors > 0) {
      setLoading(true)
      try {
        const { data } = await GetConflicts(item.id, code)
        setConflict(data)
      } catch (error) {
        toast(<ToasterContent color='error' />, ErrorStyle)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    getConflicts()
  }, [])
  return (
    <S.PopupContent>
      {loading ? (
        <Loader active />
      ) : (
        <>
          <span>
            Código de Alerta de conflitos na pesquisa:{' '}
            {conflict.map((item) => item.code).toString()}
          </span>
          <S.Details
            onClick={() =>
              setOpenSelectModal(
                <ConflictListModal code={code} id={item.id} type={type} />,
              )
            }
          >
            Detalhar
          </S.Details>
        </>
      )}
    </S.PopupContent>
  )
}
