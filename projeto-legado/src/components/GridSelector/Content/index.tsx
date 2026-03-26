import GridSelector from '..'

import { MwButton } from '@mw-kit/mw-ui'

import { isObject } from '../../../utils/Validators'
import { GridSelectorProps } from '../interfaces'

import { TContent } from './interfaces'
import * as S from './styled'

const Content = <T,>(props: TContent<T>) => {
  const { title, gridSelector, button, footer } = props
  return (
    <>
      <S.Title>{title}</S.Title>
      <div>
        <GridSelector {...(gridSelector as never as GridSelectorProps<{}>)} />
      </div>

      {(button || footer) && (
        <div>
          <div children={footer} />
          {isObject<Exclude<typeof button, React.ReactNode>>(button) ? (
            <MwButton {...button} />
          ) : (
            button
          )}
        </div>
      )}
    </>
  )
}

export default Content
