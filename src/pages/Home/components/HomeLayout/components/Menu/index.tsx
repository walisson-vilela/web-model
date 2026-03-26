import { forwardRef, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type {
  ComponentType,
  MutableRefObject,
  SVGAttributes,
} from 'react'

import featherIcons from '../../../../../../assets/icons/feather'
import { Icon } from '../../../../../../components'
import { PATHS } from '../../../../../../routes/paths'
import { HOME_SCREEN_NODES } from '../../../../screens'

import styles from '../../styles.module.css'

type MenuProps = {
  sidebarOpen: boolean
  onOpenSidebar: () => void
  onNavigateToScreen: (path: string) => void
}

type FlyoutItem = {
  label: string
  path: string
}

type SidebarItem = {
  icon: ComponentType<SVGAttributes<SVGSVGElement>>
  label: string
  path: string
  children: Array<{
    label: string
    path: string
  }>
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ sidebarOpen, onOpenSidebar, onNavigateToScreen }, ref) => {
    const { chevron_down: ChevronDown } = featherIcons
    const location = useLocation()
    const iconSize = '18px'
    const rootRef = useRef<HTMLDivElement | null>(null)
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
    const [hoveredSubmenu, setHoveredSubmenu] = useState<{
      top: number
      items: FlyoutItem[]
    } | null>(null)
    const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({})

    const sidebarItems: SidebarItem[] = HOME_SCREEN_NODES.map(
      ({ icon, label, path, children = [] }) => ({
        icon,
        label,
        path,
        children: children.map((child) => ({
          label: child.label,
          path: child.path,
        })),
      }),
    )

    const currentPath = location.pathname.startsWith(`${PATHS.app}/`)
      ? location.pathname.slice(PATHS.app.length + 1)
      : location.pathname === PATHS.app
        ? ''
        : location.pathname.replace(/^\//, '')

    const navigateTo = (path: string) => {
      onNavigateToScreen(path)
    }

    const setRootRef = (node: HTMLDivElement | null) => {
      rootRef.current = node

      if (typeof ref === 'function') {
        ref(node)
        return
      }

      if (ref) {
        ;(ref as MutableRefObject<HTMLDivElement | null>).current = node
      }
    }

    const isNodeActive = (item: SidebarItem) => {
      if (currentPath === item.path) return true

      return item.children.some((child) => currentPath === child.path)
    }

    const openSubmenu = (index: number, items: FlyoutItem[]) => {
      if (sidebarOpen || items.length < 1) {
        setHoveredSubmenu(null)
        return
      }

      const wrapper = rootRef.current
      const button = itemRefs.current[index]
      if (!wrapper || !button) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()

      setHoveredSubmenu({
        top: buttonRect.top - wrapperRect.top,
        items,
      })
    }

    const toggleGroup = (index: number) => {
      setOpenGroups((current) => ({
        ...current,
        [index]: !current[index],
      }))
    }

    const handleItemClick = (index: number, item: SidebarItem) => {
      if (!sidebarOpen) {
        onOpenSidebar()

        if (item.children.length > 0) {
          setOpenGroups((current) => ({
            ...current,
            [index]: true,
          }))
        }

        setHoveredSubmenu(null)
        return
      }

      if (item.children.length > 0) {
        toggleGroup(index)
        return
      }

      navigateTo(item.path)
    }

    const handleFlyoutClick = (path: string) => {
      navigateTo(path)
      setHoveredSubmenu(null)
    }

    return (
      <div
        ref={setRootRef}
        className={styles.sidebarShell}
        onMouseLeave={() => setHoveredSubmenu(null)}
      >
        <aside
          className={[
            styles.sidebar,
            sidebarOpen ? styles.sidebarOpen : styles.sidebarCollapsed,
          ].join(' ')}
        >
          <div className={styles.sidebarBrand}>
            <span className={styles.sidebarLogo}>F</span>
            <span className={styles.sidebarBrandText}>Workable</span>
          </div>

          <nav className={styles.sidebarNav} aria-label='Menu lateral'>
            {sidebarItems.map((item, index) => {
              const active = isNodeActive(item)
              const expanded = sidebarOpen && (openGroups[index] || active)
              const hasChildren = item.children.length > 0
              const flyoutItems: FlyoutItem[] = hasChildren
                ? [{ label: item.label, path: item.path }, ...item.children]
                : [{ label: item.label, path: item.path }]

              return (
                <div
                  key={item.label}
                  className={[
                    styles.sidebarGroup,
                    expanded ? styles.sidebarGroupOpen : '',
                  ].join(' ')}
                >
                  <button
                    ref={(node) => {
                      itemRefs.current[index] = node
                    }}
                    className={[
                      styles.sidebarItem,
                      active ? styles.sidebarItemActive : '',
                      expanded ? styles.sidebarItemExpanded : '',
                    ].join(' ')}
                    type='button'
                    aria-label={item.label}
                    aria-expanded={sidebarOpen ? expanded : false}
                    onMouseEnter={() => openSubmenu(index, flyoutItems)}
                    onClick={() => handleItemClick(index, item)}
                  >
                    <span className={styles.sidebarIconSlot} aria-hidden='true'>
                <Icon
                        type='svg'
                        icon={item.icon}
                        color='inherit'
                        width={iconSize}
                        height={iconSize}
                      />
                    </span>

                    <span className={styles.sidebarLabel}>{item.label}</span>

                    {sidebarOpen && hasChildren ? (
                      <span className={styles.sidebarChevron} aria-hidden='true'>
                        <Icon
                          type='svg'
                          icon={ChevronDown}
                          color='inherit'
                          width='16px'
                          height='16px'
                        />
                      </span>
                    ) : null}
                  </button>

                  {expanded && hasChildren ? (
                    <div className={styles.sidebarChildren} role='group'>
                      {item.children.map((child) => (
                        <button
                          className={styles.sidebarChildItem}
                          type='button'
                          key={`${item.label}-${child.label}`}
                          onClick={() => navigateTo(child.path)}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
        </aside>

        {!sidebarOpen && hoveredSubmenu ? (
          <div
            className={styles.submenuFlyout}
            style={{ top: `${hoveredSubmenu.top}px` }}
          >
            {hoveredSubmenu.items.map((item) => (
              <button
                className={styles.submenuItem}
                type='button'
                key={item.label}
                onClick={() => handleFlyoutClick(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    )
  },
)

export default Menu
