// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseComponent = React.VoidFunctionComponent<any>

export type ModalOptions = { [K: string]: BaseComponent }

export type ModalProps<O extends ModalOptions> = React.PropsWithChildren<{
  options: O
}>

export type Context<T extends ModalOptions> = {
  openModal: <Id extends keyof T>(id: Id, value: Parameters<T[Id]>[0]) => void
  closeModal: () => void
}
