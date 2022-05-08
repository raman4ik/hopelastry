<template>
  <div ref="homeInfoRef" class="home-info">
    <div ref="homeInfoBgRef" class="home-info__bg">
      <div class="home-info__bg-content">
        <div class="home-info__bg-content-title">
          <AnimatedTextWords
            string="Найкраща ціна та якість на алкоголь"
            :delay="0.5"
          />
        </div>
        <div class="home-info__bg-content-number">
          <AnimatedTextChars string="+38 (068) 151-74-50" />
        </div>
        <div class="home-info__bg-content-description">
          <AnimatedTextWords
            string="Залиште ваш номер телефона і ми вам передзвоним"
          />
        </div>
        <form ref="formRef" @submit.prevent>
          <input
            ref="inputRef"
            type="number"
            placeholder="Ведіть ваш номер телефона"
            required
          />

          <div class="button-container">
            <button ref="buttonRef" type="submit">Відправити</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { onMounted, ref, useContext } from '@nuxtjs/composition-api'
import AnimatedTextWords from '~/components/animated/AnimatedTextWords.vue'
import AnimatedTextChars from '~/components/animated/AnimatedTextChars.vue'

export default defineComponent({
  components: { AnimatedTextChars, AnimatedTextWords },
  setup() {
    const { $gsap } = useContext()
    const homeInfoRef = ref(null)
    const homeInfoBgRef = ref(null)
    const inputRef = ref(null)
    const buttonRef = ref(null)
    const formRef = ref(null)

    const show = () => {
      $gsap.to(homeInfoBgRef.value, {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: homeInfoRef.value,
          start: 'top top'
        }
      })
    }

    onMounted(() => {
      setTimeout(() => {
        show()
      }, 200)
      setTimeout(() => {
        $gsap.to(inputRef.value, {
          translateX: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: homeInfoRef.value,
            start: 'top top',
          }
        })

        $gsap.to(buttonRef.value, {
          translateX: 0,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: homeInfoRef.value,
            start: 'top top'
          }
        })
      }, 100)
    })

    return {
      homeInfoBgRef,
      inputRef,
      formRef,
      buttonRef
    }
  }
})
</script>

<style lang="scss" scoped>
.home-info {
  position: relative;
  height: 100vh;

  @media (min-width: 1024px) {
    height: 700px;
  }

  .home-info__bg {
    width: 100%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1615493965724-d4fda61ff5c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 40%;
    position: relative;
    opacity: 0;

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding-bottom: 110px;

      @media (min-width: 768px) {
        padding-bottom: 100px;
      }

      &-title {
        font-size: 26px;
        text-align: center;
        font-family: var(--font-monument-grotesk);
        line-height: 100.6%;
        margin-bottom: 5px;

        @media (min-width: 768px) {
          font-size: 34px;
        }

        @media (min-width: 1440px) {
          font-size: 42px;
        }

        @media (min-width: 1920px) {
          font-size: 38px;
        }
      }

      &-number {
        font-size: 18px;
        font-family: var(--font-monument-grotesk);
        line-height: 100.6%;
        padding: 5px;

        @media (min-width: 768px) {
          font-size: 22px;
        }

        @media (min-width: 1440px) {
          font-size: 26px;
        }

        @media (min-width: 1920px) {
          font-size: 28px;
        }
      }

      &-description {
        font-size: 14px;
        font-family: var(--font-monument-grotesk);
        line-height: 100.6%;
        padding: 5px;

        @media (min-width: 768px) {
          font-size: 16px;
        }
        @media (min-width: 1440px) {
          font-size: 16px;
        }

        @media (min-width: 1920px) {
          font-size: 18px;
        }
      }

      form {
        display: inline-block;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 300px;
        margin-top: 10px;
        @media (min-width: 768px) {
          width: 400px;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          /* display: none; <- Crashes Chrome on hover */
          -webkit-appearance: none;
          margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }

        input {
          width: 100%;
          outline: none;
          border-radius: 12px;
          padding: 10px;
          border: none;
          border-bottom: 1px solid black;
          background: white;
          transform: translateX(-20px);
          opacity: 0;
          font-size: 14px;

          @media (min-width: 768px) {
            font-size: 16px;
          }

          @media (min-width: 1440px) {
            font-size: 18px;
          }
        }

        .button-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          button {
            margin-top: 15px;
            border-radius: 12px;
            background-color: #8eadff;
            padding: 10px 20px;
            font-size: 14px;
            font-family: var(--font-monument-grotesk);
            transform: translateX(20px);
            opacity: 0;
            transition: all 0.3s;
            outline: none;

            @media (min-width: 768px) {
              font-size: 16px;
              font-weight: 600;
            }

            @media (min-width: 1440px) {
              font-size: 18px;
              font-weight: 600;
            }

            @media (min-width: 1920px) {
              font-size: 18px;
            }

            &:hover {
              background-color: #fcfc8a;
            }
          }
        }
      }
    }
  }
}
</style>
