const forceDownload = async (
  url: string,
  fname: string | null = null,
  init?: Parameters<typeof fetch>[1],
) => {
  const filename = fname || url.split('/').pop()
  const data = await fetch(url, init)
  const blob = await data.blob()

  const objectUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.setAttribute('href', objectUrl)
  link.setAttribute('download', filename)
  link.style.display = 'none'

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}

export const download = (
  url: string,
  fname: string | null = null,
  init?: Parameters<typeof fetch>[1],
): void => {
  try {
    forceDownload(url, fname, init)
  } catch (e) {
    alert(
      'Ocorreu um erro durante o download do arquivo, tente novamente mais tarde.',
    )
  }
}
