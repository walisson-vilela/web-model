import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { Title } from '../../../../components'
import useAddessContext from '../../context'

import * as Inputs from './inputs'
import { FieldH4 } from './styles'

const Fields = ({
  children,
}: React.PropsWithChildren & { layout?: 'horizontal' | 'vertical' }) => {
  const { viewMode, modalMode } = useAddessContext()

  if (modalMode) {
    return (
      <MwGrid
        style={{ gap: 0 }}
        borderless
        spacing={{ bottom: 's3', top: 's3', left: 's3', right: 's3' }}
        rows={{
          spacing: { left: '0', right: '0', top: '0', bottom: '0' },
          verticalAlign: 'bottom',
          borderless: true,
        }}
      >
        <MwGrid.Row>
          <MwGrid.Col style={{ padding: 0 }}>
            <FieldH4>CEP:</FieldH4>
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row verticalAlign='bottom'>
          <MwGrid.Col width='auto'>
            <Inputs.PostalCode />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <Inputs.CheckPostalCode />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col>
            <FieldH4>Endereço:</FieldH4>
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row style={{ minHeight: '17px' }}>
          <MwGrid.Col style={{ gap: '0.5ch', padding: 0 }}>
            <Inputs.StreetType />
            <Inputs.StreetAddress />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col width='2'>
            <Inputs.StreetNumber />
          </MwGrid.Col>
          <MwGrid.Col width='auto'>
            <Inputs.Complement />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row style={{ minHeight: '17px' }}>
          <MwGrid.Col style={{ gap: '0.5ch', padding: 0 }}>
            <Inputs.Sublocality />
            <Inputs.City />
            <Inputs.State />
          </MwGrid.Col>
        </MwGrid.Row>

        {children && (
          <MwGrid.Row>
            <MwGrid.Col>{children}</MwGrid.Col>
          </MwGrid.Row>
        )}
      </MwGrid>
    )
  }

  if (viewMode) {
    return (
      <MwGrid
        borderless
        spacing={{ bottom: 's4', top: 's4', left: 's3', right: 's3' }}
        rows={{
          spacing: { left: '0', right: '0', top: 's5' },
          verticalAlign: 'bottom',
          borderless: true,
        }}
        cols={{ spacing: { top: '0', bottom: '0', left: 's3', right: 's4' } }}
      >
        <MwGrid.Row>
          <MwGrid.Col>
            <Title $marginBottom='0' children='Endereço*' />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row spacing={{ left: '0', right: '0' }} verticalAlign='bottom'>
          <MwGrid.Col width='2'>
            <Inputs.PostalCode />
          </MwGrid.Col>

          <MwGrid.Col width='2'>
            <Inputs.StreetType />
          </MwGrid.Col>

          <MwGrid.Col width='3'>
            <Inputs.StreetAddress />
          </MwGrid.Col>

          <MwGrid.Col width='1'>
            <Inputs.StreetNumber />
          </MwGrid.Col>

          <MwGrid.Col width='2'>
            <Inputs.Complement />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col width='2'>
            <Inputs.Sublocality />
          </MwGrid.Col>

          <MwGrid.Col width='2'>
            <Inputs.City />
          </MwGrid.Col>

          <MwGrid.Col width='1'>
            <Inputs.State />
          </MwGrid.Col>

          <MwGrid.Col children={children} />
        </MwGrid.Row>
      </MwGrid>
    )
  }

  return (
    <MwGrid
      borderless
      spacing={{ bottom: 's4', top: 's4', left: 's3', right: 's3' }}
      rows={{
        spacing: { left: '0', right: '0' },
        verticalAlign: 'bottom',
        borderless: true,
      }}
      cols={{ spacing: { top: '0', bottom: '0', left: 's3', right: 's4' } }}
    >
      <MwGrid.Row>
        <MwGrid.Col>
          <Title $marginBottom='0' children='Endereço' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row verticalAlign='bottom'>
        <MwGrid.Col width='auto'>
          <Inputs.PostalCode />
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <Inputs.CheckPostalCode />
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <Inputs.UnknownPostalCode />
        </MwGrid.Col>

        <MwGrid.Col />
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='2'>
          <Inputs.StreetType />
        </MwGrid.Col>

        <MwGrid.Col width='3'>
          <Inputs.StreetAddress />
        </MwGrid.Col>

        <MwGrid.Col width='1'>
          <Inputs.StreetNumber />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <Inputs.Complement />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <Inputs.Sublocality />
        </MwGrid.Col>

        <MwGrid.Col />
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='2'>
          <Inputs.City />
        </MwGrid.Col>

        <MwGrid.Col width='1'>
          <Inputs.State />
        </MwGrid.Col>

        <MwGrid.Col children={children} />
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Fields
