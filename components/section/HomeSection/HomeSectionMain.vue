<template>
  <div class="home-main">
    <div ref="bgRef" class="background">
      <div ref="imgRef" class="background__image"></div>
    </div>

    <div class="home-main-content">
      <AnimatedTextChars string="BEST DRINK" :delay="1.5" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext
} from '@nuxtjs/composition-api'
import AnimatedTextChars from '~/components/animated/AnimatedTextChars.vue'

export default defineComponent({
  components: { AnimatedTextChars },
  setup() {
    const { $gsap, $Scrollbar } = useContext()
    const bgRef = ref(null)
    const imgRef = ref(null)
    const titleRef = ref(null)

    const homeImageAnimate = () => {
      $gsap
        .timeline()
        .to(bgRef.value, { translateY: 0, duration: 1.5, ease: 'power3.inOut' })
        .to(imgRef.value, { scale: 1, duration: 1.5, ease: 'power4.inOut' })
    }

    onMounted(() => {
      homeImageAnimate()
      setTimeout(() => {
        const scroller = document.querySelector('.scroller')
        // @ts-ignore
        const scrollbar = $Scrollbar.get(scroller)

        scrollbar.updatePluginOptions('myPlugin', {
          animateProcess: false
        })
      }, 100)
    })

    return {
      bgRef,
      imgRef,
      titleRef
    }
  }
})
</script>

<style lang="scss" scoped>
.home-main {
  position: relative;
  height: 100vh;
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    transform: translateY(100%);
    z-index: -1;

    .background__image {
      background: url('https://images.unsplash.com/photo-1597290282695-edc43d0e7129?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80')
        center no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
      transform: scale(1.5);

      &::before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .home-main-content {
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 250px;

    .words {
      font-size: 78px;
      font-weight: 500;
      color: #fdcc7c;
      font-family: var(--font-cardinal-fruit);

      @media (min-width: 768px) {
        font-size: 118px;
      }

      @media (min-width: 1024px) {
        font-size: 138px;
      }

      @media (min-width: 1440px) {
        font-size: 158px;
      }

      @media (min-width: 1920px) {
        font-size: 178px;
      }

      .word {
        display: inline-block;
        transform: translateY(20px);
        opacity: 0;
      }
    }
  }
}
</style>
