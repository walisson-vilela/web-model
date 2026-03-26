import { MwGrid } from '@mw-kit/mw-ui'

interface IRowsPopupContent {
  title: string
  contents: string[]
}

const RowsPopupContent = (props: IRowsPopupContent) => {
  const { title, contents } = props
  return (
    <MwGrid.Row borderless style={{ borderTop: '1px solid #E5E5E5' }}>
      <MwGrid.Col>
        <h5 style={{ marginBottom: '0' }}>{title}</h5>
      </MwGrid.Col>
      {contents.map((content, index) => (
        <MwGrid.Col key={index}>
          <p>{content}</p>
        </MwGrid.Col>
      ))}
    </MwGrid.Row>
  )
}

export default RowsPopupContent
