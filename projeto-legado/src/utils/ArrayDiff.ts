export const arrayIntersection = (arr1: any[], arr2: any[]): any[] => {
  return arr1.filter((x) => arr2.includes(x))
}

export const arrayDiff = (arr1: any[], arr2: any[]): any[] => {
  return arr1.filter((x) => !arr2.includes(x))
}
