import React, { useEffect, useState } from 'react'

import Menu from '../../../../Menu'
import type { Option } from '../../../../Menu/interfaces'
import Submenu from '../Submenu'

import type { FiltersMenuProps } from './interfaces'

const FiltersMenu = (props: FiltersMenuProps) => {
  const { open, close } = props

  const [active, setActive] = useState<number>(-1)

  const items: Option[] = props.items.map((item): Option => {
    return {
      label: typeof item.label === 'string' ? item.label : item.label.element,
      delimiter: item.delimiter,
      keepOpen: true,
      caret: true,
      onClick: (index: number) => {
        setActive((prev) => (prev === index ? -1 : index))
      },
      data: {},
    }
  })

  const selected =
    active >= 0 && active < props.items.length ? props.items[active] : undefined

  useEffect(() => {
    if (open) return
    setActive(-1)
  }, [open])

  return (
    <Menu
      open={open}
      options={items}
      close={close}
      width='160px'
      maxHeight='261px'
      containerSpacing={{
        top: 's1',
        left: 's1',
        bottom: 's1',
      }}
      itemSpacing={{
        top: 's1',
        left: 's1',
        bottom: 's1',
      }}
      transition={{
        properties: {
          width: {},
        },
      }}
      {...(props.containerProps || {})}
    >
      <Submenu
        item={selected}
        close={() => setActive(-1)}
        closeParent={close}
        setAppliedFilters={props.setAppliedFilters}
        containerProps={props.subContainerProps}
      />
    </Menu>
  )
}

export default FiltersMenu
