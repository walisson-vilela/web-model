import { MwIcon } from '@mw-kit/mw-ui'

import { download } from '../../../../../../../../../utils/DownloadFile'
import useContext from '../../../../context'
import * as S from '../../styles'

const DownloadTemplate = () => {
  const {
    form: { watch },
  } = useContext()

  const templates = watch('ppt_templates')

  const downloadble = Object.values(templates).filter(
    (e) => e.file !== undefined || e.url.startsWith('http'),
  )

  return (
    <S.Link
      {...(downloadble.length
        ? {
            onClick: () => {
              downloadble.forEach((e) => {
                download(e.url, e.name, {
                  cache: 'no-cache',
                })
              })
            },
          }
        : {
            disabled: true,
          })}
    >
      <MwIcon
        type='semantic'
        icon='download'
        width='14px'
        height='14px'
        color='darkBlue'
      />
      Download Template
    </S.Link>
  )
}

export default DownloadTemplate
