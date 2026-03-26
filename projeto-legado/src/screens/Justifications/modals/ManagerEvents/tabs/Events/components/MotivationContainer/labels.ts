export const motivationDefinitive = async () => {
  const options = [
    {
      value: 'Demissão',
      label: 'Demissão',
    },
    {
      value: 'Afastamento',
      label: 'Afastamento',
    },
  ]

  return { options, lastPage: true }
}
