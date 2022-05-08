<template>
  <div
    class="preloader"
    :class="{
      'preloader--display-none': displayNone
    }"
  >
    <table class="preloader__table">
      <tbody>
      <tr
        v-for="(line, lineIndex) in array"
        :key="`line-${lineIndex}`"
        class="preloader__line"
      >
        <td
          v-for="(char, columnIndex) in line"
          :key="`column-${columnIndex}`"
          class="preloader__char"
          :class="{
              'preloader__char--1': getFirstWord(lineIndex, columnIndex),
              'preloader__char--2': getSecondWord(lineIndex, columnIndex),
              'preloader__char--3': getThirdWord(lineIndex, columnIndex)
            }"
        >
          {{ char }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext
} from '@nuxtjs/composition-api'
import { ALPHABET } from '~/constants'

const firstWordLineIndex = [3]
const firstWordColumnsIndex = [6, 7, 8, 9, 10, 11, 12]
const secondWordLineIndex = [3, 4, 5, 6, 7, 8, 9, 10, 11]
const secondWordColumnsIndex = [15]
const thirdWordLineIndex = [6]
const thirdWordColumnsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const array = [
  ['W', 'S', 'Y', 'X', 'T', 'E', 'F', 'K', 'M', 'S', 'E', 'Q', 'Q', 'C', 'I', 'W', 'V', 'D'],
  ['I', 'K', 'Z', 'N', 'W', 'X', 'O', 'F', 'Y', 'A', 'M', 'N', 'Q', 'J', 'G', 'N', 'W', 'V'],
  ['X', 'W', 'R', 'W', 'Q', 'V', 'P', 'Q', 'A', 'L', 'T', 'M', 'N', 'B', 'W', 'O', 'G', 'U'],
  ['K', 'C', 'O', 'D', 'U', 'C', 'A', 'L', 'C', 'O', 'H', 'O', 'L', 'K', 'W', 'B', 'C', 'D'],
  ['B', 'C', 'R', 'B', 'H', 'R', 'B', 'F', 'Q', 'B', 'O', 'D', 'R', 'R', 'V', 'E', 'K', 'V'],
  ['P', 'R', 'W', 'C', 'V', 'N', 'X', 'V', 'L', 'J', 'G', 'V', 'C', 'Y', 'N', 'S', 'N', 'F'],
  ['K', 'B', 'E', 'S', 'T', 'D', 'R', 'I', 'N', 'K', 'T', 'Z', 'P', 'V', 'G', 'T', 'X', 'Y'],
  ['K', 'A', 'W', 'U', 'W', 'L', 'I', 'Q', 'X', 'R', 'Q', 'Y', 'F' ,'B ','T' ,'P' ,'C' ,'S'],
  ['Y', 'P', 'R', 'P', 'P', 'P', 'X', 'F', 'Z', 'K', 'H', 'Q',' U',' F', 'P', 'R', 'N', 'R'],
  ['M', 'Z', 'C', 'R', 'E', 'A', 'T', 'E', 'B', 'N', 'E', 'P', 'W', 'C', 'A', 'I', 'K', 'B'],
  ['P', 'I', 'K', 'V', 'U', 'W', 'P', 'Z', 'K', 'M', 'I', 'L', 'B', 'Z', 'Q', 'C', 'A', 'Q'],
  ['O', 'L', 'U', 'F', 'A', 'K', 'P', 'I', 'M', 'N', 'B', 'P', 'N', 'C', 'X', 'E', 'N', 'F'],
  ['K', 'B', 'H', 'R', 'G', 'D', 'T', 'K', 'M', 'W', 'M', 'A', 'L', 'T', 'A', 'K', 'P', 'I'],
  ['R', 'P', 'F', 'J', 'J', 'W', 'Z', 'L', 'X', 'D', 'V', 'L', 'A', 'M', 'Z', 'N', 'Z', 'V'],
  ['X', 'B', 'D', 'Y', 'D', 'B', 'U', 'U', 'M', 'R', 'W', 'C', 'M', 'C', 'D', 'M', 'F', 'E'],
  ['O', 'Q', 'U', 'T', 'W', 'J', 'Q', 'T', 'Y', 'G', 'F', 'X', 'E', 'W', 'K', 'U', 'T', 'H'],
  ['R', 'M', 'Q', 'L', 'Y', 'O', 'N', 'Z', 'L', 'N', 'C', 'B', 'T', 'P', 'V', 'H', 'R', 'T'],
  ['T', 'P', 'B', 'H', 'I', 'D', 'H', 'Y', 'R', 'P', 'Q', 'F', 'W', 'T', 'A', 'R', 'T', 'Q'],
  ['R', 'S', 'D', 'E', 'Z', 'M', 'T', 'C', 'S', 'L', 'I', 'E', 'M', 'M', 'L', 'K', 'K', 'R'],
  ['D', 'O', 'H', 'T', 'S', 'X', 'D', 'G', 'H', 'T', 'S', 'B', 'T', 'E', 'Y', 'Q', 'W', 'W'],
  // [JEGRMFWQBTHUGELODD],
  // [TEHHEMIRPFPJPDANIJ],
  // [RUXSOBOVYFDNLSQPTM],
  // [ANPVXTUVWIHAVJUSFX],
  // [ZEMHJPXJIRIBFRWYLA],
]

const lines = array.length
const columns = 18
const countElements = lines * columns

const getRandomChar = () => {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
}

const getRandomIndex = () => {
  return Math.floor(Math.random() * countElements)
}

const getFirstWord = (lineIndex: number, columnIndex: number) => {
  return (
    firstWordLineIndex.includes(lineIndex) &&
    firstWordColumnsIndex.includes(columnIndex)
  )
}

const getSecondWord = (lineIndex: number, columnIndex: number) => {
  return (
    secondWordLineIndex.includes(lineIndex) &&
    secondWordColumnsIndex.includes(columnIndex)
  )
}

const getThirdWord = (lineIndex: number, columnIndex: number) => {
  return (
    thirdWordLineIndex.includes(lineIndex) &&
    thirdWordColumnsIndex.includes(columnIndex)
  )
}

export default defineComponent({
  name: 'PreLoader',
  setup(props, { emit }) {
    const { $gsap } = useContext()
    // const array = ref(Array.from(Array(25), () => new Array(18)))
    const displayNone = ref<boolean>(false)
    const interval = ref()

    // for (let i = 0; i < 25; i++) {
    //   for (let j = 0; j < 18; j++) {
    //     array.value[i][j] = getRandomChar()
    //   }
    // }

    onMounted(() => {
      const chars = document.getElementsByClassName('preloader__char')
      interval.value = setInterval(() => {
        for (let i = 0; i <= countElements / 10; i++) {
          const index = getRandomIndex()
          chars[index].classList.add('animated')
          setTimeout(() => {
            chars[index].classList.remove('animated')
          }, 1000)
        }
      }, 1000)

      $gsap
        .timeline()
        .to('.preloader__char--1', {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            $gsap.to('.preloader__char--1', {
              opacity: 0.2,
              duration: 1,
              delay: 1
            })
          }
        })
        .to('.preloader__char--2', {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            $gsap.to('.preloader__char--2', {
              opacity: 0.2,
              duration: 1,
              delay: 1
            })
          }
        })
        .to('.preloader__char--3', {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            $gsap.to('.preloader__char--3', {
              opacity: 0.2,
              duration: 1,
              delay: 1
            })
          }
        })
        .to('.preloader__char--4', {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            $gsap.to('.preloader__char--4', {
              opacity: 0.2,
              duration: 1,
              delay: 1
            })
          }
        })

      setTimeout(() => {
        clearInterval(interval.value)
        displayNone.value = true

        emit('onComplete')
      }, 6000)
    })

    return {
      displayNone,
      lines,
      columns,
      array,
      // alphabetArray,
      interval,
      getRandomChar,
      getRandomIndex,
      getFirstWord,
      getSecondWord,
      getThirdWord
    }
  }
})
</script>

<style lang="scss" scoped>
.preloader {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #151515;
  color: var(--color-white);
  z-index: 100;
  transition: all 0.3s;
  overflow: hidden;

  &--visible {
    opacity: 1;
  }

  &--display-none {
    display: none;
  }

  &__table {
    width: 100%;
    height: 100%;

    td {
      text-align: center;
    }
  }

  &__char {
    font-size: 13px;
    opacity: 0.2;
    transition: all 1s;

    @media (min-width: 768px) {
      font-size: 26px;
    }

    @media (min-width: 1024px) {
      font-size: 21px;
    }

    @media (min-width: 1440px) {
      font-size: 30px;
    }

    @media (min-width: 1920px) {
      font-size: 40px;
    }

    &.animated {
      opacity: 0.6;
    }
  }
}
</style>
