import { MwScrollContainer } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../../components/MwModal'
import { Term } from '../../../../types'
import { labels } from '../../constants'

import * as S from './styled'

interface ITermsView {
  mode: 'termsOfUse' | 'privacyPolicy'
  term: Term
  close: () => void
}

const TermsView = (props: ITermsView) => {
  const { close, mode, term } = props
  return (
    <Modal
      modal={{
        size: 'large',
        titleColor: 'blue',
        title: `Visualizar ${labels[mode]}`,
        content: (
          <S.ModalContent>
            <MwScrollContainer spacing='s3' height='370px'>
              <div
                className='ql-editor'
                dangerouslySetInnerHTML={{ __html: term.term }}
              />
            </MwScrollContainer>
          </S.ModalContent>
        ),
        buttonType: 'MwButton',
        actions: [
          {
            type: 'button',
            content: 'Ok',
            onClick: close,
          },
        ],
      }}
    />
  )
}

export default TermsView
