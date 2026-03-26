export const assetUrl = (asset: string, assetBaseUrl: string): string => {
  const base = assetBaseUrl.endsWith('/') ? assetBaseUrl : `${assetBaseUrl}/`

  let normalizedAsset = asset

  while (normalizedAsset.startsWith('/') || normalizedAsset.startsWith('.')) {
    normalizedAsset = normalizedAsset.slice(1)
  }

  normalizedAsset = normalizedAsset.startsWith('assets/')
    ? normalizedAsset.slice(7)
    : normalizedAsset

  return `${base}${normalizedAsset}`
}

export const ensureFontLoaded = async (
  fontFamily: string,
  fontSize = 64,
  text = ' ',
): Promise<boolean> => {
  if (typeof document === 'undefined' || !document.fonts) {
    return false
  }

  const sampleText = text.trim().length > 0 ? text : ' '
  const fontSpec = `${fontSize}px ${fontFamily}`
  const maxAttempts = 5

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      await document.fonts.load(fontSpec, sampleText)
      await document.fonts.ready
      await new Promise(requestAnimationFrame)

      if (document.fonts.check(fontSpec, sampleText)) {
        return true
      }
    } catch {
      return false
    }

    await new Promise((resolve) => setTimeout(resolve, 120))
  }

  return false
}
