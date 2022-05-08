<template>
  <header class="header">
    <div class="header-logo">
      <svg
        width="30"
        height="30"
        class="hamburger"
        :class="{ active: !isActive }"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="isActive = !isActive"
      >
        <path
          d="M3.75 15H26.25"
          stroke="#151515"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.75 7.5H26.25"
          stroke="#151515"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.75 22.5H26.25"
          stroke="#151515"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        class="close"
        :class="{ active: isActive }"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="isActive = !isActive"
      >
        <path
          d="M31.3355 9.4769L32.5233 10.6647L10.6648 32.5215L9.47705 31.3345L31.3355 9.4769Z"
          fill="white"
          fill-opacity="0.6"
        />
        <path
          d="M10.6648 9.4769L32.5233 31.3337L31.3355 32.5223L9.47705 10.6655L10.6648 9.4769Z"
          fill="white"
          fill-opacity="0.6"
        />
      </svg>
    </div>

    <div class="header-content" :class="{ active: isActive }">
      <ul>
        <li @click="closeHeader"><NuxtLink to="/">Головна</NuxtLink></li>
        <li @click="closeHeader"><NuxtLink to="/">Про нас</NuxtLink></li>
        <li @click="closeHeader"><NuxtLink to="/basket">Корзина</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isActive = ref(false)
    const show = () => {}
    const closeHeader = () => {
      isActive.value = false
    }

    return { show, isActive, closeHeader }
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 100;

  &-logo {
    cursor: pointer;
    @media (min-width: 1440px) {
      transform: scale(1.5);
    }
    .hamburger {
      display: none;
      transition: transform 0.5s;
      &:hover {
        transform: rotate(180deg);
      }
      &.active {
        display: block;
      }
    }

    .close {
      display: none;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
        transform: rotate(180deg);
      }
      &.active {
        display: block;
      }
    }
  }

  .header-content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -100;
    transform: translateY(-100%);
    transition: all 0.7s;
    &.active {
      transform: translateY(0);
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      padding-bottom: 100px;
      padding-left: 0;

      @media (min-width: 768px) {
        flex-direction: row;
      }

      li {
        margin: 0 10px;
        transition: opacity 0.3s;
        cursor: pointer;

        a {
          color: var(--color-white);
          font-family: var(--font-monument-grotesk);
          font-size: 28px;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
