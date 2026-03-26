import * as S from './styles'

const MOOD_DATA = {
  veryBad: 10,
  bad: 20,
  neutral: 56,
  good: 2,
  great: 0,
}

const moods = [
  { key: 'veryBad', label: 'Muito ruim', value: MOOD_DATA.veryBad, color: '#E23851', face: 'sadSweat' },
  { key: 'bad', label: 'Ruim', value: MOOD_DATA.bad, color: '#F97316', face: 'sad' },
  { key: 'neutral', label: 'Neutro', value: MOOD_DATA.neutral, color: '#FBCF30', face: 'meh' },
  { key: 'good', label: 'Bom', value: MOOD_DATA.good, color: '#66BB6A', face: 'smile' },
  { key: 'great', label: 'Ótimo', value: MOOD_DATA.great, color: '#19C172', face: 'laugh' },
]

const Mood = () => (
  <S.Container>
    {moods.map((mood) => (
      <S.MoodItem key={mood.key} aria-label={`${mood.label}: ${mood.value} usuários`}>
        <S.Face $color={mood.color} data-face={mood.face}>
          <span />
        </S.Face>
        <strong>{mood.value}</strong>
      </S.MoodItem>
    ))}
  </S.Container>
)

export default Mood
