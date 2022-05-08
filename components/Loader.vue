<template>
  <div v-if="loader" class="loader">
    <div class="loader__item loader__item--1" />
    <div class="loader__item loader__item--2" />
    <div class="loader__item loader__item--3" />
    <div class="loader__item loader__item--4" />
    <div class="loader__item loader__item--6" />
    <div class="loader__item loader__item--7" />
    <div class="loader__item loader__item--8" />
    <div class="loader__item loader__item--9" />
    <div class="loader__item loader__item--10" />
    <div class="loader__item loader__item--11" />
    <div class="loader__item loader__item--12" />
    <div class="loader__item loader__item--13" />
    <div class="loader__item loader__item--14" />
    <div class="loader__item loader__item--15" />
    <div class="loader__item loader__item--16" />
    <div class="loader__item loader__item--17" />
    <div class="loader__item loader__item--18" />
    <div class="loader__item loader__item--19" />
    <div class="loader__item loader__item--20" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  useContext,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Loader',
  setup() {
    const { store, $gsap } = useContext()
    const loader = computed(() => {
      return store.state.loader
    })
    // const loader = computed(() => {
    //   return true
    // })

    const show = async () => {
      await nextTick()

      $gsap.from('.loader__item', {
        top: '150%',
        // width: 0,
        // height: 0,
        duration: 1,
        stagger: {
          from: 'random',
          each: 1.5,
          amount: 1
        }
      })
    }

    watch(loader, (currentValue) => {
      if (currentValue) {
        show()
      }
    })

    return {
      loader,
      show
    }
  }
})
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // background-color: #151515;
  // background-color: var(--color-white);
  color: var(--color-white);
  z-index: 100;
  transition: all 0.3s;

  &__item {
    width: 470px;
    height: 470px;
    background-color: #151515;
    position: absolute;
    border-radius: 50%;
    // border: solid 1px white;
    transform: translate(-50%, -50%);

    // @media (min-width: 768px) {
    //   width: 370px;
    //   height: 370px;
    // }

    // @media (min-width: 1024px) {
    //   width: 470px;
    //   height: 470px;
    // }

    @media (min-width: 1440px) {
      width: 570px;
      height: 570px;
    }

    @media (min-width: 1920px) {
      width: 670px;
      height: 670px;
    }

    &--1 {
      top: 47%;
      left: 35%;
    }

    &--2 {
      top: 45%;
      left: 65%;
    }

    &--3 {
      top: 70%;
      left: 106%;
    }

    &--4 {
      top: 96%;
      left: 90%;
    }

    &--5 {
      top: 34%;
      left: 110%;
    }

    &--6 {
      top: 16%;
      left: 10%;
    }

    &--7 {
      top: 32%;
      left: 19%;
    }

    &--8 {
      top: 19%;
      left: 56%;
    }

    &--9 {
      top: 2%;
      left: 36%;
    }

    &--10 {
      top: 27%;
      left: 83%;
    }

    &--11 {
      top: 84%;
      left: 20%;
    }

    &--12 {
      top: -10%;
      left: 75%;
    }

    &--13 {
      top: 4%;
      left: 100%;
    }

    &--14 {
      top: 56%;
      left: 6%;
    }

    &--15 {
      top: 84%;
      left: 40%;
    }

    &--16 {
      top: 74%;
      left: 58%;
    }

    &--17 {
      top: 64%;
      left: 78%;
    }

    &--18 {
      top: 106%;
      left: 66%;
    }

    &--19 {
      top: 44%;
      left: 98%;
    }

    &--20 {
      top: 94%;
      left: -2%;
    }
  }
}
</style>
