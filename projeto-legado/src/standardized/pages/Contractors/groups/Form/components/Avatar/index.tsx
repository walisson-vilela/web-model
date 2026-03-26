import { FiCamera } from 'react-icons/fi'

import { twoLettersAcronym } from '../../../../../../utils/formatters'
import useContext from '../../context'
import * as S from '../../styles'

import { Container, ImageContainer, RoundedImage } from './styled'

const Avatar = () => {
  const {
    form: { watch },
  } = useContext()

  const groupAssociated = watch('group_associated')

  return (
    <S.SubSection>
      <Container>
        <ImageContainer>
          {groupAssociated.map((a, key) => {
            const decideProps = () => {
              if (!a.avatar) {
                if (!a.name) {
                  return {
                    children: <FiCamera size={16} color='#B2B2B2' />,
                  }
                }
                return {
                  children: <span>{twoLettersAcronym(a.name)}</span>,
                }
              }
              return {
                src: a.avatar.url,
                children: <FiCamera size={16} color='#B2B2B2' />,
              }
            }

            const props: Parameters<typeof RoundedImage>[0] = decideProps()

            return <RoundedImage {...{ ...props }} key={key} />
          })}

          {groupAssociated.length === 0 && (
            <RoundedImage>
              <FiCamera size={16} color='#B2B2B2' />
            </RoundedImage>
          )}
        </ImageContainer>
      </Container>
    </S.SubSection>
  )
}

export default Avatar
