import { useCallback, useEffect, useState } from 'react'

import { MwEllipsisContainer, MwScrollContainer } from '@mw-kit/mw-ui'
import { Cookies } from 'react-cookie'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { useOnClickOutState } from '../../../../../../../utils/hooks'
import Search from '../../../../../../components/Search'
import { RoundedImage } from '../../../../../../components/form/sections/Avatar/styled'
import { twoLettersAcronym } from '../../../../../../utils/formatters'
import useHomeContext from '../../../../context'
import { Contractor } from '../../../../types'
import { CONTAINER_EXPANDED_WIDTH } from '../../constants'

import { getContractorsAccount, renewUser } from './service'
import * as S from './styled'

const Popup = (props: { group: Contractor }) => {
  const { group } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const [body, setBody] = useState<Contractor[]>([])
  const [paginate, setPaginate] = useState({
    page: 1,
    count: 0,
    has_next_page: false,
  })

  const changeContractor = async (contractor: Contractor) => {
    setLoading(true)
    try {
      const { token, pathname, terms } = await renewUser(contractor.id)

      const cookies = new Cookies()
      cookies.remove('_GIV_USER')

      const value = { ...cookies.get('_GIV_USER'), token, terms }

      const domain = (() => {
        const d = window.location.hostname.split('.')
        return d.length > 2 ? d.slice(1) : d
      })().join('.')

      cookies.set('_GIV_USER', value, {
        path: '/',
        domain: domain ? `.${domain}` : location.hostname,
      })

      window.location.replace(pathname || value.HOME_URL)
    } catch (e) {
      console.error(e)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados e listagem das Contas
      const { data, pagination } = await getContractorsAccount(
        search,
        paginate.page,
        group.id,
      )

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody((prev) => (pagination.page === 1 ? data : [...prev, ...data]))
      setPaginate(pagination)
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [search, paginate.page, group.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.PopupContainer>
      <S.Header>
        <RoundedImage
          $width='60px'
          $height='60px'
          {...(!group.avatar
            ? { children: twoLettersAcronym(group.nickname) }
            : { $src: group.avatar.url })}
        />

        <div style={{ lineHeight: '17px', fontSize: '14px' }}>
          {group.nickname} | Tipo: {group.type_label || '-'}
        </div>
      </S.Header>

      <S.SearchContainer>
        <Search submitted={[search, setSearch]} />
      </S.SearchContainer>

      <MwScrollContainer
        loading={loading}
        onScrollEnd={() =>
          setPaginate((prev) =>
            prev.has_next_page ? { ...prev, page: prev.page + 1 } : prev,
          )
        }
      >
        {body.map((data, index) => (
          <S.Row key={index} onClick={() => changeContractor(data)}>
            <RoundedImage
              $width='35px'
              $height='35px'
              {...(!data.avatar
                ? { children: twoLettersAcronym(data.nickname) }
                : { $src: data.avatar.url })}
            />

            <S.InfoAccountContainer>
              <MwEllipsisContainer children={data.nickname} />
              <MwEllipsisContainer children={`Tipo: ${data.type_label}`} />
            </S.InfoAccountContainer>
          </S.Row>
        ))}
      </MwScrollContainer>
    </S.PopupContainer>
  )
}

const Workspace = (props: { open: boolean }) => {
  const { open } = props

  const [popup, setPopup] = useState(false)
  const close = () => setPopup(false)

  const { isLoading, contractor: group } = useHomeContext()
  const loading = isLoading('contractor')

  useEffect(close, [loading])

  return (
    <S.Container $loading={loading} ref={useOnClickOutState(close)}>
      <div
        style={{
          width: open ? CONTAINER_EXPANDED_WIDTH : '100%',
        }}
      >
        <S.ImageContainer
          {...(loading
            ? {}
            : {
                onClick: () => setPopup((p) => !p),
              })}
        >
          <div>
            <RoundedImage
              $width='35px'
              $height='35px'
              {...(!group.avatar
                ? { children: twoLettersAcronym(group.nickname) }
                : { $src: group.avatar.url })}
            />
          </div>

          <MwEllipsisContainer
            style={{ opacity: open ? 1 : 0 }}
            children={group.nickname}
          />
        </S.ImageContainer>

        {popup && <Popup group={group} />}
      </div>
    </S.Container>
  )
}

export default Workspace
