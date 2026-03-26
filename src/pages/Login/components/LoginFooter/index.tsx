import styles from '../../styles.module.css'

import type { LoginFooterProps } from '../../interfaces'

const LoginFooter = (props: LoginFooterProps) => {
  return <footer className={styles.footer}>{props.text}</footer>
}

export default LoginFooter
