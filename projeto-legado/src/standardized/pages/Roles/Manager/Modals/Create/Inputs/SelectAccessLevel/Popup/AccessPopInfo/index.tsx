import { MwGrid } from '@mw-kit/mw-ui'

import HeaderPopupContent from './components/Headers'
import RowsPopupContent from './components/Rows'

const AccessContentPopInfo = () => {
  const header = ['', 'Completo', 'Básico', 'Relatório']
  const rows = [
    {
      title: 'Formulário',
      contents: [
        'Sem restrições',
        'Restrito a 2, sem registro de imagem',
        'Sem acesso',
      ],
    },
    {
      title: 'Roteiro',
      contents: ['Carteira e Rota', 'Apenas Carteira', 'Sem acesso'],
    },
    {
      title: 'Galeria de Imagem',
      contents: ['Sim', 'Sim', 'Sim'],
    },
    {
      title: 'InBox',
      contents: ['Sim', 'Sem anexo', 'Sem anexo'],
    },
    {
      title: 'Chat',
      contents: ['Sim', 'Sem anexo', 'Sem anexo'],
    },
    {
      title: 'GED',
      contents: ['Sim', 'Sim', 'Não'],
    },
    {
      title: 'Acesso Mobile',
      contents: ['Sim', 'Sim', 'Não'],
    },
    {
      title: 'Acesso Web',
      contents: ['Sim', 'Sim', 'Sim'],
    },
    {
      title: 'Relatório',
      contents: ['Sim', 'Sim', 'Sim'],
    },
  ]
  return (
    <div style={{ width: '512px', height: 'auto' }}>
      <h5 style={{ marginBottom: '0' }}>Diferenças Principais dos Módulos</h5>
      <MwGrid borderless style={{ width: '100%', height: '100%' }}>
        <MwGrid.Col>
          <HeaderPopupContent content={header} />
          <div
            style={{
              width: '100%',
              maxHeight: '300px', // Limite para o tamanho máximo do conteúdo com rolagem
              overflowY: 'auto', // Ativa o scroll vertical
            }}
          >
            {rows.map((row, index) => (
              <RowsPopupContent
                key={index}
                title={row.title}
                contents={row.contents}
              />
            ))}
          </div>
        </MwGrid.Col>
        <MwGrid.Row horizontalAlign='center'>
          Verifique a lista completa aqui
        </MwGrid.Row>
      </MwGrid>
    </div>
  )
}

export default AccessContentPopInfo
