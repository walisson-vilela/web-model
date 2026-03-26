import { MwGrid } from '@mw-kit/mw-ui'

import { Response } from '../../../../../../utils/hooks/useEndpointValidation/interfaces'

import { SelectForms, selectedForm } from './components/forms'
import { FrequencySelector } from './components/frequency'
import { PilarSelect } from './components/pilarSelect'
import { SimpleSelect } from './components/simpleSelect'
import { SimpleText } from './components/simpleText'
import { ValiditySelect } from './components/validity'
import * as S from './styles'

interface CreateContentProps {
  selectedItems: selectedForm
  setSelectedItems: React.Dispatch<React.SetStateAction<selectedForm>>
  nameCheck: Response
}

export const CreateContent = ({
  selectedItems,
  setSelectedItems,
  nameCheck,
}: CreateContentProps) => {
  return (
    <MwGrid rows={{ borderless: true }} borderless>
      <MwGrid.Row>
        <MwGrid.Col width='3'>
          <PilarSelect />
        </MwGrid.Col>

        <MwGrid.Col width='6'>
          <SimpleText checkInput={nameCheck} />
        </MwGrid.Col>

        <MwGrid.Col width='3'>
          <SimpleSelect type='behavior' key='behavior' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='2'>
          <SimpleSelect type='status' key='status' />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <SimpleSelect type='mandatory' key='mandatory' />
        </MwGrid.Col>

        <MwGrid.Col width='3'>
          <S.FrequencyContainer>
            <SimpleSelect type='frequency' key='frequency' />
            <FrequencySelector />
          </S.FrequencyContainer>
        </MwGrid.Col>

        <MwGrid.Col width='5'>
          <ValiditySelect />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row style={{ marginTop: '21px' }}>
        <MwGrid.Col>
          <SelectForms
            type='form'
            key='form'
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <SelectForms
            type='local'
            key='local'
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <SelectForms
            type='channel'
            key='channel'
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <SelectForms
            type='pdv'
            key='pdv'
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <SelectForms
            type='product'
            key='product'
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <SelectForms
            type='user'
            key='user'
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}
