type PPTTemplateMap = {
  cover_content: 'cover_file'
  cover_information: 'duo_file'
  header_place: 'single_file'
}

export type PPTTemplates = {
  [K in keyof PPTTemplateMap]: {
    type: K
    file_key: PPTTemplateMap[K]
    color: string
    url: string
    name: string
    file?: File
  }
}
