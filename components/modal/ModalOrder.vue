<template>
  <div class="modal-order">
    <div @click="handleShowModal" class="close">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.3355 9.4769L32.5233 10.6647L10.6648 32.5215L9.47705 31.3345L31.3355 9.4769Z" fill="#151515" fill-opacity="0.6"/>
        <path d="M10.6648 9.4769L32.5233 31.3337L31.3355 32.5223L9.47705 10.6655L10.6648 9.4769Z" fill="#151515" fill-opacity="0.6"/>
      </svg>
    </div>
    <form>
      <div>
        <span>Імя</span>
        <input type="text">
      </div>
      <div>
        <span>Фамілія</span>
        <input type="text">
      </div>
      <div>
        <span>Номер телефона</span>
        <input type="text">
      </div>
      <div>
        <span>Місто</span>
        <input type="text">
      </div>
      <div>
        <span>Код</span>
        <input type="text">
      </div>
      <button>Відправити</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";

export default defineComponent({
  props: {
    handleShowModal: {
      type: Function,
      default: () => {}
    }
  },
  setup() {
    const show = () => {}

    return { show }
  }
})
</script>

<style lang="scss" scoped>
.modal-order {
  position: absolute;
  width: 80%;
  top: 7%;
  z-index: 100;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 15px #151515;
  left: 10%;

  .close {
    position: absolute;
    right: 0;
    top: 5px;
    padding-right: 10px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 15% 30px 10% 30px;
    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      span {
        font-size: 18px;
        line-height: 100.6%;
        font-family: var(--font-monument-grotesk);
        color: var(--color-black);
        padding-left: 5px;
        padding-bottom: 3px;
      }
      input {
        border-radius: 15px;
        background: none;
        border: 1px solid #151515;
        padding: 5px 10px;
        font-size: 18px;
        outline: none;
        color: var(--color-black);
      }
    }

    button {
      border-radius: 5px;
      background-color: #151515;
      color: var(--color-white);
      border: 1px solid #151515;
      outline: none;
      padding: 10px 0;
      margin-top: 40px;
    }
  }
}
</style>
