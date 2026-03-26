export type EllipsisContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  lines?: number
}

export type StyledEllipsisContainerProps =
  React.HTMLAttributes<HTMLDivElement> & {
    $lines?: EllipsisContainerProps['lines']
  }
