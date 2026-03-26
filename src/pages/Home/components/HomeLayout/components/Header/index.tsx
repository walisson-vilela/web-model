import featherIcons from '../../../../../../assets/icons/feather'
import { Icon } from '../../../../../../components'

import styles from '../../styles.module.css'

type HeaderProps = {
  onToggleSidebar: () => void
}

const {
  bell: Bell,
  chevron_down: ChevronDown,
  menu: Menu,
} = featherIcons

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          className={styles.menuButton}
          type='button'
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onToggleSidebar}
          aria-label='Alternar menu lateral'
        >
          <Icon type='svg' icon={Menu} width='24px' height='24px' />
        </button>
      </div>

      <div className={styles.topbarCenter} aria-hidden='true' />

      <div className={styles.topbarUser}>
        <button className={styles.notificationButton} type='button'>
          <Icon type='svg' icon={Bell} width='18px' height='18px' />
          <span className={styles.notificationBadge}>3</span>
        </button>

        <div className={styles.userBlock}>
          <div className={styles.avatar}>CS</div>
          <span>Carlos Soares</span>
          <Icon type='svg' icon={ChevronDown} width='16px' height='16px' />
        </div>
      </div>
    </header>
  )
}

export default Header
