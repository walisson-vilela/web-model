export type ModalProps = {
  /** filter name used on request */
  filter:
    | 'brand_id'
    | 'supplier_id'
    | 'category_id'
    | 'subcategory_id'
    | 'product_line_id'
  /** filter value used on request */
  id: number
  /** label shown in title */
  label: string
  /** name shown in title */
  name: string
  /** callback to close modal */
  onClose: () => void
}
