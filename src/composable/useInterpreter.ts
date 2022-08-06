/* eslint-disable @typescript-eslint/no-empty-function */
import { Command, LoopAnchor, Token } from '@/typings/interpreter'
import { ref } from 'vue'

export const useInterpreter = () => {
  const memory = ref(new Array(30000).fill(0))
  const ptr = ref(0)
  const maxPtr = ref(-1)
  const programPtr = ref(0)
  const program = ref<Token[]>([])
  const output = ref('')
  let inputBuffer: string[] = []

  let loopAnchors: LoopAnchor[] = []

  function reset() {
    memory.value = new Array(30000).fill(0)
    ptr.value = 0
    programPtr.value = 0
    loopAnchors = []
    program.value = []
    output.value += '\n========\n'
  }

  const commands: Command = {
    '>': () => {
      ptr.value++
      if (ptr.value > maxPtr.value) {
        maxPtr.value = ptr.value + 1
      }
    },
    '<': () => {
      ptr.value--
    },
    '+': () => {
      memory.value[ptr.value]++
    },
    '-': () => {
      memory.value[ptr.value]--
    },
    '.': () => {
      output.value += String.fromCharCode(memory.value[ptr.value])
    },
    ',': () => {
      const val = inputBuffer.shift()
      if (val) {
        memory.value[ptr.value] = val.charCodeAt(0)
      }
    },
    '[': () => {
      if (memory.value[ptr.value] === 0) {
        const loopAnchor = loopAnchors.find((l) => l.start === programPtr.value)
        if (loopAnchor && loopAnchor.end) {
          programPtr.value = loopAnchor.end
        } else {
          throw Error('Unbalanced loops')
        }
      }
    },
    ']': () => {
      const loopAnchor = loopAnchors.find((l) => l.end === programPtr.value)
      if (loopAnchor) {
        programPtr.value = loopAnchor.start - 1
      } else {
        throw Error('Unbalanced loops')
      }
    },
  }

  function findLoops(code: Token[]): void {
    const tempLoopAnchors: LoopAnchor[] = []
    let loopPtr = -1
    for (let i = 0; i < code.length; i += 1) {
      const char = code[i]
      if (char === '[') {
        tempLoopAnchors.push({ start: i })
        loopPtr++
      }
      if (char === ']') {
        tempLoopAnchors[loopPtr].end = i
        loopAnchors.push(tempLoopAnchors[loopPtr])
        tempLoopAnchors.splice(loopPtr)
        loopPtr--
      }
    }
  }

  function interpret(code: string, input: string) {
    reset()
    inputBuffer = input.split('')
    program.value = code.replaceAll(/[^[\].,+\-<>]/g, '').split('') as Token[]
    findLoops(program.value)
    return program
  }

  function step() {
    while (programPtr.value < program.value.length) {
      const char = program.value[programPtr.value] as Token
      commands[char]()
      programPtr.value++
      break
    }
  }

  return {
    interpret,
    step,
    programPtr,
    program,
    memory,
    ptr,
    maxPtr,
    output,
  }
}
