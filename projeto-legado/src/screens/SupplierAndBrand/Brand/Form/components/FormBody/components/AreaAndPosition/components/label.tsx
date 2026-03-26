import { Rule } from '../../../../../../../../../components/GridSelector/interfaces'

interface ILabel {
  count: number
  rule: Rule
  singular: string
  plural: string
}

const Label = (props: ILabel) => {
  const { count, rule, singular, plural } = props

  if (count < 1) return <>Nenhuma ação definida</>

  return (
    <div>
      {rule === 'EXCEPT' ? 'Excluindo' : 'Restringindo'} |{' '}
      <b>{count.toString().padStart(2, '0')}</b> {count > 1 ? plural : singular}
    </div>
  )
}
export default Label
