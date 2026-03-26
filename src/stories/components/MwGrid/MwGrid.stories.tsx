import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Grid from '../../../components/Grid'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwGrid',
  title: 'Components/MwGrid',
  component: Grid,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Grid>

type Story = StoryObj<typeof meta>

export const MwGrid: Story = {
  args: {},
  render: (args) => {
    return (
      <div style={{ position: 'relative' }}>
        <Grid
          {...args}
          rows={{
            striped: true,
            hover: true,
          }}
          cols={{
            spacing: 's2',
            spacingAround: true,
            bordered: true,
            hover: true,
            pointer: true,
            ellipsis: true,
            align: {
              content: {
                horizontal: 'center',
                vertical: 'center',
              },
              text: 'center',
            },
          }}
        >
          <Grid.Row>
            <Grid.Col>teste</Grid.Col>
            <Grid.Col spacing='s4'>teste</Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col width='4'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique obcaecati rem sapiente quo aut in facilis error facere
              quam quisquam odit vitae aliquam perspiciatis iure, adipisci
              nostrum, labore cum consequatur!
            </Grid.Col>
            <Grid.Col>teste</Grid.Col>
          </Grid.Row>

          <Grid.Row
            spacing='s2'
            cols={{
              spacing: 's3',
            }}
          >
            <Grid.Col width='3'>teste</Grid.Col>
            <Grid.Col spacing='s4'>teste</Grid.Col>
          </Grid.Row>
        </Grid>
      </div>
    )
  },
}

export default meta
