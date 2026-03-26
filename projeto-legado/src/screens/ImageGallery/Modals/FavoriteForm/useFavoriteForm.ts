import { FavoriteFormProps, FormData } from './interfaces'
import { create, edit, get } from './services'

interface ReturnInterface {
  title: string
  loader: () => Promise<FormData>
  submit: {
    label: string
    save: (data: FormData) => Promise<void>
  }
}

const useFavoriteForm = (props: FavoriteFormProps): ReturnInterface => {
  if (props.id) {
    const { id } = props

    return {
      title: 'Editar Favoritos',
      loader: async () => {
        try {
          const data = await get(id)
          return { ...data }
        } catch (e) {
          console.error(e)
        }

        return {
          name: '',
          description: '',
        }
      },
      submit: {
        label: 'Salvar',
        save: (payload) => edit(payload, id),
      },
    }
  }

  return {
    title: 'Criar  Favoritos',
    loader: async () => {
      return {
        name: '',
        description: '',
      }
    },
    submit: {
      label: 'Criar',
      save: create,
    },
  }
}

export default useFavoriteForm
