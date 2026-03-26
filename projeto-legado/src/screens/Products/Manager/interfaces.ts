// Informação vai vim da api

//Informação que iremos enviar para o manager.
export interface BodyInterface {
  id: number
  status: boolean
  status_jsx: JSX.Element
  code: string
  name: string
  brand_name: string
  type_label: string
  category_name: string
  product_line_path_label: string
}
