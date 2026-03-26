import { useContext, useEffect, useState } from 'react'

import { AppliedFilters, MenuFilters, SearchFilter } from '@mw-kit/mw-manager'
import { MwIcon } from '@mw-kit/mw-ui'
import moment from 'moment'
import { useParams } from 'react-router'
import { Dropdown, Popup } from 'semantic-ui-react'

import Elipse from '../../../../../assets/img/svgs/elipse.svg?react'
import { Header as MwHeader } from '../../../../../components'
import { GalleryViewContext } from '../../context'
import { ParamsProps } from '../../interface'
import useImageGalleryContext from '../../provider'

import filters from './filters'
import * as S from './styles'

const Header = () => {
  const params = useParams()
  const {
    totalImages,
    accordionData,
    columnsPerRow,
    setColumnsPerRow,
    appliedFilters,
    setAppliedFilters,
    search,
    setSearch,
    reloadData,
    handleOpenAllAcordion,
    openedAccordions,
    handleCloseAllAcordion,
    handleCheckAllImages,
    handleUnCheckAll,
    checkedImage,
    imagesData,
  } = useContext(GalleryViewContext)

  const { closeTab } = useImageGalleryContext()

  const [openColumnPopup, setOpenColumnPopup] = useState(false)

  const [dateInterval, setDateInterval] = useState('')

  useEffect(() => {
    const data =
      //@ts-ignore
      JSON.parse(localStorage.getItem(`image-gallery-tour/${params.id}`))

    if (!data) {
      closeTab()
      return
    }

    const { finalDate, initialDate }: ParamsProps = data

    setDateInterval(
      `${
        moment(initialDate || new Date().toISOString()).format('DD/MM/YYYY') ||
        ''
      } à ${
        moment(finalDate || new Date().toISOString()).format('DD/MM/YYYY') || ''
      }`,
    )
  }, [])

  return (
    <S.Container>
      <MwHeader
        description={`${`${totalImages} Image${
          totalImages > 1 ? 'ns' : 'm'
        } `} | Período: ${dateInterval}`}
        child={
          <S.FiltersContainer>
            <Popup
              on='click'
              className='show-columns'
              position='bottom center'
              open={openColumnPopup}
              onClose={() => setOpenColumnPopup(false)}
              onOpen={() => setOpenColumnPopup(true)}
              content={
                <S.ShowContainer>
                  {columnsPerRow === 3 ? (
                    <img
                      src={
                        '/assets/icons/image-gallery-tour/Modulo 3 imagens az.svg'
                      }
                      alt='modulo 3 cd'
                    />
                  ) : (
                    <img
                      src={
                        '/assets/icons/image-gallery-tour/Modulo 3 imagens cz.svg'
                      }
                      alt='modulo3 at'
                      onClick={() => {
                        setColumnsPerRow(3)
                        setOpenColumnPopup(false)
                      }}
                    />
                  )}

                  {columnsPerRow === 2 ? (
                    <img
                      src={
                        '/assets/icons/image-gallery-tour/Modulo 2 imagens az.svg'
                      }
                      alt='modulo 3 cd'
                    />
                  ) : (
                    <img
                      src={
                        '/assets/icons/image-gallery-tour/Modulo 2 imagens cz.svg'
                      }
                      alt='modulo3 at'
                      onClick={() => {
                        setColumnsPerRow(2)
                        setOpenColumnPopup(false)
                      }}
                    />
                  )}
                </S.ShowContainer>
              }
              trigger={
                <S.ExibitionMode>
                  <span>Modo de Exibição</span>
                  <i aria-hidden='true' className='caret down icon'></i>
                </S.ExibitionMode>
              }
            />

            <S.Loader>
              <Popup
                on='hover'
                content={<span style={{ color: '#fff' }}>Atualizar</span>}
                position='top center'
                className='popup-field'
                trigger={
                  <MwIcon
                    type='feather'
                    icon='rotate_cw'
                    onClick={reloadData}
                  />
                }
              />
            </S.Loader>
            <SearchFilter transparent search={search} setSearch={setSearch} />
            <AppliedFilters
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
            />
            <MenuFilters
              filters={filters}
              setAppliedFilters={setAppliedFilters}
              appliedFilters={appliedFilters}
            />
            <Dropdown
              className='wrapper-button'
              icon={null}
              trigger={<Elipse />}
              floating
              direction='left'
              style={{ borderLeft: 0, zIndex: 1 }}
            >
              <Dropdown.Menu className='button'>
                <Dropdown.Item
                  disabled={
                    checkedImage.length ===
                    imagesData.map((item) => item.images).flat(1).length
                  }
                  content={'Selecionar Todos'}
                  onClick={() => handleCheckAllImages()}
                  className='button-pdf'
                />

                <Dropdown.Item
                  content={'Desmarcar Todos'}
                  disabled={checkedImage.length === 0}
                  onClick={() => handleUnCheckAll()}
                  className='button-pdf'
                />

                <Dropdown.Item
                  content={'Expandir Categoria'}
                  disabled={openedAccordions.length === accordionData.length}
                  onClick={handleOpenAllAcordion}
                  className='button-pdf'
                />

                <Dropdown.Item
                  content={'Recolher Categoria'}
                  disabled={openedAccordions.length === 0}
                  onClick={() => handleCloseAllAcordion()}
                  className='button-pdf'
                />
              </Dropdown.Menu>
            </Dropdown>
          </S.FiltersContainer>
        }
      />
    </S.Container>
  )
}

export default Header
