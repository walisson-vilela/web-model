import React, { useContext } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Icon, Accordion as SemanticAccordion } from 'semantic-ui-react'

import { GalleryViewContext } from '../../context'
import Section from '../Section'

import { AccordionProps } from './interface'
import * as S from './styles'

export const Accordion = (props: AccordionProps) => {
  const {
    handleToggleOppenedAccordion,
    openedAccordions,
    checkedAccordion,
    handleToggleCheckAllAccordionImages,
  } = useContext(GalleryViewContext)
  const { accordionData } = props

  return (
    <S.Content>
      <SemanticAccordion>
        <SemanticAccordion.Title
          active={openedAccordions.includes(accordionData.category.id)}
          index={accordionData.category.id}
        >
          <S.Header>
            <Icon
              name='dropdown'
              onClick={() =>
                handleToggleOppenedAccordion(accordionData.category.id)
              }
            />
            <MwInput
              type='checkbox'
              checked={checkedAccordion.includes(accordionData.category.id)}
              onChange={() =>
                handleToggleCheckAllAccordionImages(accordionData.category.id)
              }
            />

            <strong
              onClick={() =>
                handleToggleOppenedAccordion(accordionData.category.id)
              }
            >
              Categoria: {accordionData.category.name}
            </strong>
          </S.Header>
        </SemanticAccordion.Title>

        <SemanticAccordion.Content
          active={openedAccordions.includes(accordionData.category.id)}
        >
          <Section accordionId={accordionData.category.id} />
        </SemanticAccordion.Content>
      </SemanticAccordion>
    </S.Content>
  )
}
