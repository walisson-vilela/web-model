import { FormState } from 'react-hook-form'

import axios from '../../../services/Axios/instance'
import { numberOrDefault } from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import { Data, Form } from './interfaces'
import { dataParser, formParser, saveParser } from './parsers'

interface ParsedData {
  formData: Form
  data: Data
}

export const getProduct = async (id: number): Promise<ParsedData> => {
  const { data: response } = await axios.get(`v1/tr/products/${id}`)

  if (!isObject(response)) throw new Error('Invalid response!')
  if (response.success !== true) throw new Error('Request returned no success!')
  if (!isObject(response.data))
    throw new Error('Request returned an invalid data!')

  return {
    formData: formParser(response.data),
    data: dataParser(response.data),
  }
}

export const saveProduct = async (
  form: Form,
  dirtyFields: FormState<Form>['dirtyFields'],
  editId: number | null = null,
): Promise<number> => {
  const payload = saveParser(form, dirtyFields, editId ? 'edit' : 'create')

  const { data } = await axios.post(
    `/v1/tr/products${editId ? `/edit/${editId}` : ''}`,
    payload,
    {
      ...(payload.files && payload.files.some((e) => 'file' in e)
        ? {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        : {}),
    },
  )

  if (!isObject(data)) throw new Error('Request returned an invalid data!')

  if (!data.success) throw new Error('Request returned no sucess!')

  if (editId) return editId

  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  const id = numberOrDefault(data.data.id)
  if (id === null) throw new Error('Request returned an invalid id!')

  return id
}
