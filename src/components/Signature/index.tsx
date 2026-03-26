import { Icon } from '..'

import { useCallback, useEffect, useMemo, useState } from 'react'

import type { SignatureCanvasProps } from 'react-signature-canvas'
import SignatureCanvas from 'react-signature-canvas'

import { ensureFontLoaded } from '../../assets/helpers'
import type { ReactNode, ThemeInterface } from '../../interfaces'
import { colors, fonts } from '../../theme/constants'
import Input from '../Input/components/Input'

import * as S from './styles'

const FONTS = [
  'GreatVibes',
  'Pacifico',
  'Allura',
] satisfies (keyof typeof fonts)[]

const FONT_SIZE = 64

type SignatureInputProps = {
  setValue: (base64: string) => void
  value: string
  penColor?: keyof ThemeInterface['colors']
  backgroundColor?: keyof ThemeInterface['colors']
  invalid?: boolean
  label?: ReactNode
  inputPlaceholder?: string
  canvasPlaceholder?: string

  onBegin?: (event: MouseEvent, ref: SignatureCanvas | null) => void
  onEnd?: (event: MouseEvent, ref: SignatureCanvas | null) => void
} & Omit<
  SignatureCanvasProps,
  'penColor' | 'backgroundColor' | 'onBegin' | 'onEnd'
>

type OnBeginHandler = Exclude<SignatureCanvasProps['onBegin'], undefined>
type OnEndHandler = Exclude<SignatureCanvasProps['onEnd'], undefined>

const voidFn = () => {}

const SignatureInput = ({
  setValue,
  value,
  penColor,
  backgroundColor,
  invalid,
  label = 'Digite seu nome' as ReactNode,
  inputPlaceholder = 'Digite seu nome',
  canvasPlaceholder = 'Assine aqui',
  onBegin = voidFn,
  onEnd = voidFn,
  ...props
}: SignatureInputProps) => {
  const [name, setName] = useState('')
  const [font, setFont] = useState(FONTS[0])
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [loading, setLoading] = useState(false)

  const [ref, setRef] = useState<SignatureCanvas | null>(null)

  useEffect(() => {
    if (!ref) return

    const refreshValue = () => {
      if (ref.isEmpty() && !value) return

      const v = ref.toDataURL('image/png')
      if (v === value) return

      // You must re-draw your content here after resizing the canvas
      ref.clear()
      ref.fromDataURL(value)
    }

    refreshValue()

    window.addEventListener('resize', refreshValue)

    return () => window.removeEventListener('resize', refreshValue)
  }, [ref, value])

  // Desenha assinatura a partir do texto
  const setByText = useCallback(
    async (name: string, font: (typeof FONTS)[number]) => {
      if (!ref) return

      const trimmed = name.trim()
      if (trimmed.length < 1) {
        return
      }

      setLoading(true)

      const ready = await ensureFontLoaded(fonts[font], FONT_SIZE, trimmed)

      setLoading(false)

      if (!ready) return

      const c = document.createElement('canvas')
      c.width = ref.getCanvas().width
      c.height = ref.getCanvas().height
      const ctx = c.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, c.width, c.height)
      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${FONT_SIZE}px ${fonts[font]}`

      ctx.fillText(trimmed, c.width / 2, c.height / 2)

      const base64 = c.toDataURL('image/png')

      ref.clear()
      ref.fromDataURL(base64)

      setValue(base64)
    },
    [ref],
  )

  const onBeginHandler: OnBeginHandler = useCallback(
    (event) => {
      onBegin(event, ref)
      setShowPlaceholder(false)
    },
    [ref, onBegin],
  )

  const onEndHandler: OnEndHandler = useCallback(
    (event) => {
      onEnd(event, ref)
      if (!ref || ref.isEmpty()) return
      setValue(ref.toDataURL('image/png'))
    },
    [ref, onEnd],
  )

  const onApplyHandler = useCallback(() => {
    setByText(name, font)
  }, [name, font, setByText])

  const onClearHandler = useCallback(() => {
    if (!ref) return
    setShowPlaceholder(true)
    setName('')
    ref.clear()
    setValue('')
  }, [ref])

  const empty = useMemo(() => !value && (!ref || ref.isEmpty()), [ref, value])

  return (
    <S.Container>
      <Input
        label={label}
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        onPressEnter={onApplyHandler}
        placeholder={inputPlaceholder}
        style={{ width: '100%', marginBottom: 8 }}
        disabled={loading}
        {...(name
          ? {
              icon: {
                icon: {
                  type: 'feather',
                  icon: 'edit',
                  onClick: onApplyHandler,
                },
              },
            }
          : {})}
      />

      <S.CanvasContainer
        $invalid={invalid}
        {...(showPlaceholder && !value
          ? {
              'data-placeholder': canvasPlaceholder,
            }
          : {})}
      >
        <div>
          <button
            type='button'
            onClick={() => {
              const i = FONTS.findIndex((f) => f === font)
              if (i < 0) return
              const next = i < FONTS.length - 1 ? i + 1 : 0
              setFont(FONTS[next])
              setByText(name, FONTS[next])
            }}
            disabled={loading || name.trim().length < 1}
            title='Trocar fonte'
          >
            <Icon type='feather' icon='type' />
          </button>

          <button
            type='button'
            onClick={() => {
              if (!ref || ref.isEmpty()) return
              setValue(ref.getTrimmedCanvas().toDataURL('image/png'))
            }}
            disabled={empty}
            title='Recortar'
          >
            <Icon type='feather' icon='scissors' />
          </button>

          <button onClick={onClearHandler} disabled={empty} title='Limpar'>
            <Icon type='feather' icon='delete' />
          </button>
        </div>

        <SignatureCanvas
          ref={setRef}
          {...props}
          penColor={colors[penColor || 'black']}
          {...(backgroundColor
            ? { backgroundColor: colors[backgroundColor] }
            : {})}
          onBegin={onBeginHandler}
          onEnd={onEndHandler}
        />
      </S.CanvasContainer>
    </S.Container>
  )
}

export default SignatureInput
