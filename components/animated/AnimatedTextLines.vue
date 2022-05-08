<template>
  <component
    :is="component"
    ref="stringRef"
    class="animated-lines"
    v-html="string"
  />
</template>

<script lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  useContext
} from '@nuxtjs/composition-api'
import { defineComponent } from '@vue/composition-api'
import { SplittingReturn } from '~/splitting'
export default defineComponent({
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    string: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      default: 0
    },
    showScrollTrigger: {
      type: Boolean,
      default: true
    },
    animationShowStart: {
      type: String,
      default: 'top bottom-=20'
    },
    component: {
      type: String,
      default: 'div'
    }
  },
  setup(props) {
    const { $gsap, $splitting } = useContext()
    const stringRef = ref<HTMLElement | null>(null)
    const { delay, showScrollTrigger, animationShowStart } = props
    const gsapLineInsance: any[] = []
    onMounted(() => {
      setTimeout(() => {
        const results: SplittingReturn[] = $splitting({
          target: stringRef.value,
          by: 'lines'
        })
        if (results?.[0].lines) {
          results[0].lines.forEach((line: HTMLElement[], lineIndex: number) => {
            line.forEach((word: HTMLElement, wordIndex: number) => {
              word.classList.add(`line-${lineIndex + 1}`)

              if (line.length - 1 === wordIndex) {
                word.classList.add(`line-${lineIndex + 1}-last`)
              }

              gsapLineInsance[lineIndex] = $gsap.to(word, {
                opacity: 1,
                translateY: 0,
                duration: 0.5,
                delay: delay + 0.15 * lineIndex,
                scrollTrigger: showScrollTrigger
                  ? {
                      trigger: stringRef.value,
                      start: animationShowStart
                    }
                  : undefined
              })
            })
          })
        }
      }, 100)
    })
    onBeforeUnmount(() => {
      gsapLineInsance.forEach((instance: any) => instance.kill())
    })
    return {
      stringRef
    }
  }
})
</script>

<style lang="scss">
.animated-lines {
  user-select: none;
  color: transparent;

  .word {
    transform: translateY(50%);
    opacity: 0;
    display: inline-block;
  }
}
</style>
