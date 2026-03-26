import { TContent } from '../Content/interfaces'

type TSelected<T> = {
  selected: [T[], React.Dispatch<React.SetStateAction<T[]>>]
}

export type TUseContentSelected<T> = (props: TSelected<T>) => TContent<T>

export type TUseContent<T> = () => TContent<T>

export type IContainer<L, R> =
  | (TSelected<L> & {
      left: TUseContentSelected<L>
      right: TUseContentSelected<R>
    })
  | {
      left: TUseContent<L>
      right: TUseContent<R>
    }
