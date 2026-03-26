import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { Post } from '../../interfaces'
import { uploadFile } from '../../services'

import * as S from './styles'

interface PostContainerProps {
  post: [Post, React.Dispatch<React.SetStateAction<Post>>]
  onError: (e: Error) => void
  onRemove: () => void
}

const PostContainer = (props: PostContainerProps) => {
  const {
    post: [post, setPost],
    onError,
  } = props

  uploadFile(
    {
      file: [
        post.image,
        (state) =>
          setPost((prev) => ({
            ...prev,
            image: typeof state === 'function' ? state(prev.image) : state,
          })),
      ],
      onError,
    },
    'message_posts',
  )

  return (
    <S.PostContainer
      progress={'progress' in post.image ? post.image.progress || 0 : 100}
    >
      <div>
        <img src={post.preview} />
        <div />
      </div>

      <div>
        <MwInput
          type='text'
          label={
            <S.PostLabel>
              <span>Título</span>

              <span>{post.subject.length}/100 caracteres</span>
            </S.PostLabel>
          }
          placeholder='Digite o título'
          value={post.subject}
          setValue={(subject) =>
            setPost((prev) => ({ ...prev, subject: subject.substring(0, 100) }))
          }
          maxLength={100}
          style={{ marginBottom: 14 }}
        />

        <MwInput
          type='text'
          label={
            <S.PostLabel>
              <span>Legenda</span>

              <span>{post.note.length}/750 caracteres</span>
            </S.PostLabel>
          }
          placeholder='Digite a legenda'
          value={post.note}
          setValue={(note) =>
            setPost((prev) => ({ ...prev, note: note.substring(0, 750) }))
          }
          maxLength={750}
        />
      </div>
    </S.PostContainer>
  )
}

export default PostContainer
