import type React from 'react'

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean
  onClose: React.MouseEventHandler<HTMLDivElement>
}

export type StyledTagProps = {
  $invalid?: TagProps['invalid']
}
