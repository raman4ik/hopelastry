<template>
  <component
    :is="component"
    ref="stringRef"
    class="animated-words"
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
      default: 'center bottom'
    },
    component: {
      type: String,
      default: 'div'
    }
  },
  setup(props) {
    const { $gsap, $splitting } = useContext()
    const stringRef = ref<HTMLElement | null>(null)
    const gsapWordInsance: any[] = []
    onMounted(() => {
      setTimeout(() => {
        const { delay, showScrollTrigger, animationShowStart } = props
        const results: SplittingReturn[] = $splitting({
          target: stringRef.value,
          by: 'words'
        })
        if (results?.[0].words) {
          results[0].words.forEach((word: HTMLElement, index: number) => {
            gsapWordInsance[index] = $gsap.to(word, {
              opacity: 1,
              translateY: 0,
              duration: 0.5,
              delay: delay + 0.15 * index,
              scrollTrigger: showScrollTrigger
                ? {
                  trigger: stringRef.value,
                  start: animationShowStart
                }
                : undefined
            })
          })
        }
      }, 100)
    })
    onBeforeUnmount(() => {
      gsapWordInsance.forEach((instance: any) => instance.kill())
    })
    return {
      stringRef
    }
  }
})
</script>

<style lang="scss">
.animated-words {
  .word {
    transform: translateY(50%);
    display: inline-block;
    opacity: 0;
  }
}
</style>
