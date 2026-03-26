import React, { useEffect, useState } from 'react'

import {
  AppliedFilters,
  FiltersInterfaces,
  MenuFilters,
  SearchFilter
} from '@mw-kit/mw-manager'

import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'
import useRouteTabContext from '../../../../routes/TabsProvider'

import Card1DetailManager from './Card1/Manager'
import useCard1DetailContext, { Card1DetailProvider } from './Card1/provider'
import Card10DetailManager from './Card10/Manager'
import useCard10DetailContext, { Card10DetailProvider } from './Card10/provider'
import Card11DetailManager from './Card11/Manager'
import useCard11DetailContext, { Card11DetailProvider } from './Card11/provider'
import Card12DetailManager from './Card12/Manager'
import useCard12DetailContext, { Card12DetailProvider } from './Card12/provider'
import Card19DetailManager from './Card19/Manager'
import useCard19DetailContext, { Card19DetailProvider } from './Card19/provider'
import Card2DetailManager from './Card2/Manager'
import useCard2DetailContext, { Card2DetailProvider } from './Card2/provider'
import Card20DetailManager from './Card20/Manager'
import useCard20DetailContext, { Card20DetailProvider } from './Card20/provider'
import Card21DetailManager from './Card21/Manager'
import useCard21DetailContext, { Card21DetailProvider } from './Card21/provider'
import Card3DetailManager from './Card3/Manager'
import useCard3DetailContext, { Card3DetailProvider } from './Card3/provider'
import Card4DetailManager from './Card4/Manager'
import useCard4DetailContext, { Card4DetailProvider } from './Card4/provider'
import Card5DetailManager from './Card5/Manager'
import useCard5DetailContext, { Card5DetailProvider } from './Card5/provider'
import Card6DetailManager from './Card6/Manager'
import useCard6DetailContext, { Card6DetailProvider } from './Card6/provider'
import Card7DetailManager from './Card7/Manager'
import useCard7DetailContext, { Card7DetailProvider } from './Card7/provider'
import Card8DetailManager from './Card8/Manager'
import useCard8DetailContext, { Card8DetailProvider } from './Card8/provider'
import Card9DetailManager from './Card9/Manager'
import useCard9DetailContext, { Card9DetailProvider } from './Card9/provider'
import DetailPlaceholder from './components/DetailPlaceholder'
import { MAIN_HOME_DETAIL_CONFIGS } from './constants'

import Card13DetailManager from './Card13/Manager'
import { Card13DetailProvider } from './Card13/provider'

import Card14DetailManager from './Card14/Manager'
import card14Filters from './Card14/Manager/filters'
import * as Card14Styles from './Card14/Manager/styles'
import { Card14DetailProvider } from './Card14/provider'

import Card15DetailManager from './Card15/Manager'
import useCard15DetailContext, { Card15DetailProvider } from './Card15/provider'

import Card16DetailManager from './Card16/Manager'
import useCard16DetailContext, { Card16DetailProvider } from './Card16/provider'

import Card17DetailManager from './Card17/Manager'
import useCard17DetailContext, { Card17DetailProvider } from './Card17/provider'

import Card18DetailManager from './Card18/Manager'
import useCard18DetailContext, { Card18DetailProvider } from './Card18/provider'

const createDetailPage = (title: string, description: string) =>
  createRouteTab(() => (
    <MwManagerContainer>
      <DetailPlaceholder title={title} description={description} />
    </MwManagerContainer>
  ))

const CARD_1_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-1',
)

const CARD_2_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-2',
)

const CARD_3_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-3',
)

const CARD_4_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-4',
)

const CARD_5_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-5',
)

const CARD_6_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-6',
)

const CARD_7_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-7',
)

const CARD_8_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-8',
)

const CARD_9_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-9',
)

const CARD_10_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-10',
)

const CARD_11_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-11',
)

const CARD_12_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-12',
)

const CARD_13_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-13',
)

const CARD_14_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-14',
)

const CARD_15_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-15',
)

const CARD_16_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-16',
)

const CARD_17_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-17',
)

const CARD_18_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-18',
)

const CARD_19_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-19',
)

const CARD_20_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-20',
)

const CARD_21_DETAIL_CONFIG = MAIN_HOME_DETAIL_CONFIGS.find(
  (detail) => detail.id === 'card-21',
)

const Card1DetailPage =
  CARD_1_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard1DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_1_DETAIL_CONFIG.description} />

        <Card1DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card1DetailProvider)

const Card2DetailPage =
  CARD_2_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard2DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_2_DETAIL_CONFIG.description} />

        <Card2DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card2DetailProvider)

const Card3DetailPage =
  CARD_3_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard3DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_3_DETAIL_CONFIG.description} />

        <Card3DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card3DetailProvider)

const Card4DetailPage =
  CARD_4_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard4DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_4_DETAIL_CONFIG.description} />

        <Card4DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card4DetailProvider)

const Card5DetailPage =
  CARD_5_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard5DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_5_DETAIL_CONFIG.description} />

        <Card5DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card5DetailProvider)

const Card6DetailPage =
  CARD_6_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard6DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_6_DETAIL_CONFIG.description} />

        <Card6DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card6DetailProvider)

const Card7DetailPage =
  CARD_7_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard7DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_7_DETAIL_CONFIG.description} />

        <Card7DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card7DetailProvider)

const Card8DetailPage =
  CARD_8_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard8DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_8_DETAIL_CONFIG.description} />

        <Card8DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card8DetailProvider)

const Card9DetailPage =
  CARD_9_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard9DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_9_DETAIL_CONFIG.description} />

        <Card9DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card9DetailProvider)

const Card10DetailPage =
  CARD_10_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard10DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_10_DETAIL_CONFIG.description} />

        <Card10DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card10DetailProvider)

const Card11DetailPage =
  CARD_11_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard11DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_11_DETAIL_CONFIG.description} />

        <Card11DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card11DetailProvider)

const Card12DetailPage =
  CARD_12_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard12DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_12_DETAIL_CONFIG.description} />

        <Card12DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card12DetailProvider)

const Card13DetailPage =
  CARD_13_DETAIL_CONFIG &&
  createRouteTab(() => {
    return (
      <MwManagerContainer>
        <Header description={CARD_13_DETAIL_CONFIG.description} />

        <Card13DetailManager />
      </MwManagerContainer>
    )
  }, Card13DetailProvider)

const Card14DetailPage =
  CARD_14_DETAIL_CONFIG &&
  createRouteTab(() => {
    const [appliedFilters, setAppliedFilters] = useState<
      FiltersInterfaces.AppliedFilter[]
    >([])
    const [search, setSearch] = useState<string>('')

    return (
      <MwManagerContainer>
        <Card14Styles.StickyHeader >
          <Header
            description={
              <React.Fragment>
                <strong>Pesquisas</strong>
                <br />
                Acompanhe a performance das pesquisas programadas
              </React.Fragment>
            }
            style={{ marginBottom: 0 }}
            child={
              <Card14Styles.HeaderToolbarContainer>
                <Card14Styles.HeaderToolbarCell>
                  <SearchFilter
                    loading={false}
                    search={search}
                    setSearch={setSearch}
                    transparent
                  />
                </Card14Styles.HeaderToolbarCell>

                <Card14Styles.HeaderToolbarCell>
                  <AppliedFilters
                    loading={false}
                    appliedFilters={appliedFilters}
                    setAppliedFilters={setAppliedFilters}
                  />
                </Card14Styles.HeaderToolbarCell>

                <Card14Styles.HeaderToolbarCell>
                  <MenuFilters
                    loading={false}
                    appliedFilters={appliedFilters}
                    setAppliedFilters={setAppliedFilters}
                    filters={card14Filters}
                  />
                </Card14Styles.HeaderToolbarCell>
              </Card14Styles.HeaderToolbarContainer>
            }
          />
        </Card14Styles.StickyHeader>

        <Card14DetailManager search={search} appliedFilters={appliedFilters} />
      </MwManagerContainer>
    )
  }, Card14DetailProvider)

const Card15DetailPage =
  CARD_15_DETAIL_CONFIG &&
  createRouteTab((props) => {
    const { managerProps } = useCard15DetailContext()
    const { setLabel } = useRouteTabContext(props.data.route)

    useEffect(() => {
      setLabel(CARD_15_DETAIL_CONFIG.title)
    }, [setLabel])

    return (
      <MwManagerContainer>
        <Header description={CARD_15_DETAIL_CONFIG.description} />

        <Card15DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card15DetailProvider)

const Card16DetailPage =
  CARD_16_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard16DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_16_DETAIL_CONFIG.description} />

        <Card16DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card16DetailProvider)

const Card17DetailPage =
  CARD_17_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard17DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_17_DETAIL_CONFIG.description} />

        <Card17DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card17DetailProvider)

const Card18DetailPage =
  CARD_18_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard18DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_18_DETAIL_CONFIG.description} />

        <Card18DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card18DetailProvider)

const Card19DetailPage =
  CARD_19_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard19DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_19_DETAIL_CONFIG.description} />

        <Card19DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card19DetailProvider)

const Card20DetailPage =
  CARD_20_DETAIL_CONFIG &&
  createRouteTab(() => {
    const { managerProps } = useCard20DetailContext()

    return (
      <MwManagerContainer>
        <Header description={CARD_20_DETAIL_CONFIG.description} />

        <Card20DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card20DetailProvider)

const Card21DetailPage =
  CARD_21_DETAIL_CONFIG &&
  createRouteTab((props) => {
    const { managerProps } = useCard21DetailContext()
    const { setLabel } = useRouteTabContext(props.data.route)

    useEffect(() => {
      setLabel(CARD_21_DETAIL_CONFIG.title)
    }, [setLabel])

    return (
      <MwManagerContainer>
        <Header description={CARD_21_DETAIL_CONFIG.description} />

        <Card21DetailManager {...managerProps} />
      </MwManagerContainer>
    )
  }, Card21DetailProvider)

export const MAIN_HOME_DETAIL_PAGES = {
  ...(Card1DetailPage && { 'MainHomeDetail.card-1': Card1DetailPage }),
  ...(Card2DetailPage && { 'MainHomeDetail.card-2': Card2DetailPage }),
  ...(Card3DetailPage && { 'MainHomeDetail.card-3': Card3DetailPage }),
  ...(Card4DetailPage && { 'MainHomeDetail.card-4': Card4DetailPage }),
  ...(Card5DetailPage && { 'MainHomeDetail.card-5': Card5DetailPage }),
  ...(Card6DetailPage && { 'MainHomeDetail.card-6': Card6DetailPage }),
  ...(Card7DetailPage && { 'MainHomeDetail.card-7': Card7DetailPage }),
  ...(Card8DetailPage && { 'MainHomeDetail.card-8': Card8DetailPage }),
  ...(Card9DetailPage && { 'MainHomeDetail.card-9': Card9DetailPage }),
  ...(Card10DetailPage && { 'MainHomeDetail.card-10': Card10DetailPage }),
  ...(Card11DetailPage && { 'MainHomeDetail.card-11': Card11DetailPage }),
  ...(Card12DetailPage && { 'MainHomeDetail.card-12': Card12DetailPage }),
  ...(Card13DetailPage && { 'MainHomeDetail.card-13': Card13DetailPage }),
  ...(Card14DetailPage && { 'MainHomeDetail.card-14': Card14DetailPage }),
  ...(Card15DetailPage && { 'MainHomeDetail.card-15': Card15DetailPage }),
  ...(Card16DetailPage && { 'MainHomeDetail.card-16': Card16DetailPage }),
  ...(Card17DetailPage && { 'MainHomeDetail.card-17': Card17DetailPage }),
  ...(Card18DetailPage && { 'MainHomeDetail.card-18': Card18DetailPage }),
  ...(Card19DetailPage && { 'MainHomeDetail.card-19': Card19DetailPage }),
  ...(Card20DetailPage && { 'MainHomeDetail.card-20': Card20DetailPage }),
  ...(Card21DetailPage && { 'MainHomeDetail.card-21': Card21DetailPage }),
  ...Object.fromEntries(
    MAIN_HOME_DETAIL_CONFIGS.filter(
      (detail) =>
        ![
          'card-1',
          'card-2',
          'card-3',
          'card-4',
          'card-5',
          'card-6',
          'card-7',
          'card-8',
          'card-9',
          'card-10',
          'card-11',
          'card-12',
          'card-13',
          'card-14',
          'card-15',
          'card-16',
          'card-17',
          'card-18',
          'card-19',
          'card-20',
          'card-21',
        ].includes(detail.id),
    ).map(
      (detail) => [
        `MainHomeDetail.${detail.id}`,
        createDetailPage(detail.title, detail.description),
      ],
    ),
  ),
}
