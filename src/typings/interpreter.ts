export interface LoopAnchor {
  start: number
  end?: number
}

export type Token = '>' | '<' | '.' | ',' | '[' | ']' | '+' | '-'

export type Command = {
  [key in Token]: () => void
}
