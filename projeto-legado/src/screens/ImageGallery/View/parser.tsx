import { AccordionImagesBodyInterface, DataInterface } from './interface'

export const parserAccordion = (
  id: number,
  accordionImages: AccordionImagesBodyInterface[],
  pagination: number,
  isLastPage: boolean,
  total_registries: number,
): DataInterface => {
  return {
    isLastPage,
    pagination,
    accordionId: id,
    images: accordionImages,
    total_registries,
  }
}
