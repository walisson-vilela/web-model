export type IRecoverPassword =
  | 404
  | {
      success: boolean
      data: {
        supervisor: boolean
        email: string
      }
    }

export interface IForgotPassword {
  onClose: () => void
  account: string
  username: string
}
