<template>
  <component
    :is="component"
    ref="stringRef"
    class="animated-chars"
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
    const gsapWordInsance: any[] = []
    onMounted(() => {
      const { delay, showScrollTrigger, animationShowStart } = props
      const results: SplittingReturn[] = $splitting({
        target: stringRef.value,
        by: 'chars'
      })
      setTimeout(() => {
        if (results?.[0].chars) {
          results[0].chars.forEach((char: HTMLElement, index: number) => {
            gsapWordInsance[index] = $gsap.to(char, {
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
.animated-chars {
  .char {
    transform: translateY(50%);
    display: inline-block;
    opacity: 0;
  }
}
</style>
