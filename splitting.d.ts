export interface splitting {}

export type CSSselector = string
export type SplittingBy =
  | 'words'
  | 'chars'
  | 'lines'
  | 'items'
  | 'grid'
  | 'cols'
  | 'rows'
  | 'cells'

export interface SplittingArgs {
  target: CSSselector | HTMLElement | null
  by: SplittingBy
  matching?: CSSselector | HTMLElement | null
}

export interface SplittingReturn {
  el: HTMLElement
  lines?: HTMLElement[][]
  words?: HTMLElement[]
  chars?: HTMLElement[]
  items?: HTMLElement[]
}
