export const updateTitle: React.MouseEventHandler = (event) => {
  let target = event.target as HTMLElement | null

  while (target && !('ellipsis' in target.dataset)) {
    target = target.parentElement as HTMLElement | null
  }

  if (!target) return

  if (
    target.scrollWidth > target.offsetWidth ||
    target.scrollHeight > target.offsetHeight
  ) {
    target.title = target.innerText
  } else target.removeAttribute('title')
}

const voidF = () => {}

export const useEllipsis = (onMouseOver?: React.MouseEventHandler) => {
  const originalHandler = onMouseOver || voidF
  const handler: React.MouseEventHandler = (event) => {
    originalHandler(event)
    updateTitle(event)
  }

  return {
    onMouseOver: handler,
    'data-ellipsis': '',
  }
}
