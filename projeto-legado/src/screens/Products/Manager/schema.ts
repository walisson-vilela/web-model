import * as yup from 'yup'

const getSchema = () => {
  return yup.object({
    // status
    active: yup.number().min(0).max(1),

    // basic data
    type: yup.number().min(0).max(1),
    document: yup.string().required(),
    name: yup.string().required(),
    category_type: yup.number().required().min(0),
    brand_type: yup.number(),

    // complementar data
    ean: yup.string().required(),
    classification: yup.number().min(0).max(1),
    priceRegrister: yup.number().min(0).max(1),
    minPrice: yup.number(),
  })
}
