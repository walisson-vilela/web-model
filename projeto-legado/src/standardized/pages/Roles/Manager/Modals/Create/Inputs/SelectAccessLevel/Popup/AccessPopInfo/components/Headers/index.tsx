import { MwGrid } from '@mw-kit/mw-ui'

interface IHeaderPopupContent {
  content: string[]
}

const HeaderPopupContent = (props: IHeaderPopupContent) => {
  const { content } = props
  return (
    <MwGrid.Row borderless>
      {content.map((item, index) => (
        <MwGrid.Col key={index} width={'3'}>
          <h5 style={{ marginBottom: '0' }}>{item}</h5>
        </MwGrid.Col>
      ))}
    </MwGrid.Row>
  )
}

export default HeaderPopupContent
