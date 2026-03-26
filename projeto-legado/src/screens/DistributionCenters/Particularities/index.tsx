import React, { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import * as MainStyles from '../styled'

import CategoryList from './CategoriesList'
import { Category } from './interfaces'
import { getCategories } from './services'
import * as S from './styled'

interface ParticularitiesProps {
  distribution_center_id: number
  title?: JSX.Element | string
  closeModal: () => void
  historic?: boolean
}

const Particularities = (props: ParticularitiesProps) => {
  const { distribution_center_id, closeModal, title, historic } = { ...props }

  const [inside, setInside] = useState<Category[]>([])
  const [outside, setOutside] = useState<Category[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  const [sufix, key] = historic
    ? [' (Histórico)', 'distribution_center_historic_categories']
    : ['', 'distribution_center_categories']

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await getCategories(
        distribution_center_id,
        search,
        historic,
      )

      if (!response.success) throw new Error('Reponse retuned no success')

      const responseData = response.data || []

      const newInside: Category[] = []
      const newOutside: Category[] = []

      for (let i = 0; i < responseData.length; i++) {
        const element = responseData[i]
        const category: Category = {
          id: numberOrDefault(element.id),
          name: notEmptyStringOrDefault(element.name),
        }

        if (Array.isArray(element[key]) && element[key].length > 0) {
          newInside.push(category)
        } else newOutside.push(category)
      }

      setInside(newInside)
      setOutside(newOutside)
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Modal size='large' open>
      <MainStyles.ModalHeader
        content={`Particularidades do Rateio${sufix}`}
        color='blue'
      />

      <MainStyles.Content>
        <S.TitleContainer>
          {title && <S.Title>{title}</S.Title>}

          <SearchFilter setSearch={setSearch} width='226px' />
        </S.TitleContainer>

        <S.Row>
          <S.Col>
            <b>Contribui para o rateio</b>
          </S.Col>
          <S.Col>
            <b>Não contribui para o rateio</b>
          </S.Col>
        </S.Row>

        <S.TableContainer>
          <S.Col>
            <CategoryList loading={loading} categories={inside} />
          </S.Col>
          <S.Col>
            <CategoryList loading={loading} categories={outside} />
          </S.Col>
        </S.TableContainer>
      </MainStyles.Content>

      <Modal.Actions>
        <Button
          type='button'
          content='OK'
          color='blue'
          onClick={closeModal}
          style={{ marginRight: 0 }}
        />
      </Modal.Actions>
      <Toaster position='bottom-right' />
    </Modal>
  )
}

export default Particularities
