export const search = (param: string, array: any[], key: string = '') => {
  let aux: any[] = [...array]

  if (param) {
    param = param
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    aux = aux.filter((e) => {
      let item = key ? e[key] : e
      let name = item
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

      if (name.includes(param)) return e
    })
  }

  return aux
}
