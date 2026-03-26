export type MaskFunction = (value: string) => string
export type MaskReplace = [RegExp, string]
export type MaskReplaceArray = MaskReplace[]
export type Mask = MaskFunction | MaskReplace | MaskReplaceArray
