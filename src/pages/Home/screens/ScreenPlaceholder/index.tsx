import styles from './styles.module.css'

type ScreenPlaceholderProps = {
  title: string
  description?: string
  copy?: string
}

const ScreenPlaceholder = ({ title, description, copy }: ScreenPlaceholderProps) => {
  return (
    <section className={styles.placeholder}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.copy}>
          {description || copy || 'Tela estruturada dentro da camada screens da Home.'}
        </p>
      </header>
    </section>
  )
}

export default ScreenPlaceholder
