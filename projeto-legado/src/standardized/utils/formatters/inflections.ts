export const capitalize = (text: string): string => {
  return text
    .split(' ')
    .map((word) => {
      return `${word.substring(0, 1).toUpperCase()}${word
        .substring(1)
        .toLowerCase()}`
    })
    .join(' ')
}

export const twoLettersAcronym = (name: string): string => {
  const words = name.split(' ')

  return words.length > 1
    ? `${words[0].charAt(0) + words[1].charAt(0)}`
    : name.slice(0, 2)
}

/** removes a sequence of the given char from the beginning and end of the given string */
export const trim = (str: string, char: string): string => {
  return str.replace(new RegExp(`^\\${char}+|\\${char}+$`, 'g'), '')
}
