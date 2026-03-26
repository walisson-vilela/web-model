import styles from '../../styles.module.css'
import backgroundImage from '../../../../assets/images/backgrounds/Intersecao_1.webp'
import logoImage from '../../../../assets/images/logos/photo-24px.webp'

const Login = () => {
  return (
    <section className={styles.panel} aria-hidden='true'>
      <img
        className={styles.panelLogo}
        src={logoImage}
        alt=''
        aria-hidden='true'
      />

      <img
        className={styles.panelImage}
        src={backgroundImage}
        alt=''
        aria-hidden='true'
      />

      <div className={styles.panelOverlay} />

      <p className={styles.panelCaption}>
        © Copyright 2012-2024 Mundo Wap, todos os direitos reservados.
      </p>
    </section>
  )
}

export default Login
