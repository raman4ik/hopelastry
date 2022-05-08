<template>
  <div ref="containerRef" class="image">
    <div ref="wrapperRef" class="image__wrapper">
      <img ref="imgRef" class="image__img" :src="src" :alt="alt" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  useContext
} from '@nuxtjs/composition-api'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    scale: {
      type: Boolean,
      default: false
    },
    showAnimationDelay: {
      type: Number,
      default: 0
    },
    animationShowStart: {
      type: String,
      default: 'top bottom'
    },
    animationScaleStart: {
      type: String,
      default: 'center center'
    },
    scrollTriggerSelector: {
      type: String,
      default: ''
    },
    scrollTriggerRef: {
      type: String,
      default: null
    },
    showScrollTrigger: {
      type: Boolean,
      default: true
    },
    scaleMarkers: {
      type: Boolean,
      default: false
    },
    showMarkers: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { $gsap } = useContext()
    const {
      animationShowStart,
      animationScaleStart,
      scale,
      showAnimationDelay,
      scrollTriggerSelector,
      showScrollTrigger,
      scaleMarkers,
      showMarkers
    } = props
    const containerRef = ref<HTMLElement | null>(null)
    const wrapperRef = ref<HTMLElement | null>(null)
    const imgRef = ref<HTMLElement | null>(null)
    let gsapShowInsance: any = null
    let gsapScaleInsance: any = null
    onMounted(() => {
      setTimeout(() => {
        gsapShowInsance = $gsap.to(wrapperRef.value, {
          opacity: 1,
          translateX: 0,
          duration: 1,
          delay: showAnimationDelay,
          scrollTrigger: showScrollTrigger
            ? {
              trigger: containerRef.value,
              markers: showMarkers,
              start: animationShowStart
            }
            : undefined
        })
        if (scale) {
          gsapScaleInsance = $gsap.to(imgRef.value, {
            scale: 1.25,
            delay: 0,
            ease: 'none',
            scrollTrigger: {
              start: animationScaleStart,
              trigger: scrollTriggerSelector || containerRef.value,
              scrub: true,
              markers: scaleMarkers
            }
          })
        }
      }, 200)
    })
    onBeforeUnmount(() => {
      if (gsapShowInsance) {
        gsapShowInsance.kill()
      }
      if (scale && gsapScaleInsance) {
        gsapScaleInsance.kill()
      }
    })
    return {
      containerRef,
      wrapperRef,
      imgRef
    }
  }
})
</script>

<style lang="scss" scoped>
.image {
  overflow: hidden;
  &__wrapper {
    height: 100%;
    width: 100%;
    opacity: 0;
    transform: translateX(-20px);
  }
  &__img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
